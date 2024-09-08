"use client";

import React, { useState } from "react";
import Image from 'next/image'; // Importa el componente Image
import Counter from "./Counter";
import { useCartContext } from "app/context/cartContext";

const ProductCard = ({ pizza, onPizzaClick }) => {
  const { addToCart } = useCartContext(); 
  const [quantity, setQuantity] = useState(1); 

  const handleCounterChange = (change) => {
    setQuantity((prevQuantity) => Math.max(1, prevQuantity + change));
  };

  return (
    <div className="w-full bg-white rounded-lg overflow-hidden border-2 flex flex-col justify-center items-center transition ease-in-out delay-150 hover:-translate-y-1 shadow-md shadow-[#EB3A00]">
      <div>
        <Image
          className="object-center object-cover h-auto w-full"
          src={pizza.imagen}
          alt={pizza.nombre}
          width={500} // Ajusta el ancho según tus necesidades
          height={300} // Ajusta la altura según tus necesidades
        />
      </div>
      <div className="text-center py-8 sm:py-6">
        <p className="text-xl text-gray-700 font-bold mb-2">
          {pizza.nombre}
        </p>
        <p className="text-lg text-gray-800 font-semibold">
          ${pizza.precio}
        </p>
        <button
          onClick={() => onPizzaClick(pizza)}
          className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800"
        >
          <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
            Detalle
          </span>
        </button>
        <Counter value={quantity} onChange={handleCounterChange} />
      </div>
      <button
        onClick={() => addToCart({ ...pizza, quantity })} 
        className="px-4 py-2 bg-[#EB3A00] text-white rounded-lg hover:bg-[#612c1a]"
      >
        Agregar
      </button>
    </div>
  );
};

export default ProductCard;