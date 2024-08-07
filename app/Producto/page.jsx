"use client";

import { useState } from "react";
import React from "react";
import Image from "next/image";
import Counter from "@/components/Counter";


const productos = [
  {
    nombre: "Margarita",
    descripcion:
      "Una deliciosa pizza con salsa de tomate, mozzarella fresca y albahaca. La Margarita es una de las pizzas más simples y tradicionales, pero también una de las más deliciosas. La combinación de la acidez del tomate con la cremosidad de la mozzarella fresca y el aroma de la albahaca la convierten en una experiencia única para el paladar.",
    precio: 8.99,
    imagen: "/pizzamargarita.jpg",
  },
  {
    nombre: "Pepperoni",
    descripcion:
      "Pizza clásica con pepperoni, mozzarella y salsa de tomate. El pepperoni, ligeramente picante y lleno de sabor, se combina con la cremosidad del queso mozzarella y la frescura de la salsa de tomate. Es una elección popular para aquellos que disfrutan de un sabor más robusto y especiado.",
    precio: 10.99,
    imagen: "/pizzapeperoni.jpg",
  },
  {
    nombre: "Hawaiana",
    descripcion:
      "Una combinación dulce y salada de piña, jamón y queso. La pizza Hawaiana ofrece un equilibrio perfecto entre lo dulce y lo salado. La piña fresca aporta un toque dulce y jugoso, mientras que el jamón añade una salinidad deliciosa. Es ideal para aquellos que buscan una experiencia de sabor diferente.",
    precio: 9.99,
    imagen: "/pizzahawaiana.jpg",
  },
  {
    nombre: "Cuatro Quesos",
    descripcion:
      "Mozzarella, cheddar, gorgonzola y parmesano en una deliciosa pizza. Esta pizza es un sueño para los amantes del queso. Cada bocado ofrece una combinación de sabores y texturas de los diferentes quesos: la cremosidad de la mozzarella, el sabor intenso del gorgonzola, la suavidad del cheddar y el toque salado del parmesano.",
    precio: 11.99,
    imagen: "/pizza4quesos.jpg",
  },
  {
    nombre: "Vegetariana",
    descripcion:
      "Una mezcla de vegetales frescos como pimientos, cebolla, champiñones y aceitunas. La pizza Vegetariana es una opción saludable y deliciosa, repleta de sabores frescos y naturales. Los vegetales asados añaden un toque de dulzura y umami, mientras que las aceitunas aportan un sabor salado y característico.",
    precio: 9.49,
    imagen: "/pizzavege.jpg",
  },
  {
    nombre: "Jamon y Huevo",
    descripcion:
      "Deliciosa pizza con jamón, huevo y mozzarella. El jamón aporta un sabor salado y sabroso, mientras que el huevo añade una textura rica y cremosa. Una combinación clásica y reconfortante.",
    precio: 10.49,
    imagen: "/pizzahuevo.jpg",
  },
  {
    nombre: "Fugazeta",
    descripcion:
      "Una pizza típica argentina con cebolla, mozzarella y orégano. La Fugazeta es conocida por su generosa cantidad de queso y la dulzura de las cebollas caramelizadas. Perfecta para los amantes del queso y los sabores intensos.",
    precio: 9.99,
    imagen: "/pizzacebolla.jpg",
  },
];

const Pizzas = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPizza, setSelectedPizza] = useState(null);

  const handlePizzaClick = (pizza) => {
    setSelectedPizza(pizza);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedPizza(null);
  };

  return (
    <div>
      <section className="flex justify-center max-w-5xl mx-auto px-4 sm:px-6 lg:px-16 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {productos.map((pizza, index) => (
            <div
              key={index}
              className="w-full bg-white rounded-lg overflow-hidden border-2  flex flex-col justify-center items-center transition ease-in-out delay-150 hover:-translate-y-1 shadow-md shadow-[#EB3A00]"
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
                  onClick={() => handlePizzaClick(pizza)}
                  class="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800"
                >
                  <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                    Detalle
                  </span>
                </button>
                <Counter/>
              </div>
            </div>
          ))}
        </div>
      </section>

      {modalOpen && selectedPizza && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg max-w-sm w-full">
            <div className="text-right">
              <button onClick={closeModal} className="text-gray-500 text-2xl">
                &times;
              </button>
            </div>
            <h2 className="text-xl font-bold mb-4">{selectedPizza.nombre}</h2>
            <img
              className="object-center object-cover h-auto w-full mb-4"
            
            
            />
            <p className="text-gray-700 mb-4">{selectedPizza.descripcion}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Pizzas;
