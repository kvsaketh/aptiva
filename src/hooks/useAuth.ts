import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router";
import { onAuthStateChanged, type User as FbUser } from "firebase/auth";
import { trpc } from "@/providers/trpc";
import { getFirebaseAuth, firebaseConfigured } from "@/lib/firebase";
import { logOut } from "@/lib/firebaseAuth";
import { LOGIN_PATH } from "@/const";

type UseAuthOptions = {
  redirectOnUnauthenticated?: boolean;
  redirectPath?: string;
};

/**
 * Auth state driven by Firebase. We watch the Firebase session and, while a
 * Firebase user is present, load the backend user (which carries the role)
 * via `auth.me` — the tRPC client attaches the Firebase ID token automatically.
 */
export function useAuth(options?: UseAuthOptions) {
  const { redirectOnUnauthenticated = false, redirectPath = LOGIN_PATH } =
    options ?? {};

  const navigate = useNavigate();
  const utils = trpc.useUtils();

  const [fbUser, setFbUser] = useState<FbUser | null>(null);
  const [fbReady, setFbReady] = useState(!firebaseConfigured);

  useEffect(() => {
    if (!firebaseConfigured) {
      setFbReady(true);
      return;
    }
    const unsub = onAuthStateChanged(getFirebaseAuth(), (u) => {
      setFbUser(u);
      setFbReady(true);
      void utils.auth.me.invalidate();
    });
    return unsub;
  }, [utils]);

  const meQuery = trpc.auth.me.useQuery(undefined, {
    enabled: fbReady && !!fbUser,
    retry: false,
    staleTime: 1000 * 60 * 5,
  });

  const logout = useCallback(async () => {
    await logOut();
    await utils.invalidate();
    navigate(redirectPath);
  }, [utils, navigate, redirectPath]);

  const isLoading = !fbReady || (!!fbUser && meQuery.isLoading);

  useEffect(() => {
    if (redirectOnUnauthenticated && fbReady && !fbUser) {
      if (window.location.pathname !== redirectPath) navigate(redirectPath);
    }
  }, [redirectOnUnauthenticated, fbReady, fbUser, navigate, redirectPath]);

  return useMemo(
    () => ({
      user: meQuery.data ?? null,
      firebaseUser: fbUser,
      isAuthenticated: !!meQuery.data,
      isAdmin: meQuery.data?.role === "admin",
      isLoading,
      error: meQuery.error,
      logout,
      refresh: meQuery.refetch,
    }),
    [meQuery.data, meQuery.error, meQuery.refetch, fbUser, isLoading, logout],
  );
}
