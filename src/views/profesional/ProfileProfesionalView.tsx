import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";

interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  roles: string[];
  status: string;
  description?: string; // Descripción opcional
  createdAt: string;
  updatedAt: string;
}

export default function ProfileProfesionalView() {
  const queryClient = useQueryClient();
  const [showModal, setShowModal] = useState(false);

  // Invalidar la query al cargar el componente
  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ["userProfile"] });
  }, [queryClient]);

  const fetchProfile = async (): Promise<UserProfile> => {
    const user = JSON.parse(localStorage.getItem("USER_PROFESIONAL") || "{}");
    if (!user || !user.data?.id) {
      throw new Error("Usuario no encontrado en localStorage");
    }
    const response = await axios.get(
      `https://orc-mind-match.sliplane.app/v1/users/${user.data.id}`
    );
    return response.data.data;
  };

  const { data: profile, isFetching, error } = useQuery({
    queryKey: ["userProfile"],
    queryFn: fetchProfile,
    refetchOnWindowFocus: true, // Opcional: Refetch al enfocar la ventana
  });

  if (isFetching) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-indigo-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-center mt-20">
        <h2 className="text-2xl font-bold">Error al cargar el perfil</h2>
        <p>{(error as Error).message}</p>
      </div>
    );
  }

  const formatDate = (date: string | undefined): string => {
    if (!date) return "Fecha no disponible";
    return new Date(date).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="container mx-auto px-6 py-8">
      <h1 className="text-4xl font-bold text-gray-800 text-center mb-10">
        Mi Perfil
      </h1>
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="bg-indigo-600 text-white p-6">
          <h2 className="text-2xl font-bold">{`${profile?.firstName} ${profile?.lastName}`}</h2>
          <p className="text-sm">{profile?.email}</p>
        </div>
        <div className="p-6">
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              Información Personal
            </h3>
            <div className="flex items-center justify-between">
              <p className="text-gray-600">
                <span className="font-semibold">Estado:</span>{" "}
                <span
                  className={`px-3 py-1 rounded-full text-white ${
                    profile?.status === "ACTIVE" ? "bg-green-500" : "bg-red-500"
                  }`}
                >
                  {profile?.status}
                </span>
              </p>
            </div>
          </div>

          <div className="mb-6">
            <button
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-500 transition"
              onClick={() => setShowModal(true)}
            >
              Mostrar CV
            </button>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Fechas</h3>
            <p className="text-gray-600">
              <span className="font-semibold">Creado el:</span>{" "}
              {formatDate(profile?.createdAt)}
            </p>
            <p className="text-gray-600">
              <span className="font-semibold">Última actualización:</span>{" "}
              {formatDate(profile?.updatedAt)}
            </p>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[700px] max-h-[80vh] overflow-y-auto">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Descripción Profesional
            </h2>
            <div className="text-gray-600 prose">
              {profile?.description ? (
                <ReactMarkdown>
                  {profile.description.replace(/\\n/g, "\n")}
                </ReactMarkdown>
              ) : (
                "Sin descripción disponible"
              )}
            </div>
            <div className="mt-6 text-right">
              <button
                className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400 transition"
                onClick={() => setShowModal(false)}
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
