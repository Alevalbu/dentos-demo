'use client';

import { CategoryProvider } from "@/context/CategoryContext";
import { ReactNode } from "react";

export default function CategoryClientProvider({children} : {children: ReactNode}) {
    return (
        <CategoryProvider>
            {children}
        </CategoryProvider>
    );
}