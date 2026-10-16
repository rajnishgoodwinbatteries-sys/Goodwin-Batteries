import { NextResponse } from "next/server";
import { verifyCustomerOtp } from "@/lib/otp-store";

export async function POST(req: Request) {
  try {
    const { phone, otp, name } = await req.json();
    const cleanPhone = (phone || "").replace(/\D/g, "").slice(-10);
    const cleanOtp = (otp || "").replace(/\D/g, "").trim();

    if (cleanPhone.length !== 10) {
      return NextResponse.json(
        { error: "Please provide a valid 10-digit mobile number." },
        { status: 400 }
      );
    }

    if (!cleanOtp || cleanOtp.length !== 6) {
      return NextResponse.json(
        { error: "Please enter the complete 6-digit OTP code." },
        { status: 400 }
      );
    }

    const result = verifyCustomerOtp(cleanPhone, cleanOtp);

    if (!result.valid) {
      return NextResponse.json(
        { error: result.error || "Invalid OTP code entered." },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Mobile number verified successfully.",
      user: {
        phone: cleanPhone,
        name: (name || "").trim(),
        authenticatedAt: new Date().toISOString(),
      },
    });
  } catch (error: any) {
    console.error("Error in verify-otp route:", error);
    return NextResponse.json(
      { error: "Failed to verify OTP. Please try again." },
      { status: 500 }
    );
  }
}
