import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useEffect } from "react";

interface Appointment {
  id: string;
  appointmentDate: string;
  status: string;
  description: string;
  patient: {
    firstName: string;
    lastName: string;
  };
}

export default function AppointmentsPatientView() {
  const queryClient = useQueryClient();

  // Invalidar las queries al cargar el componente
  useEffect(() => {
    queryClient.removeQueries({ queryKey: ["appointments"] });
  }, [queryClient]);

  const fetchAppointments = async (): Promise<Appointment[]> => {
    const user = JSON.parse(localStorage.getItem("USER") || "{}");
    if (!user || !user.data?.id) {
      throw new Error("Usuario no encontrado en localStorage");
    }
    const response = await axios.get(
      `https://dl-mind-match.sliplane.app/v1/appointments/professional/${user.data.id}`
    );
    return response.data.data;
  };

  const { data: appointments = [], isFetching, error } = useQuery({
    queryKey: ["appointments"],
    queryFn: fetchAppointments,
    staleTime: 0,
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
      <div className="text-red-500 text-center">
        <h2>Error al cargar las citas</h2>
        <p>{(error as Error).message}</p>
      </div>
    );
  }

  // Filtrar citas pasadas
  const today = new Date();
  const pastAppointments = appointments.filter((appointment) => {
    const appointmentDate = new Date(appointment.appointmentDate);
    return appointmentDate < today;
  });

  return (
    <div className="container mx-auto px-6 py-8">
      <h1 className="text-4xl font-bold text-gray-800 text-center mb-8">
        Citas Pasadas
      </h1>
      {pastAppointments.length === 0 ? (
        <p className="text-gray-600 text-center">No hay citas pasadas.</p>
      ) : (
        <ul className="space-y-6">
          {pastAppointments.map((appointment) => (
            <li
              key={appointment.id}
              className="bg-white p-6 rounded-lg shadow-md"
            >
              <h2 className="text-xl font-bold text-gray-700">
                {appointment.patient.firstName} {appointment.patient.lastName}
              </h2>
              <p className="text-gray-600">
                Fecha:{" "}
                {new Date(appointment.appointmentDate).toLocaleDateString(
                  "es-ES",
                  {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  }
                )}
              </p>
              <p className="text-gray-600">
                Hora:{" "}
                {new Date(appointment.appointmentDate).toLocaleTimeString(
                  "es-ES",
                  {
                    hour: "2-digit",
                    minute: "2-digit",
                  }
                )}
              </p>
              <p className="text-gray-600 mt-2">
                <strong>Descripción:</strong> {appointment.description}
              </p>
              <p className="mt-4 font-semibold text-blue-600">
                Estado: Terminada
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
