import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { MemberProfileView } from "../../lib/client/member-product-client";
import type { MemberProductCart } from "../../lib/model/products/output/member-product-list";

interface CartContextType {
  cart: MemberProductCart[];
  setCart: React.Dispatch<React.SetStateAction<MemberProductCart[]>>;
  totalQuantity: number;
  refreshCart: () => Promise<void>;
}

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<MemberProductCart[]>([]);

  const refreshCart = async () => {
    const response = await MemberProfileView();
    setCart(response.cart ?? []);
  };

  useEffect(() => {
    refreshCart();
  }, []);

  const totalQuantity = useMemo(
    () => cart.reduce((sum, item) => sum + (item.quantity ?? 0), 0),
    [cart]
  );

  return (
    <CartContext.Provider value={{ cart, setCart, totalQuantity, refreshCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }
  return context;
}
