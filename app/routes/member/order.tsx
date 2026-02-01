import { zodResolver } from "@hookform/resolvers/zod";
import { MapPin, Phone, User, CreditCard, ListOrdered } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import z from "zod";
import AppFormInput from "~/components/custom/app-form-input";
import AppFormTextarea from "~/components/custom/app-form-textarea";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Separator } from "~/components/ui/separator";
import { MemberCart, OrderCreate } from "~/lib/client/member-product-client";
import { OrderSchema, type OrderForm } from "~/lib/model/input/m-product-cart";
import type { MemberProductCart } from "~/lib/model/products/output/member-product-list";

export default function AppOrder() {

    const navigate = useNavigate();

    const [cart, setCart] = useState<MemberProductCart[]>([]);

    useEffect(() => {
        async function load() {
        const data = await MemberCart();
        setCart(data);
        }
        load();
    }, []);

    const totalItems = useMemo(() => cart.reduce((sum, i) => sum + i.quantity, 0), [cart]);
    const subTotal = useMemo(() => cart.reduce((sum, i) => sum + i.price * i.quantity, 0), [cart]);
    const deliveryFee = subTotal > 0 ? 5000 : 0;
    const total = subTotal + deliveryFee;

    const form = useForm({
        resolver: zodResolver(OrderSchema),
        defaultValues: {
            name: "",
            email: "",
            phone: "",
            address: "",
            total: 0,
        }
    }) 

    useEffect(() => {
        form.setValue("total", total);
    }, [total, form]);

    const orderHandle = async (form: OrderForm) => {
        const response = await OrderCreate(form)
        if(!response.check){
            alert("Something went wrong with your order!");
            return;
        }
        window.dispatchEvent(new Event("cart-updated"));
        alert('Your order success')
        navigate(`/member/profile/orderdetail/${response.id}`)
    }

    return (
        <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(orderHandle)} className="flex flex-col gap-2">
            <div className="min-h-screen bg-gray-50">
                <div className="mt-18 mx-auto max-w-6xl px-6 grid grid-cols-1 lg:grid-cols-3 gap-6">

                    {/* LEFT: Customer Info */}
                    <div className="lg:col-span-2 space-y-6 mb-2">
                        <Card className="rounded-2xl shadow-sm">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <User size={20} />
                                    Customer Information
                                </CardTitle>
                            </CardHeader>

                            <CardContent className="space-y-4">
                                
                                <AppFormInput control={form.control} label="Full Name" path="name" />
                                <AppFormInput control={form.control} label="Email" path="email" />
                                <AppFormInput control={form.control} label="Phone Number" path="phone" />
                                <AppFormTextarea control={form.control} label="Address" path="address" />
                                <AppFormInput control={form.control} label="" path="total" type="hidden" />
                                    
                            </CardContent>
                        </Card>

                        {/* <Card className="rounded-2xl shadow-sm">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <CreditCard size={20} />
                                    Payment Method
                                </CardTitle>
                            </CardHeader>

                            <CardContent className="space-y-3">
                                <label className="flex items-center gap-2">
                                    <input type="radio" name="payment" defaultChecked />
                                    Cash on Delivery
                                </label>

                                <label className="flex items-center gap-2">
                                    <input type="radio" name="payment" />
                                    KBZ Pay
                                </label>

                                <label className="flex items-center gap-2">
                                    <input type="radio" name="payment" />
                                    Wave Pay
                                </label>
                            </CardContent>
                        </Card> */}
                    </div>

                    {/* RIGHT: Order Summary */}
                    <div className="lg:col-span-1 mb-2">
                        <div className="sticky top-24">
                            <Card className="rounded-2xl shadow-sm">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <ListOrdered size={20} />
                                        Order Summary
                                    </CardTitle>
                                </CardHeader>


                                <CardContent className="space-y-3 text-sm">

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

                                <CardFooter>
                                    <Button type="submit" className="w-full rounded-none">
                                        Place Order
                                    </Button>
                                </CardFooter>
                            </Card>
                        </div>
                    </div>

                </div>
            </div>
        </form>
    </FormProvider>
    );
}
