import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router";
import type { MemberProductList } from "~/lib/model/products/output/member-product-list";
import { searchProductByFilter, memberWishlistToggle } from "~/lib/client/member-product-client";
import { Heart } from "lucide-react";
import { Button } from "~/components/ui/button";

export default function SearchProduct() {

  const [products, setProducts] = useState<MemberProductList[]>([]);
  const location = useLocation();

  useEffect(() => {
    async function loadProducts() {
      const query = new URLSearchParams(location.search);
      const keyword = query.get("keyword") || undefined
      const brand = query.get("brand") || undefined;
      const category = query.get("category") || undefined;

      const result = await searchProductByFilter({ keyword, brand, category });
      setProducts(result);
    }

    loadProducts();
  }, [location.search]);

  return (
    <section className="mt-18">
      <div className="py-10 max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.length === 0 ? (
          <div className="col-span-full text-center text-gray-500">
            Sorry! This product is currently unavailable.
          </div>
        ) : (
          products.map((p) => (
            <ProductCard key={p.id} item={p} />
          ))
        )}
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
    setWished(item.wish);  // wish value from backend
  }, [item.id]);

  const toggleWish = async () => {
    const res = await memberWishlistToggle(item.id);
    if (res.check) {
      setWished(prev => !prev);
    }
  };

  return (
    <div className="hover:shadow p-4 relative">
      <div className="w-full h-50 overflow-hidden relative">

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

        <Link to={`/member/product/${item.id}`}>
          <img
            src={selectedImage}
            alt={item.name}
            className="w-full h-full object-cover"
          />
        </Link>
      </div>

      <h3 className="mt-3 font-bold">{item.name}</h3>
      <p className="text-gray-500">{item.brand.name}</p>

      <div className="flex gap-3 mt-2">
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
