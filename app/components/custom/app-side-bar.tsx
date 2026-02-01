import type React from "react";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupAction, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "../ui/sidebar";
import { NavLink } from "react-router";
import { Home, ShoppingBasket } from "lucide-react";

export type MENU_ITMES = {
    icon: React.ReactNode,
    title: string,
    url: string
}

export default function AppSideBar ({menu} : {menu: MENU_ITMES[]}) {
    return (
        <Sidebar className="">
            <SidebarHeader>
                <div className="flex gap-3 text-2xl">
                    <ShoppingBasket size={30}/> 
                    My Sneaker
                </div>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Application</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {menu.map((Item, index) => 
                                <SidebarMenuItem key={index}>
                                    <SidebarMenuButton asChild>
                                        <NavLink to={Item.url} className="flex gap-2 items-center">
                                            {Item.icon}
                                            {Item.title}
                                        </NavLink>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            )}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>  
    )
}