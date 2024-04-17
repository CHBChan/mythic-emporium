import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

import { dbConnection } from "@/utils/dbConfig";

export async function POST(request : NextRequest) {
    try{
        const reqBody = await request.json();
        const { username, password } = reqBody; 

        const userModel = dbConnection.model('User', User.schema);
        const user = await userModel.findOne({username});

        if(user) {
            return NextResponse.json({error: "Username already exists"}, {status: 400});
        }

        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        const newUser = new userModel({
            username,
            password: hashedPassword
        });

        const savedUser = await newUser.save();
        
        const tokenData = {
            id: savedUser._id,
            username: savedUser.username,
            isAdmin: savedUser.isAdmin
        };

        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {expiresIn: '1h'});

        const userInfo = {
            user_id: savedUser._id,
            username: savedUser.username,
            isAdmin: savedUser.isAdmin
        };

        const response = NextResponse.json({
            message: 'Registration successful',
            success: true,
            userInfo: userInfo
        });

        response.cookies.set("token", token, {
            httpOnly: true
        });

        return response;
    }
    catch(error : any) {
        return NextResponse.json({error: error.message},
        {status: 500});
    }
}