

import React from "react";

import ProductList from "@/components/ProductList";



const getProducts = async (category) => {
  const response = await fetch(`http://localhost:3000/api/productos/${category}`);
  if (!response.ok) {
    throw new Error('Error fetching products');
  }
  const products = await response.json();
  return products;
};

const Page = async ({params}) => {
  const { category } = params;
  const products = await getProducts(category)

  

  return (
    <div>
    
      <ProductList category={category} productos={products} />
    </div>
  );
};

export default Page;