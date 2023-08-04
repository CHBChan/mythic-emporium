import { MongoConnect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import Product from "@/models/productModel";

MongoConnect();

export async function POST(request : NextRequest) {
    try{
        const reqBody = await request.json();
        const { product_id } = reqBody;
        
        const product = await Product.findOne({product_id});

        if(!product) {
            return NextResponse.json({ Error: 'Product cannnot be removed because product_id does not exist...?'}, {status: 420});
        }

        try {
            console.log("Product_id does exist, attempting to remove product from database");
            await Product.deleteOne({ product_id: product_id });

            return NextResponse.json({
                message: "Product removed successfully",
                success: true
            })
        }
        catch(error : any) {
            return NextResponse.json({error: error.message}, {status: 421});
        }
    }
    catch(error : any) {
        return NextResponse.json({error: error.message}, {status: 520});
    }
}