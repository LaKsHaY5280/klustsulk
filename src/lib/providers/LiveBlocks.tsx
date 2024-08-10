"use client";

import { LiveblocksProvider, RoomProvider } from "@liveblocks/react/suspense";

const LiveBlocks = ({ children }: { children: React.ReactNode }) => {
  if (!process.env.NEXT_PUBLIC_LIVEBLOCK_PUBLIC_KEY)
    throw new Error(
      "Please provide your Liveblocks public key. You can find it in your Liveblocks dashboard.",
    );

  return (
    <LiveblocksProvider throttle={16} authEndpoint={"/auth-endpoint"}>
      {children}
    </LiveblocksProvider>
  );
};
export default LiveBlocks;
