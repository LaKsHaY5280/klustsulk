"use client";
import { Input } from "@/components/ui/input";
import { useEffect, useState, useTransition } from "react";
import { Button } from "../ui/button";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useDocumentData } from "react-firebase-hooks/firestore";
import Editor from "./Editor";
import useOwner from "@/lib/hooks/useOwner";
import DeleteDocBtn from "./buttons/DeleteDocBtn";
import InviteOnDocBtn from "./buttons/InviteOnDocBtn";

const Document = ({ id }: { id: string }) => {
  const [title, setTitle] = useState<string>("");
  const [isPending, startTransition] = useTransition();
  const [data, loading, error] = useDocumentData(doc(db, "documents", id));
  const isOwner = useOwner();

  useEffect(() => {
    if (data) setTitle(data.title);
  }, [data]);

  const updatetitle = async (e: React.FormEvent) => {
    e.preventDefault();

    if (title.trim())
      startTransition(async () => {
        await updateDoc(doc(db, "documents", id), {
          title,
        });
      });
  };

  return (
    <div>
      <form
        onSubmit={updatetitle}
        className="flex w-full items-center justify-around gap-5"
      >
        <Input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <div className="flex w-fit items-center justify-center gap-2">
          <Button type="submit" disabled={isPending || !title}>
            {isPending ? "Updating..." : "Submit"}
          </Button>
          {isOwner && (
            <>
              <InviteOnDocBtn />
              <DeleteDocBtn />
            </>
          )}
        </div>
      </form>

      <Editor />
    </div>
  );
};
export default Document;
