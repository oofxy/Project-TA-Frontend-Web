import React from "react";

const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="flex flex-col h-full">
      <div className="h-[92%]">{children}</div>
    </div>
  );
};

export default layout;
