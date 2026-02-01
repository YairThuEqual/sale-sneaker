import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar"
import { Button } from "~/components/ui/button"
import { Separator } from "~/components/ui/separator"
import { Badge } from "~/components/ui/badge"
import { useEffect, useMemo, useState } from "react"
import type { MemberProfile } from "~/lib/model/products/output/member-profile"
import { MemberProfileView } from "~/lib/client/member-product-client"
import type { MemberProductCart, MemberWishlistItem, MmeberOrderList } from "~/lib/model/products/output/member-product-list"
import { Link } from "react-router"
import { Eye, List } from "lucide-react"

export default function AppProfile() {

    const [profile, setProfile] = useState<MemberProfile>()
    const [wish, setWish] = useState<MemberWishlistItem[]>([])
    const [cart, setCart] = useState<MemberProductCart[]>([])
    const [order, setOrder] = useState<MmeberOrderList[]>([])

    useEffect(() => {
        async function load(){
            const response = await MemberProfileView()
            setProfile(response)
            setWish(response.wish)
            setCart(response.cart)
            setOrder(response.order)
        }
        load()
    }, [])

    const totalCart = useMemo(() => {
        return cart.reduce((sum, c) => sum + (c.quantity ?? 0), 0)
    }, [cart])

    const totalItem = useMemo(() => {
      return order.reduce((total, order) => {
        const orderItemTotal = order.orderItems.reduce(
          (sum, item) => sum + (item.quantity ?? 0),
          0
        );
        return total + orderItemTotal;
      }, 0);
    }, [order]);


    return (
        <div className="mt-20 mb-10 px-4 max-w-5xl mx-auto">
        <Card className="rounded-2xl shadow-md">
            <CardHeader className="flex flex-col sm:flex-row items-center gap-6">
            <Avatar className="h-28 w-28">
                <AvatarImage src={profile?.profileImage} className="object-cover object-top" />
                <AvatarFallback>JD</AvatarFallback>
            </Avatar>

            <div className="text-center sm:text-left">
                <CardTitle className="text-3xl font-bold">
                {profile?.name}
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                {profile?.email}
                </p>
                {/* <div className="mt-2">
                <Badge variant="secondary">Sneaker VIP</Badge>
                </div> */}
            </div>
            </CardHeader>

            <Separator />

            <CardContent className="mt-6 space-y-6">
            {/* Personal Info */}
            <div>
                <h3 className="text-lg font-semibold mb-3">Personal Information</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <p><span className="font-medium">Phone:</span> {profile?.phone}</p>
                <p><span className="font-medium">Address:</span> {profile?.address}</p>
                </div>
            </div>

            <Separator />

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 justify-end">
                <Link to={'edit'}>
                    <Button variant="outline">Edit Profile</Button>
                </Link>
                <Link to={'/signin'}>
                    <Button variant="destructive">Logout</Button>
                </Link>
            </div>

            <Separator />

            {/* Stats */}
            <div>
                <h3 className="text-lg font-semibold mb-3">Sneaker Activity</h3>
                <div className="grid grid-cols-3 gap-6 text-center">
                    <Link to={'/member/cart'}>
                        <div className="rounded-xl bg-muted p-4">
                            <p className="text-2xl font-bold">{totalCart}</p>
                            <p className="text-sm text-muted-foreground">Cart</p>
                        </div>
                    </Link>
                    <div className="rounded-xl bg-muted p-4">
                        <p className="text-2xl font-bold">{wish.length}</p>
                        <p className="text-sm text-muted-foreground">Wishlist</p>
                    </div>
                    <div className="rounded-xl bg-muted p-4">
                        <p className="text-2xl font-bold">{order.length}</p>
                        <p className="text-sm text-muted-foreground">Orders</p>
                    </div>
                </div>
            </div>
            
            <Separator />

            <div>
                <h3 className="text-lg font-semibold mb-3 flex gap-2 items-center"><List size={18}/> Order List</h3>
                {order.map(o => 
                    <div key={o.id} className="mb-3 flex justify-between items-end rounded-sm p-4 bg-gray-50 border-l-3 border-green-400">
                        <div className="flex flex-col gap-2">
                            <p className="text-green-400 uppercase">{o.status}</p>
                            <p className="text-2xl">{Number(o.total).toLocaleString()} MMK</p>
                            <p className="text-sm text-gray-400 uppercase">{totalItem > 1 ? `items - ${totalItem}` : `item - ${totalItem}`}</p>
                        </div>
                        <div>
                            <Link to={`orderdetail/${o.id}`}>
                                <Button><Eye/> Details</Button>
                            </Link>
                        </div>
                    </div>
                )}
            </div>
            
            </CardContent>
        </Card>
        </div>
    )
}
