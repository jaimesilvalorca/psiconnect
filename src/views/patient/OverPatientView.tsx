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

export default function OverView() {
  const [showModal, setShowModal] = useState(false);
  const {data} = JSON.parse(localStorage.getItem("USER_PATIENT") || "{}");
  const fetchAppointments = async (): Promise<Appointment[]> => {
    
    const response = await axios.get(
      `https://dl-mind-match.sliplane.app/v1/appointments/patient/${data.id}`
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

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Título principal */}
      <div className="bg-indigo-600 text-white p-6 rounded-lg shadow-md">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold">Citas de Hoy</h2>
          <p className="text-sm italic">{todayFormatted}</p>
        </div>
        {isFetching ? (
          <p className="mt-4 text-lg">Cargando...</p>
        ) : (
          <p className="mt-4 text-lg">{scheduled.length} Citas agendados</p>
        )}
      </div>

      {/* Mostrar citas de hoy en el centro */}
      {scheduled.length > 0 && (
        <div className="mt-10 bg-gray-100 p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-bold text-gray-700 mb-4 text-center">
            Próximas Citas de Hoy
          </h3>
          <ul className="divide-y divide-gray-300">
            {scheduled.map((appointment) => (
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


      <div className="flex justify-center mt-8">
        <button
          onClick={() => setShowModal(true)}
          className="px-6 py-3 bg-indigo-600 text-white text-lg font-medium rounded-lg shadow-md hover:bg-indigo-500 transition duration-200"
        >
          Agendar Cita
        </button>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Agendar Nueva Cita
            </h2>
            <form>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Nombre del Paciente
                </label>
                <input
                  type="text"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Fecha
                </label>
                <input
                  type="date"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Hora
                </label>
                <input
                  type="time"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400 transition"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-500 transition"
                >
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
