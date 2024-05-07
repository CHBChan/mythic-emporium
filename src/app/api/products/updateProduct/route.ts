import { NextRequest, NextResponse } from "next/server";
import Product from "@/models/productModel";
import { createClient } from "@/utils/supabase/server";

export async function POST(request: NextRequest) {
    try {
        const supabase = createClient();

        const reqBody = await request.json();
        const {
            product_id,
            product_name,
            product_desc,
            product_category,
            product_brand,
            product_origin,
            product_price,
            product_quantity,
            product_image,
            product_disclaimers,
            } = reqBody;

        console.log(product_id);
        try {
            const updatedProduct = {
                product_id: product_id,
                product_name: product_name,
                product_desc: product_desc,
                product_category: product_category,
                product_brand: product_brand,
                product_origin: product_origin,
                product_price: product_price,
                product_quantity: product_quantity,
                product_image: product_image,
                product_disclaimers: product_disclaimers,
            };

            //getting old product data from database
            const { data: oldProductData, error: oldProductError } = await supabase
                .from("Inventory")
                .select("product_category, product_brand, product_origin")
                .eq("product_id", product_id);

            if (oldProductError) {
                return NextResponse.json({
                    message: `Fetching of product-to-be-updated failed: ${oldProductError.message}`,
                    success: false,
                    });
            }


            const { error } = await supabase
                .from("Inventory")
                .update([updatedProduct])
                .eq("product_id", product_id);

            if (error) {
                return NextResponse.json({
                message: `Product update failed: ${error.message}`,
                success: false,
                });
            }

            //updating category in database
            try {
                const { data: category, error: categoryError } = await supabase
                .from("Category")
                .select()
                .eq("product_category", oldProductData[0].product_category);

                if (categoryError) {
                    return NextResponse.json({
                        message: `Category fetch failed: ${categoryError.message}`,
                        success: false,
                    });
                }

                if (category.length === 0) {
                const { error: error1 } = await supabase
                    .from("Categories")
                    .delete()
                    .eq("product_category", oldProductData[0].product_category);
                }
            } finally {
            
            }

            return NextResponse.json({
            message: "Product updated successfully",
            success: true,
            });
        }
        finally {}
    }
    catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 510 });
    }
}
