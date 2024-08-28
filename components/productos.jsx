
"use client";

import React, { useState, useEffect } from "react";
import ProductList from "@/components/ProductList";
import { useRouter } from "next/navigation";


const Productos = ({ category }) => {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("todos");
  const router = useRouter();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`/api/productos/${category || "all"}`, {
          cache: "no-store",
        });
        const data = await response.json();

        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [category]);

  const isProductPage = router.asPath === "/productos/all";

  const categories = [
    "todos",
    ...new Set(products.map((product) => product.category).filter(Boolean)),
  ];

  const filteredProducts =
    selectedCategory === "todos"
      ? products
      : products.filter((item) => item.category === selectedCategory);

  return (
    <div>
      <h1 className="ml-8">
        Tipo de masa: {isProductPage ? "All Products" : selectedCategory}
      </h1>

      {!isProductPage && (
        <div className="flex flex-wrap gap-2 justify-center w-full max-w-screen-sm mx-auto">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-3 py-1.5 rounded text-xs sm:text-sm ${
                selectedCategory === category
                  ? "bg-[#EB3A00] text-white"
                  : "bg-gray-200"
              } max-w-[120px]`}
            >
              {category && category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
      )}

      <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8 w-1/2 mx-auto" />

  
        <ProductList productos={filteredProducts} category={category} />
     
    </div>
  );
};

export default Productos;