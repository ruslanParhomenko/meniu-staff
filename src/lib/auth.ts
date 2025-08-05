import GoogleProvider from "next-auth/providers/google";
import type { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
<<<<<<< HEAD
=======
  secret: process.env.NEXTAUTH_SECRET,
>>>>>>> c4fdd807280adf7e151205ca087ba6f9f6876486
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
<<<<<<< HEAD
=======
  pages: {
    signIn: "/signin",
  },
  debug: true,
>>>>>>> c4fdd807280adf7e151205ca087ba6f9f6876486
};
