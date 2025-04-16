"use client";

import { usePathname } from "next/navigation";
import React from "react";
import { Button } from "./ui/button";
import { TextField } from "./ui/textfield";

const Header = () => {
  const pathname = usePathname();
  const isDataMaster = pathname.startsWith("/admin/data-master");

  return (
    <header className="h-[10%] top-0 flex justify-between items-center p-3">
      <TextField placeholder="Search" className="w-[100%]" type="text" />

      {isDataMaster && <Button className="bg-[#9E9E9E]">Add Data Master</Button>}
      {pathname === "/admin/register-user" && <Button className="bg-[#9E9E9E]">Add User</Button>}
    </header>
  );
};

export default Header;
