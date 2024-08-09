import { Button } from "@/components/ui/button";
import { db } from "@/lib/firebase";
import { doc } from "firebase/firestore";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useDocumentData } from "react-firebase-hooks/firestore";

const MenuOpt = ({ href, id }: { href: string; id: string }) => {
  const [data, loading, error] = useDocumentData(doc(db, "documents", id));

  const pathname = usePathname();
  const isActive = href.includes(pathname) && pathname !== "/";

  if (!data) return null;

  return (
    <Button variant="outline" className="  border-stone-400">
      <Link href={href}>{data.title}</Link>
    </Button>
  );
};
export default MenuOpt;
