import AuthRedirect from "@/components/AuthRedirect";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
<<<<<<< HEAD
import Image from "next/image";
=======
>>>>>>> c4fdd807280adf7e151205ca087ba6f9f6876486

export default function Home() {
  return (
    <AuthRedirect>
      <main className="flex h-full flex-col gap-20 pb-10">
        <div className="relative h-[40vh] w-full">
          <div className="bg-linear-to-t absolute inset-0 from-white via-transparent to-transparent" />
        </div>

        <div className="flex flex-col items-center gap-6 px-6 text-center">
          <Button
            className="w-full font-bold md:max-w-[40%] lg:max-w-[30%]"
            asChild
          >
<<<<<<< HEAD
            <Link href={"/api/auth/signin"}>Get Started</Link>
=======
            <Link href={"/signin"}>Get Started</Link>
>>>>>>> c4fdd807280adf7e151205ca087ba6f9f6876486
          </Button>
        </div>
      </main>
    </AuthRedirect>
  );
}
