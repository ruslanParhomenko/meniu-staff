import SidebarNav from "@/features/nav/SidebarNav";
import { SidebarProvider } from "@/components/ui/sidebar";

const NavPage = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="flex w-full flex-col  bg-gray-50 ">
      <SidebarProvider>
        <SidebarNav />
        <section className="h-full w-full p-2 px-4">
          <div className="rounded-2xl bg-white py-4  px-2 ">{children}</div>
        </section>
      </SidebarProvider>
    </div>
  );
};

export default NavPage;
