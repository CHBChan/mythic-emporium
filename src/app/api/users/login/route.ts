import { MongoConnect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

MongoConnect();

export async function POST(request : NextRequest) {
    try{
        const reqBody = await request.json();
        const { username, password } = reqBody;

        const user = await User.findOne({username});

        if(!user) {
            return NextResponse.json({error: "User does not exist"}, {status: 400});
        }

        const validPassword = await bcryptjs.compare(password, user.password);

        if(!validPassword) {
            return NextResponse.json({error: "Password is incorrect"}, {status: 400});
        }

        const tokenData = {
            id: user._id,
            username: user.username
        }

        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {expiresIn: '1h'});

        const response = NextResponse.json({
            message: 'Login successful',
            success: true
        });

        response.cookies.set("token", token, {
            httpOnly: true
        });

        return response;
    }
    catch(error : any) {
        return NextResponse.json({error: error.message}, {status: 500});
    }
}