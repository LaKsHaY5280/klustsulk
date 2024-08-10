"use client";

import { RoomProvider, ClientSideSuspense } from "@liveblocks/react/suspense";
import { LoaderCircle } from "lucide-react";
import LiveCursor from "./LiveCursor";

const Room = ({
  children,
  roomId,
}: {
  children: React.ReactNode;
  roomId: string;
}) => {
  return (
    <RoomProvider
      id={roomId}
      initialPresence={{
        cursor: null,
      }}
    >
      <ClientSideSuspense fallback={<LoaderCircle className="animate-spin" />}>
        <LiveCursor>{children}</LiveCursor>
      </ClientSideSuspense>
    </RoomProvider>
  );
};
export default Room;
