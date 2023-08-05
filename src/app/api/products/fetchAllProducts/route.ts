import { MongoConnect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import Product from "@/models/productModel";

MongoConnect();

export async function POST(request : NextRequest) {

    try{
        const products = await Product.find({});
        
        if(!products) {
            return NextResponse.json({ Error: 'There is no product in database'}, {status: 450});
        }

        return NextResponse.json({
            message: "Inventory fetched successfully",
            success: true,
            products
        })
    }
    catch(error : any) {
        return NextResponse.json({error: error.message}, {status: 550});
    }
}