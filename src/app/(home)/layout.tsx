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

      <div className="flex w-full flex-col">
        <section className="h-full w-full px-10 pt-10">
          <div className="rounded-none bg-white ">
            {" "}
            <Form>{children}</Form>
          </div>
        </section>
      </div>
    </SidebarProvider>
  );
};

export default NavPage;
