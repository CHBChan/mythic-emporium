import { MongoConnect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import Product from "@/models/productModel";

MongoConnect();

export async function POST(request : NextRequest) {
    try{
        const reqBody = await request.json();
        const { product_id, 
                product_name, 
                product_desc, 
                product_category,
                product_brand,
                product_origin, 
                product_price, 
                product_quantity } = reqBody;
        
        const product = await Product.findOne({product_id});

        if(product) {
            console.log("Product_id does exist, attempting to update product to database...");
            
            const updatedProduct = await Product.findOneAndUpdate(
                { product_id: product_id },
                {
                    product_name: product_name,
                    product_desc: product_desc,
                    product_category: product_category,
                    product_brand: product_brand,
                    product_origin: product_origin,
                    product_price: product_price,
                    product_quantity: product_quantity
                },
                { new: true }
            );

            return NextResponse.json({
                message: "Product updated successfully",
                success: true,
                updatedProduct
            })
        }
        return NextResponse.json({error: 'Product id does not exist?'}, {status: 440});
    }
    catch(error : any) {
        return NextResponse.json({error: error.message}, {status: 510});
    }
}