import { auth } from "@/auth";
import Navbar  from "./_components/navbar";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
// import { Sidebar } from "@/components/sidebar";

// import { EditTaskModal } from "@/features/tasks/components/edit-task-modal";
// import { CreateTaskModal } from "@/features/tasks/components/create-task-modal";
// import { CreateProjectModal } from "@/features/projects/components/create-project-modal";
// import { CreateWorkspaceModal } from "@/features/workspaces/components/create-workspace-modal";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = async ({ children }: DashboardLayoutProps) => {
  const headersList = await headers();
  const pathname = headersList.get('x-pathname');
  const session = await auth.api.getSession({
    headers: headersList,
  });
  const user = session?.user;


  if (pathname?.startsWith("/admin") && user?.role !== "ADMIN") {
    <div className="px-8 py-16 container mx-auto max-w-5xl space-y-8">
      <div className="space-y-4">
        {/* <ReturnHomeButton /> */}

        <h1 className="text-3xl font-bold">🔑 Admin Dashboard</h1>

        <p className="p-2 rounded-md text-lg bg-red-600 text-muted-100 font-bold">
          UNAUTHORIZED! You do not have permission to access this page.
        </p>
      </div>
    </div>;
  }

  // Esconde Navbar em qualquer rota que comece com /admin
  // const showNavbar = !pathname?.startsWith('/admin');

  // Proteção: apenas admins podem acessar /admin
  // if (pathname?.startsWith('/admin') && user?.role !== 'ADMIN') {
  //   redirect('/profile');
  // }

  // TODO: REFACTOR Navbar
  
  
  return (
    <div className="h-full pt-32 pb-4 w-full flex flex-col gap-y-6 items-center justify-center bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-sky-400 to-blue-800">
      {pathname?.startsWith("/admin") && user?.role !== "ADMIN" ? null : <Navbar user={user} />}
      
      {/* <Navbar user={user} />    */}
      {children}
    </div>
  );
};

export default DashboardLayout;