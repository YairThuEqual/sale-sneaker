import { Eye, Footprints, Settings, ShoppingCart } from "lucide-react";
import { Link } from "react-router";
import AppAnonymousNav from "~/components/custom/app-anonymous-nav";
import AppFooter from "~/components/custom/app-footer";
import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "~/components/ui/carousel";

export function meta() {
  return [
    { title: "My Sneaker | Home" }
  ];
}

type Item = {
  image: string,
  title: string,
  subTitle: string,
  description: string
}

export default function Home() {
  return (
    <div>
      <div className="w-full fixed top-0 z-30">
        <AppAnonymousNav/>
      </div>
      <main className="w-full min-h-screen">
        <Slides />
        <Content/>

        <footer>
          <AppFooter/>
        </footer>
      </main>

    </div>
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
          <Link to={'/'}><Settings className="animate-spin"/> Shop Now</Link>
        </Button>
      </div>
    </div>
  )
}

function Slides() {

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

function Content() {
  return (
    <section className="w-full my-4 px-4">
      <div className="lg:px-8 mb-4">
        <h1 className="uppercase text-3xl text-center">Items</h1>
      </div>
      <div className="lg:px-8">
        <Link to={'/signin'}>
          <div className="flex gap-4 overflow-x-auto py-2 scrollbar-none">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="min-w-[300px] border-2 rounded-2xl p-3 flex flex-col items-center flex-shrink-0"
              >
                <div className="w-[300px] h-[300px] overflow-hidden rounded-md">
                  <img
                    src={`/app/image/sales/shoe-${i}.jpg`}
                    alt={`Shoe ${i}`}
                    className="w-full h-full object-cover object-center"
                  />
                </div>
                <div className="w-full mt-3">
                  <h3 className="font-semibold">Shoe {i}</h3>
                  <p>jfksjfjkkgl</p>
                </div>
              </div>
            ))}
          </div>
        </Link>
      </div>
    </section>
  );
}