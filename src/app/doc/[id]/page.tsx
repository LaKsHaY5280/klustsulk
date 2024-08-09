import Document from "@/components/mine/Document";

const page = ({ params: { id } }: { params: { id: string } }) => {
  return (
    <div className="flex min-h-screen flex-1 flex-col">
      <Document id={id} />
    </div>
  );
};
export default page;
