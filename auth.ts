import NextAuth, { AuthError } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { authFormSchema } from "./lib/zod";

export class CustomAuthError extends AuthError{
  constructor(msg: string) {
    super();
    this.message = msg;
    this.stack = undefined;
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  session: { strategy: "jwt" },
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
        // validate credentials
        const parsedCredentials = authFormSchema.safeParse(credentials);

        if (!parsedCredentials.success) {
          console.error("Invalid credentials", parsedCredentials.error.errors);
          return null;
        }

        //get user from database
        const { email, password } = parsedCredentials.data;

        try {
          const res = await fetch(`${process.env.API_URL}login`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email,
              password,
            }),
          });

          const user = await res.json();

          if (!res.ok) {
            console.error("Login failed", res.statusText);
            return null;
          }

          if (!user) {
            throw new CustomAuthError(
              "CredentialsSignin"
            );
          }

          return user;
        } catch (error: any) {}
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

    jwt({ token, user }) {
      if (user) {
        token.id = user.id as string;
      }
      return token;
    },

    session({ session, token }) {
      session.user.id = token.id;
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
});
