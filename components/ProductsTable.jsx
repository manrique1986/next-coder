"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from 'next/image'; // Importa el componente Image

const ProductsTable = ({ category }) => {
  const [products, setProducts] = useState([]);
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

  // Función para redirigir a la página de crear producto
  const handleAddProduct = () => {
    router.push("Admin/Create"); // Redirige a la página "/create"
  };

  return (
    <div className="h-screen overflow-hidden">
      <div className="flex justify-center mb-4">
        <button
          onClick={handleAddProduct}
          className="bg-[#EB3A00] hover:bg-[#d26b48] text-white font-bold py-2 px-4 rounded"
        >
          Agregar Producto
        </button>
      </div>
      <div className="overflow-x-auto h-full">
        <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-lg">
          <thead>
            <tr>
              <th className="px-6 py-3 border-b border-gray-300 bg-gray-100 text-left text-lg font-medium text-black uppercase tracking-wider">
                Nombre
              </th>
              <th className="px-6 py-3 border-b border-gray-300 bg-gray-100 text-left text-lg font-medium text-black uppercase tracking-wider">
                Descripción
              </th>
              <th className="px-6 py-3 border-b border-gray-300 bg-gray-100 text-left text-lg font-medium text-black uppercase tracking-wider">
                Precio
              </th>
              <th className="px-6 py-3 border-b border-gray-300 bg-gray-100 text-left text-lg font-medium text-black uppercase tracking-wider">
                Imagen
              </th>
              <th className="px-6 py-3 border-b border-gray-300 bg-gray-100 text-left text-lg font-medium text-black uppercase tracking-wider">
                Categoría
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {products.map((product) => (
              <tr key={product.id} className="relative group hover:bg-gray-50">
                <td className="px-6 py-4 text-sm font-medium text-gray-900">
                  {product.nombre}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500 relative max-w-xs">
                  <div className="truncate">{product.descripcion}</div>
                  <div className="absolute left-0 top-full mt-1 max-w-xs p-2 bg-gray-800 text-white text-sm rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                    {product.descripcion}
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  ${product.precio}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  <Image
                    src={product.imagen}
                    alt={product.nombre}
                    className="object-cover rounded-md"
                    width={48} // Ajusta el ancho según tus necesidades
                    height={48} // Ajusta la altura según tus necesidades
                  />
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {product.category}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductsTable;