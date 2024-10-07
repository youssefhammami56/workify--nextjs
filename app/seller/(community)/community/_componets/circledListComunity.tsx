"use client";
import { getAllCommunity } from "@/actions/get-all-community";
import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";
import { CategoryItemforComunty } from "./commItem";
import { DialogDemo } from "@/app/landingpage/createcommunitybtn";
import ComunityUserItem from "./comunity-users-item";
import ComunityListItem from "./comunity-list-items";
import { useEffect, useState } from "react";
import { categories } from "@/utils/categories";

interface CategoryItemProps {
  Comunitys: any;
}

export default function CategoriresForComuntiy({
  Comunitys,
}: CategoryItemProps) {
  const [filteredJobs, setFilteredJobs] = useState(Comunitys);
  const [category, setCategory] = useState("");

  useEffect(() => {
    if (category === "") {
      setFilteredJobs(Comunitys);
    } else {
      // @ts-ignore
      const filtered = Comunitys.filter((job) => job.category === category);
      setFilteredJobs(filtered);
    }
  }, [category, Comunitys]);

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value);
  };
  //   const Comunitys = await getAllCommunity();
  const pathname = usePathname();
  const comunityIdInthepathname = pathname.split("/")[3];
  const router = useRouter();

  const isSelected = comunityIdInthepathname;

  const onClick = () => {
    router.push(`/seller/community/${Comunitys[0].id}`);
  };

  return (
    <div className="flex  gap-x-2 overflow-auto pb-2 justify-between items-center  ">
      <div className="max-w-[1300px] flex  gap-x-2 overflow-auto pb-2 ">
        {filteredJobs.map((comunity: any) => (
          <CategoryItemforComunty comm={comunity} />
        ))}
      </div>
      <div className="ml-8 flex space-x-4 items-center">
        <DialogDemo />
        <div className="flex space-x-6">
          <label htmlFor="categories"></label>
          <select
            id="categories"
            className="bg-white border border-gray-300 text-blue-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w p-2 "
            name="category"
            value={category}
            onChange={handleCategoryChange}
          >
            <option value="">Choose a Category</option>
            {/* @ts-ignore */}
            {categories.map(({ name }) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
          {category && (
            <button
              onClick={() => setCategory("")}
              className="bg-sky-500 text-white px-3 py-1 rounded-md"
            >
              Clear
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
