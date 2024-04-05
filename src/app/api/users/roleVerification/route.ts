import jwt, { JwtPayload } from 'jsonwebtoken';
import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/dbConfig/dbConfig';

export async function GET(request : NextRequest) {
    try {
        // // Retrieve cookie
        // const token = request.headers.get('cookie')?.split('; ').find((cookie) => cookie.startsWith('token='))?.substring('token='.length);

        // // Verify existence of cookie
        // if(!token) {
        //     return NextResponse.json({error: 'Login token does not exist'}, {status: 460});
        // }

        // // Verify the token and get the decoded user data
        // const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET!) as JwtPayload;
        
        // // Verify the admin status
        // if(!decodedToken.isAdmin) {
        //     return NextResponse.json({error: 'User is not an admin'}, {status: 461});
        // }
        

        const { data: { user }, error} = await supabase.auth.getUser()
        
        if(error) {
            return NextResponse.json({
                message: `Verification failed: ${error.message}`,
                success: false,
            });
        }
        else if(user?.role != 'authenticated') {
            return NextResponse.json({
                message: `Verification failed: User is not authenticated`,
                success: false,
                role: false,
            });
        }

        // Return successful verification
        const response = NextResponse.json({
            message: 'Verification successful',   
            success: true,
            role: user?.role,
        });

        return response;
    } 
    catch (error : any) {
        // Token is invalid or expired
        return NextResponse.json({error: error.message}, {status: 560});
    }
}