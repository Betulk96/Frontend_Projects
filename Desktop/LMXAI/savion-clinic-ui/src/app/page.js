import LoginPage from "@/components/login/LoginPage";
import Image from "next/image";

export default function Home() {
  return (
    <div className="relative w-full h-screen ">
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
        <LoginPage />
      </div>
    </div>
  );
}
