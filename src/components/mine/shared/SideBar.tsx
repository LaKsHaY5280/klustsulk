"use client";
import { db } from "@/lib/firebase";
import NewDocBtn from "../buttons/NewDocBtn";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useUser } from "@clerk/nextjs";
import { collectionGroup, query, where } from "firebase/firestore";
import { Menu } from "lucide-react";

import { useCollection, useDocumentData } from "react-firebase-hooks/firestore";
import { useEffect, useState } from "react";
import { RoomDoc } from "@/lib/types";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import MenuOpt from "../buttons/MenuOpt";

const SideBar = () => {
  const { user } = useUser();

  const [groupedData, setGroupedData] = useState<{
    owner: RoomDoc[];
    editor: RoomDoc[];
  }>({
    owner: [],
    editor: [],
  });

  const [data, leading, error] = useCollection(
    user &&
      query(
        collectionGroup(db, "rooms"),
        where("userId", "==", user.emailAddresses[0].toString()),
      ),
  );

  useEffect(() => {
    if (!data) return;

    const grouped = data.docs.reduce<{
      owner: RoomDoc[];
      editor: RoomDoc[];
    }>(
      (acc, doc) => {
        const roomdata = doc.data() as RoomDoc;

        if (roomdata.role === "owner") {
          acc.owner.push({
            id: doc.id,
            ...roomdata,
          });
        } else {
          acc.editor.push({
            id: doc.id,
            ...roomdata,
          });
        }

        return acc;
      },
      { owner: [], editor: [] },
    );

    setGroupedData(grouped);
  }, [data]);

  const Menulist = () => {
    return (
      <div className="w-32">
        <NewDocBtn />

        {
          <div className="mt-5 flex flex-col items-center justify-center gap-5">
            <h3 className="text-sm font-bold text-stone-400">Owner</h3>
            {groupedData ? (
              groupedData.owner.map((doc) => (
                <MenuOpt key={doc.id} id={doc.id} href={`/doc/${doc.id}`} />
              ))
            ) : (
              <div>loading...</div>
            )}
          </div>
        }
        {
          <div className="mt-5 flex flex-col items-center justify-center gap-5">
            <h3 className="text-sm font-bold text-stone-400">Editor</h3>
            {groupedData ? (
              groupedData.editor.map((doc) => (
                <MenuOpt key={doc.id} id={doc.id} href={`/doc/${doc.id}`} />
              ))
            ) : (
              <div>loading...</div>
            )}
          </div>
        }
      </div>
    );
  };

  return (
    <div className="md:5 bg-stone-100 p-3">
      <Sheet>
        <SheetTrigger className="md:hidden">
          <Menu />
        </SheetTrigger>
        <SheetContent side="left">
          <SheetHeader>
            <SheetTitle>Menu</SheetTitle>
            <SheetDescription></SheetDescription>
            <Menulist />
          </SheetHeader>
        </SheetContent>
      </Sheet>
      <div className="max-md:hidden">
        <Menulist />
      </div>
    </div>
  );
};
export default SideBar;
