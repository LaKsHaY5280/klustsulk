"use client";
import LiveBlocks from "@/lib/providers/LiveBlocks";

const layout = ({ children }: { children: React.ReactNode }) => {
  return <LiveBlocks>{children}</LiveBlocks>;
};
export default layout;
