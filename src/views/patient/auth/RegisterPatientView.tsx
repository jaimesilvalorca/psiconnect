import { createAccount } from "@/api/AuthAPI";
import ErrorMessage from "@/components/ErrorMessage";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { Link,useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { UserRegisterForm, UserRegisterSend } from "types";

export default function RegisterPatientView() {
  const initialValues: UserRegisterForm = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    password_confirmation: "",
    role: "user",
    description: "vacia"
  };

  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<UserRegisterForm>({ defaultValues: initialValues });

  const password = watch("password");

  const { mutate } = useMutation({
    mutationFn: createAccount,
    onError: (error) => {
      console.log(error);
    },
    onSuccess: (data) => {
      console.log(data);
      toast.success("Registro correctamente");
      reset();
      navigate("/inicio-patient")
    },
  });

  const handleRegister = (formData: UserRegisterForm) => {
    const dataSend: UserRegisterSend = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      password: formData.password,
      role: formData.role,
      description:formData.description
    };
    mutate(dataSend);
  };

  return (
    <div className="mt-12 mb-5 flex flex-col bg-gradient-to-br from-white-50 to-indigo-100">
      <main className="flex-grow container mx-auto px-4 py-8 flex items-center justify-center">
        <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-2 text-center">
            Crear Cuenta
          </h1>
          <p className="text-lg text-gray-600 mb-8 text-center">
            Únete a nuestra comunidad
          </p>

          <form
            onSubmit={handleSubmit(handleRegister)}
            className="space-y-6"
            noValidate
          >
            <div className="space-y-4">
              <div>
                <label
                  className="block text-sm font-medium text-gray-700"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="tu@email.com"
                  className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
                    focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                  {...register("email", {
                    required: "El email es obligatorio",
                    pattern: {
                      value: /\S+@\S+\.\S+/,
                      message: "Formato de email inválido",
                    },
                  })}
                />
                {errors.email && (
                  <ErrorMessage>{errors.email.message}</ErrorMessage>
                )}
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Nombre
                  </label>
                  <input
                    type="text"
                    placeholder="John"
                    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
                      focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                    {...register("firstName", {
                      required: "El nombre es obligatorio",
                    })}
                  />
                  {errors.firstName && (
                    <ErrorMessage>{errors.firstName.message}</ErrorMessage>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Apellido
                  </label>
                  <input
                    type="text"
                    placeholder="Doe"
                    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
                      focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                    {...register("lastName", {
                      required: "El apellido es obligatorio",
                    })}
                  />
                  {errors.lastName && (
                    <ErrorMessage>{errors.lastName.message}</ErrorMessage>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Contraseña
                </label>
                <input
                  type="password"
                  placeholder="********"
                  className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
                    focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                  {...register("password", {
                    required: "La contraseña es obligatoria",
                    minLength: {
                      value: 8,
                      message: "La contraseña debe tener al menos 8 caracteres",
                    },
                  })}
                />
                {errors.password && (
                  <ErrorMessage>{errors.password.message}</ErrorMessage>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Confirmar Contraseña
                </label>
                <input
                  type="password"
                  placeholder="********"
                  className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
                    focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                  {...register("password_confirmation", {
                    required: "Confirmar la contraseña es obligatorio",
                    validate: (value) =>
                      value === password || "Las contraseñas no coinciden",
                  })}
                />
                {errors.password_confirmation && (
                  <ErrorMessage>
                    {errors.password_confirmation.message}
                  </ErrorMessage>
                )}
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Crear cuenta
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">O</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <div>
                <Link
                  to={"/patient/auth/login"}
                  className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                >
                  Iniciar Sesión
                </Link>
              </div>
              <div>
                <Link
                  to={"*"}
                  className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                >
                  Olvidé mi contraseña
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
