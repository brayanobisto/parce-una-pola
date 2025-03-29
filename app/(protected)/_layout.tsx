import { Fragment, useEffect, useState } from "react";
import { Stack } from "expo-router";
import { supabase } from "@/lib/supabase";
import { useRouter } from "expo-router";
import { ActivityIndicator, SafeAreaView } from "react-native";

export default function ProtectedLayout() {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.replace("/");
      }

      setIsLoading(false);
    };
    fetchUser();
  }, []);

  if (isLoading) {
    return (
      <SafeAreaView className="flex-1 bg-white justify-center items-center">
        <ActivityIndicator className="text-green-500" size="large" />
      </SafeAreaView>
    );
  }

  return (
    <Fragment>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="beer/[id]" />
      </Stack>
    </Fragment>
  );
}
