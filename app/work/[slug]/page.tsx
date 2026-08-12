"use client"

import { useParams } from "next/navigation"

export default function SingleWork(){
    const {slug} = useParams() as { slug: string }
    return (
        <div className="bg-work bg-neutral-950 text-neutral-50 h-dvh">
            <h1>HAI {slug}</h1>
        </div>
    )
}