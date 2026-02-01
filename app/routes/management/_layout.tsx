import { Home, ListOrdered, LogOut, ShoppingCart, Users } from "lucide-react";
import { useState } from "react";
import { Outlet } from "react-router";
import AppBreadcrumb from "~/components/custom/app-breadcrumb";
import AppSideBar, { type MENU_ITMES } from "~/components/custom/app-side-bar";
import { SidebarProvider, SidebarTrigger } from "~/components/ui/sidebar";

export const handle = {
    title: "Management"
}

export default function Layout() {

    return (
        <SidebarProvider>
            <div className="flex h-screen w-full">
                <AppSideBar menu={MENUS} />

                <div className="flex-1 overflow-y-auto">
                    <div className="sticky top-0 z-50 py-2 flex items-center backdrop-blur-2xl">
                        <SidebarTrigger /> |
                        <div className="ml-2">
                            <AppBreadcrumb />
                        </div>
                    </div>

                    <main className="w-full px-2 ">
                        <Outlet />
                    </main>
                </div>
            </div>
        </SidebarProvider>
    );
}



const MENUS: MENU_ITMES[] = [
    {icon: <Home size={20}/>, title: "Home", url: '/management'},
    {icon: <ShoppingCart size={20}/>, title: "Product", url: '/management/product'},
    {icon: <ListOrdered size={20}/>, title: "Order", url: '/management/order'},
    {icon: <Users size={20}/>, title: "Members", url: '/management/members' },
    {icon: <LogOut size={20}/>, title: "Log Out", url: '/signin'}
]