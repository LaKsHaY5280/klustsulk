import { adminDb } from "@/lib/firebase-admin";
import Liveblocks from "@/lib/Liveblocks";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  auth().protect();

  const { sessionClaims } = await auth();
  const { room } = await req.json();

  const session = Liveblocks.prepareSession(sessionClaims?.email!, {
    userInfo: {
      name: sessionClaims?.fullName!,
      email: sessionClaims?.email!,
      avatar: sessionClaims?.image!,
    },
  });

  const usersInRoom = await adminDb
    .collectionGroup("rooms")
    .where("userId", "==", sessionClaims?.email)
    .get();

  const userInroom = usersInRoom.docs.find((doc) => doc.id === room);

  if (userInroom?.exists) {
    session.allow(room, session.FULL_ACCESS);
    const { body, status } = await session.authorize();
    return new Response(body, { status });
  } else {
    return NextResponse.json(
      {
        message: "You are not allowed to access this room",
      },
      {
        status: 403,
      },
    );
  }
};
