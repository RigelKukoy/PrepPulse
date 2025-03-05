import { Calendar, Trash, User, LogOut, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

function AppSidebar() {
  const items = [
    {
      title: "Dashboard",
      url: "/",
      icon: Calendar,
    },
    {
      title: "Profile",
      url: "/profile",
      icon: User,
    },
    {
      title: "Trash",
      url: "/trash",
      icon: Trash,
    },
  ];
  return (
    <Sidebar
      className=" bg-slate-400 border-gray-200 shadow-xl"
      collapsible="icon"
    >
      <SidebarHeader className="p-1 mb-6 mt-2">
        <SidebarMenuButton>
          <div className="flex flex-row items-center">
            <Clock className="w-8 h-8 text-blue-500" />
            <h1 className="ml-2 font-bold text-lg sm:text-xl md:text-2xl">
              Prep Pulse
            </h1>
          </div>
        </SidebarMenuButton>
      </SidebarHeader>
      <SidebarContent className="px-1.5">
        <SidebarGroupLabel>Menu</SidebarGroupLabel>
        <SidebarGroupContent className="px-0">
          <SidebarMenu>
            {items.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  asChild
                  className="hover:rounded-xl hover:bg-slate-200 transition-all active:bg-slate-200"
                >
                  <Link to={item.url}>
                    <item.icon className="w-5 h-5" />
                    <span className="ml-2 pt-1">{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarContent>
      <SidebarFooter className="p-1.5">
        <SidebarMenuButton className=" hover:bg-red-300 hover:rounded-xl transition-all active:bg-red-400">
          <LogOut />
          <span>Logout</span>
        </SidebarMenuButton>
      </SidebarFooter>
    </Sidebar>
  );
}

export default AppSidebar;
