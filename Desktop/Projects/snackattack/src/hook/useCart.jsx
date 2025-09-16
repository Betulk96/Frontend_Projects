"use client";
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";


const CartContext = createContext(null);

export const CartContextProvider = (props) => {
  const [productCartQty, setProductCartQty] = useState(0); // sepetteki ürün sayısı
  const [cartPrdcts, setCartPrdcts] = useState(null); // ürün listesi

  useEffect(() => {
    let getItem = localStorage.getItem("cart");
    let getItemParse = JSON.parse(getItem);
    setCartPrdcts(getItemParse);
  }, []);

  const addToBasketIncrease = useCallback((product) => {
    let updatedCart;
    if (product.quantity === 10) {
      return toast.error("Daha fazla ekleyemezsin...");
    }
    if (cartPrdcts) {
      updatedCart = [...cartPrdcts];
      const existingItem = cartPrdcts.findIndex((item) => item.id === product.id);
      if (existingItem > -1) {
        updatedCart[existingItem].quantity = ++updatedCart[existingItem].quantity;
      }
      setCartPrdcts(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    }
  }, [cartPrdcts]);

  const addToBasketDecrease = useCallback((product) => {
    let updatedCart;
    if (product.quantity === 1) {
      return toast.error("Daha az ekleyemezsin...");
    }
    if (cartPrdcts) {
      updatedCart = [...cartPrdcts];
      const existingItem = cartPrdcts.findIndex((item) => item.id === product.id);
      if (existingItem > -1) {
        updatedCart[existingItem].quantity = --updatedCart[existingItem].quantity;
      }
      setCartPrdcts(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    }
  }, [cartPrdcts]);

  const removeCart = useCallback(() => {
    setCartPrdcts(null);
    toast.success("Sepet Temizlendi...");
    localStorage.setItem("cart", JSON.stringify(null));
  }, []);

  const addToBasket = useCallback((product) => {
    setCartPrdcts((prev) => {
      let updatedCart;
      if (prev) {
        updatedCart = [...prev, product];
      } else {
        updatedCart = [product];
      }
      toast.success("Ürün Sepete Eklendi...");
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return updatedCart;
    });
  }, [cartPrdcts]);

  const removeFromCart = useCallback((product) => {
    if (cartPrdcts) {
      const filteredProducts = cartPrdcts.filter((cart) => cart.id !== product.id);
      setCartPrdcts(filteredProducts);
      toast.success("Ürün Sepetten Silindi...");
      localStorage.setItem("cart", JSON.stringify(filteredProducts));
    }
  }, [cartPrdcts]);

  let value = {
    productCartQty,
    addToBasket,
    cartPrdcts,
    removeFromCart,
    removeCart,
    addToBasketIncrease,
    addToBasketDecrease,
  };

  return <CartContext.Provider value={value} {...props} />;
};

// CartContext'i kullanmak için hook
const UseCart = () => {
  const context = useContext(CartContext);
  if (context == null) {
    throw new Error("Bir hata durumu mevcut");
  }
  return context; // tüm sayfalarda kullanılabilir.
};

export default UseCart;
