import type { MemberProductList } from "~/lib/model/products/output/member-product-list";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import { Button } from "../ui/button";
import { Eye, Heart } from "lucide-react";
import { memberWishlistToggle } from "~/lib/client/member-product-client";

export default function AppProductCard({ products, label }: { products?: MemberProductList[], label: string}) {
    return (
        <section className="w-full my-4 px-4 py-8">
            <div className="lg:px-8 mb-4">
                <h1 className="uppercase text-3xl text-center">{label}</h1>
            </div>

            <div className="lg:px-8">
                <div className="flex gap-4 overflow-x-auto py-2 scrollbar-none">
                    {products?.map(item => (
                        <ProductCard key={item.id} item={item} />
                    ))}
                </div>
            </div>
            <div className="flex justify-center mt-5">
                <Button className="capitalize">
                    <Link to={'/'} className="flex items-center gap-1"><Eye/> see all</Link>
                </Button>
            </div>
        </section>
    );
}

function ProductCard({ item }: { item: MemberProductList }) {
    const [selectedColorId, setSelectedColorId] = useState<number | null>(null);
    const [selectedImage, setSelectedImage] = useState(item.image);
    const [wished, setWished] = useState(item.wish);

    useEffect(() => {
        setSelectedImage(item.image);
        setSelectedColorId(null);
        setWished(item.wish);  // <-- use wish from backend
    }, [item.id]);

    const toggleWish = async () => {
        const res = await memberWishlistToggle(item.id);
        if (res.check) {
            setWished(prev => !prev);
        }
    };

    return (
        <div className="w-fit flex flex-col gap-2 p-4 hover:shadow relative">
            <div className="w-[260px] h-[250px] overflow-hidden relative">
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={toggleWish}
                    className="absolute top-2 right-2 z-10 bg-white/90 hover:bg-white"
                >
                    <Heart
                        className={`transition ${
                            wished
                                ? "fill-red-500 text-red-500"
                                : "text-gray-600"
                        }`}
                    />
                </Button>

                <Link to={`product/${item.id}`}>
                    <img
                        src={selectedImage}
                        alt={item.name}
                        className="w-full h-full object-cover object-center"
                    />
                </Link>
            </div>

            <div className="flex flex-col gap-2">
                <h3 className="font-semibold text-lg">{item.name}</h3>

                <div className="flex gap-3">
                    {item.colors.map(c => (
                        <AppColorRadio
                            key={c.id}
                            id={c.id}
                            colorCode={c.colorCode}
                            checked={selectedColorId === c.id}
                            onSelect={() => {
                                setSelectedColorId(c.id);
                                if (c.image) setSelectedImage(c.image);
                            }}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

type ColorRadioProps = {
    id: number;
    colorCode: string;
    checked: boolean;
    onSelect: () => void;
};
function AppColorRadio({ colorCode, checked, onSelect }: ColorRadioProps) {
    return (
        <label className="cursor-pointer">
            <input
                type="radio"
                checked={checked}
                onChange={onSelect}
                className="hidden"
            />

            <div
                className="w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all"
                style={{
                    borderColor: checked ? "#000" : "#ccc",
                }}
            >
                <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: colorCode }}
                />
            </div>
        </label>
    );
}
