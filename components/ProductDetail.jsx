import React from 'react';

const ProductDetail = ({ pizza, closeModal }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded-lg max-w-sm w-full">
        <div className="text-right">
          <button onClick={closeModal} className="text-gray-500 text-2xl">
            &times;
          </button>
        </div>
        <h2 className="text-xl font-bold mb-4">{pizza.nombre}</h2>
        <img
          className="object-center object-cover h-auto w-full mb-4"
          src={pizza.imagen}
          alt={pizza.nombre}
        />
        <p className="text-gray-700 mb-4">{pizza.descripcion}</p>
      </div>
    </div>
  );
};

export default ProductDetail;