import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="flex flex-col justify-between h-full w-full mt-2">
      <div className="flex flex-col gap-2 w-full">
        <Skeleton className="w-full h-10" />
        <Skeleton className="w-full h-[50px]" />
        <Skeleton className="w-full h-[50px]" />
        <Skeleton className="w-full h-[50px]" />
        <Skeleton className="w-full h-[50px]" />
        <Skeleton className="w-full h-[50px]" />
        <Skeleton className="w-full h-[50px]" />
        <Skeleton className="w-full h-[50px]" />
        <Skeleton className="w-full h-[50px]" />
        <Skeleton className="w-full h-[50px]" />
      </div>
      <Skeleton className="w-full h-10" />
    </div>
  );
}
