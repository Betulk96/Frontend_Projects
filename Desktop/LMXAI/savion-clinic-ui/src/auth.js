import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { getIsTokenValid, parseJwt } from "./helpers/auth";
import { login } from "./services/auth-service";

const config = {
  trustHost: true,
  trustHostedDomain: true,
  providers: [
    Credentials({
      async authorize(credentials) {
        const res = await login(credentials);
        const data = await res.json();

        if (!res.ok) return null;

        return {
          accessToken: data.access,
          refreshToken: data.refresh,
          username: data.username,
          role: data.role,
          patient_id: data.patient_id,
          clinic_patient_id: data.clinic_patient_id,
          clinic_id: data.clinic_id,
        };
      },
    }),
  ],
  secret: process.env.AUTH_SECRET,
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isTokenValid = getIsTokenValid(auth?.accessToken);
      const userRole = auth?.user?.role;

      if (!isTokenValid) {
        const isProtectedPage =
          nextUrl.pathname.startsWith("/main") ||
          nextUrl.pathname.startsWith("/dashboard");

        if (isProtectedPage) {
          return Response.redirect(new URL("/", nextUrl));
        }
        return true;
      }

      const roleDashboardMap = {
        admin: "/dashboard/admin",
        dietitian: "/dashboard/dietitian",
        patient: "/main",
        clinic_patient: "/main",
        demo: "/main",
        test: "/main",
      };

      const allowedPath = roleDashboardMap[userRole];

      // Eğer /main sayfasına erişim varsa
      if (nextUrl.pathname.startsWith("/main")) {
        // admin VEYA dietitian değilse -> redirect
        if (userRole !== "admin" && userRole !== "dietitian") {
          return Response.redirect(new URL(allowedPath, nextUrl));
        }
      }

      // Eğer kullanıcı /dashboard root'undaysa, kendi paneline yönlendir
      if (nextUrl.pathname === "/dashboard") {
        return Response.redirect(new URL(allowedPath || "/main", nextUrl));
      }

      // Eğer kullanıcı başka bir role ait dashboard'a girmeye çalışıyorsa engelle
      if (
        nextUrl.pathname.startsWith("/dashboard") &&
        !nextUrl.pathname.startsWith(allowedPath)
      ) {
        return Response.redirect(new URL(allowedPath || "/main", nextUrl));
      }

      return true;
    },

    async jwt({ token, user }) {
      if (user?.accessToken) {
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
        token.username = user.username;
        token.role = user.role;
        token.patient_id = user.patient_id;
        token.clinic_patient_id = user.clinic_patient_id;
        token.clinic_id = user.clinic_id;
      }
      return token;
    },

    async session({ session, token }) {
      const isTokenValid = getIsTokenValid(token.accessToken);
      if (!isTokenValid) return null;

      session.accessToken = token.accessToken;
      const decoded = parseJwt(token.accessToken);
      session.user = decoded;

      return session;
    },
  },

  pages: {
    signIn: "/",
  },
};

export const { handlers, auth, signIn, signOut } = NextAuth(config);
