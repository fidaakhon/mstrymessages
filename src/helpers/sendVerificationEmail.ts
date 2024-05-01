import { resend } from "@/lib/resend";
import VerificationEmail from "../../emails/VerificationEmail";
import { ApiResponse } from "@/types/ApiResponse";
import { Resend } from 'resend';


export async function sendVerificationEmail(
    email: string,
    username: string,
    verifyCode: string
): Promise<ApiResponse> {
    const resend = new Resend('re_9Apk62mN_ELknYnupjDZ1REFtTktngvnq');
    try {
        await resend.emails.send({
            from: "onboarding@resend.dev",
            to: email,
            subject: "Verification Code",
            react: VerificationEmail({ username, otp: verifyCode }),
        });
        return {
            success: true,
            message: "Verification email sent",
        };
    } catch (emailError) {
        console.error("Failed to send verification email", emailError);
        return {
            success: false,
            message: "Failed to send verification email",
        };
    }
}