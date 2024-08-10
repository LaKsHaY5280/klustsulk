"use client";
import { Button } from "@/components/ui/button";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";
import { useUser } from "@clerk/nextjs";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { usePathname } from "next/navigation";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { doc } from "firebase/firestore";
import { db } from "@/lib/firebase";

const Header = () => {
  const { user } = useUser();

  const path = usePathname();
  const segments = path.split("/");

  // if (segments.length < 1) return null;

  // useDocumentData(doc(db, "documents", segments[segments.length - 1]));

  return (
    <div className="flex h-20 w-full items-center justify-between p-5">
      {user && <h1 className="w-5/12 text-xl">Welcome, {user.fullName}</h1>}
      <Breadcrumb className="w-full">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          {segments.map((segment, index) => {
            if (!segment) return null;
            const isLast = index === segments.length - 1;

            return (
              <>
                <BreadcrumbSeparator />
                <BreadcrumbItem key={index}>
                  {isLast ? (
                    <BreadcrumbPage>{segment}</BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink
                      href={segments.slice(0, index + 1).join("/")}
                    >
                      {segment}
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>
              </>
            );
          })}
        </BreadcrumbList>
      </Breadcrumb>
      <div>
        <SignedOut>
          <Button>
            <SignInButton />
          </Button>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </div>
  );
};
export default Header;
