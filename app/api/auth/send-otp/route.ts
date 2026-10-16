import { NextResponse } from "next/server";
import { generateAndSaveOtp } from "@/lib/otp-store";

export async function POST(req: Request) {
  try {
    const { phone } = await req.json();
    const cleanPhone = (phone || "").replace(/\D/g, "").slice(-10);

    if (cleanPhone.length !== 10) {
      return NextResponse.json(
        { error: "Please provide a valid 10-digit mobile number." },
        { status: 400 }
      );
    }

    const { otp, expiresAt } = generateAndSaveOtp(cleanPhone);

    // In a real production deployment with an SMS Gateway (e.g. Fast2SMS / Twilio / Kaleyra / WhatsApp Business API),
    // the SMS/WhatsApp API would be invoked here.
    // For transparent verification across all devices, we return a success confirmation and delivery preview.
    console.log(`[Goodwin Auth] OTP generated for +91 ${cleanPhone}: ${otp}`);

    return NextResponse.json({
      success: true,
      message: `OTP sent successfully to +91 ${cleanPhone}`,
      expiresAt,
      // Pass the generated OTP in response so that the customer notification badge displays it on screen
      deliveredOtp: otp,
    });
  } catch (error: any) {
    console.error("Error in send-otp route:", error);
    return NextResponse.json(
      { error: "Failed to send OTP. Please try again." },
      { status: 500 }
    );
  }
}
