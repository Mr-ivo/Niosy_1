'use client'
import Link from "next/link";
import React, { useState } from "react";
import {
  FaEnvelope,
  FaFacebook,
  FaHandshake,
  FaSearch,
  FaShoppingCart,
  FaTwitter,
  FaYoutube,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import styles from "./Navbar.module.css";
import Image from "next/image";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Categories", href: "/categories" },
    { name: "Contact us ", href: "/contact" },
    { name: "Login", href: "/login" },
  ];

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <>
      <div className={styles.container2}>
        <div className={styles.container}>
          <div className={styles.logoContainer}>
            <h1 className={styles.logo}>
              <Link href={"/"}>
                <Image src={"/Niosy.png"} width={100} height={100} alt="Logo" />
              </Link>
            </h1>
            <div className={styles.menuIcon} onClick={toggleMenu}>
              {menuOpen ? <FaTimes size={30} /> : <FaBars size={30} />}
            </div>
          </div>
          <ul className={`${styles.navLinks} ${menuOpen ? styles.showMenu : ""}`}>
            {links.map((link, index) => (
              <Link href={link.href} className={styles.link} key={index}>
                {link.name}
              </Link>
            ))}
            <h3>
              {" "}
              <FaSearch className={styles.searchIcon} />{" "}
            </h3>
            <div className={styles.cartIcon}>
              <FaShoppingCart />
              <div className={styles.cartCount}>8</div>
            </div>
          </ul>
        </div>
        <div className={styles.all}>
          <span>
            {" "}
            <FaEnvelope className={styles.envelope} size={22} />
          </span>
          <span>
            {" "}
            <FaFacebook className={styles.envelope} size={22} />{" "}
          </span>
          <span>
            {" "}
            <FaYoutube className={styles.envelope} size={22} />
          </span>
          <span>
            {" "}
            <FaTwitter className={styles.envelope} size={22} />
          </span>
          <span>
            {" "}
            <FaHandshake className={styles.envelope} size={22} />
          </span>
        </div>
        <div className={styles.hope}>
          <Image
            src={"/Untitled_Project-removebg-preview.png"}
            width={500}
            height={500}
            alt="Hope Image"
          />
        </div>
        <div className={styles.master}>
          <div className={styles.ten}>
            <h3>10</h3>
            <p className={styles.great}>
              Join us <br /> lets stream together
            </p>
          </div>
          <div className={styles.nines}>
            <h4>Musika Live Show</h4>
            <p className={styles.greats}>You all are highly welcome</p>
          </div>
          <div className={styles.nine}>
            <h4 className={styles.great}>
              28 <br /> SAT
            </h4>
            <h4 className={styles.great}>
              60 <br /> WAT
            </h4>
            <h4 className={styles.great}>
              32 <br /> MET
            </h4>
            <h4 className={styles.great}>
              18 <br /> NET
            </h4>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;


