"use client";
import { useSession } from "next-auth/react"

export default function Dashboard() {
    const { data: session } = useSession();
    console.log("session:", session)

    return (
        <div className="w-full flex flex-col justify-center items-center">
            <h1>Bienvenue {session?.user.user.firstname}</h1>
            <div className="flex w-full">
                Vous êtes sur le dashboard
            </div>
        </div>
    )
}