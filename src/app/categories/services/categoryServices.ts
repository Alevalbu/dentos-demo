import { Category, ItemDetails } from "@/types/category";
import fs from "fs";
import path from "path";

export async function getCategories(): Promise<Category[]> {
  try {
    // Get the path to the JSON file
    const filePath = path.join(process.cwd(), "data", "categoryList.json");
    console.log("filepath", filePath);

    // Read the file
    const fileData = await fs.promises.readFile(filePath, "utf8");

    // Parse the JSON data
    const data = JSON.parse(fileData) as Category[];

    return data;
  } catch (error) {
    console.error("Error fetching member data:", error);
    return [];
  }
}

export async function getItemById(id: string): Promise<ItemDetails> {
    try {
        // Get the path to the JSON file
        const filePath = path.join(process.cwd(), "data", "item.json");
        console.log("filepath", filePath);
    
        // Read the file
        const fileData = await fs.promises.readFile(filePath, "utf8");
    
        // Parse the JSON data
        const data = JSON.parse(fileData) as Category[];
    
        return data;
      } catch (error) {
        console.error("Error fetching member data:", error);
        return [];
      }
}

export async function getCategoryByID(id: string): Promise<Category> {
    try {
        // Get the path to the JSON file
        const filePath = path.join(process.cwd(), "data", "categoryDetails.json");
        console.log("filepath", filePath);
    
        // Read the file
        const fileData = await fs.promises.readFile(filePath, "utf8");
    
        // Parse the JSON data
        const data = JSON.parse(fileData) as Category[];
    
        return data;
      } catch (error) {
        console.error("Error fetching member data:", error);
        return [];
      }
}
