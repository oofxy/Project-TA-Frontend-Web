"use client"

import SearchInput from "@/components/SearchInput";
import { Button } from "@/components/ui/button";
import React from "react";

const CustomDialog = () => {
  return (
    <div className="flex justify-between px-5 pb-6 pt-2">
      <SearchInput/>
      <Button className="bg-gray-400">Add Data</Button>
    </div>
  );
};

export default CustomDialog;
