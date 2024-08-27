"use client";

import React, { useState } from "react";
import { productos } from "@/Data/mockData"; 
import ProductList from "@/components/ProductList";
import { useRouter } from 'next/navigation';

const Page = () => {
  const [selectedCategory, setSelectedCategory] = useState("todos");
  const router = useRouter();


  const isProductPage = router.asPath === "/producto";

  const categories = ["todos", ...new Set(productos.map(product => product.category))];

  const filteredProducts = isProductPage
    ? productos
    : selectedCategory === "todos"
    ? productos
    : productos.filter(item => item.category === selectedCategory);

  return (
    <div>
      <h1 className="ml-8">Tipo de masa: {isProductPage ? "All Products" : selectedCategory}</h1>
      

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
  className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8 w-1/2 mx-auto"
/>

      <ProductList productos={filteredProducts} />
    </div>
  );
};

export default Page;