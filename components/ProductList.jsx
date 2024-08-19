"use client";

import { useState } from "react";
import React from "react";
import ProductCard from "./ProductCard";

const ProductList = ({ productos = [] }) => { 
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
          {productos.length > 0 ? (
            productos.map((pizza) => (
              <ProductCard
                key={pizza.id}
                pizza={pizza}
                onPizzaClick={handlePizzaClick}
              />
            ))
          ) : (
            <p>No hay productos</p> 
          )}
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
              src={selectedPizza.imagen}
              alt={selectedPizza.nombre}
            />
            <p className="text-gray-700 mb-4">{selectedPizza.descripcion}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductList;