'use client';
import { useCategoryContext } from "@/context/CategoryContext";
import { Category } from "@/types/category";
import { useEffect, useRef } from "react";
import CategoryCardComponent from "./CategoryCard";

type CategoryListProps = {
  categoryList: Category[];
};
const CategoriesList: React.FC<CategoryListProps> = ({ categoryList }) => {
    const {selectedCategory} = useCategoryContext();
    const categoryRefs = useRef<{ [key: string]: HTMLDivElement} | null>({});

    useEffect(() => {
        if (selectedCategory && categoryRefs.current) {
          const selectedCategoryElement = categoryRefs.current[selectedCategory.id];
          
          if (selectedCategoryElement) {
            // Smooth scroll to the selected category
            selectedCategoryElement.scrollIntoView({ 
              behavior: 'smooth', 
              block: 'start' 
            });
          }
        }
      }, [selectedCategory]);
  return (
    <div className="w-[70%] p-5 mx-auto max-h-[90vh] overflow-y-auto">
      {categoryList.map((category: Category) => {
        return (
          <div key={category.id} className="mb-7" ref={(el) => {
            if (el && categoryRefs.current) {
              categoryRefs.current[category.id] = el;
            }
          }}>
            <div className="flex flex-row">
            <span className="mr-2 w-5 h-5 bg-gray-200 text-black text-xs flex flex-row justify-center items-center rounded-xs">{category.icon ? category.icon : ''}</span>
            <h1 className="text-white w-3xs">{category.name}</h1>
            </div>
            <p>{category.description ? category.description : ''}</p>
            <div className="h-auto grid grid-cols-3 gap-4 auto-rows-fr">
                {category.items && category.items.length > 0 && (
                    <>{category.items.map((item, i) => (<CategoryCardComponent key={i} item={item}/>))}
                </>)}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CategoriesList;
