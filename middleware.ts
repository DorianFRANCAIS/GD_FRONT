import { NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";
export { default } from "next-auth/middleware";

export const config = { matcher: ["/dashboard", "/agenda", "/establishments"] }

const allowedOrigins = process.env.NODE_ENV === 'production'
    ? ['https://www.test.com']
    : ['http://localhost:3000']

export function middleware(request: NextRequest) {

    const requestHeaders = new Headers(request.headers);
    const response = NextResponse.next({
        request: {
            headers: requestHeaders,
        },
    });

    const origin = requestHeaders.get('origin');
    if (origin && allowedOrigins.includes(origin)) {
        response.headers.set('Access-Control-Allow-Origin', origin)
        response.headers.set('Access-Control-Allow-Credentials', "true")
        response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
    }

    console.log("on passe ici dans le middleware")

    return response
}