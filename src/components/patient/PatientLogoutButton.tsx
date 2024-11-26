import { FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function PatientLogoutButton() {
  const navigate = useNavigate();


  const handleLogout = () => {
    localStorage.removeItem('AUTH_TOKEN')
    localStorage.removeItem('USER')
    navigate("/patient/auth/login");

  };

  return (
    <button
      onClick={handleLogout}
      className="flex items-center gap-4 w-full py-3 px-6 text-left text-lg transition-colors bg-indigo-600 hover:bg-indigo-500"
    >
      <FaSignOutAlt className="text-lg" />
      Cerrar Sesión
    </button>
  );
}
