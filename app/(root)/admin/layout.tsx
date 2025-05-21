"use client"

import CustomSideBar from "@/components/CustomSideBar";
import Header from "@/components/Header";
import { SidebarProvider } from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";
import React from "react";

const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const pathname = usePathname();

  if (pathname?.startsWith("/admin/data-karyawan/edit")) {
    return <>{children}</>;
  }

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full font-inter">
        <CustomSideBar />
        <div className="flex flex-col flex-1">
          <main className="flex-1 p-4">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default layout;
