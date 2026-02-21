import { redis } from "@/lib"
import { nanoid } from "nanoid"
import { NextRequest, NextResponse } from "next/server"

export const proxy = async (req: NextRequest) => {
    const pathname = req.nextUrl.pathname
    const roomMatch = pathname.match(/^\/room\/([^/]+)$/)

    if(!roomMatch) return NextResponse.redirect(new URL("/", req.url))

    const roomId = roomMatch[1]
    const meta = await redis.hgetall<{connected: string[], createdAt: number}>(`meta:${roomId}`)

    if(!meta) {
        return NextResponse.redirect(new URL("/?error=room-not-found", req.url))
    }

    const response = NextResponse.next()
    const token = nanoid()

    response.cookies.set("x-auth-token", token, {
        path: "/",
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict"
    })

    return response
}

export const config = {
    matcher: "/room/:path*"
}