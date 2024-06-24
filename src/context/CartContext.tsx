import React, { createContext, useContext, useState, ReactNode } from 'react';
import Popup from '../components/Popup';

interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  image: string;
}

interface CartContextType {
  cart: Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  showPopup: (message: string) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

// eslint-disable-next-line react-refresh/only-export-components
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cart, setCart] = useState<Product[]>([]);
  const [popupMessage, setPopupMessage] = useState<string | null>(null);

  const addToCart = (product: Product) => {
    setCart((prevCart) => [...prevCart, product]);
  };

  const removeFromCart = (productId: number) => {
    setCart((prevCart) => prevCart.filter(product => product.id !== productId));
  };

  const showPopup = (message: string) => {
    setPopupMessage(message);
    setTimeout(() => {
      setPopupMessage(null);
    }, 500); // Hide the popup after 2 seconds
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, showPopup }}>
      {children}
      <Popup
        message={popupMessage || ''}
        isVisible={popupMessage !== null}
        onClose={() => setPopupMessage(null)}
      />
    </CartContext.Provider>
  );
};
