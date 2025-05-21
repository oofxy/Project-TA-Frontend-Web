"use client";

import { formStepLinks } from "@/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

export default function FormStep() {
  const pathname = usePathname();

  return (
    <div className="relative flex justify-center items-center gap-2 border rounded-md h-fit p-2 bg-white shadow-sm">
      <div className="absolute h-[2px] bg-gray-200 top-1/2 -translate-y-1/2 w-[calc(100%-20px)] z-0" />

      {formStepLinks.map((item, index) => {
        const isActive = pathname === item.route;
        const isCompleted =
          formStepLinks.findIndex((link) => link.route === pathname) > index;

        return (
          <div
            key={item.label}
            className="flex items-center gap-2 z-10 w-fit bg-white"
            aria-current={isActive ? "step" : undefined}
          >
            <Link
              href={item.route}
              className={cn(
                "flex justify-center items-center h-10 w-10 rounded-full transition-all",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#17876E] focus-visible:ring-offset-2",
                isActive
                  ? "bg-[#17876E] text-white border-2 border-[#17876E]"
                  : isCompleted
                  ? "bg-green-100 border-2 border-green-500 text-green-700 hover:border-green-600"
                  : "bg-gray-100 border-2 border-gray-300 text-gray-500 hover:border-[#17876E]"
              )}
              aria-label={`Step ${index + 1}: ${item.label}`}
            >
              {isCompleted ? <Check className="h-5 w-5" /> : item.icon}
            </Link>

            {isActive && (
              <div className="hidden sm:block">
                <p className="text-xs text-[#17876E] font-medium">
                  {item.step}
                </p>
                <h2 className="font-semibold text-sm line-clamp-1">
                  {item.label}
                </h2>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path
        fillRule="evenodd"
        d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z"
        clipRule="evenodd"
      />
    </svg>
  );
}
