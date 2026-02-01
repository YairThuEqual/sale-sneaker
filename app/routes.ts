import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),

    layout("./routes/anonymous/_layout.tsx", [
        route("/about", "./routes/anonymous/aboutus.tsx"),
        route("/contact", "./routes/anonymous/contact.tsx")
    ]),

    layout("./routes/auth/_layout.tsx", [
        route("/signin", "./routes/auth/signin.tsx"),
        route("/signup", "./routes/auth/signup.tsx")
    ]),

    route("/member", "./routes/member/_layout.tsx", [
        index("./routes/member/home.tsx"),

        route("wishlist", "./routes/member/wishlist.tsx"),
        route("product/:id", "./routes/member/detail.tsx"),
        route("contact", "./routes/member/contact.tsx"),
        route("aboutus", "./routes/member/about.tsx"),
        route("cart", "./routes/member/cart.tsx"),
        route("orderlist", "./routes/member/order-list.tsx"),
        route("order", "./routes/member/order.tsx"),
        route("profile", "./routes/member/profile.tsx"),
        route("profile/edit", "./routes/member/profile-edit.tsx"),
        route("profile/orderdetail/:orderId", "./routes/member/order-detail.tsx"),
        route("product/search", "./routes/member/search-product.tsx")
    ]),

    route("/management", "./routes/management/_layout.tsx", [
        index("./routes/management/home.tsx"),
        
        route("members", "./routes/management/members.tsx"),
        route("order", "./routes/management/orders/_layout.tsx", [
            index("./routes/management/orders/list.tsx"),

            route(":orderId", "./routes/management/orders/detail.tsx")
        ]),

        route("product", "./routes/management/products/_layout.tsx", [
            index("./routes/management/products/list.tsx"),

            route("edit/:id?", "./routes/management/products/edit.tsx"),
            route("b&ca", "./routes/management/products/brand-and-category.tsx"),

            route(":id/color", "./routes/management/products/details.tsx", [
                index("./routes/management/products/sizes/list.tsx"),
                route(":colorId/size", "./routes/management/products/sizes/size.tsx")
            ])
        ])
    ])
] satisfies RouteConfig;
