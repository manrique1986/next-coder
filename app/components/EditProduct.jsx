"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const EditProductForm = () => {
  const [product, setProduct] = useState({
    nombre: "",
    descripcion: "",
    precio: "",
    imagen: "",
    category: "",
  });
  const router = useRouter();
  const searchParams = useSearchParams();
  const productId = searchParams.get("id"); // Obtén el ID del producto de la URL

  useEffect(() => {
    const fetchProduct = async () => {
      if (productId) {
        try {
          const response = await fetch(`/api/producto/${productId}`);
          const data = await response.json();
          setProduct(data); // Carga los datos del producto en el estado
        } catch (error) {
          console.error("Error al cargar el producto:", error);
        }
      }
    };

    fetchProduct();
  }, [productId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch(`/api/producto/${productId}`, { // Usa la ruta correcta
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product), // Envía los datos actualizados
      });
  
      if (response.ok) {
        alert("Producto actualizado con éxito");
        router.push("/productos"); // Redirige a la lista de productos después de editar
      } else {
        alert("Hubo un error al actualizar el producto");
      }
    } catch (error) {
      console.error("Error al actualizar el producto:", error);
      alert("Hubo un problema con la solicitud.");
    }
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <form className="bg-white shadow-lg rounded-lg p-8" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold mb-6">Editar Producto</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Nombre</label>
          <input
            type="text"
            name="nombre"
            value={product.nombre}
            onChange={handleInputChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Descripción</label>
          <textarea
            name="descripcion"
            value={product.descripcion}
            onChange={handleInputChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Precio</label>
          <input
            type="number"
            name="precio"
            value={product.precio}
            onChange={handleInputChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Imagen URL</label>
          <input
            type="text"
            name="imagen"
            value={product.imagen}
            onChange={handleInputChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Categoría</label>
          <input
            type="text"
            name="category"
            value={product.category}
            onChange={handleInputChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="mt-6">
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
          >
            Guardar Cambios
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProductForm;