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

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity <= 0) {
      // Si la nueva cantidad es menor o igual a cero, elimina el producto del carrito
      removeFromCart({ id });
    } else {
      // De lo contrario, actualiza la cantidad del producto
      setCart((prevCart) =>
        prevCart.map((item) =>
          item.id === id ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };

  const removeFromCart = (product) => {
    setCart(cart.filter(item => item.id !== product.id));
  };

  const getTotalItems = () => cart.length;
  return ( 
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, getTotalItems, updateQuantity }}>
      {children}
    </CartContext.Provider>
  );
};



