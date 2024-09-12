"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Swal from "sweetalert2"; // Importa SweetAlert2
import "sweetalert2/src/sweetalert2.scss"; // Opcional: Importa estilos

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
  const productId = searchParams.get("id"); 

  useEffect(() => {
    const fetchProduct = async () => {
      if (productId) {
        try {
          const response = await fetch(`/api/producto/${productId}`);
          const data = await response.json();
          setProduct(data);
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
      const response = await fetch(`/api/producto/${productId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      });

      if (response.ok) {
        Swal.fire({
          title: "Éxito",
          text: "Producto actualizado con éxito",
          icon: "success",
          confirmButtonText: "OK",
        }).then(() => {
          router.push("/productos"); 
        });
      } else {
        Swal.fire({
          title: "Error",
          text: "Hubo un error al actualizar el producto",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    } catch (error) {
      console.error("Error al actualizar el producto:", error);
      Swal.fire({
        title: "Error",
        text: "Hubo un problema con la solicitud.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <div className="h-screen flex justify-center items-center bg-gray-50">
      <form className="bg-white shadow-lg rounded-lg p-8 w-full max-w-lg" onSubmit={handleSubmit}>
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-600">Editar Producto</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Nombre</label>
          <input
            type="text"
            name="nombre"
            value={product.nombre}
            onChange={handleInputChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Descripción</label>
          <textarea
            name="descripcion"
            value={product.descripcion}
            onChange={handleInputChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Precio</label>
          <input
            type="number"
            name="precio"
            value={product.precio}
            onChange={handleInputChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Imagen URL</label>
          <input
            type="text"
            name="imagen"
            value={product.imagen}
            onChange={handleInputChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Categoría</label>
          <input
            type="text"
            name="category"
            value={product.category}
            onChange={handleInputChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <div className="mt-6">
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded transition-all"
          >
            Guardar Cambios
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProductForm;