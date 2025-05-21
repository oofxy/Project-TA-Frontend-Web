import Header from "@/components/Header";
import React from "react";
import CustomDialog from "./CustomDialog";

const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="flex flex-col h-full">
      <CustomDialog />
      <div className="w-full h-full bg-[#CDF9EF] rounded-3xl p-6">
        {children}
      </div>
    </div>
  );
};

export default layout;
