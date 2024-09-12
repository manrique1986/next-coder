import React, { Suspense } from "react";
import Productos from "../../components/productos";

export const metadata = {
  title: "Productos",
  description: "Catalagos de productos de alta pinta",
};


const ProductCategoryPage = ({ params }) => {
  const { category } = params;

  return (
    <Suspense fallback={<div>Cargando productos...</div>}>
      <Productos category={category} />
    </Suspense>
  );
};

export default ProductCategoryPage;