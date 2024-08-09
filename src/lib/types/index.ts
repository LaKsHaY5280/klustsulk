import { DocumentData } from "firebase/firestore";

export interface User {
  fullName: string;
  email: string;
  image: string;
}

export interface RoomDoc extends DocumentData {
  roomId: string;
  userId: string;
  role: "owner" | "editor";
  createdAt: number;
}
