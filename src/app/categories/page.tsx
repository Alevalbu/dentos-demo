import Categories from "../../components/Categories";
import CategoriesList from "../../components/CategoryList";
import CategoryClientProvider from "../../components/CategoryClientProvider";
import { getCategories } from "./services/categoryServices";



export default async function CategoriesPage()  {
  const categories = await getCategories();
  return (
    <CategoryClientProvider>
      <main className="flex flex-row">
        <Categories categories={categories} />
        <CategoriesList categoryList={categories} />
      </main>
    </CategoryClientProvider>
  );
};
