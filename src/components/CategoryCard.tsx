"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { CategoryItem } from "@/types/category";
import { useRouter } from "next/navigation";

type CategoryTypeProps = {
  item: CategoryItem;
};

const CategoryCardComponent: React.FC<CategoryTypeProps> = ({ item }) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const router = useRouter();

  function goToDetailPage() {
    router.push(`/categories/${item.id}`);
  }

  return (
    <div
      className="relative cursor-pointer w-full max-w-md bg-white rounded-lg shadow-md overflow-visible"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => goToDetailPage()}
    >
      <div className="flex items-center p-4 space-x-4">
        {item.icon && (
          <div className="w-12 h-12 rounded-lg overflow-hidden">
            <Image
              src={item.icon}
              alt={`${item.name} icon`}
              width={48}
              height={48}
              className="w-full h-full object-contain"
            />
          </div>
        )}
        <div className="flex-grow">
          <h3 className="text-lg font-semibold text-black">{item.name}</h3>
          <p className="text-gray-500 text-sm line-clamp-1">
            {item.description}
          </p>
        </div>

        <div className="w-6 h-6 text-gray-400">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
            />
          </svg>
        </div>
      </div>

      {item.tags && item.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 p-3">
          {item.tags.map((tag, i) => (
            <span
              key={i}
              className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      <AnimatePresence>
        {isHovered && (
          <motion.div
            className="absolute left-0 right-0 z-10 bg-white shadow-lg rounded-b-lg border border-gray-200"
            initial={{ opacity: 0, y: -20 }}
            animate={{ 
              opacity: 1, 
              y: 0 
            }}
            exit={{ 
              opacity: 0, 
              y: -10 
            }}
            transition={{ duration: 0.15 }}
            style={{ top: "100%" }}
          >
            <div className="p-4">
              <p className="text-gray-700 text-sm">{item.description}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CategoryCardComponent;