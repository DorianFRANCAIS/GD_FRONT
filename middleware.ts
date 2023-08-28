import { NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";
export { default } from "next-auth/middleware";

export const config = { matcher: ["/dashboard", "/agenda", "/establishments"] }

const allowedOrigins = process.env.NODE_ENV === 'production'
    ? ['https://www.test.com']
    : ['http://localhost:3000']

export function middleware(request: NextRequest) {
    const origin = request.headers.get('origin');
    const response = NextResponse.next();

    response.headers.set('Access-Control-Allow-Origin', "*")
    response.headers.set('Access-Control-Allow-Credentials', "true")
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')

    return response
}