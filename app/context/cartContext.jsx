"use client"

import { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const useCartContext = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    const newItem = { ...product, id: Date.now() }; // Añadir un ID único para cada item
    setCart([...cart, newItem]); // Agregar el nuevo item al carrito
  };

  const removeFromCart = (product) => {
    setCart(cart.filter(item => item.id !== product.id));
  };
  const getTotalItems = () => cart.length;
  return ( 
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, getTotalItems }}>
      {children}
    </CartContext.Provider>
  );
};



