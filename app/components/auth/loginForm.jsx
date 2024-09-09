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
    <div className="fixed inset-0 z-10 flex justify-center items-center backdrop-blur-xl px-3">
      <form
        onSubmit={handleSubmit}
        className="bg-[#e56940] py-4 px-6 rounded-xl max-w-md w-full space-y-4"
      >
        <div className="flex justify-center items-center ">
          <IoPersonOutline className="text-9xl text-white border-2 rounded-full border-white p-4" />
        </div>

        <div className="flex space-x-2 items-center">
          <IoPerson className="text-3xl text-white" />
          <input
            type="email"
            value={values.email}
            required
            placeholder="Email"
            className="p-2 rounded-e-lg w-full block"
            name="email"
            onChange={handleChange}
          />
        </div>

        <div className="flex space-x-2 items-center">
          <RiLockPasswordFill className="text-3xl text-white" />
          <input
            type="password"
            value={values.password}
            required
            placeholder="Password"
            className="p-2 rounded-e-lg w-full block"
            name="password"
            onChange={handleChange}
          />
        </div>

        <div className="flex flex-col space-y-3">
          <div className="flex justify-between">
            <button
              type="button"
              className="bg-white py-3 px-6 sm:px-10 text-blue-900 rounded-full"
              onClick={handleLogin}
            >
              Login
            </button>
            <button
              type="button"
              className="flex items-center bg-white py-3 px-6 text-blue-900 rounded-full"
              onClick={() => googleLogin()}
            >
              <FcGoogle className="text-3xl mr-2" />
              Login with Google
            </button>
          </div>
          <button
            type="button"
            className="bg-white py-3 px-6  text-blue-900 rounded-full"
            onClick={() => registerUser(values)}
          >
            Register
          </button>
        </div>

        <div className="flex justify-center mt-4">
          <button
            type="button"
            className="text-white underline"
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