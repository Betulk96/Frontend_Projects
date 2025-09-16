"use client";

import Image from "next/image";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeLogo({ size = 40, ...props }) {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const src = theme === "dark" ? "/logo/logo-white.png" : "/logo/logo2-nobg.png";

  return (
    <Image
      src={src}
      alt="Logo"
      width={size}
      height={size}
      {...props}
    />
  );
}
