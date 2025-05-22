import CustomSideBar from "@/components/CustomSideBar";
import { SidebarProvider } from "@/components/ui/sidebar";
import React from "react";

const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
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
