import React, { Suspense } from "react";
import Productos from "@/components/Productos";



const ProductCategoryPage = ({ params }) => {
  const { category } = params;

  return (
    <Suspense fallback={<div>Cargando productos...</div>}>
      <Productos category={category} />
    </Suspense>
  );
};

export default ProductCategoryPage;