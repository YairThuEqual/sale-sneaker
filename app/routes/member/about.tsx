import { Footprints } from "lucide-react";
import { Link } from "react-router";
import AppFooter from "~/components/custom/app-footer";

export default function AboutUs () {
    return (
        <section>

            <div className="w-full">
                <div className="flex gap-5">
                    <div className="flex-1 flex justify-between items-center">
                        <img src="/app/image/aboutus.jpg" alt="AboutUs" />
                    </div>
                    <div className="flex-1 flex flex-col justify-center px-20">
                        <h2 className="uppercase text-2xl font-semibold mb-2 flex gap-3">
                            <Footprints size={30} className="animate-bounce"/>
                            About us
                            <Footprints size={30} className="animate-bounce"/>
                        </h2>
                      <p className="text-gray-700">
                        Welcome to <strong><Link to={'/'} className="uppercase hover:underline"> My Sneaker</Link></strong>, your ultimate destination for 
                        premium sneakers. We are dedicated to bringing you the latest trends, 
                        classic styles, and exclusive releases from top brands around the world. 
                        At SneakerHub, we combine passion, quality, and style to help you step 
                        up your sneaker game. Whether you're a casual fan or a collector, our 
                        curated selection ensures you find the perfect pair every time.
                      </p>
                    </div>

                </div>
            </div>

            <AppFooter/>
        </section>
    )
}