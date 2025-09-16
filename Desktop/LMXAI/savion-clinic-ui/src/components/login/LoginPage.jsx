"use client";
import React, { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import Image from "next/image";
import Link from "next/link";
import { initialResponse } from "@/helpers/formValidation";
import eyeDefault from "/public/icons/eye/State=Default.svg";
import eyeDisabled from "/public/icons/eye/State=Dissabled.svg";
import { loginAction } from "@/actions/auth-action";
import SignInButton from "./SignInButton";
import { swalToast } from "@/helpers/alert/swal";

const LoginPage = () => {
    const [state, dispatch] = useFormState(loginAction, initialResponse);
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordEye, setShowPasswordEye] = useState(false);

    useEffect(() => {
        const queryParams = new URLSearchParams(window.location.search);
        const error = queryParams.get("error");
        if (error) {
            swalToast(error);
        }
    }, []);

    return (
        <div className="flex items-center justify-center min-h-screen px-4">
            <div className="w-full max-w-md p-8 shadow-lg rounded-2xl bg-white bg-opacity-10 border border-white/30 backdrop-blur-md">
                <div className="flex justify-center mb-6">
                    <Image
                        src="/logo/logo2-nobg.png"
                        alt="Logo"
                        width={150}
                        height={50}
                        priority
                    />
                </div>

                <form action={dispatch} noValidate className="space-y-6">
                    {!state?.success && state?.message && (
                        <div className="text-red-500 text-sm text-center">{state.message}</div>
                    )}

                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-color2 mb-1">
                            Username
                        </label>
                        <input

                            type="text"
                            id="username"
                            name="username"
                            placeholder="Enter your username"
                            className={`w-full p-3 border rounded-full bg-transparent focus:outline-none focus:ring-2 focus:ring-yellow-400 ${state?.errors?.username ? "border-red-500" : "border-white/40"
                                }`}
                        />
                        {state?.errors?.username && (
                            <p className="text-red-400 text-sm mt-1">{state.errors.username}</p>
                        )}
                    </div>

                    <div className="relative">
                        <label htmlFor="password" className="block text-sm font-medium text-color2 mb-1">
                            Password
                        </label>
                        <input
                            type={showPassword ? "text" : "password"}
                            id="password"
                            name="password"
                            placeholder="Enter your password"
                            className={`w-full p-3 pr-10 border rounded-full bg-transparent text-white focus:outline-none focus:ring-2 focus:ring-yellow-400 ${state?.errors?.password ? "border-red-500" : "border-white/40"
                                }`}
                            onKeyDown={() => setShowPasswordEye(true)}
                        />
                        {state?.errors?.password && (
                            <p className="text-red-400 text-sm mt-1">{state.errors.password}</p>
                        )}

                        {showPasswordEye && (
                            <Image
                                src={showPassword ? eyeDefault : eyeDisabled}
                                alt="Toggle Password Visibility"
                                width={25}
                                height={17}
                                onClick={() => setShowPassword((prev) => !prev)}
                                className="absolute right-3 top-10 cursor-pointer"
                            />
                        )}
                    </div>

                    {/*  <div className="text-right">
                        <Link href="/forgot-password" className="text-sm text-color4 underline hover:text-yellow-300">
                            Forgot password?
                        </Link>
                    </div>
 */}
                    <SignInButton />

                    <div className="flex items-center gap-2">
                        <div className="flex-grow border-t border-white/30"></div>
                        <span className="text-sm text-gray-700">or</span>
                        <div className="flex-grow border-t border-white/30"></div>
                    </div>

                    <div className="text-center text-sm text-color2">
                        Don&apos;t have an account?{" "}
                        <Link href="/register" className=" underline hover:text-color4">
                            Sign up
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
