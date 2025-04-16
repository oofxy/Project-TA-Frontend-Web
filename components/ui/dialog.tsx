"use client";

import * as React from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface DialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
}

const Dialog: React.FC<DialogProps> = ({ open, onOpenChange, children }) => {
  return (
    <div
      className={cn(
        "fixed inset-0 flex items-center justify-center z-50 transition-opacity",
        open ? "opacity-100 visible" : "opacity-0 invisible"
      )}
    >
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black opacity-30"
        onClick={() => onOpenChange(false)}
      ></div>

      {/* Modal Content */}
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-lg w-full z-50 relative">
        <button
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-900"
          onClick={() => onOpenChange(false)}
          title="Close"
        >
          <X className="w-5 h-5" />
        </button>
        {children}
      </div>
    </div>
  );
};

const DialogContent: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <div className="mt-4">{children}</div>;
};

const DialogHeader: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <div className="text-lg font-semibold border-b pb-2">{children}</div>;
};

const DialogTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <h2 className="text-xl font-bold">{children}</h2>;
};

const DialogFooter: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <div className="flex justify-end mt-4 space-x-2">{children}</div>;
};

export { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter };
