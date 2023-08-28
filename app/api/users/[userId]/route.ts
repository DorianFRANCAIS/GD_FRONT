import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const session = searchParams.get('session');
    console.log(searchParams)
}