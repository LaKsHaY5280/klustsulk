import Room from "@/lib/providers/Room";
import { auth } from "@clerk/nextjs/server";

const layout = ({
  children,
  params: { id },
}: {
  children: React.ReactNode;
  params: { id: string };
}) => {
  auth().protect();

  return <Room roomId={id}>{children}</Room>;
};
export default layout;
