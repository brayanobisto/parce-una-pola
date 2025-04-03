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
  const setIsAuthenticatedLocal = useUserStore((state) => state.setIsAuthenticatedLocal);
  const isAuthenticatedLocal = useUserStore((state) => state.isAuthenticatedLocal);

  useEffect(() => {
    const fetchUser = async () => {
      const currentUser = await getCurrentUser();
      setUser(currentUser);

      const hasHardware = await LocalAuthentication.hasHardwareAsync();
      const isEnrolled = await LocalAuthentication.isEnrolledAsync();

      if (currentUser && !isAuthenticatedLocal && hasHardware && isEnrolled) {
        const localAuthResult = await LocalAuthentication.authenticateAsync({
          promptMessage: "Autenticación requerida",
          fallbackLabel: "Usar contraseña",
        });

        if (localAuthResult.success) {
          setIsAuthenticatedLocal(true);
        }
      }

      setIsLoading(false);
    };

    fetchUser();
  }, [setIsLoading, setUser, setIsAuthenticatedLocal, isAuthenticatedLocal]);

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
