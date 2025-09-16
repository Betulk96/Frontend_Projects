import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { login } from "./services/auth-service";
import { getIsTokenValid, getIsUserAuthorized } from "./helpers/auth-helper.js";

const config = {
  providers: [
    Credentials({
      async authorize(credentials) {
        const res = await login(credentials);
        const data = await res.json();

        if (!res.ok) return null;
        const payload = {
          user: { ...data },
          // barear ile tokeni ayirdik
          //accessToken: data.token.split(" ")[1],
          accessToken: data.token,
        };
        delete payload.user.token;
        return payload;
      },
    }),
  ],
  callbacks: {  
    authorized({ auth, request }) {
		//console.log("authorized", auth, request);
      const { pathname } = request.nextUrl;
      const userRole = auth?.user?.role;

      const isLoggedIn = !!userRole;
      const isOnLoginPage = pathname.startsWith("/login");
      const isOnDashboardPages = pathname.startsWith("/dashboard");
      const isTokenValid = getIsTokenValid(auth?.accessToken);

      if (isLoggedIn && isTokenValid) {
        if (isOnDashboardPages) {
          const isUserAuthorized = getIsUserAuthorized(userRole, pathname);
          if (isUserAuthorized) return true;
          return Response.redirect(new URL("/unauthorized", request.nextUrl));
        } else if (isOnLoginPage) {
          return Response.redirect(new URL("/dashboard", request.nextUrl));
        }
      } else if (isOnDashboardPages) {
        return false;
      }

      return true;
    },
    // JWT datasina ihtiyac duyan her yerde
    async jwt({ token, user }) {
      //console.log("JWT", token, user);
      return { ...user, ...token };
    },
    // Session datasina ihtiyac duyan her yerde
    async session({ session, token }) {
      const isTokenValid = getIsTokenValid(token.accessToken);
      if (!isTokenValid) return null;

      session.accessToken = token.accessToken;
      session.user = token.user;

	  //console.log("session", session);
	  
      return session;
	
    },
  },
  pages: {
    signIn: "/login",
  },
  trustHost: true,
};

export const { handlers, auth, signIn, signOut } = NextAuth(config);