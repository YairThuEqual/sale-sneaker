import { Home, ShoppingBag, ShoppingCart } from "lucide-react";
import { Link, Outlet } from "react-router";
import { Button } from "~/components/ui/button";

export default function Layout() {
    return (
        <div className="flex w-full min-h-screen">
            <div className="w-full flex flex-1 flex-col text-center justify-center items-center bg-gray-700 text-white">
                <ShoppingCart size={150} className="animate-bounce"/>
                <h1 className="text-3xl uppercase">My Sneaker</h1>
                <Button asChild className="flex cursor-pointer bg-transparent border hover:border-0">
                    <Link to={'/'} className="mt-3">
                        <Home/> Home
                    </Link>
                </Button>
            </div>
            <main className="flex flex-1 justify-center items-center">
                <div>
                    <article className="w-100 flex border-2 rounded-2xl p-5">
                        <Outlet/>
                    </article>
                </div>
            </main>
        </div>
    )
}