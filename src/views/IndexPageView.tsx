import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function IndexPageView() {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleSelection = (type: "patient" | "professional") => {
    setShowModal(false);
    if (type === "patient") {
      navigate("/patient/auth/login");
    } else {
      navigate("/profesional/auth/login");
    }
  };

  return (
    <div className="bg-gray-50">
      {/* Header */}
      <header className="bg-indigo-600 text-white py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <h1 className="text-3xl font-bold">PsiConnect</h1>
          <nav className="space-x-4">
            <a
              href="#features"
              className="hover:text-indigo-200 transition duration-200"
            >
              Características
            </a>
            <a
              href="#about"
              className="hover:text-indigo-200 transition duration-200"
            >
              Sobre Nosotros
            </a>
            <a
              href="#contact"
              className="hover:text-indigo-200 transition duration-200"
            >
              Contacto
            </a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-5xl font-extrabold text-gray-800 mb-6">
            Bienvenido a PsiConnect
          </h2>
          <p className="text-gray-600 text-lg mb-8">
            Tu plataforma confiable para gestionar horarios, citas y más.
          </p>
          <button
            onClick={() => setShowModal(true)}
            className="px-8 py-4 bg-indigo-600 text-white text-lg font-medium rounded-lg hover:bg-indigo-500 transition duration-200"
          >
            Comienza Ahora
          </button>
        </div>
      </section>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Selecciona tu Rol
            </h2>
            <div className="flex flex-col space-y-4">
              <button
                onClick={() => handleSelection("patient")}
                className="px-6 py-3 bg-indigo-600 text-white text-lg font-medium rounded-lg hover:bg-indigo-500 transition"
              >
                Soy Paciente
              </button>
              <button
                onClick={() => handleSelection("professional")}
                className="px-6 py-3 bg-green-500 text-white text-lg font-medium rounded-lg hover:bg-green-400 transition"
              >
                Soy Profesional
              </button>
            </div>
            <button
              onClick={() => setShowModal(false)}
              className="mt-4 text-gray-600 hover:underline"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}

      {/* Features Section */}
      <section id="features" className="bg-gray-100 py-16">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-gray-800 text-center mb-8">
            Características Clave
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <h4 className="text-xl font-bold text-indigo-600 mb-4">
                Gestión de Citas
              </h4>
              <p className="text-gray-600">
                Organiza tus citas de manera sencilla y eficiente.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <h4 className="text-xl font-bold text-indigo-600 mb-4">
                Comunicación Segura
              </h4>
              <p className="text-gray-600">
                Interactúa con tus pacientes de forma privada y protegida.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <h4 className="text-xl font-bold text-indigo-600 mb-4">
                Informes Personalizados
              </h4>
              <p className="text-gray-600">
                Genera informes detallados para optimizar tu trabajo.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="bg-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-3xl font-bold text-gray-800 mb-6">Sobre Nosotros</h3>
          <p className="text-gray-600 text-lg">
            En PsiConnect, estamos comprometidos con facilitar la vida de los
            profesionales de la salud mental mediante herramientas innovadoras y
            fáciles de usar.
          </p>
        </div>
      </section>


      <section id="contact" className="bg-gray-100 py-16">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-3xl font-bold text-gray-800 mb-6">Contáctanos</h3>
          <p className="text-gray-600 mb-8">
            ¿Tienes preguntas? Estamos aquí para ayudarte.
          </p>
          <a
            href="mailto:contacto@psiconnect.com"
            className="px-8 py-4 bg-indigo-600 text-white text-lg font-medium rounded-lg hover:bg-indigo-500 transition duration-200"
          >
            Escríbenos
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-indigo-600 text-white py-6">
        <div className="container mx-auto px-4 text-center">
          <p>
            &copy; {new Date().getFullYear()} PsiConnect. Todos los derechos
            reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}
