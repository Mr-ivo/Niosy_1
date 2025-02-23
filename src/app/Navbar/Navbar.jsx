"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { FaSearch, FaUserCircle, FaBell, FaBars } from "react-icons/fa";
import styles from "./Navbar.module.css";
import Image from "next/image";

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Movies", href: "/movies" },
    { name: "TV Shows", href: "/tv-shows" },
  ];

  const userMenuLinks = [
    { name: "Profile", href: "/profile" },
    { name: "Settings", href: "/settings" },
    { name: "Help Center", href: "/help" },
    { name: "Sign Out", href: "/signout" },
  ];

  return (
    <nav className={`${styles.navbar} ${isScrolled ? styles.scrolled : ""}`}>
      <div className={styles.navContent}>
        <Link href="/" className={styles.logo}>
          <Image src="/Niosy.png" alt="Logo" width={100} height={32} />
        </Link>

        <div className={styles.mainNav}>
          {navLinks.map((link, index) => (
            <Link key={index} href={link.href} className={styles.navLink}>
              {link.name}
            </Link>
          ))}
        </div>

        <button
          className={styles.hamburgerBtn}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <div
            className={`${styles.hamburgerIcon} ${
              isMobileMenuOpen ? styles.open : ""
            }`}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
        </button>

        <div
          className={`${styles.mobileMenu} ${
            isMobileMenuOpen ? styles.show : ""
          }`}
        >
          {navLinks.map((link, index) => (
            <Link
              key={index}
              href={link.href}
              className={styles.mobileLink}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <div className={styles.mobileUserLinks}>
            <Link href="/profile" className={styles.mobileLink}>
              Profile
            </Link>
            <Link href="/settings" className={styles.mobileLink}>
              Settings
            </Link>
            <Link href="/help" className={styles.mobileLink}>
              Help Center
            </Link>
          </div>
        </div>

        <div className={styles.rightSection}>
          <div
            className={`${styles.searchBox} ${showSearch ? styles.active : ""}`}
          >
            <button
              className={styles.searchBtn}
              onClick={() => setShowSearch(!showSearch)}
            >
              <FaSearch />
            </button>
            <input
              type="text"
              placeholder="Titles, people, genres"
              className={styles.searchInput}
            />
          </div>

          <button className={styles.iconBtn}>
            <FaBell />
            <span className={styles.notificationBadge}>3</span>
          </button>

          <div className={styles.userMenu}>
            <button
              className={styles.iconBtn}
              onClick={() => setShowUserMenu(!showUserMenu)}
            >
              <FaUserCircle />
            </button>

            <div
              className={`${styles.userDropdown} ${
                showUserMenu ? styles.show : ""
              }`}
            >
              {userMenuLinks.map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  className={styles.dropdownLink}
                  onClick={() => setShowUserMenu(false)}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
