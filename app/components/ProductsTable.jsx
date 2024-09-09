"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from 'next/image';

const ProductsTable = ({ category }) => {
  const [products, setProducts] = useState([]);
  const router = useRouter();

 // Este useEffect se encarga de cargar los productos desde la API
 useEffect(() => {
  const fetchProducts = async () => {
    try {
      const response = await fetch(`/api/productos/${category || "all"}`, {
        cache: "no-store",
      });
      const data = await response.json();
      // Verifica los datos recibidos desde la API
      console.log("Productos obtenidos:", data);

      // Aseguramos que cada producto tenga un campo `id`
      const productsWithIds = data.map((product) => ({
        id: product.id || product.docId, // Asegúrate de que el id esté presente
        ...product,
      }));

      setProducts(productsWithIds); // Actualizamos el estado con los productos
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  fetchProducts();
}, [category]);

// Función para manejar la eliminación del producto
const handleDeleteProduct = async (id) => {
  console.log("ID del producto a eliminar:", id); // Aquí verificas si el ID está llegando correctamente

  if (!id) {
    console.error("ID del producto es indefinido");
    return;
  }

  const confirmDelete = window.confirm("¿Estás seguro de que deseas eliminar este producto?");
  if (confirmDelete) {
    try {
      const response = await fetch(`/api/producto/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        const result = await response.json();
        if (result.message === "Producto eliminado con éxito") {
          setProducts((prevProducts) => prevProducts.filter((product) => product.id !== id));
          alert("Producto eliminado con éxito");
        } else {
          console.error("Error al eliminar el producto:", result.error);
          alert("Hubo un error al eliminar el producto.");
        }
      } else {
        console.error("Error al eliminar el producto.");
        alert("Hubo un error al eliminar el producto.");
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
      alert("Hubo un problema con la solicitud.");
    }
  }
};

  const handleAddProduct = () => {
    router.push("/Admin/Create"); // Redirige a la página de creación de producto
  };

  const handleEditProduct = (id) => {
    if (id) {
      router.push(`/Admin/Edit?id=${id}`); // Redirige a la página de edición de producto con el ID
    } else {
      console.error("ID del producto es indefinido");
    }
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
              <th className="px-6 py-3 border-b border-gray-300 bg-gray-100 text-left text-lg font-medium text-black uppercase tracking-wider">
                Acción
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
                    width={48}
                    height={48}
                  />
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {product.category}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500 flex gap-2">
                  <button
                    onClick={() => handleEditProduct(product.id)}
                    className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDeleteProduct(product.id)}
                    className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded"
                  >
                    Eliminar
                  </button>
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