"use client";

import { cn } from "@/lib/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { IconType } from "react-icons";

import {
  FcBusiness,
  FcCalculator,
  FcCamera,
  FcBiotech,
  FcCurrencyExchange,
  FcDepartment,
  FcIdea,
  FcTimeline,
  FcReading,
} from "react-icons/fc";

interface CategoryItemProps {
  comm: any;
}

export const CategoryItemforComunty = ({ comm }: CategoryItemProps) => {
  const pathname = usePathname();
  const comunityIdInthepathname = pathname.split("/")[3];
  const router = useRouter();
  const searchParams = useSearchParams();
  const communtyIdwhenUrlcontainsPost =
    comunityIdInthepathname.split("post")[0];

  const isSelected = communtyIdwhenUrlcontainsPost === comm.id;
  const onClick = () => {
    router.push(`/seller/community/${comm.id}`);
  };
  return (
    <div key={comm.id} className="flex items-center gap-x-2">
      <button
        onClick={() => onClick()}
        className={cn(
          "py-2 px-6 text-sm border border-slate-200 rounded-full flex items-center gap-x-1 hover:border-sky-700 transition",
          isSelected && "border-sky-700 bg-sky-200/20 text-sky-700"
        )}
        type="button"
      >
        <div className="truncate"> {comm.title}</div>
      </button>
    </div>
  );
};
