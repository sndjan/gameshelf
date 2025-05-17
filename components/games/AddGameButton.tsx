"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { CardFooter } from "../ui/card";
import { AddGameForm } from "./AddGameForm";

interface AddGameButtonProps {
  onGameAdded?: () => void;
}

export function AddGameButton({ onGameAdded }: AddGameButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Spiel hinzufügen
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[600px]">
        {!session ? (
          <>
            <DialogHeader>
              <DialogTitle>Authentifizierung erforderlich</DialogTitle>
              <DialogDescription>
                Du musst dich anmelden, um ein Spiel hinzuzufügen. Bitte klicke
                auf die Schaltfläche unten, um dich anzumelden.
              </DialogDescription>
            </DialogHeader>
            <CardFooter>
              <Button
                onClick={() => router.push("/api/auth/signin")}
                className="ml-auto"
              >
                Anmelden
              </Button>
            </CardFooter>
          </>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>Neues Spiel hinzufügen</DialogTitle>{" "}
              <DialogDescription>
                Füge ein neues Spiel hinzu, indem du die folgenden Informationen
                ausfüllst.
              </DialogDescription>
            </DialogHeader>
            <AddGameForm
              onSuccess={() => {
                setIsOpen(false);
                if (onGameAdded) onGameAdded();
              }}
            />
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
