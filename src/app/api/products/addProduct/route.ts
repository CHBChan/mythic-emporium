import { connect } from "@/dbConfig/dbConfig";
import Product from "@/models/productModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(request : NextRequest) {
    try{
        const reqBody = await request.json();
        const { product_id, 
                product_name, 
                product_desc, 
                product_origin, 
                product_price, 
                product_quantity } = reqBody;
        
        const product = await Product.findOne({product_id});

        if(!product) {
            console.log("Product_id does not exist, attempting to add product to database...");
            
            const newProduct = new Product({
                product_id: product_id,
                product_name: product_name,
                product_desc: product_desc,
                product_origin: product_origin,
                product_price: product_price,
                product_quantity: product_quantity
            });

            const savedProduct = await newProduct.save();

            return NextResponse.json({
                message: "Product added successfully",
                success: true,
                savedProduct
            })
        }

        return NextResponse.json({error: "Product_id already exists"}, {status: 400});
    }
    catch(error : any) {
        return NextResponse.json({error: error.message}, {status: 500});
    }
}