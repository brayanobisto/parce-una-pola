import { supabase } from "@/lib/supabase";

export const getCurrentUser = async () => {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) {
    console.error("getCurrentUser error", error);
  }

  return user;
};

export const signInAnonymously = async (name: string) => {
  const { error: signInError } = await supabase.auth.signInAnonymously();

  if (signInError) {
    console.error("signInAnonymously error", signInError);
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
    console.error("updateUser error", updateError);
  }

  return user;
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error("signOut error", error);
  }
};
