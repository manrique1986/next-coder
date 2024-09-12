"use client"

import { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const useCartContext = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    const newItem = { ...product, id: Date.now() }; 
    setCart([...cart, newItem]); 
  };

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity <= 0) {
    
      removeFromCart({ id });
    } else {
    
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



