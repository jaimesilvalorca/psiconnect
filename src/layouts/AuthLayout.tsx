import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { ToastContainer } from "react-toastify";
import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
      <ToastContainer pauseOnHover={false} pauseOnFocusLoss={false} />
    </>
  );
}
