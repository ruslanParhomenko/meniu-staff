import AuthRedirect from "@/providers/AuthRedirect";
import GoogleButton from "@/components/buttons/GoogleButton";

export default function Home() {
  return (
    <AuthRedirect>
      <div className="flex items-center justify-center h-full">
        <GoogleButton />
      </div>
    </AuthRedirect>
  );
}
