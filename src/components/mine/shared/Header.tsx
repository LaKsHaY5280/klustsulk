"use client";
import { Button } from "@/components/ui/button";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";
import { useUser } from "@clerk/nextjs";

const Header = () => {
  const { user } = useUser();

  console.log(user);

  return (
    <div className=" flex justify-around bg-stone-9 items-center w-full p-5">
      {user && <h1 className=" text-3xl">Welcome, {user.fullName}</h1>}
      <div>Breadcrums</div>
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
