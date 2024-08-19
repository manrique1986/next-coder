"use client";

import React from "react";
import { useRouter } from "next/navigation";

const NotFound = () => {
  const router = useRouter();
  return (
    <>
      <div className="flex items-center justify-center  text-4xl text-red-600 ">
        Esta Pagina no Existe!!
        <div className="text-sm"></div>
      </div>
      <div className="flex items-center justify-center pt-16">
        <button
          onClick={() => router.back()}
          type="button"
          className=" focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900"
        >
          Volver
        </button>
      </div>
    </>
  );
};
export default NotFound;
