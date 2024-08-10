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
import { toast } from "@/components/ui/use-toast";
import { removeUserFromDoc } from "@/lib/actions";
import { db } from "@/lib/firebase";
import useOwner from "@/lib/hooks/useOwner";
import { useUser } from "@clerk/nextjs";
import { useRoom } from "@liveblocks/react/suspense";
import { collectionGroup, query, where } from "firebase/firestore";
import { useState, useTransition } from "react";
import { useCollection } from "react-firebase-hooks/firestore";

const ManageUsers = () => {
  const { user } = useUser();
  const room = useRoom();
  const isOwner = useOwner();
  const [usersInRoom] = useCollection(
    user && query(collectionGroup(db, "rooms"), where("roomId", "==", room.id)),
  );

  const [isOpen, setIsopen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleDelete = (userId: string) => {
    startTransition(async () => {
      if (!user) return;

      const { success } = (await removeUserFromDoc(room.id, userId)) as {
        success: boolean;
      };

      if (success) {
        setIsopen(false);
        toast({
          title: "User removed successfully",
          description: "User removed successfully",
        });
      } else {
        toast({
          title: "Failed to remove user",
          description: "Failed to remove user",
          variant: "destructive",
        });
      }
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsopen}>
      <Button asChild variant="outline">
        <DialogTrigger>Users ({usersInRoom?.docs.length})</DialogTrigger>
      </Button>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Users with access</DialogTitle>
          <DialogDescription>
            Below is a list of users with access
          </DialogDescription>
        </DialogHeader>

        <div>
          {usersInRoom?.docs.map((doc) => {
            const userData = doc.data();
            const isUserOwner = userData.role == "owner";

            return (
              <div
                key={userData.userId}
                className="flex items-center justify-between gap-5"
              >
                <div className="flex items-center gap-2">
                  {isUserOwner ? (
                    <span className="badge">Owner ({userData.userId}) </span>
                  ) : (
                    <p>{userData.userId}</p>
                  )}
                </div>
                {isOwner &&
                  userData.userId !== user?.emailAddresses[0].toString() && (
                    <Button
                      onClick={() => handleDelete(userData.userId)}
                      variant="outline"
                      disabled={isPending}
                    >
                      {isPending ? "Removing..." : "Remove"}
                    </Button>
                  )}
              </div>
            );
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
};
export default ManageUsers;
