"use client";

import { Suspense, useState } from "react";
import React from "react";
import ProductCard from "./ProductCard";
import ProductDetail from "./ProductDetail";  



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
        <ProductDetail pizza={selectedPizza} closeModal={closeModal} />
      )}

    </div>
  );
};

export default ProductList;