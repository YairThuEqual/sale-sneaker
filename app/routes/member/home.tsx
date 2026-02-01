import { Footprints, Settings } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import AppProductCard from "~/components/custom/app-product-card";
import { Button } from "~/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "~/components/ui/carousel";
import { ProductShowList } from "~/lib/client/member-product-client";
import type { MemberProductList } from "~/lib/model/products/output/member-product-list";

type Item = {
    image: string,
    title: string,
    subTitle: string,
    description: string
}

export default function MemberHome () {

    const [newProducts, setNewProducts] = useState<MemberProductList[]>([]);
    const [products, setProducts] = useState<MemberProductList[]>([]);

    useEffect(() => {
      async function load() {
        const data = await ProductShowList();

        setNewProducts(data.slice(0, 6));      // first 6
        setProducts(data.slice(6, 15));        // 6 to 14
      }
      load();
    }, []);

    return (
      <section>
        <Slides />
        <AppProductCard label="new items" products={newProducts} />
        <AppProductCard label="items" products={products} />
      </section>
    );
}

function SlideItems({image, title, subTitle, description}: Item) {
    return (
        <div className="w-full h-full flex justify-center items-center">
        <div className="flex-1 flex items-center justify-center p-10">
            <img width={450} height={450} src={image} alt={image.toString()}/>
        </div>
        <div className="w-full h-full flex-1 flex flex-col justify-center items-start text-white ml-5 p-10">
            <h1 className="mb-5 flex justify-center items-center">
            <span className="text-5xl mr-3">{title}</span>
            <Footprints className="animate-bounce" color="red" size={60}/> 
            </h1>
            <h4 className="mt-2 text-3xl">{subTitle}</h4>
            <p className="mt-3">{description}</p>
            <Button className="mt-5 rounded-2xl" asChild>
            <Link to={'/member'}><Settings className="animate-spin"/> Shop Now</Link>
            </Button>
        </div>
        </div>
    )
}

function Slides({}) {

    const slideData: Item[] = [
        {
        image: "/app/image/slide/slide-1.png",
        title: "Sneaker Sale",
        subTitle: "Step Into Style",
        description: "Discover the latest sneakers with unbeatable comfort and exclusive discounts."
        },
        {
        image: "/app/image/slide/slide-2.png",
        title: "Street & Sport",
        subTitle: "Find Your Perfect Pair",
        description: "From casual wear to performance shoes, enjoy premium sneakers at sale prices."
        },
        {
        image: "/app/image/slide/slide-3.png",
        title: "Run the Future",
        subTitle: "Premium Sneakers on Sale",
        description: "Upgrade your run with modern design, advanced comfort, and limited-time offers."
        },
    ];

    return (
        <header 
        className="w-full h-full bg-cover bg-center bg-no-repeat" 
        style={{ backgroundImage: "url('/app/image/home-background.jpg')", height: 650 }}>
        <Carousel className="w-full h-full flex justify-center items-center">
            <CarouselContent>
            {slideData.map((item, index) => (
                <CarouselItem key={index} className="flex justify-center items-center">
                <SlideItems  {...item} />
                </CarouselItem>
            ))}
            </CarouselContent>
            <CarouselPrevious className="cursor-pointer left-4"/>
            <CarouselNext className="cursor-pointer right-4"/>
        </Carousel>
        </header>
    )
}