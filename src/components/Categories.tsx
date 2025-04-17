'use client';
import { useCategoryContext } from '@/context/CategoryContext';
import { Category } from '@/types/category';
import React from 'react';

interface CategoriesProps {
  categories: Category[];
}

const Categories: React.FC<CategoriesProps> = ({ categories }) => {
    const { selectCategory } = useCategoryContext();
 
  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-3xl font-bold text-white mb-6">Categories</h1>
      <div className="border-l-2 border-gray-200">
        {categories.map((category) => (
          <a 
            onClick={() => selectCategory(category)} 
            key={category.id}
            className="block cursor-pointer py-4 pl-6 text-lg font-medium text-white hover:text-gray-300 transition-colors"
          >
            {category.name}
          </a>
        ))}
      </div>
    </div>
  );
};

export default Categories;