"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "@/components/ui/use-toast";
import { inviteUserToDoc } from "@/lib/actions";
import { usePathname, useRouter } from "next/navigation";
import { FormEvent, useState, useTransition } from "react";
import { Input } from "@/components/ui/input";

const InviteOnDocBtn = () => {
  const [email, setEmail] = useState("");
  const [isOpen, setIsopen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const path = usePathname();
  const router = useRouter();

  const handleInvite = async (e: FormEvent) => {
    e.preventDefault();

    const roomId = path.split("/").pop();

    if (!roomId) return;

    startTransition(async () => {
      const { success } = (await inviteUserToDoc(roomId, email)) as {
        success: boolean;
      };

      if (success) {
        setIsopen(false);
        setEmail("");
        toast({
          title: "User invited successfully",
          description: "User invited successfully",
        });
      } else {
        toast({
          title: "Failed to invite user",
          description: "Failed to invite user",
          variant: "destructive",
        });
      }
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsopen}>
      <Button asChild variant="outline">
        <DialogTrigger>Invite</DialogTrigger>
      </Button>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Invite User</DialogTitle>
          <DialogDescription>
            Enter the email of the user you want to invite
          </DialogDescription>
        </DialogHeader>
        <form onClick={handleInvite}>
          <Input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="my-10"
          />
          <DialogFooter>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Inviting..." : "Invite"}
            </Button>
            <DialogClose>Cancel</DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
export default InviteOnDocBtn;
