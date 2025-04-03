import { supabase } from "@/lib/supabase";

export const getCurrentUser = async () => {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) {
    throw error;
  }

  return user;
};

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

export const signOut = async () => {
  const { error: signOutError } = await supabase.auth.signOut();

  if (signOutError) {
    throw signOutError;
  }
};
