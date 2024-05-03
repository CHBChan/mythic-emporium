import { NextRequest, NextResponse } from "next/server";
import Product from "@/models/productModel";
import { createClient } from "@/utils/supabase/server";
import { productType } from "@/app/interface/interface";

export async function POST(request : NextRequest) {
    try{
        const supabase = createClient();

        const reqBody = await request.json();
        const { 
                product_name,
                product_desc,
                product_category,
                product_brand,
                product_origin,
                product_price,
                product_quantity,
                product_image,
                product_disclaimers
            } = reqBody;
        
        // Check if category exists and if not add it
        try {
            const { data, error } = await supabase
                .from('Categories')
                .select('product_id')
                .eq('product_category', product_category)

            if(error) {
                console.log(`Error inserting category: ${error.message}`);
                return NextResponse.json({
                    message: `Category fetch failed: ${error.message}`,
                    success: false,
                });
            }
            else if(data.length === 0) {
                const newCategory = {
                    product_category: product_category,
                };

                const { data, error } = await supabase
                    .from('Categories')
                    .insert([newCategory])

                if(error) {
                    return NextResponse.json({
                        message: `Category insert failed: ${error.message}`,
                        success: false,
                    });
                }
            }
            else {
                console.log(`${product_category} already exists in category table`);
            }
        }
        finally {}

        try {
            const {data, error } = await supabase
                .from('Brands')
                .select('product_id')
                .eq('product_brand', product_brand)


            if (error) {
                console.log(`Error inserting brand: `);
                return NextResponse.json({
                    message: `brand fetch failed: ${error.message}`,
                    success: false,
                });
            }
            else if(data.length === 0) {
                const newBrand = {
                    product_brand: product_brand,
                }
                
                const { data, error } = await supabase
                .from('Brands')
                .insert([newBrand])

                
                if(error) {
                    return NextResponse.json({
                        message: `Brand insert failed: ${error.message}`,
                        success: false,
                    });
                }
            }

            else {
                console.log(`${product_brand} already exists in brand table`);
            }

        }
        finally {}

        // Check if brand exists and if not add it
        try {
            const { data, error } = await supabase
                .from('Origins')
                .select('product_id')
                .eq('product_origin', product_origin)

            if(error) {
                console.log(`Error inserting origin: ${error.message}`);
                return NextResponse.json({
                    message: `Origin fetch failed: ${error.message}`,
                    success: false,
                });
            }
            else if(data.length === 0) {
                const newOrigin = {
                    product_origin: product_origin,
                };

                const { data, error } = await supabase
                    .from('Origins')
                    .insert([newOrigin])

                if(error) {
                    return NextResponse.json({
                        message: `Origin insert failed: ${error.message}`,
                        success: false,
                    });
                }
            }
            else {
                console.log(`${product_origin} already exists in origin table`);
            }
        }
        finally {}

        
        // Check if product exists and if not it adds it in supabase
        try {
            const { data, error } = await supabase
                .from('Inventory')
                .select('product_id')
                .eq('product_name', product_name)
                .eq('product_brand', product_brand)
                .eq('product_origin', product_origin)

            if(error) {
                console.log(`Error inserting product: ${error.message}`);
                return NextResponse.json({
                    message: `Product fetch failed: ${error.message}`,
                    success: false,
                });
            }
            else if(data.length === 0) {
                const newProduct = {
                    product_name: product_name,
                    product_desc: product_desc,
                    product_category: product_category,
                    product_brand: product_brand,
                    product_origin: product_origin,
                    product_price: product_price,
                    product_quantity: product_quantity,
                    product_image: product_image,
                    product_disclaimers: product_disclaimers
                };

                // Insert new product if no duplicate found in database
                const { data, error } = await supabase
                    .from('Inventory')
                    .insert([newProduct])
                    .select()

                if(error) {
                    return NextResponse.json({
                        message: `Product insert failed: ${error.message}`,
                        success: false,
                    });
                }
            }
            else if(data) {
                console.log(data);
            }
        }
        finally {}

        return NextResponse.json({
            message: "Product added successfully",
            success: true,
        });
        
    }
    catch(error : any) {
        return NextResponse.json({error: error.message}, {status: 510});
    }
}