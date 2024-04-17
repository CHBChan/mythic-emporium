import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function GET(request : NextRequest) {
    const supabase = createClient();

    try {
        const { data, error } = await supabase.auth.refreshSession();
        
        if(error) {
            console.log(`No session detected: ${error.message}`);
        }

        // Return fetched user info
        const response = NextResponse.json({
            message: 'User fetched successful',
            success: true,
            userData: data,
        });

        return response;
    } 
    catch (error : any) {
        // Token is invalid or expired
        return NextResponse.json({error: error.message}, {status: 570});
    }
}