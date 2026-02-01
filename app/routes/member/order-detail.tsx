import { ListCheck, ListOrdered } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "~/components/ui/card";
import { Separator } from "~/components/ui/separator";
import { MemberProfileView } from "~/lib/client/member-product-client";
import type { MemberOrderItemList, MmeberOrderList } from "~/lib/model/products/output/member-product-list";
import type { Route } from "./+types/order-detail";

export async function loader({params}: Route.LoaderArgs){
    return ({id: params.orderId})
}

export default function AppOrder({loaderData}: Route.ComponentProps) {

        const orderId = Number(loaderData.id);
        const navigate = useNavigate();

        const [order, setOrder] = useState<MmeberOrderList>()
        const [items, setItems] = useState<MemberOrderItemList[]>([]);

        useEffect(() => {
            async function load() {
            try {
                const data = await MemberProfileView();
                const order = data.order.find((o) => o.id === orderId);

                if (order) {
                    setOrder(order)
                    setItems(order.orderItems);
                } else {
                    setItems([]);
                }
            } catch (error) {
                console.error("Failed to load order items", error);
                setItems([]);
            }
            }

            load();
        }, [orderId]); // ✅ include orderId in dependencies

        // Total quantity of items
        const totalItems = useMemo(() => {
            return items.reduce((sum, i) => sum + (i.quantity ?? 0), 0);
        }, [items]);

        // Subtotal price
        const subTotal = useMemo(() => {
            return items.reduce((sum, i) => sum + (i.price ?? 0) * (i.quantity ?? 0), 0);
        }, [items]);

        const deliveryFee = subTotal > 0 ? 5000 : 0;
        const total = subTotal + deliveryFee;

    return (
    <div className="min-h-screen bg-gray-50">
        <div className="mt-18 pt-5 mx-auto max-w-6xl px-6 grid grid-cols-1 lg:grid-cols-3 gap-4">

            {/* LEFT: Customer Info */}
            <div className="lg:col-span-2 space-y-2">
              {items.map(item => (
                <Card key={item.id} className="rounded-sm border-l-6 border-gray-400">
                  <CardContent className="flex flex-wrap gap-5 items-center">
                    <img src={item.image} alt={item.productName} className="w-25 h-25 rounded-sm object-cover object-center border" />

                    <div className="flex-1">
                      <h2 className="text-lg font-semibold capitalize">{item.productName}</h2>
                      <p className="text-sm text-muted-foreground capitalize">{item.color} • Size {item.size}</p>
                      <p className="mt-2 font-medium uppercase text-muted-foreground">items - {item.quantity}</p>
                    </div>

                    <div className="flex items-center gap-2">
                      <p className="text-2xl">{item.price.toLocaleString()} MMK</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* RIGHT: Order Summary */}
            <div className="lg:col-span-1 mb-2">
                <div className="sticky top-24">
                    <Card className="rounded-sm shadow-sm">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <ListCheck size={20} />
                                Order Detail
                            </CardTitle>
                        </CardHeader>


                        <CardContent className="space-y-3 text-sm" key={order?.id}>

                            <div className="flex justify-between">
                                <span>Name</span>
                                <span>{order?.name}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Email</span>
                                <span>{order?.email}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Phone</span>
                                <span>{order?.phone}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Address</span>
                                <span className="pl-5 text-justify">{order?.address}</span>
                            </div>
                            <Separator/>
                            <div className="flex justify-between">
                                <span>Status</span>
                                <span className="capitalize">{order?.status}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Total Item</span>
                                <span>{totalItems}</span>
                            </div>

                            <div className="flex justify-between">
                                <span>Subtotal</span>
                                <span>{subTotal.toLocaleString()} MMK</span>
                            </div>

                            <div className="flex justify-between">
                                <span>Delivery</span>
                                <span>5,000 MMK</span>
                            </div>

                            <Separator />

                            <div className="flex justify-between font-semibold text-base">
                                <span>Total</span>
                                <span>{total.toLocaleString()} MMK</span>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>

        </div>
    </div>
    );
}
