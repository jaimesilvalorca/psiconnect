import { authenticatedUser, getUser } from "@/api/AuthAPI";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { UserLogin } from "types";



export default function LoginProfesionalView() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserLogin>();

  const { mutate } = useMutation({
    mutationFn: authenticatedUser,
    onError: (error) => {
      console.log(error);
    },
    onSuccess: (data) => {
      console.log(data)
      toast.success("Inicio correctamente");;
      navigate("/inicio-profesional")
    },
  });

  const handleLogin = async(formData: UserLogin) => {
    const {data} = await getUser(formData.email)

    


    if(data.roles[0] === 'user'){
      toast.error("Tu cuenta no es profesional")
      return
    }
    console.log(data)
    mutate(formData)



  };

  return (
    <div className="mt-12 mb-5 flex flex-col bg-gradient-to-br from-white-50 to-indigo-100">
      <main className="flex-grow container mx-auto px-4 py-8 flex items-center justify-center">
        <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-2 text-center">
            Iniciar Sesión
          </h1>
          <p className="text-lg text-gray-600 mb-8 text-center">
            Bienvenido de nuevo
          </p>

          <form
            onSubmit={handleSubmit(handleLogin)}
            className="space-y-6"
            noValidate
          >
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Correo Electrónico
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="tucorreo@ejemplo.com"
                  className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
                    focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                  {...register("email", {
                    required: "El correo electrónico es obligatorio",
                    pattern: {
                      value: /\S+@\S+\.\S+/,
                      message: "Formato de correo inválido",
                    },
                  })}
                />
                {errors.email && (
                  <p className="text-sm text-red-600 mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Contraseña
                </label>
                <input
                  id="password"
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
                  <p className="text-sm text-red-600 mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Iniciar Sesión
              </button>
            </div>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              ¿No tienes cuenta?{" "}
              <Link
                to="/profesional/auth/register"
                className="text-indigo-600 hover:underline"
              >
                Regístrate aquí
              </Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
