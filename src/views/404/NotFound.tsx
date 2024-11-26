import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-indigo-600 text-white">
      <h1 className="text-6xl font-extrabold mb-4">404</h1>
      <h2 className="text-3xl font-bold mb-6">Página No Encontrada</h2>
      <p className="text-lg text-center mb-6">
        La página que estás buscando no existe o ha sido movida.
      </p>
      <Link
        to="/"
        className="px-6 py-3 bg-white text-indigo-600 font-medium rounded-md shadow-md hover:bg-gray-200 transition duration-200"
      >
        Volver al Inicio
      </Link>
    </div>
  );
}
