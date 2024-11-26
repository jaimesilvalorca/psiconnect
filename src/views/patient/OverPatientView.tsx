import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

type BeckQuestionsType = { [key: string]: number };

const BECK_QUESTIONS: BeckQuestionsType = {
  "Torpe o entumecido": 0,
  Acalorado: 0,
  "Con temblor en las piernas": 0,
  "Incapaz de relajarse": 0,
  "Con temor a que ocurra lo peor": 0,
  "Mareado, o que se le va la cabeza": 0,
  "Con latidos del corazón fuertes y acelerados": 0,
  Inestable: 0,
  "Atemorizado o asustado": 0,
  Nervioso: 0,
  "Con sensación de bloqueo": 0,
  "Con temblores en las manos": 0,
  "Inquieto, inseguro": 0,
  "Con miedo a perder el control": 0,
  "Con sensación de ahogo": 0,
  "Con temor a morir": 0,
  "Con miedo": 0,
  "Con problemas digestivos": 0,
  "Con desvanecimientos": 0,
  "Con rubor facial": 0,
  "Con sudores, fríos o calientes": 0,
};

export default function OverPatientView() {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState<BeckQuestionsType>(BECK_QUESTIONS);
  const [comments, setComments] = useState("");
  const [report, setReport] = useState<any>(null);
  const [loadingReport, setLoadingReport] = useState(false);
  const [appointmentData, setAppointmentData] = useState({
    appointmentDate: "",
    description: "",
  });
  const [showAppointmentForm, setShowAppointmentForm] = useState(false);
  const { data } = JSON.parse(localStorage.getItem("USER_PATIENT") || "{}");

  const fetchAppointments = async () => {
    const response = await axios.get(
      `https://dl-mind-match.sliplane.app/v1/appointments/patient/${data.id}`
    );

    console.log(response.data.data);
    return response.data.data;
  };

  const { data: appointments = [], isFetching } = useQuery({
    queryKey: ["appointments"],
    queryFn: fetchAppointments,
  });

  const todayDate = new Date().toISOString().split("T")[0];

  const todayAppointments = appointments.filter((appointment: any) =>
    appointment.appointmentDate.startsWith(todayDate)
  );

  const handleLevelChange = (question: string, level: number) => {
    setFormData((prev) => ({ ...prev, [question]: level }));
  };

  const handleSubmitEvaluation = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoadingReport(true);
    const payload = {
      beck: formData,
      description: comments,
    };

    try {
      const { data } = await axios.post(
        `https://orc-mind-match.sliplane.app/v1/evaluation/report/full`,
        payload
      );
      setReport(data.data);
    } catch (error) {
      console.error("Error al enviar la evaluación:", error);
      alert("Ocurrió un error al enviar la evaluación.");
    } finally {
      setLoadingReport(false);
    }
  };

  const handleSubmitAppointment = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      appointmentDate: appointmentData.appointmentDate,
      patientId: data.id,
      professionalId: report.suggestedProfessional.id,
      description: appointmentData.description,
    };

    try {
      await axios.post(
        `https://dl-mind-match.sliplane.app/v1/appointments`,
        payload
      );
      alert("Cita agendada exitosamente");
      setShowModal(false);
    } catch (error) {
      console.error("Error al agendar la cita:", error);
      alert("Ocurrió un error al agendar la cita.");
    }
  };

  const levelOptions = [
    { label: "No", value: 0 },
    { label: "Leve", value: 1 },
    { label: "Moderado", value: 2 },
    { label: "Bastante", value: 3 },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-indigo-600 text-white p-6 rounded-lg shadow-md">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold">Citas de Hoy</h2>
          <p className="text-sm italic">
            {new Date().toLocaleDateString("es-ES", {
              weekday: "long",
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>
        </div>
        {isFetching ? (
          <p className="mt-4 text-lg">Cargando...</p>
        ) : (
          <>
            <p className="mt-4 text-lg">
              {todayAppointments.length} Citas agendadas
            </p>
            {todayAppointments.length > 0 && (
              <ul className="mt-4 space-y-2">
                {todayAppointments.map((appointment: any) => (
                  <li
                    key={appointment.id}
                    className="bg-white text-black p-4 rounded-lg shadow-md"
                  >
                    <p>
                      <strong>Fecha y Hora:</strong>{" "}
                      {new Date(
                        appointment.appointmentDate
                      ).toLocaleString("es-ES", {
                        dateStyle: "short",
                        timeStyle: "short",
                      })}
                    </p>
                    <p>
                      <strong>Estado:</strong> {appointment.status}
                    </p>
                    <p>
                      <strong>Descripción:</strong> {appointment.description}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </>
        )}
      </div>

      <div className="flex justify-center mt-8">
        <button
          onClick={() => setShowModal(true)}
          className="px-6 py-3 bg-indigo-600 text-white text-lg font-medium rounded-lg shadow-md hover:bg-indigo-500 transition duration-200"
        >
          Completar Evaluación
        </button>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[700px] max-h-[80vh] overflow-y-auto">
            {loadingReport ? (
              <div className="flex items-center justify-center h-40">
                <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-indigo-600"></div>
                <p className="ml-4 text-gray-700">Generando reporte...</p>
              </div>
            ) : !report ? (
              <form onSubmit={handleSubmitEvaluation}>
                <h2 className="text-xl font-bold text-gray-800 mb-4">
                  Evaluación Beck
                </h2>
                {Object.entries(BECK_QUESTIONS).map(([question], index) => (
                  <div key={index} className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {question}
                    </label>
                    <select
                      value={formData[question]}
                      onChange={(e) =>
                        handleLevelChange(question, parseInt(e.target.value))
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    >
                      {levelOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                ))}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Comentarios adicionales
                  </label>
                  <textarea
                    value={comments}
                    onChange={(e) => setComments(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    rows={3}
                  ></textarea>
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
                    Enviar
                  </button>
                </div>
              </form>
            ) : showAppointmentForm ? (
              <form onSubmit={handleSubmitAppointment}>
                <h2 className="text-xl font-bold text-gray-800 mb-4">
                  Agendar Cita
                </h2>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Fecha y Hora
                  </label>
                  <input
                    type="datetime-local"
                    value={appointmentData.appointmentDate}
                    onChange={(e) =>
                      setAppointmentData({
                        ...appointmentData,
                        appointmentDate: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Descripción
                  </label>
                  <textarea
                    value={appointmentData.description}
                    onChange={(e) =>
                      setAppointmentData({
                        ...appointmentData,
                        description: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    rows={3}
                  ></textarea>
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
                    Confirmar
                  </button>
                </div>
              </form>
            ) : (
              <>
                <h2 className="text-xl font-bold text-gray-800 mb-4">
                  Reporte de Evaluación
                </h2>
                <p className="mb-4 text-gray-700 whitespace-pre-line">
                  {report.report}
                </p>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Profesional Sugerido
                </h3>
                <p className="mb-2 text-gray-700">
                  <strong>Nombre:</strong>{" "}
                  {report.suggestedProfessional?.firstName}{" "}
                  {report.suggestedProfessional?.lastName}
                </p>
                <p className="mb-2 text-gray-700">
                  <strong>Email:</strong>{" "}
                  {report.suggestedProfessional?.email}
                </p>
                <div className="flex justify-end">
                  <button
                    onClick={() => setShowAppointmentForm(true)}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-500 transition"
                  >
                    Agendar cita con{" "}
                    {report.suggestedProfessional?.firstName}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
