import NextAuth, { AuthError } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { authFormSchema } from "./lib/zod";

export class CustomAuthError extends AuthError {
  constructor(msg: string) {
    super();
    this.message = msg;
    this.stack = undefined;
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  session: {
    strategy: "jwt",
  },
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email", placeholder: "Email" },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Password",
        },
      },

      authorize: async (credentials) => {
        const parsedCredentials = authFormSchema.safeParse(credentials);

        if (!parsedCredentials.success) {
          console.log(
            "Zod validation failed:",
            parsedCredentials.error.format()
          );
          return null;
        }

        const { email, password } = parsedCredentials.data;

        try {
          const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
            credentials: "include",
          });

          if (!res.ok) {
            const errData = await res.json();
            console.error("Login failed:", errData.message);
            return null;
          }

          const data = await res.json();

          if (!res.ok || !data.access_token) {
            console.error("Login failed:", data.message || "No access token");
            return null;
          }

          return {
            id: data.user_id,
            name: data.name,
            email,
            accessToken: data.access_token,
            refreshToken: data.refresh_token,
          };
        } catch (e) {
          console.error("Login error caught:", e);
          return null;
        }
      },
    }),
  ],

  callbacks: {
    authorized({ request: { nextUrl }, auth }) {
      const { pathname } = nextUrl;
      const isLoggedin = !!auth?.user;

      if (pathname.startsWith("/login") && isLoggedin) {
        return Response.redirect(new URL("/admin", nextUrl));
      }
      return !!auth;
    },

    jwt({ token, user, trigger, session }) {
      if (user) {
        token.id = user.id || token.id;
        token.accessToken = user.accessToken || token.accessToken;
        token.refreshToken = user.refreshToken || token.refreshToken;
      }

      if (trigger === "update" && session?.user) {
        return {
          ...token,
          ...session.user,
        };
      }
      return token;
    },

    session({ session, token }) {
      session.user.id = token.id ?? "";
      session.accessToken = token.accessToken;
      session.user.refreshToken = token.refreshToken;
      return session;
    },
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
});
