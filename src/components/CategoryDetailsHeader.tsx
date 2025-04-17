"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import InfoCard from "./UI/InfoCard";
import { Box, Building, Clock, Eye, User } from "lucide-react";
import { Category, ItemDetails } from "@/types/category";

type CategoryHeaderProps = {
  item: ItemDetails;
  category: Category;
};

const CategoryHeader: React.FC<CategoryHeaderProps> = ({ item, category }) => {
  const router = useRouter();
  return (
    <div className="w-full p-8 h-[360px] bg-gray-800">
      <button
        onClick={() => router.back()}
        className="border border-b-gray-600 rounded-lg text-white w-16 h-8"
      >
        Back
      </button>
      <div className="flex flex-row items-center justify-between h-[55%]">
        <div>
          {item && item.icon && (
            <Building />
          )}
          <h1>{item.name}</h1>
          <p className="w-[30vw] h-16 truncate">{item.description}</p>
        </div>
        <div className="p-4 border flex items-center border-b-blue-900 bg-blue-500 text-blue-800 rounded-lg h-9 text-center">
          {category.name}
        </div>
      </div>
      <div className="flex flex-row flex-wrap gap-4 justify-between mt-4 w-full">
        <InfoCard icon={<Eye />} label={"Total Views"} value={14500} />
        <InfoCard icon={<User />} label={"Active Users"} value={1450} />
        <InfoCard icon={<Box />} label={"Version"} value={"1.8.0"} />
        <InfoCard icon={<Clock />} label={"Last Update"} value={"10H ago"} />
      </div>
    </div>
  );
};

export default CategoryHeader;

/* <Image
              src={item.icon}
              alt={`${item.icon} for ${item.name}`}
              width={50}
              height={50}
            /> */