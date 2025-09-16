import RegisterPage from '@/components/register/RegisterPage'

import Image from 'next/image'
import React from 'react'

const Register = () => {
    return (
        <div className="relative w-full h-screen">
            {/* Background image */}
            <div className="absolute inset-0 -z-10">
                <Image
                    src="/background/bg2.jpeg"
                    alt="Background"
                    fill
                    className="object-cover opacity-80"
                />
            </div>

            {/* Login Page content */}
            <div className="relative z-10">
                <RegisterPage />
            </div>
        </div>
    )
}

export default Register
