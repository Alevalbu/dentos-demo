import { ReactNode } from "react";

export interface Category {
    description: string;
    icon: string;
    id: string;
    item_count: number;
    items: Items[];
    name: string;
}

export interface Items {
    description: string;
    icon: string;
    id: string;
    name: string;
    tags: Array<string>;
}

export interface ItemDetails extends Items {
    category_id: string;
    downloads: number;
    active_users: number;
    version: string;
    last_updated: string;
    auth_schemes?: Array<scheme>;
    actions?: Array<Action>;
    documentation_url?: Array<any>;
}

export interface Action {
    name: string;
    description: string;
}

export interface scheme {
    description: string;
    mode: string;
    name: string;
}

export interface CategoryItem {
    id: string;
    icon?: string;
    name: string;
    description: string;
    tags: Array<string>;
}

export interface CategoryDetails {
    name: string;
    icon?: string;
    description: string;
    category: string;
    total_views: number;
    active_users: number;
    version: string;
    last_update: string;
}
