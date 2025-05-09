"use client";

import { formStepLinks } from "@/constants";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function FormStep() {
  const pathname = usePathname();
  return (
    <div className="flex justify-center items-center gap-2 border rounded-md h-fit p-2">
      {formStepLinks.map((item) => {
        const isActive = pathname === item.route;
        return (
          <div
            key={item.label}
            className="flex items-center gap-2 z-10 w-fit bg-white"
          >
            <Link
              href={item.route}
              className={`flex justify-center items-center h-10 w-10 rounded-full ${
                isActive
                  ? "bg-[#17876E] text-white"
                  : "bg-gray-200 border-2 hover:border-[#17876E] text-gray-500"
              }`}
            >
              {item.icon}
            </Link>
            {isActive ? (
              <div>
                <p className="text-[14px] text-[#17876E]">{item.step}</p>
                <h1 className="font-semibold line-clamp-1 md:overflow-ellipsis">
                  {item.label}
                </h1>
              </div>
            ) : (
              ""
            )}
          </div>
        );
      })}
      <div className="absolute border bg-black w-60 z-0" />
    </div>
  );
}
