import { NextResponse } from "next/server";
import { connectToDatabase } from "@/database/mongoose";

export async function GET() {
  try {
    await connectToDatabase();
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("DB ERROR:", error);   // prints what the error is
    return NextResponse.json({
      success: false,
      error: error.message,
    });
  }
}
