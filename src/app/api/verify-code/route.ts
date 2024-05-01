import dbConnect from "@/lib/dbConfig";
import UserModel from "@/model/User";


export async function POST(request: Request) {
    await dbConnect();

    try {
        const { username, code } = await request.json();
        decodeURIComponent(username)

        const user = await UserModel.findOne({ username })

        if (!user) {
            return Response.json({
                success: false,
                message: "User not found"
            }, { status: 404 })
        }

        const isCodeValid = user.verifyCode === code;
        const isCodeNotExpired = new Date(user.verifyCodeExpiry) > new Date();

        if (isCodeValid && isCodeNotExpired) {
            user.isVerified = true;
            await user.save();

            return Response.json({
                success: true,
                message: "User verified"
            })
        } else if (!isCodeValid) {
            return Response.json({
                success: false,
                message: "Invalid verification code"
            }, { status: 400 })
        } else {
            return Response.json({
                success: false,
                message: "Verification code has expired. Please signup again."
            }, { status: 400 })
        }


    } catch (error) {
        console.error("error verifying code ", error)
        return Response.json({
            success: false,
            message: "Error verifying code"
        }, { status: 500 })

    }
}