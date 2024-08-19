"use client";

import React, { useState } from "react";
import { productos } from "@/Data/mockData"; 
import ProductList from "@/components/ProductList";
import { useRouter } from 'next/navigation';

const Page = () => {
  const [selectedCategory, setSelectedCategory] = useState("todos");
  const router = useRouter();

  // Detectar la ruta actual
  const isProductPage = router.asPath === "/producto";

  // Extraer categorías únicas de los productos
  const categories = ["todos", ...new Set(productos.map(product => product.category))];

  // Filtrar productos según la categoría seleccionada, si no estamos en la ruta /producto
  const filteredProducts = isProductPage
    ? productos
    : selectedCategory === "todos"
    ? productos
    : productos.filter(item => item.category === selectedCategory);

  return (
    <div>
      <h1 className="ml-8">Tipo de masa: {isProductPage ? "All Products" : selectedCategory}</h1>
      

      {/* Mostrar filtros solo si no estamos en la ruta /producto */}
      {!isProductPage && (
        <div className="flex flex-wrap gap-2 justify-center w-full max-w-screen-sm mx-auto">
  {categories.map((category) => (
    <button
      key={category}
      onClick={() => setSelectedCategory(category)}
      className={`px-3 py-1.5 rounded text-xs sm:text-sm ${selectedCategory === category ? "bg-[#EB3A00] text-white" : "bg-gray-200"} max-w-[120px]`}
    >
      {category.charAt(0).toUpperCase() + category.slice(1)} 
    </button>
  ))}
</div>
      )}
    <hr
  class="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8 w-1/2 mx-auto"
/>

      <ProductList productos={filteredProducts} />
    </div>
  );
};

export default Page;