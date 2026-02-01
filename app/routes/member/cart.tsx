import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router";

import { Button } from "~/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "~/components/ui/card";
import { Separator } from "~/components/ui/separator";

import {
  CartDelete,
  CartStockDecrease,
  CartStockIncrease,
  MemberCart
} from "~/lib/client/member-product-client";

import type { MemberProductCart } from "~/lib/model/products/output/member-product-list";

export default function AppCartPage() {
  const [cart, setCart] = useState<MemberProductCart[]>([]);

  // 🔥 Load cart
  useEffect(() => {
    async function load() {
      const data = await MemberCart();
      setCart(data);
      window.dispatchEvent(new Event("cart-updated")); // update navbar
    }
    load();
  }, []);

  const increase = async (id: number) => {
    const result = await CartStockIncrease(id);
    if (!result.check) return;

    setCart(prev => {
      const updated = prev.map(item =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      );
      window.dispatchEvent(new Event("cart-updated"));
      return updated;
    });
  };

  const decrease = async (id: number) => {
    const result = await CartStockDecrease(id);
    if (!result.check) return;

    setCart(prev => {
      const updated = prev.map(item =>
        item.id === id ? { ...item, quantity: item.quantity - 1 } : item
      );
      window.dispatchEvent(new Event("cart-updated"));
      return updated;
    });
  };

  const removeItem = async (id: number) => {
    const result = await CartDelete(id);
    if (!result.check) return;

    setCart(prev => {
      const updated = prev.filter(i => i.id !== id);
      window.dispatchEvent(new Event("cart-updated"));
      return updated;
    });
  };

  const totalItems = useMemo(() => cart.reduce((sum, i) => sum + i.quantity, 0), [cart]);
  const subTotal = useMemo(() => cart.reduce((sum, i) => sum + i.price * i.quantity, 0), [cart]);
  const deliveryFee = subTotal > 0 ? 5000 : 0;
  const total = subTotal + deliveryFee;

  return (
    <div className="min-h-screen bg-gray-50">
      {cart.length === 0 ? 
      <div className="pt-20">No have product in your cart</div> : 
      <div className="mt-18 mx-auto max-w-7xl px-6 grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* CART ITEMS */}
        <div className="lg:col-span-2 space-y-2 my-6">
          {cart.map(item => (
            <Card key={item.id} className="rounded-sm shadow-sm">
              <CardContent className="flex gap-5 items-center">
                <img src={item.image} alt={item.productName} className="w-25 h-25 rounded-xl border" />

                <div className="flex-1">
                  <h2 className="text-lg font-semibold">{item.productName}</h2>
                  <p className="text-sm text-muted-foreground">{item.colorName} • Size {item.size}</p>
                  <p className="mt-2 font-medium">{item.price.toLocaleString()} MMK</p>
                </div>

                <div className="flex items-center gap-2">
                  <Button onClick={() => decrease(item.id)} disabled={item.quantity <= 1} variant={"ghost"}>
                    <Minus size={20} />
                  </Button>
                  <span>{item.quantity}</span>
                  <Button onClick={() => increase(item.id)} variant={"ghost"}>
                    <Plus size={20} />
                  </Button>
                </div>

                <Button onClick={() => removeItem(item.id)} variant={"destructive"}>
                  <Trash2 />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* SUMMARY */}
        <div className="lg:col-span-1">
          <Card className="sticky top-24">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShoppingBag /> Cart Summary
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span>Items</span>
                <span>{totalItems}</span>
              </div>

              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>{subTotal.toLocaleString()} MMK</span>
              </div>

              <div className="flex justify-between">
                <span>Delivery</span>
                <span>{deliveryFee.toLocaleString()} MMK</span>
              </div>

              <Separator />

              <div className="flex justify-between font-semibold">
                <span>Total</span>
                <span>{total.toLocaleString()} MMK</span>
              </div>
            </CardContent>

            <CardFooter>
              <Link to="/member/order" className="w-full">
                <Button className="w-full">Order Now</Button>
              </Link>
            </CardFooter>
          </Card>
        </div>
      </div>
      }
    </div>
  );
}
