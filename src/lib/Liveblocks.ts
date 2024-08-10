import { Liveblocks } from "@liveblocks/node";

const key = process.env.LIVEBLOCKS_PRIVATE_KEYS;

if (!key)
  throw new Error(
    "Please provide your Liveblocks private key. You can find it in your Liveblocks dashboard.",
  );

const LiveblocksNew = new Liveblocks({
  secret: key,
});

export default LiveblocksNew as Liveblocks;
