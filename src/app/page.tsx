import AuthRedirect from "@/providers/AuthRedirect";
import GoogleButton from "@/components/buttons/GoogleButton";

export default function Home() {
  return (
    <AuthRedirect>
      <div className="transform transition-all duration-700 flex flex-col justify-between items-center pt-80 ">
        <GoogleButton />
      </div>
    </AuthRedirect>
  );
}
