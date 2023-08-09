import { MongoConnect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import Product from "@/models/productModel";

MongoConnect();

export async function POST(request : NextRequest) {
    try{
        const reqBody = await request.json();
        const { category, brand, origin, in_stock, minPrice, maxPrice } = reqBody;
        console.log(category, brand, origin);
        const filterQuery : any = {};

        if(category) {
            filterQuery.product_category = category;
        }

        if(brand && brand != 'All') {
            filterQuery.product_brand = brand;
        }

        if(origin && origin != 'All') {
            filterQuery.product_origin = origin;
        }

        filterQuery.product_price = {
            $gte: minPrice,
            $lte: maxPrice
        }

        filterQuery.product_quantity = in_stock? { $gt: 0 } : { $gte: 0 };

        const products = await Product.find(filterQuery);
        console.log(products);
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