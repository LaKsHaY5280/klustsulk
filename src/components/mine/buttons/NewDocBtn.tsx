"use client";
import { Button } from "@/components/ui/button";
import { createNewDoc } from "@/lib/actions";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

const NewDocBtn = () => {
  const router = useRouter();

  const [isPending, startTransition] = useTransition();

  const handleCreateNewDoc = () => {
    startTransition(async () => {
      // create new doc
      const { docId } = await createNewDoc();
      router.push(`/docs/${docId}`);
    });
  };

  return (
    <Button onClick={handleCreateNewDoc} disabled={isPending}>
      {isPending ? "Creating..." : "New Doc"}
    </Button>
  );
};
export default NewDocBtn;
