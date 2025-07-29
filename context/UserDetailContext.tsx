import { createContext } from "react";
import { Id } from "@/convex/_generated/dataModel";

export type UserDetail =
  | {
      _id: Id<"users">;
      _creationTime: number;
      name: string;
      email: string;
      picture: string;
      credits: number;
      paymentId?: string;
    }
  | {
      id: Id<"users">;
      name: string;
      email: string;
      picture: string;
      credits: number;
    };

export interface UserDetailContextType {
  userDetail: UserDetail | null;
  setUserDetail: (userDetail: UserDetail | null) => void;
}

export const UserDetailContext = createContext<UserDetailContextType | null>(
  null
);
