import React from "react";

const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="w-full h-full bg-[#CDF9EF] rounded-3xl p-6">
      {children}
    </div>
  );
};

export default layout;
