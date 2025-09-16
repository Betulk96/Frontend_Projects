"use client";
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { FaSun, FaMoon, FaRegUser } from "react-icons/fa";
import { useTheme } from 'next-themes';
import { MdDashboard } from 'react-icons/md';
import DietitianOverlayMenu from './DietitianOverlayMenu';

const UserSection = ({ session }) => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
 

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleDarkMode = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  if (!mounted) return null;

  return (
    <>
      {/* Üst bar */}
      <div className="fixed top-0 -right-2 sm:right-3 z-50 m-2 flex items-center sm:gap-2 bg-color4 dark:bg-gray-800/20 backdrop-blur-md border border-white/20 dark:border-white/10
    py-1 sm:py-2 px-1 sm:px-4 rounded-full text-white shadow-lg shadow-black/30  ">


        {/* Kullanıcı ismi */}
        {session && session.user ? (
          <div className="flex items-center gap-2">
            {['admin', 'dietitian'].includes(session.user.role) ? (
              <Link
                href={`/dashboard/${session.user.role}`}
                className=" tracking-wide hover:underline hidden sm:inline" // Küçük ekranda gizle
              >
                {session.user.username}
              </Link>
            ) : (
              <span className="  hidden sm:inline">{session.user.username}</span>
            )}
          </div>
        ) : (
          <div className="text-sm text-gray-500 dark:text-gray-400"><FaRegUser  /></div>
        )}
        <div className="hidden sm:inline h-6 w-px bg-white/20 mx-1"></div>
        <div>
          {/* Dark Mode Toggle */}
          <button
            onClick={toggleDarkMode}
            className="p-1  rounded-full hover:bg-gray-300 dark:hover:bg-gray-600 transition"
            title="Dark Mode Toggle"
          >
            {theme === 'dark' ? <FaSun className='w-4 h-4 lg:w-5 lg:h-5' color="#ffffff" /> : <FaMoon className='w-4 h-4 lg:w-5 lg:h-5' color="#ffffff" />}
          </button>

          {/* Menü Açma Butonu */}
          <button
            onClick={toggleMenu}
            className="p-1  rounded-full hover:bg-gray-300 dark:hover:bg-gray-600 transition"
            title="Open Menu"
          >
            <MdDashboard className='w-4 h-4 lg:w-5 lg:h-5' color="#ffffff" />
          </button>
        </div>

      </div>

      {/* Overlay Menü */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-40 backdrop-blur-sm bg-black/40 flex items-center justify-center"
          onClick={closeMenu}
        >
          <DietitianOverlayMenu onClose={closeMenu} role={session?.user?.role} />
        </div>
      )}
    </>
  );
};

export default UserSection;
