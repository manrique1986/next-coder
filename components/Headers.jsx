"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCartContext } from "@/context/cartContext"; 

const Links = [
  {
    Label: "Home",
    href: "/",
  },
  {
    Label: "Nosotros",
    href: "/Nosotros",
  },
  {
    Label: "Productos",
    href: "/productos/all",
  },
  {
    Label: "Admin",
    href: "/Admin",
  },
];

const Headers = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { getTotalItems } = useCartContext(); 
  const pathname = usePathname();
  const totalItems = getTotalItems(); 

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <div>
      <nav className="bg-white border-gray-200 dark:bg-gray-900">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link
            href="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <Image
              src={"/logopizza.png"}
              alt="logopizza"
              width={200}
              height={200}
            />
          </Link>
          <button
            data-collapse-toggle="navbar-default"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-default"
            aria-expanded={isMenuOpen}
            onClick={toggleMenu}
          >
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
          <div
            className={`${
              isMenuOpen ? "block" : "hidden"
            } w-full md:block md:w-auto`}
            id="navbar-default"
          >
            <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              {Links.map((link, index) => {
                const isActive = pathname === link.href;

                return (
                  <li key={index} className="relative">
                    <Link href={link.href} onClick={closeMenu}>
                      <p
                        className={`block py-2 px-3 rounded md:p-0 ${
                          isActive
                            ? "text-[#EB3A00] dark:text-blue-500"
                            : "text-gray-500 dark:text-white"
                        } hover:bg-[#EB3A00] md:hover:bg-transparent md:border-0 md:hover:text-[#EB3A00] dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent`}
                      >
                        {link.Label}
                      </p>
                    </Link>
                  </li>
                );
              })}
              <li className="relative">
                <Link href="/Carrito" onClick={closeMenu}>
                  <Image
                    src="https://res.cloudinary.com/dytpump6i/image/upload/v1724794855/carrito1_xfvl2d.png" // Asegúrate de que esta sea la ruta correcta de la imagen del carrito
                    alt="Carrito"
                    width={30}
                    height={30}
                  />
                     {totalItems > 0 && (
                    <span className="absolute top-0 right-0 bg-red-600 text-white text-xs rounded-full px-2 py-1 mt-6">
                      {totalItems}
                    </span>
                  )}
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Headers;
