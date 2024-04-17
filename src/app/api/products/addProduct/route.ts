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
        // const productModel = dbConnection.model('Product', Product.schema);
        // const product = await Product.findOne({product_id});

        // if(!product) {
        //     console.log("Product_id does not exist, attempting to add product to database...");
            
        //     const newProduct = new productModel({
        //         product_id,
        //         product_name,
        //         product_desc,
        //         product_category,
        //         product_brand,
        //         product_origin,
        //         product_price,
        //         product_quantity
        //     });

        //     const savedProduct = await newProduct.save();
        
        // Check if product exists and if not it adds it in supabase
        try {
            const { data, error } = await supabase
                .from('Inventory')
                .select('id')
                .eq('name', product_name)
                .eq('brand', product_brand)
                .eq('origin', product_origin)

            if(error) {
                console.log(`Error inserting product: ${error.message}`);
                return NextResponse.json({
                    message: `Product fetch failed: ${error.message}`,
                    success: false,
                });
            }
            else if(data.length === 0) {
                const newProduct = {
                    name: product_name,
                    description: product_desc,
                    category: product_category,
                    brand: product_brand,
                    origin: product_origin,
                    price: product_price,
                    quantity: product_quantity,
                    image: product_image,
                    disclaimers: product_disclaimers
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