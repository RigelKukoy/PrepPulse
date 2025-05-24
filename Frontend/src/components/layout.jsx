"use client";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "@/components/AppSidebar";
import { Toaster } from "sonner";

function Layout({ children }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex flex-1">
        <SidebarTrigger className="fixed" />
        {children}
        <Toaster />
      </main>
    </SidebarProvider>
  );
}

export default Layout;
