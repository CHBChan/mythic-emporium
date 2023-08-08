import { MongoConnect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import Product from "@/models/productModel";

MongoConnect();

export async function GET(request : NextRequest) {

    try{
        const reqBody = await request.json();
        const { category, brand, origin, in_stock, minPrice, maxPrice } = reqBody;

        const filterQuery = {
            product_category: category,
            product_brand: brand,
            product_origin: origin,
            product_price: {
                $gte: minPrice,
                $lte: maxPrice
            },
            product_quantity: in_stock? { $gt: 0 } : { $gte: 0 },
        }

        const products = await Product.find(filterQuery);

        return NextResponse.json({
            message: "Filtered inventory fetched successfully",
            success: true,
            products
        })
    }
    catch(error : any) {
        return NextResponse.json({error: error.message}, {status: 580});
    }
}