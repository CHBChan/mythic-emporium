import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function GET() {
    try{
        const supabase = createClient();
        
        const { error } = await supabase.auth.signOut();

        if(error) {
            console.error(`Sign-out error for supabase: ${error.message}`);
            return NextResponse.json({
                message: `Log out failed: ${error.message}`,
                success: false,
            })
        }

        const response = NextResponse.json({
            message: 'Log out successful',
            success: true
        });

        return response;
    }
    catch(error : any) {
        return NextResponse.json({error: error.message}, {status: 600});
    }
}