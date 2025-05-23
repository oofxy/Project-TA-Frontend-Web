import { FormContextProvider } from "@/app/features/onboarding/context";
import FormStep from "@/components/FormStep";
import React from "react";

const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="flex flex-col items-center w-screen">
      <nav className="flex flex-col gap-4 w-full items-center p-4 sticky top-0 bg-white">
        <FormStep />
      </nav>
      <FormContextProvider>
        <div className="flex justify-center w-screen">
          <div className="rounded-md w-2xl mx-4">{children}</div>
        </div>
      </FormContextProvider>
    </div>
  );
};

export default layout;
