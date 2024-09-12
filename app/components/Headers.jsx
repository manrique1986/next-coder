"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCartContext } from "app/context/cartContext";
import { useAuthContext } from "app/context/AuthContext"; 
import Swal from "sweetalert2"; 

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

  const { isAuthenticated, user, logout } = useAuthContext(); 

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);


  const handleLogout = async () => {
    await logout(); 
    closeMenu();


    Swal.fire({
      title: "¡Has cerrado sesión!",
      text: "Esperamos verte pronto.",
      icon: "success",
      confirmButtonText: "OK",
    });
  };

  return (
    <header>
      <nav className="bg-white border-b border-gray-200 dark:bg-gray-900 z-50">
        <div className="max-w-screen-xl flex items-center justify-between p-4 mx-auto">
          <Link href="/" className="flex items-center">
            <Image
              src="/logopizza.png"
              alt="Logo Pizza"
              width={150}
              height={150}
            />
          </Link>

     
          <button
            className="md:hidden p-2 text-gray-500 rounded-lg hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 transition-transform duration-300"
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

      
          <div
            className={`fixed inset-0 bg-white transition-transform duration-300 md:relative md:flex md:items-center md:space-x-8 ${
              isMenuOpen ? "transform translate-x-0 z-50" : "transform -translate-x-full"
            } md:transform-none md:bg-transparent`}
            style={{ zIndex: isMenuOpen ? 50 : 0 }}
          >
            <ul className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6 p-4 md:p-0">
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

              <li className="relative md:hidden">
                <Link href="/Carrito" onClick={closeMenu}>
                  <Image
                    src="https://res.cloudinary.com/dytpump6i/image/upload/v1726179310/carrito-de-compras_ysqcxl.png"
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

        
              <li className="flex items-center space-x-4">
                {isAuthenticated ? (
                  <>
                  
                    <p className="text-lg text-gray-700 dark:text-gray-300">
                      ¡Hola, {user?.email}!
                    </p>
                    <button
                      onClick={handleLogout}
                      className="text-lg bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <Link href="/Admin" onClick={closeMenu}>
                    <button className="text-lg bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                      Login
                    </button>
                  </Link>
                )}
              </li>
            </ul>
          </div>

          {/* Carrito (siempre visible en pantallas grandes) */}
          <div className="hidden md:block relative">
            <Link href="/Carrito">
              <Image
                src="https://res.cloudinary.com/dytpump6i/image/upload/v1726179310/carrito-de-compras_ysqcxl.png"
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
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Headers;