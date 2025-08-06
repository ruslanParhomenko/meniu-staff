import SidebarNav from "@/features/nav/SidebarNav";
import { SidebarProvider } from "@/components/ui/sidebar";

const NavPage = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <SidebarProvider>
      <SidebarNav />

      <div className="flex w-full flex-col  bg-gray-50 ">
        <section className="h-full w-full p-2 px-4">
          <div className="rounded-2xl bg-white p-6 "> {children}</div>
        </section>
      </div>
    </SidebarProvider>
  );
};

export default NavPage;
