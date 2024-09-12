"use client";

import { useCartContext } from "../context/cartContext";
import React from "react";
import Image from 'next/image';
import Swal from 'sweetalert2';

const Carrito = () => {
  const { cart, removeFromCart, updateQuantity } = useCartContext();

  const handleRemove = (item) => {
    removeFromCart(item);
  };

  const handleIncrement = (item) => {
    updateQuantity(item.id, item.quantity + 1);
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      updateQuantity(item.id, item.quantity - 1);
    }
  };

  const calculateTotal = () => {
    return cart
      .reduce((total, item) => total + item.precio * item.quantity, 0)
      .toFixed(2);
  };

  const handleProceedPayment = () => {
    Swal.fire({
      title: 'Pago no disponible',
      text: 'Por el momento no contamos con pago electrónico. Por favor confirme su pedido por WhatsApp. Muchas gracias.',
      icon: 'info',
      confirmButtonText: 'Aceptar',
      confirmButtonColor: '#EB3A00'
    });
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
                  className="bg-white p-4 rounded-lg shadow-md flex items-center justify-between flex-col md:flex-row"
                >
                  <div className="flex items-center">
                    <Image
                      src={item.imagen}
                      alt={item.nombre}
                      width={96}
                      height={96}
                      className="object-cover rounded-md mr-4"
                    />
                    <div>
                      <h2 className="text-lg font-semibold text-gray-800">
                        {item.nombre}
                      </h2>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleDecrement(item)}
                          className="px-2 py-1 bg-gray-300 text-gray-800 rounded"
                        >
                          -
                        </button>
                        <p className="text-gray-600">Cantidad: {item.quantity}</p>
                        <button
                          onClick={() => handleIncrement(item)}
                          className="px-2 py-1 bg-gray-300 text-gray-800 rounded"
                        >
                          +
                        </button>
                      </div>
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
                    className="px-4 py-2 bg-[#EB3A00] text-white rounded-lg hover:bg-red-600 mt-4 md:mt-0 w-full md:w-auto"
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
                onClick={handleProceedPayment}
                className="px-6 py-3 bg-[#f8602d] text-white rounded-lg hover:bg-[#f8602d] mt-4"
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