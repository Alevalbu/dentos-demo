'use client';
import { Category } from '@/types/category';
import React, {
    createContext,
    useState,
    useContext,
    ReactNode,
    Dispatch,
    SetStateAction
} from 'react';


interface CategoryContextType {
    selectedCategory: Category | null;
    setSelectedCategory: Dispatch<SetStateAction<Category | null>>;
    selectCategory: (category: Category) => void;
}

const defaultContextValue = {
    selectedCategory: null,
    setSelectedCategory: () => {},
    selectCategory: () => {}
  };

const CategoryContext = createContext<CategoryContextType>(defaultContextValue);

export const CategoryProvider: React.FC<{children: ReactNode}> = ({children}) => {
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

    const selectCategory = (category: Category) => {
        setSelectedCategory(category);
    }

    return (
        <CategoryContext.Provider  value={{selectedCategory, setSelectedCategory, selectCategory}}>
            {children}
        </CategoryContext.Provider>
    )
}

export const useCategoryContext = () => {
    return useContext(CategoryContext);
}