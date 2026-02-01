import { Outlet } from "react-router";

export const handle = {
    title: "Product"
}


export default function Layout() {
    return (
        <Outlet/>
    )
}