import GoogleProvider from "next-auth/providers/google";
import type { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/signin",
  },
  callbacks: {
    async jwt({ token, user, account, profile }) {
      // при первом логине прокидываем email и роль
      if (user) {
        console.log("account :", user);
        token.email = user.email;

        // роль можно определить по email
        const admins = [
          "parhomenkogm@gmail.com",
          "cng.nv.rstrnt.mngr@gmail.com",
          "lavandavazat5@gmail.com",
        ];
        token.role = admins.includes(user.email ?? "") ? "admin" : "user";
      }

      console.log("token :", token);

      return token;
    },
    async session({ session, token }) {
      // прокидываем роль и email в session.user
      if (session.user) {
        session.user.email = token.email as string;
        (session.user as any).role = (token as any).role;
      }
      return session;
    },
  },
  debug: true,
};
