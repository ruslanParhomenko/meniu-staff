<<<<<<< HEAD
import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/login",
  },
});

export const config = {
  matcher: ["/protected"],
=======
export { default } from "next-auth/middleware";
export const config = {
  matcher: ["/", "/schedule", "/report", "/breakList", "/ordersList"],
>>>>>>> c4fdd807280adf7e151205ca087ba6f9f6876486
};
