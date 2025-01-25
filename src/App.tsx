import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { ProductCard } from './components/ProductCard';
import { Cart } from './components/Cart';
import { products } from './data/products';
import { CartItem, Product } from './types';
import { ArrowRight } from 'lucide-react';

function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (product: Product) => {
    setCartItems((currentItems) => {
      const existingItem = currentItems.find(
        (item) => item.product.id === product.id
      );

      if (existingItem) {
        return currentItems.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...currentItems, { product, quantity: 1 }];
    });
  };

  const updateQuantity = (productId: number, newQuantity: number) => {
    if (newQuantity < 1) {
      setCartItems((items) =>
        items.filter((item) => item.product.id !== productId)
      );
      return;
    }

    setCartItems((items) =>
      items.map((item) =>
        item.product.id === productId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const categories = Array.from(new Set(products.map(p => p.category)));

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar
        cartItemCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
        onCartClick={() => setIsCartOpen(true)}
      />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="mb-12 relative rounded-xl overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8"
            alt="Hero Banner"
            className="w-full h-[500px] object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 to-transparent flex items-center">
            <div className="text-white p-12">
              <h1 className="text-5xl font-bold mb-4">Welcome to Dove</h1>
              <p className="text-xl mb-8 max-w-lg">Discover a world of premium products curated just for you. Shop the latest trends in fashion, electronics, and home decor.</p>
              <button className="bg-white text-gray-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Explore Now
              </button>
            </div>
          </div>
        </div>

        {/* Featured Categories */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Shop by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((category) => (
              <div key={category} className="group relative overflow-hidden rounded-lg aspect-square">
                <img
                  src={products.find(p => p.category === category)?.image}
                  alt={category}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors flex items-center justify-center">
                  <div className="text-center text-white">
                    <h3 className="text-xl font-bold mb-2">{category}</h3>
                    <button className="flex items-center gap-2 text-sm bg-white/20 px-4 py-2 rounded-full hover:bg-white/30 transition-colors">
                      Shop Now <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* New Arrivals */}
        <section className="mb-16">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">New Arrivals</h2>
            <button className="text-blue-600 hover:text-blue-700 flex items-center gap-2">
              View All <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.slice(0, 4).map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={addToCart}
              />
            ))}
          </div>
        </section>

        {/* Trending Now */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Trending Now</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.slice(4, 8).map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={addToCart}
              />
            ))}
          </div>
        </section>

        {/* Special Offers */}
        <section className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="relative rounded-xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04"
                alt="Special Offer 1"
                className="w-full h-[300px] object-cover"
              />
              <div className="absolute inset-0 bg-black/40 p-8 flex flex-col justify-center">
                <h3 className="text-white text-2xl font-bold mb-4">Summer Collection</h3>
                <p className="text-white/90 mb-4">Get up to 40% off on selected items</p>
                <button className="bg-white text-gray-900 px-6 py-2 rounded-lg font-semibold self-start hover:bg-gray-100">
                  Shop Now
                </button>
              </div>
            </div>
            <div className="relative rounded-xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1441986300917-64674bd600d8"
                alt="Special Offer 2"
                className="w-full h-[300px] object-cover"
              />
              <div className="absolute inset-0 bg-black/40 p-8 flex flex-col justify-center">
                <h3 className="text-white text-2xl font-bold mb-4">Tech Essentials</h3>
                <p className="text-white/90 mb-4">Free shipping on orders over $50</p>
                <button className="bg-white text-gray-900 px-6 py-2 rounded-lg font-semibold self-start hover:bg-gray-100">
                  Shop Now
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Newsletter */}
        <section className="bg-gray-900 text-white rounded-xl p-12 text-center">
          <h2 className="text-3xl font-bold mb-4">Join the Dove Community</h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter and get 10% off your first purchase, plus stay updated with our latest collections and exclusive offers.
          </p>
          <div className="flex max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-l-lg text-gray-900"
            />
            <button className="bg-blue-600 px-6 py-3 rounded-r-lg font-semibold hover:bg-blue-700">
              Subscribe
            </button>
          </div>
        </section>
      </main>

      {isCartOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
          <Cart
            items={cartItems}
            onClose={() => setIsCartOpen(false)}
            onUpdateQuantity={updateQuantity}
          />
        </div>
      )}
    </div>
  );
}

export default App;