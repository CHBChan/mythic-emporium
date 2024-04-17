import { NextRequest, NextResponse } from "next/server";
import Product from "@/models/productModel";

import { dbConnection } from "@/utils/dbConfig";

export async function POST(request : NextRequest) {

    try{
        const reqBody = await request.json();
        const { product_id } = reqBody;

        const productModel = dbConnection.model('Product', Product.schema);
        const product = await productModel.findOne({product_id});
        
        if(!product) {
            return NextResponse.json({ Error: 'Product cannnot be found'}, {status: 430});
        }

        return NextResponse.json({
            message: "Product fetched successfully",
            success: true,
            product
        });
    }
    catch(error : any) {
        return NextResponse.json({error: error.message}, {status: 530});
    }
}