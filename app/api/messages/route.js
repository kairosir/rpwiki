import { NextResponse } from "next/server";

let messages = [];

export async function GET() {
  return NextResponse.json(messages);
}

export async function POST(req) {
  const { content } = await req.json();
  const newMessage = { id: Date.now(), content };
  messages.push(newMessage);
  return NextResponse.json(newMessage);
}