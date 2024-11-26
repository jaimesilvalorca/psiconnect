import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface Appointment {
  id: string;
  appointmentDate: string;
  status: "scheduled" | "cancelled";
  patient: {
    firstName: string;
    lastName: string;
  };
  description: string;
}

export default function OverProfesionalView() {
  const [view, setView] = useState<"scheduled" | "cancelled" | "availability" | null>(null);

  const fetchAppointments = async (): Promise<Appointment[]> => {
    const {data} = JSON.parse(localStorage.getItem("USER_PROFESIONAL") || "{}");
    const response = await axios.get(
      `https://dl-mind-match.sliplane.app/v1/appointments/professional/${data.id}`
    );
    return response.data.data;
  };

  const { data: appointments = [], isFetching, error } = useQuery({
    queryKey: ["appointments"],
    queryFn: fetchAppointments,
  });

  if (error) {
    return (
      <div className="text-red-500 text-center">
        <h2>Error al cargar los datos</h2>
        <p>{(error as Error).message}</p>
      </div>
    );
  }

  const today = new Date().toISOString().split("T")[0];
  const todayFormatted = new Intl.DateTimeFormat("es-ES", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date());

  const todayAppointments = appointments.filter((a) =>
    a.appointmentDate.startsWith(today)
  );
  const scheduled = todayAppointments.filter((a) => a.status === "scheduled");
  const cancelled = todayAppointments.filter((a) => a.status === "cancelled");

  const calculateAvailability = () => {
    const allHours = Array.from({ length: 12 }, (_, i) => 7 + i);
    const busyHours = scheduled.map((appointment) =>
      new Date(appointment.appointmentDate).getHours()
    );
    return allHours.filter((hour) => !busyHours.includes(hour));
  };

  const availableHours = view === "availability" ? calculateAvailability() : [];

  const handleViewChange = (type: "scheduled" | "cancelled" | "availability") => {
    setView(type);
  };

  return (
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Citas de Hoy */}
        <div
          onClick={() => handleViewChange("scheduled")}
          className="bg-indigo-600 text-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer"
        >
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold">Citas de Hoy</h2>
            <p className="text-sm italic">{todayFormatted}</p>
          </div>
          {isFetching ? (
            <p className="mt-4 text-lg">Cargando...</p>
          ) : (
            <p className="mt-4 text-lg">{scheduled.length} Pacientes agendados</p>
          )}
        </div>

        {/* Disponibilidad */}
        <div
          onClick={() => handleViewChange("availability")}
          className="bg-green-500 text-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer"
        >
          <h2 className="text-2xl font-semibold">Disponibilidad</h2>
          {isFetching ? (
            <p className="mt-4 text-lg">Cargando...</p>
          ) : (
            <p className="mt-4 text-lg">Horarios disponibles</p>
          )}
        </div>

        {/* Citas Canceladas */}
        <div
          onClick={() => handleViewChange("cancelled")}
          className="bg-red-500 text-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer"
        >
          <h2 className="text-2xl font-semibold">Citas Canceladas</h2>
          {isFetching ? (
            <p className="mt-4 text-lg">Cargando...</p>
          ) : (
            <p className="mt-4 text-lg">{cancelled.length} Citas canceladas</p>
          )}
        </div>
      </div>

      {/* Detalles de la Vista Seleccionada */}
      {view && (
        <div className="mt-8 bg-gray-100 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            {view === "scheduled"
              ? "Citas de Hoy"
              : view === "cancelled"
              ? "Citas Canceladas"
              : "Horarios Disponibles"}
          </h2>
          <ul className="divide-y divide-gray-300">
            {view === "availability"
              ? availableHours.map((hour) => (
                  <li key={hour} className="py-4">
                    <p className="text-lg font-semibold">{`${hour}:00 - ${hour + 1}:00`}</p>
                  </li>
                ))
              : (view === "scheduled" ? scheduled : cancelled).map((appointment) => (
                  <li key={appointment.id} className="py-4">
                    <p className="text-lg font-semibold">
                      {appointment.patient.firstName} {appointment.patient.lastName}
                    </p>
                    <p className="text-gray-600">
                      Hora:{" "}
                      {new Date(appointment.appointmentDate).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                    <p className="text-gray-600">{appointment.description}</p>
                  </li>
                ))}
          </ul>
        </div>
      )}
    </div>
  );
}
