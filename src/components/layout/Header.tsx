"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  HistoryOutlined,
  HomeOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useState } from "react";

const Header = () => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    {
      key: "/predictions",
      icon: <HomeOutlined />,
      label: "Prédictions",
      href: "/app/predictions",
    },
    {
      key: "/profile",
      icon: <UserOutlined />,
      label: "Profil",
      href: "/app/profile",
    },
    {
      key: "/settings",
      icon: <SettingOutlined />,
      label: "Paramètres",
      href: "/app/settings",
    },
    {
      key: "/history",
      icon: <HistoryOutlined />,
      label: "Historique",
      href: "/app/history",
    },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow-lg z-10">
      <div className="flex justify-between items-center px-4 py-2 max-w-[1400px] mx-auto">
        <div className="text-xl font-bold text-primary-100">
          Traffic Predictor
        </div>

        {/* Navigation pour desktop */}
        <nav className="hidden md:block">
          <ul className="flex space-x-6">
            {menuItems.map((item) => (
              <li key={item.key}>
                <Link
                  href={item.href}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md transition-colors text-gray-700
                    ${
                      pathname === item.key
                        ? "bg-primary-100 text-white"
                        : "hover:bg-gray-100 hover:text-primary-100"
                    }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Bouton menu mobile */}
        <button
          type="button"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden flex flex-col justify-center items-center w-10 h-10 relative"
          aria-label="Menu"
        >
          <span
            className={`block w-6 h-0.5 bg-gray-600 transition-all duration-300 ease-out
            ${isMenuOpen ? "rotate-45 translate-y-[5px]" : "-translate-y-1"}`}
          />
          <span
            className={`block w-6 h-0.5 bg-gray-600 transition-all duration-300 ease-out
            ${isMenuOpen ? "opacity-0" : "opacity-100"}`}
          />
          <span
            className={`block w-6 h-0.5 bg-gray-600 transition-all duration-300 ease-out
            ${isMenuOpen ? "-rotate-45 -translate-y-[5px]" : "translate-y-1"}`}
          />
        </button>

        {/* Menu mobile */}
        {isMenuOpen && (
          <nav className="md:hidden absolute top-full right-0 w-64 bg-white shadow-lg rounded-b-lg">
            <ul className="py-2">
              {menuItems.map((item) => (
                <li key={item.key}>
                  <Link
                    href={item.href}
                    className={`flex items-center space-x-2 px-4 py-2 text-gray-700
                      ${
                        pathname === item.key
                          ? "bg-primary-100 text-white"
                          : "hover:bg-gray-100 hover:text-primary-100"
                      }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
