import CategoryDetailsAction from "@/components/CategoryDetailsAction";
import CategoryHeader from "@/components/CategoryDetailsHeader";
import { getCategoryByID, getItemById } from "../services/categoryServices";

export default async function CategoryDetailsPage({params} : {params: {id: string}}) {
    const item = await getItemById(params.id);
    const category = await getCategoryByID(item.category_id);

    if (!item) {
        return (
            <h1 className="text-red-400 w-full h-dvh flex items-center justify-center">Could not read the category details, please try again later.</h1>
        )
    }

    return (
        <main className="ml-20">
            <CategoryHeader item={item} category={category}></CategoryHeader>
            <CategoryDetailsAction actions={item.actions}></CategoryDetailsAction>
        </main>
    )
}