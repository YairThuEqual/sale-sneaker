import { Footprints } from "lucide-react";
import { NavLink } from "react-router";

export default function AppAnonymousNav () {
    return (
        <nav className="flex justify-between px-8 py-4 shadow bg-gray-800 sticky top-0 z-30">
            <NavLink to={'/'} className="flex gap-2">
                <Footprints className="animate-bounce" size={30} color="red"/>
                <span className="uppercase text-2xl font-bold">
                  <span className="text-white">My</span>{" "}
                  <span className="text-orange-500">Sneaker</span>
                </span>

            </NavLink>

            <ul className="flex gap-4 items-center text-white">
                <li>
                    <NavLink to={'/about'}>About Us</NavLink>
                </li>
                <li>
                    <NavLink to={'/contact'}>Contact</NavLink>
                </li>
                <li>
                    <NavLink to={'/signin'}>Sign in</NavLink>
                </li>
            </ul>
        </nav>
    )
}