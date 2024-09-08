"use client";

import React, { useState } from "react";

import CreateForm from "app/components/CreateForm";

const AdminPage = () => {
  const [products, setProducts] = useState([]);

  const handleProductAdd = (newProduct) => {
    setProducts((prevProducts) => [...prevProducts, newProduct]);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Administrar Productos</h1>
      <CreateForm onProductAdd={handleProductAdd} />
     
    </div>
  );
};

export default AdminPage;