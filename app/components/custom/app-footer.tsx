import { Facebook, Twitter, Youtube } from "lucide-react";

export default function AppFooter() {
  return (
    <footer className="w-full bg-gray-950 text-white py-12 px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* About Us */}
        <div>
          <h3 className="text-2xl font-semibold mb-4 underline">About Us</h3>
          <p className="text-gray-400 text-justify">
            Welcome to <strong>SneakerHub</strong>, your ultimate destination for 
            premium sneakers and streetwear. We are passionate about delivering 
            high-quality, trendy, and authentic sneakers to every sneakerhead. 
            Whether you're looking for the latest releases, classic styles, or 
            limited editions, we ensure that every pair meets our high standards 
            of quality and style. Join our community and step up your sneaker game with us!
          </p>
          <div className="flex gap-6 mt-6">
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
              <Facebook className="w-6 h-6 text-blue-600 hover:text-blue-800 transition-colors" />
            </a>
            <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
              <Twitter className="w-6 h-6 text-blue-400 hover:text-blue-600 transition-colors" />
            </a>
            <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer">
              <Youtube className="w-6 h-6 text-red-600 hover:text-red-800 transition-colors" />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-2xl font-semibold mb-4 underline">Quick Links</h3>
          <ul className="text-gray-400 space-y-2">
            <li><a href="/shop" className="hover:text-white transition-colors">Shop</a></li>
            <li><a href="/about" className="hover:text-white transition-colors">About</a></li>
            <li><a href="/contact" className="hover:text-white transition-colors">Contact</a></li>
            <li><a href="/faq" className="hover:text-white transition-colors">FAQ</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-2xl font-semibold mb-4 underline">Contact</h3>
          <p className="text-gray-400">
            Email: <a href="mailto:info@sneakerhub.com" className="hover:text-white transition-colors">info@sneakerhub.com</a>
          </p>
          <p className="text-gray-400 mt-2">
            Phone: <a href="tel:+1234567890" className="hover:text-white transition-colors">+1 234 567 890</a>
          </p>
          <p className="text-gray-400 mt-2">
            Address: 123 Sneaker St, Shoe City, USA
          </p>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="mt-12 border-t border-gray-800 pt-6 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} SneakerHub. All rights reserved.
      </div>
    </footer>
  );
}
