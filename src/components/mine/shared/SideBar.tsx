import { Button } from "@/components/ui/button";
import NewDocBtn from "../buttons/NewDocBtn";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";

const SideBar = () => {
  const menuOpt = (
    <>
      <NewDocBtn />
    </>
  );

  return (
    <div className=" p-3 md:5 bg-stone-100">
      <Sheet>
        <SheetTrigger className=" md:hidden">
          <Menu />
        </SheetTrigger>
        <SheetContent side="left">
          <SheetHeader>
            <SheetTitle>Menu</SheetTitle>
            <SheetDescription></SheetDescription>
            <div>options</div>
          </SheetHeader>
        </SheetContent>
      </Sheet>
      <div className=" max-md:hidden">{menuOpt}</div>
    </div>
  );
};
export default SideBar;
