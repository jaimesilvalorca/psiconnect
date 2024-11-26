import { Link } from "react-router-dom";
import { FaHome, FaCalendarAlt, FaUser } from "react-icons/fa";

import ProfesionalLogoutButton from "./ProfesionalLogoutButton";

export default function ProfesionalSidebar() {
  return (
    <aside className="w-72 bg-indigo-700 text-white flex flex-col justify-between">
      <div>
        <div className="p-6 border-b border-indigo-600">
          <h2 className="text-3xl font-bold">PsiConnect</h2>
          <p className="text-sm text-indigo-200">Gestión de Horarios</p>
        </div>
        <nav className="mt-6">
          <Link
            to="/inicio-profesional"
            className="flex items-center gap-4 w-full py-3 px-6 text-left text-lg transition-colors rounded-lg hover:bg-indigo-600 hover:text-indigo-200"
          >
            <FaHome className="text-lg" />
            Vista General
          </Link>
          <Link
            to="/citas-profesional"
            className="flex items-center gap-4 w-full py-3 px-6 text-left text-lg transition-colors rounded-lg hover:bg-indigo-600 hover:text-indigo-200"
          >
            <FaCalendarAlt className="text-lg" />
            Mis Citas
          </Link>
          <Link
            to="/profile-profesional"
            className="flex items-center gap-4 w-full py-3 px-6 text-left text-lg transition-colors rounded-lg hover:bg-indigo-600 hover:text-indigo-200"
          >
            <FaUser className="text-lg" />
            Mi Perfil
          </Link>
        </nav>
      </div>
      <ProfesionalLogoutButton />
    </aside>
  );
}
