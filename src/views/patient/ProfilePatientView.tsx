import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useEffect } from "react";

interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  roles: string[];
  status: string;
  createdAt: string;
  updatedAt: string;
}

export default function ProfilePatientView() {
  const queryClient = useQueryClient();

  // Invalidar la query al cargar el componente
  useEffect(() => {
    queryClient.invalidateQueries(["userProfile"]);
  }, [queryClient]);

  const fetchProfile = async (): Promise<UserProfile> => {
    const user = JSON.parse(localStorage.getItem("USER") || "{}");
    if (!user || !user.data?.id) {
      throw new Error("Usuario no encontrado en localStorage");
    }
    const response = await axios.get(
      `https://orc-mind-match.sliplane.app/v1/users/${user.data.id}`
    );
    return response.data.data;
  };

  const {
    data: profile,
    isFetching,
    error,
  } = useQuery({
    queryKey: ["userProfile"],
    queryFn: fetchProfile,
    staleTime: 0, 
    cacheTime: 0, 
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
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Roles</h3>
            <ul className="list-disc pl-5">
              {profile?.roles.map((role, index) => (
                <li key={index} className="text-gray-600 capitalize">
                  {role}
                </li>
              ))}
            </ul>
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
    </div>
  );
}
