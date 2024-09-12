import React from 'react'
import ProductsTable from '../components/ProductsTable'

export const metadata = {
  title: "Administrador",
  description: "Pagina de administrador",
};


const AdminPage = () => {
  return (
    <div className=" ">
      <ProductsTable/>
    </div>
  )
}

export default AdminPage