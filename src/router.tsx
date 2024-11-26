import { BrowserRouter, Route, Routes } from "react-router-dom";
import NotFound from "./views/404/NotFound";
import AuthLayout from "./layouts/AuthLayout";
import DashboardProfesionalLayout from "./layouts/DashboardProfesionalLayout";
import IndexPageView from "./views/IndexPageView";
import RegisterProfesionalView from "./views/profesional/auth/RegisterProfesionalView";
import LoginProfesionalView from "./views/profesional/auth/LoginProfesionalView";
import RegisterPatientView from "./views/patient/auth/RegisterPatientView";
import LoginPatientView from "./views/patient/auth/LoginPatientView";
import DashboardPatientLayout from "./layouts/DashboardPatientLayout";
import ProfileProfesionalView from "./views/profesional/ProfileProfesionalView";
import AppointmentsProfesionalView from "./views/profesional/AppointmentsProfesionalView";
import OverProfesionalView from "./views/profesional/OverProfesionalView";
import OverViewPatientView from "./views/patient/OverPatientView";
import ProfilePatientView from "./views/patient/ProfilePatientView";
import AppointmentsPatientView from "./views/patient/AppointmentsPatientView";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<IndexPageView />}/>
        <Route element={<DashboardProfesionalLayout />}>
          <Route path="/inicio-profesional" element={<OverProfesionalView />} />
          <Route path="/profile-profesional" element={<ProfileProfesionalView />} />
          <Route path="/citas-profesional" element={<AppointmentsProfesionalView />} />
        </Route>

        <Route element={<DashboardPatientLayout />}>
        <Route path="/inicio-patient" element={<OverViewPatientView />} />
          <Route path="/profile-patient" element={<ProfilePatientView />} />
          <Route path="/citas-patient" element={<AppointmentsPatientView />} />
        <Route />

        </Route>

        <Route element={<AuthLayout />}>
          <Route path="/profesional/auth/register" element={<RegisterProfesionalView />} />
          <Route path="/profesional/auth/login" element={<LoginProfesionalView />} />
          <Route path="/patient/auth/register" element={<RegisterPatientView />} />
          <Route path="/patient/auth/login" element={<LoginPatientView />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
