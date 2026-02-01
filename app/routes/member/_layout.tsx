import { Outlet } from "react-router";
import AppAnonymousNav from "~/components/custom/app-anonymous-nav";
import AppFooter from "~/components/custom/app-footer";
import AppMemberNav from "~/components/custom/app-member-nav";

export default function Layout() {
    return (
        <div>
        <div className="w-full fixed top-0 z-30">
            <AppMemberNav/>
        </div>
        <main className="w-full min-h-screen">
            <Outlet/>

            <footer>
            <AppFooter/>
            </footer>
        </main>

        </div>
    )
}

