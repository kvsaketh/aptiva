#!/usr/bin/env bash
# One-time provisioning for an Oracle Cloud "Always Free" Ubuntu 22.04 VM
# (Ampere A1 / ARM recommended — more RAM headroom for the build).
# Installs Node 20, MySQL 8, Nginx, PM2, Certbot, and opens the OS firewall.
# Run as the default 'ubuntu' user:  bash deploy/setup-server.sh
set -euo pipefail

echo "==> System update"
sudo apt-get update -y && sudo apt-get upgrade -y

echo "==> Node.js 20 LTS (NodeSource)"
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs build-essential

echo "==> MySQL 8, Nginx, Certbot, git"
sudo apt-get install -y mysql-server nginx certbot python3-certbot-nginx git
sudo systemctl enable --now mysql nginx

echo "==> PM2 (global)"
sudo npm install -g pm2

echo "==> Open the OS firewall for HTTP/HTTPS (Oracle Ubuntu ships locked-down iptables)"
# This is THE classic Oracle gotcha — the VCN Security List alone is not enough.
sudo iptables -I INPUT 6 -m state --state NEW -p tcp --dport 80  -j ACCEPT || true
sudo iptables -I INPUT 6 -m state --state NEW -p tcp --dport 443 -j ACCEPT || true
sudo netfilter-persistent save || (sudo apt-get install -y iptables-persistent && sudo netfilter-persistent save)

echo
echo "==> Done. Next:"
echo "   1) Secure MySQL:        sudo mysql_secure_installation"
echo "   2) Create DB + user (see deploy/ORACLE_CLOUD.md step 4)"
echo "   3) Clone/upload the app, create .env, then: bash deploy/deploy.sh"
echo "   4) Configure Nginx + SSL (steps 6-7)"
echo
echo "REMINDER: also add ingress rules for 80 & 443 in the OCI Console"
echo "          (VCN > Security Lists / NSG) — both layers are required."
