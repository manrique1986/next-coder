"use client";

import { useState } from "react";
import { IoPersonOutline, IoPerson } from "react-icons/io5";
import { RiLockPasswordFill } from "react-icons/ri";
import { FcGoogle } from "react-icons/fc";
import { useAuthContext } from "app/context/AuthContext";
import { useRouter } from "next/navigation"; 
import Swal from 'sweetalert2';

const LoginForm = () => {
  const { registerUser, loginUser, googleLogin } = useAuthContext();
  const router = useRouter();

  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleLogin = async () => {
    try {
      await loginUser(values);
      Swal.fire({
        title: '¡Login exitoso!',
        text: 'Te has logueado correctamente.',
        icon: 'success',
        timer: 3000, 
        timerProgressBar: true,
        confirmButtonText: 'Aceptar',
      });
      router.push('/Admin');
    } catch (error) {
      Swal.fire({
        title: 'Error',
        text: 'Hubo un problema con el login.',
        icon: 'error',
        confirmButtonText: 'Intentar de nuevo',
      });
    }
  };

  return (
    <div className="fixed inset-0 z-10 flex justify-center items-center px-3 bg-gradient-to-r from-orange-400 to-red-500 backdrop-blur-sm">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg py-8 px-10 rounded-3xl max-w-lg w-full space-y-6"
      >
        <div className="flex justify-center items-center">
          <IoPersonOutline className="text-7xl text-orange-500 bg-gray-100 rounded-full p-4 shadow-md" />
        </div>

        <div className="flex space-x-2 items-center bg-gray-100 rounded-lg p-2 shadow-inner hover:shadow-lg transition duration-300">
          <IoPerson className="text-2xl text-orange-500" />
          <input
            type="email"
            value={values.email}
            required
            placeholder="Email"
            className="w-full bg-transparent border-none focus:outline-none focus:ring-0"
            name="email"
            onChange={handleChange}
          />
        </div>

        <div className="flex space-x-2 items-center bg-gray-100 rounded-lg p-2 shadow-inner hover:shadow-lg transition duration-300">
          <RiLockPasswordFill className="text-2xl text-orange-500" />
          <input
            type="password"
            value={values.password}
            required
            placeholder="Password"
            className="w-full bg-transparent border-none focus:outline-none focus:ring-0"
            name="password"
            onChange={handleChange}
          />
        </div>

        <div className="flex flex-col space-y-4">
          <button
            type="button"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-full shadow-lg transition duration-300 transform hover:scale-105"
            onClick={handleLogin}
          >
            Login
          </button>
          <button
            type="button"
            className="w-full flex justify-center items-center bg-white hover:bg-gray-100 text-blue-900 border-2 border-gray-300 font-semibold py-3 px-6 rounded-full shadow-lg transition duration-300 transform hover:scale-105"
            onClick={() => googleLogin()}
          >
            <FcGoogle className="text-3xl mr-2" />
            Login with Google
          </button>
        </div>

        <div className="text-center">
          <p className="text-gray-500">¿No tienes una cuenta?</p>
          <button
            type="button"
            className="bg-white hover:bg-gray-100 text-blue-900 border-2 border-gray-300 font-semibold py-2 px-6 rounded-full shadow-md transition duration-300 mt-2"
            onClick={() => registerUser(values)}
          >
            Registrarse
          </button>
        </div>

        <div className="flex justify-center mt-4">
          <button
            type="button"
            className="text-orange-500 hover:underline"
            onClick={() => router.back()}
          >
            Volver a la página anterior
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;