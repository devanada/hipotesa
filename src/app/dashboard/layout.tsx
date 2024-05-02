import Breadcrumbs from "@/components/breadcrumbs";
import Sidebar from "@/components/sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex w-full h-full">
      <Sidebar />
      <div className="w-full h-full p-6 space-y-3 overflow-auto">
        <Breadcrumbs />
        {children}
      </div>
    </div>
  );
}
