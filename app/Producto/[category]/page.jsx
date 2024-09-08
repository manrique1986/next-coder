// "use client";

// import React from "react";
// import { productos } from "@/Data/mockData"; 
// import { useParams } from "next/navigation";
// import ProductList from "@/components/ProductList";

// const Page = () => {
//   const { category } = useParams(); 


//   const filteredProducts = category === "all" ? productos : productos.filter(item => item.category.toUpperCase() === category.toUpperCase());

//   return (
//     <div>
//       <h1>Category: {category}</h1>
//       <ProductList productos={filteredProducts} />
//     </div>
//   );
// };

// export default Page;