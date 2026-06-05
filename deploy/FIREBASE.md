# Firebase Authentication setup

Aptiva uses **Firebase Auth** for the `/login` + `/admin` console: email/password
(with Firebase-handled verification & reset emails) **and** Google sign-in. The
Hono backend verifies the Firebase ID token with `jose` against Google's public
keys — **no service-account secret or Admin SDK needed**, just the project id.

> The public marketing site works with no Firebase config at all. You only need
> this for the admin console.

## 1. Create a Firebase project
1. Go to <https://console.firebase.google.com> → **Add project** (any name, e.g. `aptiva`).
2. Analytics is optional — skip it if you like.

## 2. Enable sign-in methods
**Build → Authentication → Get started → Sign-in method**, then enable:
- **Email/Password** (toggle on; leave "Email link" off).
- **Google** (toggle on; pick a support email).

## 3. Register a Web app & copy the config
1. **Project settings (gear) → General → Your apps → Web (`</>`)**. Register the app.
2. Copy the `firebaseConfig` values into your `.env`:

| Firebase config key | env var |
|---|---|
| `apiKey` | `VITE_FIREBASE_API_KEY` |
| `authDomain` | `VITE_FIREBASE_AUTH_DOMAIN` |
| `projectId` | `VITE_FIREBASE_PROJECT_ID` **and** `FIREBASE_PROJECT_ID` |
| `appId` | `VITE_FIREBASE_APP_ID` |
| `storageBucket` | `VITE_FIREBASE_STORAGE_BUCKET` (optional) |
| `messagingSenderId` | `VITE_FIREBASE_MESSAGING_SENDER_ID` (optional) |

3. Set `OWNER_EMAIL` to the email(s) that should be **admin** (comma-separated).

> `VITE_*` are compiled into the bundle, so set them **before** `npm run build`
> (re-run `bash deploy/deploy.sh` after changing them).

## 4. Authorize your domain
**Authentication → Settings → Authorized domains → Add domain** → add your
production domain (e.g. `aptiva.com`). `localhost` is pre-authorized for dev.
(Without this, Google sign-in popups are rejected.)

## 5. How roles work
On every login the backend verifies the token, upserts the user into MySQL, and
sets `role = admin` if the email is in `OWNER_EMAIL`, else `user`. Change admins
by editing `OWNER_EMAIL` and re-logging-in — no code or DB edits.

## 6. Verify
- `https://yourdomain/login` → sign up / sign in / Google all work.
- An `OWNER_EMAIL` account reaches `/admin`; any other account sees "Admin access only".
- Password reset + verification emails arrive (Firebase sends them).

## Notes
- Email templates (verification/reset/sender name) are customizable under
  **Authentication → Templates**.
- Firebase's Spark (free) plan covers this comfortably.
- No `KIMI_*`/OAuth-callback config exists anymore — it was fully removed.
