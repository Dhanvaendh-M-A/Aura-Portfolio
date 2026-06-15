import { NextRequest, NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import Contact from "@/models/Contact"

export async function POST(request: NextRequest) {
  try {
    await connectDB()
    const body = await request.json()
    const contact = await Contact.create(body)
    return NextResponse.json(
      { success: true, message: "Message sent successfully!", data: contact },
      { status: 201 }
    )
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to send message" },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    await connectDB()
    const contacts = await Contact.find({}).sort({ createdAt: -1 })
    return NextResponse.json({ success: true, data: contacts }, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to fetch contacts" },
      { status: 500 }
    )
  }
}
