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
        const parsed = authFormSchema.safeParse(credentials);
        if (!parsed.success) {
          console.log("Zod validation failed:", parsed.error.format());
          return null;
        }
        const { email, password } = parsed.data;

        type LoginResponse = {
          access_token?: string;
          refresh_token?: string;
          user_id?: string | number;
          name?: string;
          message?: string;
        };

        const isLoginResponse = (obj: unknown): obj is LoginResponse => {
          return typeof obj === "object" && obj !== null;
        };

        try {
          const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
            // credentials: "include", // comment dulu kecuali kamu butuh cookie
          });

          const text = await res.text();
          let parsedJson: unknown;
          try {
            parsedJson = text ? JSON.parse(text) : {};
          } catch (err) {
            console.error("Auth API returned non-JSON response:", text);
            parsedJson = { message: text };
          }

          if (!isLoginResponse(parsedJson)) {
            console.error("Unexpected auth API response shape:", parsedJson);
            return null;
          }

          const data = parsedJson as LoginResponse;

          console.log("Auth API status:", res.status, "body:", data);

          if (!res.ok) {
            console.error(
              "Login failed:",
              data.message ?? `status ${res.status}`
            );
            return null;
          }

          if (!data.access_token) {
            console.error("Login succeeded but no access_token present:", data);
            return null;
          }

          return {
            id: String(data.user_id ?? ""),
            name: data.name ?? "",
            email,
            accessToken: data.access_token,
            refreshToken: data.refresh_token,
          };
        } catch (err) {
          console.error("Login error caught:", err);
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
