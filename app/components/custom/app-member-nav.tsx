import { useEffect, useMemo, useState } from "react";
import { Footprints, LogOut, ShoppingCart, User, Menu, X, Search, Heart } from "lucide-react";
import { NavLink, useNavigate } from "react-router";
import type { MemberProductCart } from "~/lib/model/products/output/member-product-list";
import { MemberProfileView, selectBrandAndCategory } from "~/lib/client/member-product-client";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import type { ProducCategoryList, ProductBrandList } from "~/lib/model/products/output/management-product-list";
import { Button } from "../ui/button";

export default function AppMemberNav() {

  const navigation = useNavigate()

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cart, setCart] = useState<MemberProductCart[]>([]);
  const [brands, setBrands] = useState<ProductBrandList[]>([])
  const [categories, setCategories] = useState<ProducCategoryList[]>([])
  const [searchOpen, setSearchOpen] = useState(false);
  const toggleSearch = () => setSearchOpen(prev => !prev);

  const toggleMenu = () => setMobileMenuOpen(prev => !prev);
  const [keyword, setKeyword] = useState("");
  const [selectedBrand, setSelectedBrand] = useState<string>("")
  const [selectedCategory, setSelectCategory] = useState<string>("")

  const onBrandChange = (value: string) => {
    setSelectedBrand(value);
    setSelectCategory(""); // reset category
    setKeyword("")
    navigation(`/member/product/search?brand=${value}`);
  };

  const onCategoryChange = (value: string) => {
    setSelectCategory(value);
    setSelectedBrand(""); // reset brand
    setKeyword("")
    navigation(`/member/product/search?category=${value}`);
  };

  const onSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!keyword.trim()) return;

    // reset filters
    setSelectedBrand("");
    setSelectCategory("");

    navigation(`/member/product/search?keyword=${encodeURIComponent(keyword)}`);
  };


  useEffect(() => {
    async function loadCart() {
      try {
        const response = await MemberProfileView();
        setCart(response.cart ?? []);
      } catch (error) {
        console.error("Failed to load cart", error);
      }
    }

    async function loadBrandAndCategory() {
      const result = await selectBrandAndCategory();
      setBrands(result.brand); 
      setCategories(result.categories);
    }


    loadCart();
    loadBrandAndCategory();

    // 🔥 listen cart updates
    window.addEventListener("cart-updated", loadCart);

    return () => window.removeEventListener("cart-updated", loadCart);
  }, []);

  


  const totalQuantity = useMemo(() => {
    return cart.reduce((sum, item) => sum + (item.quantity ?? 0), 0);
  }, [cart]);

  return (
    <nav className="bg-gray-900 text-white sticky top-0 z-50 shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">

          {/* LOGO */}
          <NavLink to="/member" className="flex items-center gap-2">
            <Footprints className="animate-bounce" size={28} color="red" />
            <span className="uppercase text-xl sm:text-2xl font-bold">
              <span className="text-white">My</span>{" "}
              <span className="text-orange-500">Sneaker</span>
            </span>
          </NavLink>

          {/* DESKTOP LINKS */}
          <div className="hidden md:flex md:items-center md:gap-4">
            <NavLink to="/member" className="hover:text-orange-300">Home</NavLink>
            {/* Brand Select */}
            <div className="py-2">
              <Select value={selectedBrand} onValueChange={onBrandChange}>
                <SelectTrigger className="border-none w-fit">
                  <SelectValue placeholder="Brands" />
                </SelectTrigger>
                <SelectContent>
                  {brands.map(b => (
                    <SelectItem key={b.id} value={b.name} className="capitalize">
                      {b.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="py-2">
              <Select value={selectedCategory} onValueChange={onCategoryChange}>
                <SelectTrigger className="border-none w-fit">
                  <SelectValue placeholder="Categories" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(c => (
                    <SelectItem key={c.id} value={c.name} className="capitalize">
                      {c.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>


            <NavLink to="/member/aboutus" className="hover:text-orange-300">About Us</NavLink>
            <NavLink to="/member/contact" className="hover:text-orange-300">Contact</NavLink>
          </div>

          {/* DESKTOP ICONS */}
          <div className="hidden md:flex md:items-center md:gap-4">
            {/* SEARCH (Desktop) */}
            {/* SEARCH (Desktop Toggle) */}
            <div className="relative">
              {!searchOpen ? (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleSearch}
                >
                  <Search />
                </Button>
              ) : (
                <form onSubmit={onSearch} className="flex items-center gap-1">
                  <input
                    type="text"
                    value={keyword}
                    autoFocus
                    onChange={(e) => setKeyword(e.target.value)}
                    placeholder="Search..."
                    className="px-2 w-40 py-1 rounded-md text-white focus:outline-none"
                  />
                  <Button type="submit" size="sm">
                    Search
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      setSearchOpen(false);
                      setKeyword("");
                    }}
                  >
                    <X />
                  </Button>
                </form>
              )}
            </div>

            <NavLink to="/member/wishlist" className="relative hover:text-orange-300">
              <Heart />
            </NavLink>

            <NavLink to="/member/cart" className="relative flex items-center hover:text-orange-300">
              <ShoppingCart />
              {totalQuantity > 0 && (
                <span className="absolute -top-2 -right-3 bg-red-500 text-xs rounded-full px-2 py-0.5">
                  {totalQuantity}
                </span>
              )}
            </NavLink>
            <NavLink to="/member/profile" className="hover:text-orange-300">
              <User />
            </NavLink>
            <NavLink to="/signin" className="hover:text-red-400">
              <LogOut />
            </NavLink>
          </div>

          {/* MOBILE MENU */}
          <div className="md:hidden flex items-center">
            <button onClick={toggleMenu}>
              {mobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-gray-900 px-4 pb-4">

          <NavLink to="/member" className="block py-2">Home</NavLink>

          {/* Brand Select (Mobile) */}
          <div className="py-2">
            <Select value={selectedBrand} onValueChange={onBrandChange}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Brands" />
              </SelectTrigger>
              <SelectContent>
                {brands.map((b) => (
                  <SelectItem key={b.id} value={b.name} className="capitalize">
                    {b.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Category Select (Mobile) */}
          <div className="py-2">
            <Select value={selectedCategory} onValueChange={onCategoryChange}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Categories" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((c) => (
                  <SelectItem key={c.id} value={c.name} className="capitalize">
                    {c.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* SEARCH (Mobile) */}
          {/* SEARCH (Mobile Toggle) */}
          <div className="py-2">
            {!searchOpen ? (
              <Button
                variant="outline"
                className="w-full flex gap-2"
                onClick={toggleSearch}
              >
                <Search size={18} /> Search
              </Button>
            ) : (
              <form onSubmit={onSearch} className="flex gap-2">
                <input
                  type="text"
                  value={keyword}
                  autoFocus
                  onChange={(e) => setKeyword(e.target.value)}
                  placeholder="Search sneakers..."
                  className="w-full px-3 py-2 rounded-md text-white focus:outline-none"
                />
                <Button type="submit">Go</Button>
              </form>
            )}
          </div>


          <NavLink to="/member/aboutus" className="block py-2">About Us</NavLink>
          <NavLink to="/member/contact" className="block py-2">Contact</NavLink>

          <NavLink to="/member/cart" className="block py-2">
            <ShoppingCart className="inline mr-2" /> Cart ({totalQuantity})
          </NavLink>
          <NavLink to="/member/wishlist" className="block py-2">
            <Heart className="inline mr-2" /> Wishlist
          </NavLink>

          <NavLink to="/member/profile" className="block py-2">Profile</NavLink>
          <NavLink to="/signin" className="block py-2 text-red-400">Sign Out</NavLink>
        </div>
      )}
    </nav>
  );
}
