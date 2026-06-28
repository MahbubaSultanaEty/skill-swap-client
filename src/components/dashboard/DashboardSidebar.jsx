"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { Button, Drawer } from "@heroui/react";
import {
  LayoutGrid, ClipboardList, FilePlus, FileText,
  Users, CheckSquare, CreditCard,
  Briefcase, DollarSign, UserCircle, Menu,
  CircleArrowDown,
  Search,
} from "lucide-react";
import { SlDrawer } from "react-icons/sl";

const navMap = {
  client: [
    { icon: LayoutGrid, href: "/dashboard/client", label: "Overview" },
    { icon: FilePlus, href: "/dashboard/client/post-task", label: "Post a Task" },
    { icon: ClipboardList, href: "/dashboard/client/my-tasks", label: "My Tasks" },
    { icon: FileText, href: "/dashboard/client/proposals", label: "Proposals" },
  ],
  freelancer: [
    { icon: LayoutGrid, href: "/dashboard/freelancer", label: "Overview" },
    { icon: Search, href: "/dashboard/freelancer/tasks", label: "Tasks" },
    { icon: Briefcase, href: "/dashboard/freelancer/proposals", label: "My Proposals" },
    { icon: CheckSquare, href: "/dashboard/freelancer/active", label: "Active Projects" },
    { icon: DollarSign, href: "/dashboard/freelancer/earnings", label: "Earnings" },
    { icon: UserCircle, href: "/profile", label: "Edit Profile" },
  ],
  admin: [
    { icon: LayoutGrid, href: "/dashboard/admin", label: "Overview" },
    { icon: Users, href: "/dashboard/admin/users", label: "Manage Users" },
    { icon: ClipboardList, href: "/dashboard/admin/tasks", label: "Manage Tasks" },
    { icon: CreditCard, href: "/dashboard/admin/transactions", label: "Transactions" },
  ],
};

export default function DashboardSidebar({user}) {  
  const pathname = usePathname();
  const role = user?.role || "client";
  const navItems = navMap[role] || navMap.client;

  const userCard = (
    <div className="mb-4 rounded-2xl border p-3" style={{ borderColor: "#dcfce7", background: "#f0fdf4" }}>
      <div className="flex items-center gap-3">
        {user?.image ? (
          <img src={user.image} alt={user?.name} className="size-9 rounded-full object-cover" />
        ) : (
          <div className="flex size-9 items-center justify-center rounded-full text-sm font-bold text-white" style={{ background: "#15803d" }}>
            {user?.name?.[0]?.toUpperCase() ?? "U"}
          </div>
        )}
        <div className="min-w-0">
          <p className="truncate text-[13px] font-semibold" style={{ color: "#14532d" }}>{user?.name}</p>
          <p className="flex items-center gap-1 truncate text-[11px] capitalize" style={{ color: "#6b7280" }}>
            <CircleArrowDown size={11} /> {role} console
          </p>
        </div>
      </div>
    </div>
  );

  const navContent = (
    <nav className="flex flex-col gap-1 mt-2">
      {navItems.map(({ icon: Icon, href, label }) => {
        const active = pathname === href;
        return (
          <Link
            key={label}
            href={href}
            className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium no-underline transition-all duration-150"
            style={{
              background: active ? "#dcfce7" : "transparent",
              color: active ? "#15803d" : "#374151",
            }}
            onMouseEnter={(e) => { if (!active) e.currentTarget.style.background = "#f0fdf4"; }}
            onMouseLeave={(e) => { if (!active) e.currentTarget.style.background = "transparent"; }}
          >
            <Icon size={18} style={{ color: active ? "#15803d" : "#6b7280" }} />
            {label}
          </Link>
        );
      })}
    </nav>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="relative">
        <div className="hidden lg:block fixed top-16 w-64 h-[calc(100vh-64px)] shrink-0 border-r p-4 overflow-y-auto" style={{ borderColor: "#dcfce7", background: "#f8faf8" }}>
          {userCard}
          {navContent}
        </div>
      </aside>

      {/*  HeroUI Drawer  */}
      <Drawer>
        <Button
          className="lg:hidden fixed bottom-5 left-5 top-20 z-50 shadow-lg"
          style={{ background: "#15803d", color: "#fff", borderRadius: 12 }}
          size="sm"
        >
          <SlDrawer size={18} />
        </Button>
        <Drawer.Backdrop>
          <Drawer.Content placement="left">
            <Drawer.Dialog>
              <Drawer.CloseTrigger />
              <Drawer.Header>
                <Drawer.Heading className="mt-6">
                  {userCard}
                </Drawer.Heading>
              </Drawer.Header>
              <Drawer.Body>
                {navContent}
              </Drawer.Body>
            </Drawer.Dialog>
          </Drawer.Content>
        </Drawer.Backdrop>
      </Drawer>
    </>
  );
}