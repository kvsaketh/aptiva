import * as jose from "jose";
import { env } from "../lib/env";

/**
 * Verify a Firebase ID token without the Admin SDK or a service-account secret —
 * Firebase ID tokens are RS256 JWTs signed by Google. We validate the signature
 * against Google's public JWKS and check issuer/audience == the Firebase project.
 * jose caches the JWKS, so this is cheap per request.
 */
const JWKS = jose.createRemoteJWKSet(
  new URL("https://www.googleapis.com/service_accounts/v1/jwks/securetoken@system.gserviceaccount.com"),
);

export type FirebaseClaims = {
  uid: string;
  email: string | null;
  emailVerified: boolean;
  name: string | null;
  picture: string | null;
};

export async function verifyFirebaseToken(idToken: string): Promise<FirebaseClaims> {
  if (!env.firebaseProjectId) {
    throw new Error("FIREBASE_PROJECT_ID is not configured");
  }
  const { payload } = await jose.jwtVerify(idToken, JWKS, {
    issuer: `https://securetoken.google.com/${env.firebaseProjectId}`,
    audience: env.firebaseProjectId,
  });
  const uid = (payload.sub ?? payload.user_id) as string | undefined;
  if (!uid) throw new Error("Token missing subject (uid)");
  return {
    uid,
    email: (payload.email as string) ?? null,
    emailVerified: Boolean(payload.email_verified),
    name: (payload.name as string) ?? null,
    picture: (payload.picture as string) ?? null,
  };
}
