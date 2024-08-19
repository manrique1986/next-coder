"use client";

import React from "react";
import Counter from "@/components/Counter";

const ProductCard = ({ pizza, onPizzaClick }) => {
  return (
    <div
      className="w-full bg-white rounded-lg overflow-hidden border-2 flex flex-col justify-center items-center transition ease-in-out delay-150 hover:-translate-y-1 shadow-md shadow-[#EB3A00]"
    >
      <div>
        <img
          className="object-center object-cover h-auto w-full"
          src={pizza.imagen}
          alt={pizza.nombre}
        />
      </div>
      <div className="text-center py-8 sm:py-6">
        <p className="text-xl text-gray-700 font-bold mb-2">
          {pizza.nombre}
        </p>
        <p className="text-lg text-gray-800 font-semibold">
          ${pizza.precio.toFixed(2)}
        </p>
        <button
          onClick={() => onPizzaClick(pizza)}
          className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800"
        >
          <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
            Detalle
          </span>
        </button>
        <Counter />
      </div>
    </div>
  );
};

export default ProductCard;