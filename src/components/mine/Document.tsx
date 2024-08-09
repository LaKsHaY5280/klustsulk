"use client";
import { Input } from "@/components/ui/input";
import { useEffect, useState, useTransition } from "react";
import { Button } from "../ui/button";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useDocumentData } from "react-firebase-hooks/firestore";

const Document = ({ id }: { id: string }) => {
  const [title, setTitle] = useState<string>("");
  const [isPending, startTransition] = useTransition();
  const [data, loading, error] = useDocumentData(doc(db, "documents", id));

  useEffect(() => {
    if (data) setTitle(data.title);
  }, [data]);

  const updatetitle = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log("hii");

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
        <Button type="submit" disabled={isPending || !title}>
          {isPending ? "Updating..." : "Submit"}
        </Button>
      </form>
    </div>
  );
};
export default Document;
