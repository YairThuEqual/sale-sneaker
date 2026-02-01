import { Outlet } from "react-router";
import AppAnonymousNav from "~/components/custom/app-anonymous-nav";

export default function Layout() {
    return (
        <div>
            <div className="sticky z-30 top-0">
                <AppAnonymousNav/>
            </div>

            <main>
                <Outlet/>
            </main>
        </div>
    )
}