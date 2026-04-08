"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import "./Navbar.css";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navbarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        navbarRef.current &&
        !navbarRef.current.contains(e.target as Node)
      ) {
        setMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="navbar">
      <div className="navbar-container" ref={navbarRef}>

        <Link href="/" className="navbar-logo">
          Meals Diary
        </Link>

        <button
          className="navbar-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>

        <div className={`navbar-menu ${menuOpen ? "active" : ""}`}>
          <Link href="/" className="navbar-link" onClick={() => setMenuOpen(false)}>
            Home
          </Link>

          <Link href="/foods" className="navbar-link" onClick={() => setMenuOpen(false)}>
            Foods
          </Link>

          <Link href="/ingredients" className="navbar-link" onClick={() => setMenuOpen(false)}>
            Ingredients
          </Link>
        </div>

      </div>
    </nav>
  );
}