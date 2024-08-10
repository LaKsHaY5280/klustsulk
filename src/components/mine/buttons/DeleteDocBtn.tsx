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
import { deleteDoc } from "@/lib/actions";
import { usePathname, useRouter } from "next/navigation";
import { useState, useTransition } from "react";

const DeleteDocBtn = () => {
  const [isOpen, setIsopen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const path = usePathname();
  const router = useRouter();

  const handleDelete = async () => {
    const roomId = path.split("/").pop();

    if (!roomId) return;

    startTransition(async () => {
      const { success } = (await deleteDoc(roomId)) as { success: boolean };

      if (success) {
        setIsopen(false);
        router.replace("/");
        toast({
          title: "Document deleted",
          description: "The document has been deleted successfully",
        });
      } else {
        toast({
          title: "Failed to delete document",
          description: "An error occurred while deleting the document",
          variant: "destructive",
        });
      }
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsopen}>
      <Button asChild variant="destructive">
        <DialogTrigger>Delete</DialogTrigger>
      </Button>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure you want to delete?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete the
            document and all of its data.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={isPending}
          >
            {isPending ? "Deleting..." : "Delete"}
          </Button>
          <DialogClose asChild>
            <Button variant="secondary">Cancel</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
export default DeleteDocBtn;
