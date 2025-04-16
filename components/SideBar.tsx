"use client";

import { usePathname } from "next/navigation";
import React, { useState } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
} from "./ui/sidebar";
import { adminSidebarLinks } from "@/constants";
import Link from "next/link";
import Image from "next/image";
import { ChevronDown, LogOut } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@radix-ui/react-collapsible";

const AdminSideBar = () => {
  const pathname = usePathname();

  const [open, setOpen] = useState(false);

  const handleClick = (label: string) => {
    console.log("Clicked:", label);
    setOpen(false);
  };

  return (
    <Sidebar>
      <SidebarHeader className="h-21 mx-3 cursor-pointer bg-[#FDFFFC]">
        <Link
          rel="stylesheet"
          href="/admin"
          className="flex items-center h-full w-auto"
        >
          <Image src="/logo.svg" width={40} height={40} alt="Logo" />
        </Link>
      </SidebarHeader>
      <SidebarContent className="bg-[#FDFFFC]">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="flex flex-col gap-2">
              {adminSidebarLinks.map((item, index) => {
                const isActive = pathname === item.route;

                return index === 1 ? (
                  <SidebarMenu key={item.label}>
                    <Collapsible
                      open={open}
                      onOpenChange={setOpen}
                      className="group/collapsible"
                    >
                      <SidebarMenuItem>
                        <CollapsibleTrigger asChild>
                          <SidebarMenuButton className="h-12 p-3 font-semibold hover:bg-[#e5e5e592] cursor-pointer">
                            <div className="relative size-6">{item.icon}</div>
                            {item.label}
                            <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                          </SidebarMenuButton>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          <SidebarMenuSub className="gap-2 font-medium">
                            {item.dropdownOptions?.map((dropdown) => (
                              <Link
                                onClick={() => handleClick(dropdown.label)}
                                key={dropdown.label}
                                href={dropdown.route}
                                className="bg-white p-2 hover:bg-[#e5e5e592] rounded-[8px]"
                              >
                                {dropdown.label}
                              </Link>
                            ))}
                          </SidebarMenuSub>
                        </CollapsibleContent>
                      </SidebarMenuItem>
                    </Collapsible>
                  </SidebarMenu>
                ) : (
                  <SidebarMenuItem key={item.label}>
                    <SidebarMenuButton
                      asChild
                      className={
                        isActive
                          ? "hover:bg-[#17876E] hover:text-[#FDFFFC]"
                          : "hover:bg-[#e5e5e592] hover:text-black"
                      }
                    >
                      <Link
                        href={item.route}
                        className={`flex gap-2.5 p-3 h-12 rounded-lg transition font-semibold ${
                          isActive ? "bg-[#17876E] text-[#FDFFFC]" : ""
                        }`}
                      >
                        <div className="relative size-6">{item.icon}</div>
                        {item.label}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <Link
          href="/login"
          key="Log Out"
          className="flex gap-2.5 p-3 mb-5 rounded-lg transition font-semibold text-[#F05151]"
        >
          <div className="relative size-6">
            <LogOut />
          </div>
          <p>Log Out</p>
        </Link>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AdminSideBar;
