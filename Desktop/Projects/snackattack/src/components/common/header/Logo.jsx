"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"

const Logo = () => {
    const router = useRouter()
    return (
        <div onClick={() => router.push('/')} className=" cursor-pointer">
            <Image
                src="/brand-no-bg.png"
                alt="logo"
                width={100}
                height={100}
            />
        </div>
    )
}

export default Logo
