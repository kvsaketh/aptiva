# Deploy Aptiva to Oracle Cloud — Always Free

This app is **one Node process** (Hono serves the React SPA *and* the `/api`
tRPC routes) plus a **MySQL** database. On Oracle Cloud's *Always Free* tier you
run both on a single VM, at **no cost**.

```
Internet ──HTTPS──▶ Nginx (443) ──▶ Node app (127.0.0.1:3000) ──▶ MySQL (127.0.0.1:3306)
                     Let's Encrypt        PM2 keeps it alive          self-hosted on the VM
```

The committed kit: `deploy/setup-server.sh` (provision), `deploy/deploy.sh`
(build + start), `deploy/ecosystem.config.cjs` (PM2), `deploy/nginx.conf`,
`.env.production.example`.

> What you do vs. what's automated: **you** create the VM + open ingress in the
> OCI console + provide secrets; the **scripts** install everything and build/run.

---

## 1. Create the VM
OCI Console → **Compute → Instances → Create**:
- **Image:** Canonical Ubuntu 22.04
- **Shape:** `VM.Standard.A1.Flex` (Ampere/ARM) — give it **1–2 OCPU / 6–12 GB**.
  *Always Free includes 4 ARM OCPU / 24 GB total.* Use ARM, **not** the 1 GB AMD
  micro — `vite build` needs the RAM (see §11).
- **SSH keys:** upload your public key (or let it generate one — save the private key).
- Leave it on the default VCN/public subnet so it gets a **public IP**. Note that IP.

## 2. Open ingress in OCI (REQUIRED — first of two firewall layers)
VCN → **Security Lists** (or the instance's **NSG**) → add **Ingress Rules**:
| Source | Proto | Dest port |
|--------|-------|-----------|
| 0.0.0.0/0 | TCP | 80 |
| 0.0.0.0/0 | TCP | 443 |

(SSH/22 is usually already allowed.) The OS firewall is opened in step 3.

## 3. Connect & provision
```bash
ssh ubuntu@YOUR_PUBLIC_IP
# upload/clone the code first (see step 5) OR just grab the script, then:
bash deploy/setup-server.sh
```
Installs Node 20, MySQL 8, Nginx, PM2, Certbot, and **opens OS-level iptables for
80/443** (Oracle's Ubuntu images block these by default — the #1 "why is my site
unreachable" cause; the script handles it).

## 4. Create the database
```bash
sudo mysql_secure_installation        # set a root password, accept the hardening defaults
sudo mysql
```
```sql
CREATE DATABASE aptiva CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'aptiva'@'127.0.0.1' IDENTIFIED BY 'PUT_A_STRONG_PASSWORD_HERE';
GRANT ALL PRIVILEGES ON aptiva.* TO 'aptiva'@'127.0.0.1';
FLUSH PRIVILEGES;  EXIT;
```
> Drizzle runs in PlanetScale mode (no foreign keys) — works fine on stock MySQL 8.

## 5. Get the code onto the VM
**Option A — rsync from your laptop** (simplest, no GitHub needed):
```bash
# from your local project dir; excludes junk, copies source:
rsync -avz --exclude node_modules --exclude dist --exclude .env \
  ./ ubuntu@YOUR_PUBLIC_IP:/home/ubuntu/aptiva/
```
**Option B — git:** `git init && git remote add origin <repo> && git push`, then
`git clone` on the VM. (This project isn't a git repo yet; `git init` first.)

## 6. Configure secrets, then build + start
```bash
cd /home/ubuntu/aptiva
cp .env.production.example .env
nano .env                        # set DATABASE_URL password + Firebase values (see deploy/FIREBASE.md)
bash deploy/deploy.sh            # npm ci → build → db:push → pm2 start
pm2 logs aptiva                  # confirm "Server running on http://localhost:3000/"
curl -I http://127.0.0.1:3000/   # should be HTTP 200
```
> **Order matters:** `.env` must exist **before** the build — the `VITE_FIREBASE_*`
> values are compiled into the JS bundle.

## 7. Domain, Nginx & free SSL
Point your domain's **A record** at `YOUR_PUBLIC_IP`. Then:
```bash
sudo cp deploy/nginx.conf /etc/nginx/sites-available/aptiva
sudo sed -i 's/YOURDOMAIN/yourdomain.com/g' /etc/nginx/sites-available/aptiva
sudo ln -sf /etc/nginx/sites-available/aptiva /etc/nginx/sites-enabled/aptiva
sudo rm -f /etc/nginx/sites-enabled/default
sudo nginx -t && sudo systemctl reload nginx
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com   # auto-fills the SSL lines + auto-renews
```
HTTPS is **required**: the app sets `Secure` auth cookies off-localhost.

## 8. Verify
- `https://yourdomain.com` → the site loads with the lock icon.
- `https://yourdomain.com/api/trpc/...` responds (not 404 from Nginx).
- `pm2 status` shows `aptiva` online.

## 9. Secrets & Firebase Auth (what each value is)
| Var | What it is | Needed for |
|-----|-----------|-----------|
| `DATABASE_URL` | your MySQL URL from step 4 | always |
| `FIREBASE_PROJECT_ID` | Firebase project id (backend verifies tokens against it) | `/login` + `/admin` |
| `OWNER_EMAIL` | comma-separated emails granted the `admin` role | admin access |
| `VITE_FIREBASE_*` | Firebase web config (apiKey, authDomain, projectId, appId) | `/login` + `/admin`; baked at build |

**The public marketing site works with no Firebase config at all** — only sign-in
and the `/admin` CMS need it. Follow **`deploy/FIREBASE.md`** to create the Firebase
project, enable Email/Password + Google, and copy the config into `.env`, then
**rebuild** (`bash deploy/deploy.sh`) since `VITE_FIREBASE_*` are compiled in.
Until then, dynamic content falls back to the built-in static data (e.g. the client
logo wall).

## 10. Day-2 ops
```bash
bash deploy/deploy.sh     # redeploy after code changes
pm2 logs aptiva           # tail logs
pm2 restart aptiva        # restart
pm2 monit                 # live CPU/mem
```
PM2 already restarts the app on crash and on VM reboot (`pm2 save` + `pm2 startup`
were run by deploy.sh / setup).

## 11. Low-memory note
On the 1 GB AMD micro shape `vite build` can OOM. Either use the ARM shape (§1),
add swap, **or** build on your laptop and ship the artifacts:
```bash
# locally:  npm run build   then:
rsync -avz dist ubuntu@YOUR_PUBLIC_IP:/home/ubuntu/aptiva/
# on the VM: npm ci --omit=dev && pm2 start deploy/ecosystem.config.cjs
```
Add 2 GB swap if needed:
```bash
sudo fallocate -l 2G /swapfile && sudo chmod 600 /swapfile
sudo mkswap /swapfile && sudo swapon /swapfile
echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab
```
