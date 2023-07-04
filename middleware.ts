import { NextResponse } from "next/server";
export { default } from "next-auth/middleware";

export const config = { matcher: ["/dashboard", "/agenda", "/establishments"] }

const allowedOrigins = process.env.NODE_ENV === 'production'
    ? ['https://www.test.com']
    : ['http://localhost:3000']

export function middleware(request: Request) {

    const origin = request.headers.get("origin")
    console.log(origin)
    if (origin && !allowedOrigins.includes(origin)) {
        return new NextResponse(null, {
            status: 400,
            statusText: "Bad Request",
            headers: {
                "Content-Type": "text/plain",
            }
        })
    }

    console.log(request.method)
    console.log(request.url)



    return NextResponse.next()
}