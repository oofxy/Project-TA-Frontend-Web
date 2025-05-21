"use client";

import React from "react";
import { Button } from "./ui/button";
import { TextField } from "./ui/textfield";
import { HeaderProps } from "@/types";


const Header = ({onClick, buttonLabel}: HeaderProps) => {
  return (
    <header className="top-0 flex justify-between items-center p-3">
      <TextField placeholder="Search" className="w-[100%]" type="text"/>
      <Button onClick={onClick} className="bg-gray-400">{buttonLabel}</Button>
    </header>
  );
};

export default Header;
