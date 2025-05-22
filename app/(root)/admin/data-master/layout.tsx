import React from "react";

const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="h-[92%]">
      {children}
    </div>
  );
};

export default layout;
