import ProfesionalSidebar from "@/components/profesional/ProfesionalSidebar";

import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";

export default function DashboardProfesionalLayout() {


  

  return (
    <div className="flex min-h-screen bg-gray-100">
      <ProfesionalSidebar />
      <div className="flex flex-col flex-grow">
        <main className="flex-grow p-10">
          <Outlet />
        </main>
      </div>
      <ToastContainer pauseOnHover={false} pauseOnFocusLoss={false} />
    </div>
  );
}
