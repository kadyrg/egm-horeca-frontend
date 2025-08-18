import { AdminSidebar } from "@/components/admin/layout/admin-sidebar";
import { SidebarProvider } from "@/components/admin/ui/sidebar";
import AdminStoreProvider from "@/store/admin-store-provider";

export default async function Layout({ children } : { children: React.ReactNode }) {
  return (
    <AdminStoreProvider>
      <SidebarProvider>
        <AdminSidebar />
        <main className="w-full p-3 sm:p-[14px] md:p-4 lg:p-[18px] xl:p-5 flex flex-col gap-3 h-screen overflow-hidden">
          {children}
        </main>
      </SidebarProvider>
    </AdminStoreProvider>
  );
};
