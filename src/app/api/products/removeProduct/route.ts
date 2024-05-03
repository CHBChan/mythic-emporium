import { NextRequest, NextResponse } from "next/server";
import Product from "@/models/productModel";

import { createClient } from "@/utils/supabase/server";

export async function POST(request : NextRequest) {
    try{
        const supabase = createClient();

        const reqBody = await request.json();
        const { product_id} = reqBody
        
        const productRef = {
            product_category: '',
            product_brand: '',
            product_origin: '',
        }

        try {
            const { data, error } = await supabase
                .from('Inventory')
                .delete()
                .eq('product_id', product_id)
                .select(`
                    product_category,
                    product_brand,
                    product_origin
                `)

                if(error) {
                    console.log(`Error deleting product: ${error.message}`);
                    return NextResponse.json({
                        message: `Product delete failed: ${error.message}`,
                        success: false,
                    });
                }

                if(data.length > 0) {
                    productRef.product_category = data[0].product_category;
                    productRef.product_brand = data[0].product_brand;
                    productRef.product_origin = data[0].product_origin;
                }
        }
        finally {}

        //check if there are ANY products with deleted_product's category/brand/origin
        try {
            const { data, error } = await supabase
                .from('Inventory')
                .select()
                .eq('product_category', productRef.product_category)

            if (error) {
                console.log(`Error fetching products in Inventory of deleted product category type : ${error.message}`);
                return NextResponse.json({
                    message: `Error fetching products in Inventory of deleted product category type : ${error.message}`,
                    success: false,
                });
            }
            //if no products found
            if (data.length === 0) {
                const { error: error1 } = await supabase
                    .from('Categories')
                    .delete()
                    .eq('product_category', productRef.product_category)

                if(error1) {
                    console.log(`Error deleting non-existent category after product deletion: ${error1.message}`);
                    return NextResponse.json({
                        message: `Error deleting non-existent category after product deletion: ${error1.message}`,
                        success: false,
                    });
                }
            }
        }
        finally {}

        
        try {
            const { data, error } = await supabase
                .from('Inventory')
                .select()
                .eq('product_brand', productRef.product_brand)

            if (error) {
                console.log(`Error fetching products in Inventory of deleted product brand type : ${error.message}`);
                return NextResponse.json({
                    message: `Error fetching products in Inventory of deleted product brand type : ${error.message}`,
                    success: false,
                });
            }

            //if no data for product_id found
            if (data.length === 0) {
                const { error: error1 } = await supabase
                    .from('Brands')
                    .delete()
                    .eq('product_brand', productRef.product_brand)

                if(error1) {
                    console.log(`Error deleting brand after deletion: ${error1.message}`);
                    return NextResponse.json({
                        message: `Product post-delete brand delete failed: ${error1.message}`,
                        success: false,
                    });
                }
            }
        }
        finally {}

        try {
            const { data, error } = await supabase
                .from('Inventory')
                .select()
                .eq('product_origin', productRef.product_origin)

            if (error) {
                console.log(`Error fetching products in Inventory of deleted product origin type: ${error.message}`);
                return NextResponse.json({
                    message: `Error fetching products in Inventory of deleted product origin type: ${error.message}`,
                    success: false,
                });
            }

            //if no data for product_id found
            if (data.length === 0) {
                const { error: error1 } = await supabase
                    .from('Origins')
                    .delete()
                    .eq('product_origin', productRef.product_origin)

                if(error1) {
                    console.log(`Error deleting non-existent origin after product deletion: ${error1.message}`);
                    return NextResponse.json({
                        message: `Error deleting non-existent origin after product deletion: ${error1.message}`,
                        success: false,
                    });
                }
            }
        }
        finally {}          

        return NextResponse.json({
            message: "Product removed successfully",
            success: true
        });
    }
    catch(error : any) {
        return NextResponse.json({error: error.message}, {status: 520});
    }
}