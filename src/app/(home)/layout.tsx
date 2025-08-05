import Form from "@/components/Form";
import SidebarNav from "@/components/SidebarNav";
import { SidebarProvider } from "@/components/ui/sidebar";

const NavPage = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <SidebarProvider>
      <SidebarNav />

      <div className="flex w-full flex-col  bg-gray-50">
        <section className="h-full w-full p-2 pl-4">
          <div className="rounded-2xl bg-white p-6 ">
            {" "}
            <Form>{children}</Form>
          </div>
        </section>
      </div>
    </SidebarProvider>
  );
};

export default NavPage;
