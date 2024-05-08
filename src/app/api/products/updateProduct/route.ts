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
        console.log(product_name);
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

            //check if new product category exists in category list
            const { data: newCategoryData, error: newCategoryError } = await supabase
                .from("Categories")
                .select()
                .eq("product_category", product_category)

            if(newCategoryError) {
                console.error('Search of new category in category list failed')
            }

            if(!newCategoryData || newCategoryData.length == 0) {
                const newCategory = {
                    product_category: product_category
                };

                const { error: newCategoryInsertError } = await supabase
                    .from("Categories")
                    .insert([newCategory]);

                if(newCategoryInsertError) {
                    console.error('Insert of new category failed');
                }
                else {
                    console.log(`Inserted new category: ${product_category}`);
                }
            }

            //check if new product brand exists in brand list
            const { data: newBrandData, error: newBrandError } = await supabase
                .from("Brands")
                .select()
                .eq("product_brand", product_brand)

            if(newBrandError) {
                console.error('Search of new category in category list failed')
            }

            if(!newBrandData || newBrandData.length == 0) {
                const newBrand = {
                    product_brand: product_brand
                };

                const { error: newBrandInsertError } = await supabase
                    .from("Brands")
                    .insert([newBrand]);

                if(newBrandInsertError) {
                    console.error('Insert of new brand failed');
                }
            }

            //check if new product origin exists in origin list
            const { data: newOriginData, error: newOriginError } = await supabase
                .from("Origins")
                .select()
                .eq("product_origin", product_origin)

            if(newOriginError) {
                console.error('Search of new origin in category list failed')
            }

            if(!newOriginData || newOriginData.length == 0) {
                const newOrigin = {
                    product_origin: product_origin
                };

                const { error: newOriginInsertError } = await supabase
                    .from("Origins")
                    .insert([newOrigin]);

                if(newOriginInsertError) {
                    console.error('Insert of new origin failed');
                }
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

            //removing category if no product with it exists
            try {
                const { data: category, error: categoryError } = await supabase
                .from("Inventory")
                .select()
                .eq("product_category", oldProductData[0].product_category);

                if (categoryError) {
                    return NextResponse.json({
                        message: `Category fetch failed: ${categoryError.message}`,
                        success: false,
                    });
                }

                if (category.length === 0) {
                const { error: removeProductCategoryError } = await supabase
                    .from("Categories")
                    .delete()
                    .eq("product_category", oldProductData[0].product_category);

                    if(removeProductCategoryError) {
                        return NextResponse.json({
                            message: `Category delete failed: ${removeProductCategoryError.message}`,
                            success: false,
                        });
                    }
                }
            } finally {}

            try {
                const { data: brand, error: brandError } = await supabase
                    .from("Inventory")
                    .select()
                    .eq("product_brand", oldProductData[0].product_brand);

                if(brandError) {
                    return NextResponse.json({
                        message: `Brand fetch failed: ${brandError.message}`,
                        success: false,
                    })
                }

                if(brand.length === 0) {
                    const { error: removeProductBrandError } = await supabase
                        .from("Brands")
                        .delete()
                        .eq("product_brand", oldProductData[0].product_brand);

                    if(removeProductBrandError) {
                        return NextResponse.json({
                            message: `Brand delete failed: ${removeProductBrandError.message}`,
                            success: false,
                        });
                    }
                }
            } finally {}

            try {
                const { data: origin, error: originError } = await supabase
                    .from("Inventory")
                    .select()
                    .eq("product_origin", oldProductData[0].product_origin);

                if(originError) {
                    return NextResponse.json({
                        message: `Origin fetch failed: ${originError.message}`,
                        success: false,
                    })
                }

                if(origin.length === 0) {
                    const { error: removeProductOriginError } = await supabase
                         .from("Origins")
                        .delete()
                        .eq("product_origin", oldProductData[0].product_origin);

                    if(removeProductOriginError) {
                        return NextResponse.json({
                            message: `Origin delete failed: ${removeProductOriginError.message}`,
                            success: false,
                        });
                    }
                }
            } finally {}

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
