import React, { useState } from 'react';
import { ShoppingCart, Search, Menu, ChevronDown, MapPin, Heart } from 'lucide-react';
import { products } from '../data/products';

interface NavbarProps {
  cartItemCount: number;
  onCartClick: () => void;
}

interface CategoryMenu {
  name: string;
  subcategories: string[];
  featured?: {
    name: string;
    price: number;
    image: string;
  };
}

export function Navbar({ cartItemCount, onCartClick }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const categoryMenus: CategoryMenu[] = [
    {
      name: "New Arrivals",
      subcategories: ["Latest Drops", "This Week's Releases", "Coming Soon", "Exclusive Items"],
      featured: {
        name: "Classic White Sneakers",
        price: 79.99,
        image: "https://images.unsplash.com/photo-1549298916-b41d501d3772"
      }
    },
    {
      name: "Trending",
      subcategories: ["Most Popular", "Best Sellers", "Top Rated", "Editor's Choice"],
      featured: {
        name: "Wireless Headphones",
        price: 199.99,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e"
      }
    },
    {
      name: "Electronics",
      subcategories: ["Smartphones", "Laptops", "Audio", "Accessories", "Gaming"],
      featured: {
        name: "Smart Watch",
        price: 299.99,
        image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12"
      }
    },
    {
      name: "Fashion",
      subcategories: ["Men's Clothing", "Women's Clothing", "Shoes", "Accessories", "Jewelry"],
      featured: {
        name: "Leather Backpack",
        price: 129.99,
        image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa"
      }
    },
    {
      name: "Home & Kitchen",
      subcategories: ["Furniture", "Appliances", "Decor", "Kitchen Tools", "Bedding"],
      featured: {
        name: "Coffee Maker",
        price: 89.99,
        image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085"
      }
    },
    {
      name: "Beauty",
      subcategories: ["Skincare", "Makeup", "Haircare", "Fragrances", "Tools"],
      featured: {
        name: "Skincare Set",
        price: 59.99,
        image: "https://images.unsplash.com/photo-1612817288484-6f916006741a"
      }
    },
    {
      name: "Sports",
      subcategories: ["Workout Gear", "Athletic Wear", "Equipment", "Accessories", "Nutrition"],
      featured: {
        name: "Yoga Mat",
        price: 29.99,
        image: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f"
      }
    },
    {
      name: "Books",
      subcategories: ["Fiction", "Non-Fiction", "Children's", "Academic", "E-Books"],
      featured: {
        name: "Best Sellers Collection",
        price: 49.99,
        image: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d"
      }
    }
  ];

  return (
    <div className="bg-white shadow-md relative z-50">
      {/* Announcement Bar */}
      <div className="bg-gray-900 text-white text-sm py-2 text-center">
        Free shipping on orders over $50 | Shop now and save up to 50%
      </div>

      {/* Top Navigation */}
      <div className="border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center h-16 gap-4">
            {/* Logo */}
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold text-gray-900">Dove</h1>
            </div>

            {/* Search Bar */}
            <div className="flex-1 max-w-3xl">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for products..."
                  className="w-full py-2 pl-4 pr-10 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
                <button className="absolute right-0 top-0 h-full px-4 text-gray-500 hover:text-gray-700">
                  <Search className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Account & Wishlist */}
            <div className="hidden md:flex items-center space-x-6">
              <div className="cursor-pointer hover:text-blue-600">
                <div className="text-xs text-gray-600">Welcome</div>
                <div className="font-medium">Sign In / Register</div>
              </div>
              <button className="relative p-2 text-gray-600 hover:text-blue-600">
                <Heart className="h-6 w-6" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full h-5 w-5 flex items-center justify-center text-xs">
                  0
                </span>
              </button>
            </div>

            {/* Cart */}
            <button
              onClick={onCartClick}
              className="relative p-2 text-gray-600 hover:text-blue-600"
            >
              <ShoppingCart className="h-6 w-6" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-blue-600 text-white rounded-full h-5 w-5 flex items-center justify-center text-xs">
                  {cartItemCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Categories Navigation */}
      <div className="border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center h-12">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="flex items-center text-gray-700 hover:text-blue-600 mr-8"
            >
              <Menu className="h-5 w-5 mr-2" />
              All Categories
            </button>
            <div className="hidden md:flex space-x-8">
              {categoryMenus.map((category) => (
                <div
                  key={category.name}
                  className="relative"
                  onMouseEnter={() => setActiveCategory(category.name)}
                  onMouseLeave={() => setActiveCategory(null)}
                >
                  <button className="text-sm text-gray-700 hover:text-blue-600 py-3 flex items-center gap-1">
                    {category.name}
                    <ChevronDown className="h-4 w-4" />
                  </button>
                  
                  {/* Dropdown Menu */}
                  {activeCategory === category.name && (
                    <div className="absolute top-full left-0 w-[600px] bg-white shadow-lg rounded-lg p-6 grid grid-cols-12 gap-6">
                      {/* Subcategories */}
                      <div className="col-span-7">
                        <h3 className="font-semibold text-gray-900 mb-4">Categories</h3>
                        <ul className="space-y-3">
                          {category.subcategories.map((sub) => (
                            <li key={sub}>
                              <a href="#" className="text-gray-600 hover:text-blue-600">
                                {sub}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      {/* Featured Item */}
                      {category.featured && (
                        <div className="col-span-5">
                          <h3 className="font-semibold text-gray-900 mb-4">Featured</h3>
                          <div className="group">
                            <div className="aspect-square rounded-lg overflow-hidden bg-gray-100 mb-3">
                              <img
                                src={category.featured.image}
                                alt={category.featured.name}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                              />
                            </div>
                            <h4 className="text-sm font-medium text-gray-900">{category.featured.name}</h4>
                            <p className="text-sm text-blue-600">${category.featured.price}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setIsMenuOpen(false)} />
          <div className="absolute left-0 top-0 bottom-0 w-64 bg-white overflow-y-auto">
            <div className="p-4 border-b">
              <h2 className="text-xl font-bold text-gray-900">Categories</h2>
            </div>
            <div className="py-2">
              {categoryMenus.map((category) => (
                <div key={category.name} className="border-b">
                  <button className="flex items-center justify-between w-full px-4 py-2 text-gray-700 hover:bg-gray-50">
                    {category.name}
                    <ChevronDown className="h-4 w-4" />
                  </button>
                  <div className="bg-gray-50 px-4 py-2">
                    {category.subcategories.map((sub) => (
                      <a
                        key={sub}
                        href="#"
                        className="block py-2 text-sm text-gray-600 hover:text-blue-600"
                      >
                        {sub}
                      </a>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}