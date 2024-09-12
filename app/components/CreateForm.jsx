"use client";

import React, { useState } from "react";
import Swal from "sweetalert2"; 

const CreateForm = ({ onProductAdd }) => {
  const [productData, setProductData] = useState({
    nombre: "",
    descripcion: "",
    precio: "",
    imagen: "",
    category: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/productos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      });

      if (response.ok) {
        const newProduct = await response.json();
        onProductAdd(newProduct);

        // Mostrar alerta de éxito
        Swal.fire({
          title: "Producto agregado con éxito",
          text: "El producto se ha agregado correctamente.",
          icon: "success",
          iconColor: "#EB3A00", // Cambiar el color del ícono a naranja
          confirmButtonColor: "#EB3A00", // Cambiar el color del botón de confirmación a naranja
          timer: 3000, // Alerta visible durante 3 segundos
          showConfirmButton: true,
        });

        setProductData({
          nombre: "",
          descripcion: "",
          precio: "",
          imagen: "",
          category: "",
        });
      } else {
        console.error("Error al agregar el producto.");
        Swal.fire({
          title: "Error",
          text: "Hubo un error al agregar el producto.",
          icon: "error",
          confirmButtonColor: "#d33", // Color del botón en caso de error
        });
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
      Swal.fire({
        title: "Error",
        text: "Hubo un problema con la solicitud.",
        icon: "error",
        confirmButtonColor: "#d33",
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md"
    >
      <h2 className="text-2xl font-bold mb-4">Agregar Producto</h2>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nombre">
          Nombre
        </label>
        <input
          type="text"
          name="nombre"
          value={productData.nombre}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="descripcion">
          Descripción
        </label>
        <textarea
          name="descripcion"
          value={productData.descripcion}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="precio">
          Precio
        </label>
        <input
          type="number"
          name="precio"
          value={productData.precio}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="imagen">
          Imagen URL
        </label>
        <input
          type="text"
          name="imagen"
          value={productData.imagen}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category">
          Categoría
        </label>
        <input
          type="text"
          name="category"
          value={productData.category}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
          required
        />
      </div>
      <button
        type="submit"
        className="w-full bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600 transition duration-200"
      >
        Agregar Producto
      </button>
    </form>
  );
};

export default CreateForm;