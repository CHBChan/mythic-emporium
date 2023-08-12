import { NextRequest, NextResponse } from "next/server";
import Product from "@/models/productModel";

import { dbConnection } from "@/dbConfig/dbConfig";

export async function POST(request : NextRequest) {
    try{
        const reqBody = await request.json();
        const { searchQuery } = reqBody;
        
        const atlasSearch : any[] = [
            {
                $search: {
                    index: 'default',
                    text: {
                        query: searchQuery,
                        path: {
                            wildcard: '*'
                        }
                    }
                }
            },
        ];

        const productModel = dbConnection.model('Product', Product.schema);

        const products = await productModel.aggregate(atlasSearch);
        
        return NextResponse.json({
            message: "Searched query fetched successfully",
            success: true,
            products
        });
    }
    catch(error : any) {
        return NextResponse.json({error: error.message}, {status: 590});
    }
}