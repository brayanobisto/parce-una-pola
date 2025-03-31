import { Button } from "@/components/ui/Button";
import { SafeAreaView } from "@/components/ui/SafeAreaView";
import { useSignOut } from "@/hooks/auth/useSignOut";

export default function Profile() {
  const { mutate: signOut, isPending: isSigningOut } = useSignOut();

  const handleSignOut = () => {
    signOut();
  };

  return (
    <SafeAreaView className="p-4">
      <Button onPress={handleSignOut} isLoading={isSigningOut}>
        Salir
      </Button>
    </SafeAreaView>
  );
}
