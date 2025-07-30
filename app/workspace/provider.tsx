"use client";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { UserDetail, UserDetailContext } from "@/context/UserDetailContext";
import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import React, { useEffect, useState } from "react";
import { AppSidebar } from "./_components/app-sidebar";

interface WorkspaceProviderProps {
  children: React.ReactNode;
}

function WorkspaceProvider({ children }: WorkspaceProviderProps) {
  const newUserMutation = useMutation(api.users.CreateNewUser);
  const { user } = useUser();
  const [userDetail, setUserDetail] = useState<UserDetail | null>(null);

  useEffect(() => {
    if (!user) return;

    const createNewUser = async () => {
      const result = await newUserMutation({
        name: user?.fullName || user?.firstName || "Unknown User",
        email: user?.primaryEmailAddress?.emailAddress || "",
        picture: user?.imageUrl || "",
      });
      console.log("result", result);
      setUserDetail(result);
    };

    createNewUser();
  }, [user, newUserMutation]);

  return (
    <UserDetailContext.Provider value={{ userDetail, setUserDetail }}>
      <SidebarProvider>
        <AppSidebar />
        <div>
          <SidebarTrigger />
          {children}
        </div>
      </SidebarProvider>
    </UserDetailContext.Provider>
  );
}

export default WorkspaceProvider;
