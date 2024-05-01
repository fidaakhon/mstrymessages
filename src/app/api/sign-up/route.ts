import dbConnect from "@/lib/dbConfig";
import UserModel from "@/model/User";
import bcrypt from "bcryptjs";

import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";

export async function POST(request: Request) {
    await dbConnect();
    try {
        const { username, email, password } = await request.json();

        const existingUserVerificationByUsername = await
            UserModel.findOne(
                {
                    username,
                    isVerified: true
                });

        if (existingUserVerificationByUsername) {
            return Response.json({
                success: false,
                message: "Username is already taken"
            },
                { status: 400 });
        }

        const existingUserByEmail = await UserModel.findOne({ email });
        const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();

        if (existingUserByEmail) {
            return Response.json({
                success: false,
                message: "Email is already taken"
            },
                { status: 400 });
        } else {
            const hashedPassword = await bcrypt.hash(password, 10);
            const expiryDate = new Date();
            expiryDate.setHours(expiryDate.getHours() + 1);

            const newUser = new UserModel({
                username,
                email,
                password: hashedPassword,
                verifyCode,
                verifyCodeExpiry: expiryDate,
                isVerified: false,
                isAcceptingMessage: true,
                messages: []
            });

            await newUser.save();
        }

        // Send verification email
        const emailResponse = await sendVerificationEmail(
            email,
            username,
            verifyCode
        );

        if (!emailResponse.success) {
            return Response.json({
                success: false,
                message: "Error sending verification email"
            },
                { status: 500 });
        }

        return Response.json({
            success: true,
            message: "User registered successfully, Please verify your email"
        },
            { status: 200 });

    } catch (error) {
        console.error("Error registering user", error);
        return Response.json({
            success: false,
            message: "Error registering user"
        },
            { status: 500 });
    }
}