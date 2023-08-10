import { NextRequest, NextResponse } from "next/server";
import Product from "@/models/productModel";

import { dbConnection } from "@/dbConfig/dbConfig";

export async function GET(request : NextRequest) {

    try{
        const productModel = dbConnection.model('Product', Product.schema);
        const products = await productModel.find({});

        const clientProducts = products.map((product) => ({
            product_id: product.product_id,
            product_name: product.product_name,
            product_desc: product.product_desc,
            product_category: product.product_category,
            product_brand: product.product_brand,
            product_origin: product.product_origin,
            product_price: product.product_price,
            product_quantity: product.product_quantity
        }));
        
        if(!products) {
            return NextResponse.json({ Error: 'There is no product in database'}, {status: 450});
        }

        return NextResponse.json({
            message: "Inventory fetched successfully",
            success: true,
            products: clientProducts
        });
    }
    catch(error : any) {
        return NextResponse.json({error: error.message}, {status: 550});
    }
}