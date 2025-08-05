import GoogleButton from "@/features/buttons/GoogleButton";
import { Link } from "lucide-react";

const Page = () => {
  console.log("id", process.env.GOOGLE_CLIENT_ID);
  return (
    <>
      <GoogleButton />
    </>
  );
};

export default Page;
