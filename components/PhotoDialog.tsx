"use client";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

interface PhotoDialogProps {
  open: boolean;
  onClose: () => void;
  imageUrl: string;
  title?: string;
}

export const PhotoDialog = ({ open, onClose, imageUrl }: PhotoDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogTitle className="text-center" />
      <DialogContent className="p-0 max-w-full w-fit h-screen flex items-center justify-center bg-white">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt="Bukti Absensi"
            className="object-contain max-w-full max-h-full"
          />
        ) : (
          <div className="p-8 text-center text-gray-500">
            Tidak ada gambar tersedia
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
