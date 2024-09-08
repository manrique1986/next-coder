"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCartContext } from "app/context/cartContext";

const Links = [
  { Label: "Home", href: "/" },
  { Label: "Nosotros", href: "/Nosotros" },
  { Label: "Productos", href: "/productos/all" },
  { Label: "Admin", href: "/Admin" },
];

const Headers = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { getTotalItems } = useCartContext();
  const pathname = usePathname();
  const totalItems = getTotalItems();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header>
      <nav className="bg-white border-b border-gray-200 dark:bg-gray-900">
        <div className="max-w-screen-xl flex items-center justify-between p-4 mx-auto">
          <Link href="/" className="flex items-center">
            <Image
              src="/logopizza.png"
              alt="Logo Pizza"
              width={150}
              height={150}
            />
          </Link>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-gray-500 rounded-lg hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
            onClick={toggleMenu}
            aria-controls="navbar"
            aria-expanded={isMenuOpen}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>

          {/* Links & Cart */}
          <div className={`md:flex items-center space-x-8 ${isMenuOpen ? "block" : "hidden"} md:block`}>
            <ul className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
              {Links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} onClick={closeMenu}>
                    <p
                      className={`text-lg py-2 md:py-0 ${
                        pathname === link.href
                          ? "text-[#EB3A00] dark:text-blue-500"
                          : "text-gray-700 dark:text-gray-300"
                      } hover:text-[#EB3A00] dark:hover:text-blue-500`}
                    >
                      {link.Label}
                    </p>
                  </Link>
                </li>
              ))}

              {/* Carrito */}
              <li className="relative">
                <Link href="/Carrito" onClick={closeMenu}>
                  <Image
                    src="https://res.cloudinary.com/dytpump6i/image/upload/v1724794855/carrito1_xfvl2d.png"
                    alt="Carrito"
                    width={30}
                    height={30}
                  />
                  {totalItems > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full px-2">
                      {totalItems}
                    </span>
                  )}
                </Link>
              </li>

              {/* Login */}
              <li>
                <Link href="/Admin" onClick={closeMenu}>
                  <button className="text-lg bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                    Login
                  </button>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Headers;
