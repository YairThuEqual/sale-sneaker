import type React from "react"

type TitlePage = {
    icon?: React.ReactNode,
    title: string
}

export default function AppPageTitle({icon, title}: TitlePage) {

    return (
        <h1 className="flex gap-2 uppercase text-2xl items-center">
            {icon}
            {title}
        </h1>
    )
}