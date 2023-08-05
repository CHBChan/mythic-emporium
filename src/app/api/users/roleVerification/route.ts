import jwt, { JwtPayload } from 'jsonwebtoken';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request : NextRequest) {
    try {
        // Retrieve cookie
        const token = request.headers.get('cookie')?.split('; ').find((cookie) => cookie.startsWith('token='))?.substring('token='.length);

        // Verify existence of cookie
        if(!token) {
            return NextResponse.json({error: 'Login token does not exist'}, {status: 460});
        }

        // Verify the token and get the decoded user data
        const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET!) as JwtPayload;
        
        // Verify the admin status
        if(!decodedToken.isAdmin) {
            return NextResponse.json({error: 'User is not an admin'}, {status: 461});
        }

        // Return successful verification
        const response = NextResponse.json({
            message: 'Verification successful',
            success: true
        });

        return response;
    } 
    catch (error : any) {
        // Token is invalid or expired
        return NextResponse.json({error: error.message}, {status: 560});
    }
}