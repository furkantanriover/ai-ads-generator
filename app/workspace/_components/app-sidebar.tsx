import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { SignedIn, SignedOut, UserButton, useUser } from "@clerk/nextjs";
import {
  CreditCard,
  LayoutDashboardIcon,
  LogOut,
  PlusIcon,
  Settings,
  User,
  Video,
  Videotape,
  WalletCards,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef } from "react";

const sidebarItems = [
  {
    label: "Dashboard",
    icon: <LayoutDashboardIcon className="w-4 h-4" />,
    path: "/workspace",
  },
  {
    label: "Create Ad",
    icon: <Video className="w-4 h-4" />,
    path: "/workspace/create-ad",
  },
  {
    label: "My Videos",
    icon: <Videotape className="w-4 h-4" />,
    path: "/workspace/my-videos",
  },
  {
    label: "Billing",
    icon: <WalletCards className="w-4 h-4" />,
    path: "/workspace/billing",
  },
  {
    label: "Settings",
    icon: <Settings className="w-4 h-4" />,
    path: "/workspace/settings",
  },
];

export function AppSidebar() {
  const { user } = useUser();
  const pathname = usePathname();
  const userButtonRef = useRef<HTMLDivElement>(null);

  const handleUserSectionClick = () => {
    // Programmatically trigger UserButton click
    const userButton = userButtonRef.current?.querySelector("button");
    if (userButton) {
      userButton.click();
    }
  };

  const isActiveRoute = (itemPath: string) => {
    return pathname === itemPath;
  };

  return (
    <Sidebar>
      <SidebarHeader className="mx-auto my-3 flex flex-row items-center gap-2">
        <Image src="/logo.svg" alt="logo" width={48} height={48} />
        <h1 className="text-2xl font-bold">AdGenie</h1>
      </SidebarHeader>
      <hr />
      <SidebarContent>
        <SidebarGroup className="flex flex-col gap-2 mt-5">
          <Button>
            <PlusIcon className="w-4 h-4" />
            Create New Ad Video
          </Button>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Applications</SidebarGroupLabel>
          <SidebarGroupContent className="space-y-1.5 py-2">
            <ul className="list-none space-y-1">
              {sidebarItems.map((item) => {
                const isActive = isActiveRoute(item.path);
                return (
                  <SidebarMenuItem key={item.label} className="list-none">
                    <SidebarMenuButton asChild>
                      <Link
                        href={item.path}
                        className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors duration-200 group w-full ${
                          isActive
                            ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-sm"
                            : "hover:bg-sidebar-accent text-sidebar-foreground"
                        }`}
                      >
                        <span
                          className={`w-4 h-4 ${
                            isActive
                              ? "text-sidebar-primary-foreground"
                              : "text-primary group-hover:text-primary"
                          }`}
                        >
                          {item.icon}
                        </span>
                        <span
                          className={`font-medium text-sm ${
                            isActive
                              ? "text-sidebar-primary-foreground font-semibold"
                              : "text-sidebar-foreground"
                          }`}
                        >
                          {item.label}
                        </span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </ul>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <div className="p-3 space-y-3">
          <div className="w-full">
            <ThemeToggle />
          </div>
          <div className="w-full">
            <SignedOut>
              <Button
                variant="outline"
                size="sm"
                className="w-full justify-start gap-2"
              >
                <User className="w-4 h-4" />
                <span>Anonymous</span>
              </Button>
            </SignedOut>
            <SignedIn>
              <div
                className="w-full border border-border rounded-md p-2 cursor-pointer hover:bg-sidebar-accent bg-sidebar-accent/50 transition-colors duration-200"
                onClick={handleUserSectionClick}
              >
                <div className="flex items-center gap-2">
                  <div ref={userButtonRef} className="flex-shrink-0">
                    <UserButton
                      appearance={{
                        elements: {
                          avatarBox: "w-6 h-6",
                        },
                      }}
                    >
                      <UserButton.MenuItems>
                        <UserButton.Action label="signOut" />
                        <UserButton.Link
                          label="Billing"
                          labelIcon={<CreditCard className="w-4 h-4" />}
                          href="/workspace/billing"
                        />
                        <UserButton.Link
                          label="Settings"
                          labelIcon={<Settings className="w-4 h-4" />}
                          href="/workspace/settings"
                        />
                        <UserButton.Action label="manageAccount" />
                      </UserButton.MenuItems>
                    </UserButton>
                  </div>
                  <div className="flex flex-col flex-1 min-w-0">
                    <span className="text-sm font-medium text-sidebar-foreground truncate">
                      {user?.fullName || user?.firstName || "User"}
                    </span>
                    <span className="text-xs text-muted-foreground truncate">
                      {user?.primaryEmailAddress?.emailAddress}
                    </span>
                  </div>
                </div>
              </div>
            </SignedIn>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
