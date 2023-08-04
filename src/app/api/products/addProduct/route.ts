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

        if(!product) {
            console.log("Product_id does not exist, attempting to add product to database...");
            
            const newProduct = new Product({
                product_id,
                product_name,
                product_desc,
                product_category,
                product_brand,
                product_origin,
                product_price,
                product_quantity
            });

            const savedProduct = await newProduct.save();

            return NextResponse.json({
                message: "Product added successfully",
                success: true,
                savedProduct
            })
        }
    }
    catch(error : any) {
        return NextResponse.json({error: error.message}, {status: 500});
    }
}