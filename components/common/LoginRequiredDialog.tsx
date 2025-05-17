import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";

interface LoginRequiredDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function LoginRequiredDialog({
  open,
  onOpenChange,
}: LoginRequiredDialogProps) {
  const router = useRouter();
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Authentifizierung erforderlich</DialogTitle>
          <DialogDescription>
            Du musst dich anmelden, um Spiele zu favorisieren. Bitte klicke auf
            die Schaltfläche unten, um dich anzumelden.
          </DialogDescription>
        </DialogHeader>
        <Button onClick={() => router.push("/api/auth/signin")}>
          Anmelden
        </Button>
      </DialogContent>
    </Dialog>
  );
}
