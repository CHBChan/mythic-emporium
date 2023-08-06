import jwt, { JwtPayload } from 'jsonwebtoken';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request : NextRequest) {
    try {
        // Retrieve cookie
        const token = request.headers.get('cookie')?.split('; ').find((cookie) => cookie.startsWith('token='))?.substring('token='.length);

        // Verify existence of cookie
        if(!token) {
            return NextResponse.json({error: 'Login token does not exist'}, {status: 470});
        }

        // Verify the token and get the decoded user data
        const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET!) as JwtPayload;

        // Verify user info
        if(!decodedToken.id) {
            return NextResponse.json({error: 'User does not exist?'}, {status: 471});
        }

        // Construct user info
        const userInfo = {
            user_id: decodedToken.id,
            username: decodedToken.username
        };

        // Return fetched user info
        const response = NextResponse.json({
            message: 'User fetched successful',
            success: true,
            userInfo
        });

        return response;
    } 
    catch (error : any) {
        // Token is invalid or expired
        return NextResponse.json({error: error.message}, {status: 570});
    }
}