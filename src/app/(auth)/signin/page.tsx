import GoogleButton from "@/features/buttons/GoogleButton";

const Page = () => {
  console.log("id", process.env.GOOGLE_CLIENT_ID);
  return <GoogleButton />;
};

export default Page;
