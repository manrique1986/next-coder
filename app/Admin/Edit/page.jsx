"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import EditProduct from "app/components/EditProduct"; 

const EditPage = () => {
  const router = useRouter();
  const [productId, setProductId] = useState(null);


  useEffect(() => {
   
    const query = new URLSearchParams(window.location.search);
    const id = query.get('id');
    if (id) {
      setProductId(id);
    } else {
      console.error("ID del producto no proporcionado.");
    }
  }, []);

  const handleProductUpdate = (updatedProduct) => {
   
    console.log("Producto actualizado:", updatedProduct);
  };

  if (!productId) {
    return <p>Cargando...</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Editar Producto</h1>
      <EditProduct id={productId} onProductUpdate={handleProductUpdate} />
    </div>
  );
};

export default EditPage;