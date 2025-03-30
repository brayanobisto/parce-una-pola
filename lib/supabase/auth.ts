import { supabase } from "@/lib/supabase";

export const signInAnonymously = async (name: string) => {
  const { error: signInError } = await supabase.auth.signInAnonymously();

  if (signInError) {
    throw signInError;
  }

  const {
    data: { user },
    error: updateError,
  } = await supabase.auth.updateUser({
    data: {
      name,
    },
  });

  if (updateError) {
    throw updateError;
  }

  return user;
};
