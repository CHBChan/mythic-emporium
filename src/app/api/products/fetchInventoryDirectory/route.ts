import { NextRequest, NextResponse } from "next/server";
import Product from "@/models/productModel";

import { createClient } from "@/utils/supabase/server";
import { brandsDirectory, categoriesDirectory, originsDirectory, productType, productsListType } from "@/app/interface/interface";

export async function POST(request : NextRequest) {
    const supabase = createClient();
    let inventoryProducts: productsListType = {};
    let inventoryCategories: categoriesDirectory = {};
    let inventoryBrands: brandsDirectory = {};
    let inventoryOrigins: originsDirectory = {};

    try{
        const { data, error } = await supabase
            .from('Inventory')
            .select()

        if(error) {
            return NextResponse.json({
                message: `Product fetch failed: ${error.message}`,
                success: false,
            });
        }

        if(data.length > 0) {
            data.forEach((productObject) => {
                inventoryProducts[productObject.product_id] = productObject;
            });
        }
    }
    catch(error : any) {
        return NextResponse.json({error: error.message}, {status: 550});
    }

    try {
        const { data, error } = await supabase
            .from('Categories')
            .select(`
                product_category,
                Inventory (
                    product_id,
                    product_name,
                    product_desc,
                    product_category,
                    product_brand,
                    product_origin,
                    product_price,
                    product_quantity,
                    product_image,
                    product_disclaimers
                )
            `)
 
        if(error) {
            return NextResponse.json({
                message: `Categories fetch failed: ${error.message}`,
                success: false,
            });
        }

        if(data.length > 0) {
            data.forEach((categoryObject) => {
                inventoryCategories[categoryObject.product_category] = categoryObject.Inventory;
            });
        }
    }
    catch(error: any) {
        return NextResponse.json({error: error.message}, {status: 550});
    }

    try {
        const { data, error } = await supabase
            .from('Brands')
            .select(`
                product_brand,
                Inventory (
                    product_id,
                    product_name,
                    product_desc,
                    product_category,
                    product_brand,
                    product_origin,
                    product_price,
                    product_quantity,
                    product_image,
                    product_disclaimers
                )
            `)

        if(error) {
            return NextResponse.json({
                message: `Brands fetch failed: ${error.message}`,
                success: false,
            });
        }

        if(data.length > 0) {
            data.forEach((brandObject) => {
                inventoryBrands[brandObject.product_brand] = brandObject.Inventory;
            });
        }
    }
    catch(error: any) {
        return NextResponse.json({error: error.message}, {status: 550});
    }

    try {
        const { data, error } = await supabase
            .from('Origins')
            .select(`
                product_origin,
                Inventory (
                    product_id,
                    product_name,
                    product_desc,
                    product_category,
                    product_brand,
                    product_origin,
                    product_price,
                    product_quantity,
                    product_image,
                    product_disclaimers
                )
            `)

        if(error) {
            return NextResponse.json({
                message: `Origins fetch failed: ${error.message}`,
                success: false,
            });
        }

        if(data.length > 0) {
            data.forEach((brandObject) => {
                inventoryOrigins[brandObject.product_origin] = brandObject.Inventory;
            });
        }
    }
    catch(error: any) {
        return NextResponse.json({error: error.message}, {status: 550});
    }
    
    return NextResponse.json({
        message: "Inventory fetched successfully",
        success: true,
        productsList: inventoryProducts,
        categoriesList: inventoryCategories,
        brandsList: inventoryBrands,
        originsList: inventoryOrigins,
    });
}