import { Car, CheckCheck, CheckCircle2Icon, ListCheck } from "lucide-react"
import { useEffect, useMemo, useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "~/components/ui/card"
import { ManagementOrderConfirmed, ManagementOrderItemsDetail } from "~/lib/client/management-product-clients"
import type { Route } from "./+types/detail"
import type { ManagementOrderListItems } from "~/lib/model/management-orders/Mangement-order"
import { Button } from "~/components/ui/button"
import { Separator } from "~/components/ui/separator"
import { toast } from "sonner"
import { Alert, AlertDescription, AlertTitle } from "~/components/ui/alert"

export const handle = {
    title: "Detail"
}

export async function loader ({params}: Route.LoaderArgs) {return {id: params.orderId}}

export default function AppOrderDetail ({loaderData}: Route.ComponentProps) {

    const id = Number(loaderData.id)
    const [showAlert, setShowAlert] = useState(false)

    const [orderItems, setOrderItems] = useState<ManagementOrderListItems>()

    useEffect(() => {
        async function load() {
            const response = await ManagementOrderItemsDetail(id)
            setOrderItems(response)
        }
        load()
    }, [])

    const totalItems = useMemo(() => {
        return orderItems?.orderItems.reduce((sum, i) => sum + (i.quantity ?? 0), 0);
    }, [orderItems?.orderItems]);

    const onConfirmed = async () => {
      const res = await ManagementOrderConfirmed(id)

      if (res.check) {
        setOrderItems(o =>
          o ? { ...o, order: { ...o.order, status: "Confirmed" } } : o
        )

        setShowAlert(true) 
      }
    }

    return (
    <div>
        <div>
            {showAlert && (
              <Alert className="border-green-600 text-green-600 mb-4">
                <CheckCircle2Icon />
                <AlertTitle>Confirmation Successful</AlertTitle>
                <AlertDescription>
                  The client’s product has been confirmed successfully.
                </AlertDescription>
              </Alert>
            )}
        </div>
        <div className="mt-3 mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="lg:col-span-1 mb-2">
                <div className="sticky top-24">
                    <Card className="rounded-sm shadow-sm">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Avatar className="w-16 h-16">
                                    <AvatarImage src={orderItems?.order.member.image} className="object-cover object-top"/>
                                    <AvatarFallback>{orderItems?.order.member.name}</AvatarFallback>
                                </Avatar>
                                <span>
                                    <p>{orderItems?.order.member.name}</p>
                                    <p>{orderItems?.order.email}</p>
                                </span>
                            </CardTitle>
                        </CardHeader>


                        <CardContent className="space-y-3 text-sm">

                            <div className="flex justify-between">
                                <span>Name</span>
                                <span>{orderItems?.order.name}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Email</span>
                                <span>{orderItems?.order.email}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Phone</span>
                                <span>{orderItems?.order.phone}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Address</span>
                                <span className="pl-5 text-justify">{orderItems?.order.address}</span>
                            </div>
                            <Separator/>
                            <div className="flex justify-between">
                                <span>Ordered At</span>
                                <span className="capitalize">{orderItems?.order.orderedAt}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Status</span>
                                <span className="capitalize">{orderItems?.order.status}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Total Item</span>
                                <span>{totalItems}</span>
                            </div>

                            <div className="flex justify-between">
                                <span>Subtotal</span>
                                <span>{(Number(orderItems?.order.total) - 5000).toLocaleString()} MMK</span>
                            </div>

                            <div className="flex justify-between">
                                <span>Delivery</span>
                                <span>5,000 MMK</span>
                            </div>

                            <Separator />

                            <div className="flex justify-between font-semibold text-base">
                                <span>Total</span>
                                <span>{Number(orderItems?.order.total).toLocaleString()} MMK</span>
                            </div>
                            
                        </CardContent>
                        <CardFooter className="w-full">
                            {orderItems?.order.status?.toLowerCase() === "pending" && (
                                <Button 
                                    onClick={onConfirmed}
                                    className="bg-green-600">
                                    <CheckCheck /> Confirm
                                </Button>
                            )}

                            {orderItems?.order.status?.toLowerCase() === "confirmed" && (
                                <Button className="bg-red-600 w-full">
                                    <Car /> Delivered
                                </Button>
                            )}

                            {orderItems?.order.status?.toLowerCase() === "delivered" && (
                                <Button disabled className="bg-gray-400">
                                <Car /> Delivered
                                </Button>
                            )}
                        </CardFooter>
                    </Card>
                </div>
            </div>

            {/* LEFT: Customer Info */}
            <div className="lg:col-span-2 space-y-2">
                {orderItems?.orderItems.map(item => 
                    <Card className="rounded-sm border-l-6 border-green-600">
                    <CardContent className="flex flex-wrap gap-5 items-center">
                        <img src={item.image} className="w-20 h-20 rounded-sm object-cover object-center border" />

                        <div className="flex-1">
                        <h2 className="text-md font-semibold capitalize">{item.productName}</h2>
                        <p className="text-sm text-muted-foreground capitalize">{item.color} • Size {item.size}</p>
                        <p className="mt-2 text-md-center uppercase text-muted-foreground">items - {item.quantity}</p>
                        </div>

                        <div className="flex items-center gap-2">
                        <p className="text-md">{item.price.toLocaleString()} MMK</p>
                        </div>
                    </CardContent>
                    </Card>
                )}
            </div>
        </div>
    </div>
    )
}