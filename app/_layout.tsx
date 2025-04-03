import { Fragment, useEffect } from "react";
import * as LocalAuthentication from "expo-local-authentication";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { QueryClientProvider } from "@tanstack/react-query";

import { LoadingView } from "@/components/ui/LoadingView";
import { getCurrentUser } from "@/lib/supabase/auth";
import { queryClient } from "@/lib/tanstack-query";
import { useUserStore } from "@/store";

import "@/global.css";

export default function RootLayout() {
  const isLoading = useUserStore((state) => state.isLoading);
  const setIsLoading = useUserStore((state) => state.setIsLoading);
  const setUser = useUserStore((state) => state.setUser);

  useEffect(() => {
    const fetchUser = async () => {
      const currentUser = await getCurrentUser();
      setUser(currentUser);

      const hasHardware = await LocalAuthentication.hasHardwareAsync();
      const isEnrolled = await LocalAuthentication.isEnrolledAsync();
      const canUseLocalAuth = hasHardware && isEnrolled;

      if (currentUser && canUseLocalAuth) {
        let isAuthenticatedLocal = false;

        do {
          const localAuthResult = await LocalAuthentication.authenticateAsync({
            promptMessage: "Autenticación requerida",
            fallbackLabel: "Usar contraseña",
          });

          isAuthenticatedLocal = localAuthResult.success;
        } while (!isAuthenticatedLocal);
      }

      setIsLoading(false);
    };

    fetchUser();
  }, [setIsLoading, setUser]);

  if (isLoading) {
    return <LoadingView />;
  }

  return (
    <Fragment>
      <StatusBar style="inverted" />
      <QueryClientProvider client={queryClient}>
        <Stack screenOptions={{ headerShown: false }} />
      </QueryClientProvider>
    </Fragment>
  );
}
