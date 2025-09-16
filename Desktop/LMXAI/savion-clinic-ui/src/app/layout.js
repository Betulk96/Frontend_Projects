import "@/styles/index.css";

import { NotificationProvider } from "@/hook/NotificationContext";
import { UserInputProvider } from "@/hook/useUserInput";

export const metadata = {
  title: "Savion-Clinic",
  description: "Clinic Management System",
  icons: {
    icon: "/logo/logo-white.png", // PNG, ICO veya SVG olabilir
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <body>
        <UserInputProvider>
          <NotificationProvider>
            {children}
          </NotificationProvider>
        </UserInputProvider>
        
      </body>
    </html>
  );
}
