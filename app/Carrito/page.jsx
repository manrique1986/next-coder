"use client";

import { useCartContext } from "@/context/cartContext";
import React from "react";

const Carrito = () => {
  const { cart, removeFromCart } = useCartContext();

  // Maneja la eliminación del producto del carrito
  const handleRemove = (item) => {
    removeFromCart(item);
  };

  // Calcula el total del carrito
  const calculateTotal = () => {
    return cart
      .reduce((total, item) => total + item.precio * item.quantity, 0)
      .toFixed(2);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="container mx-auto max-w-3xl">
        <h1 className="text-4xl font-bold text-center text-[#EB3A00] mb-8">
          Carrito de Compras
        </h1>

        {cart.length === 0 ? (
          <div className="text-center text-gray-700 text-lg">
            <p>Tu carrito está vacío.</p>
            <p>¡Agrega algunos productos para continuar!</p>
          </div>
        ) : (
          <div>
            <ul className="space-y-4">
              {cart.map((item) => (
                <li
                  key={item.id}
                  className="bg-white p-4 rounded-lg shadow-md flex items-center justify-between"
                >
                  <div className="flex items-center">
                    <img
                      src={item.imagen}
                      alt={item.nombre}
                      className="w-24 h-24 object-cover rounded-md mr-4"
                    />
                    <div>
                      <h2 className="text-lg font-semibold text-gray-800">
                        {item.nombre}
                      </h2>
                      <p className="text-gray-600">Cantidad: {item.quantity}</p>
                      <p className="text-gray-600">
                        Precio por unidad: ${item.precio}
                      </p>
                      <p className="text-gray-600">
                        Subtotal: ${(item.precio * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleRemove(item)}
                    className="px-4 py-2 bg-[#EB3A00] text-white rounded-lg hover:bg-red-600"
                  >
                    Eliminar
                  </button>
                </li>
              ))}
            </ul>

            <div className="mt-8 text-right">
              <h2 className="text-xl font-semibold text-gray-800">
                Total del Carrito: ${calculateTotal()}
              </h2>
              <button
                className="px-6 py-3 bg-[#f8602d] text-white rounded-lg hover:bg-[#f8602d] mt-4"
                // Agrega la lógica para proceder al checkout
              >
                Proceder al Pago
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Carrito;
