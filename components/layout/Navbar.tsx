"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Search, BatteryCharging, Briefcase } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";
import Image from "next/image";
import { useGlobalSettings } from "@/components/GlobalSettingsProvider";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Products", href: "/products" },
  { name: "Applications", href: "/applications" },
  { name: "Why Goodwin", href: "/why-goodwin" },
  { name: "About", href: "/about" },
  { name: "Support", href: "/support" },
  { name: "Dealer", href: "/dealer/login" },
  { name: "Admin", href: "/admin/login" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const settings = useGlobalSettings();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [mobileMenuOpen]);

  return (
    <>
      <header
        className={clsx(
          "fixed top-0 left-0 w-full z-50 transition-all duration-300 ease-in-out border-b",
          {
            "bg-white/95 backdrop-blur-md border-border shadow-sm py-4": isScrolled,
            "bg-white border-transparent py-5": !isScrolled,
          }
        )}
      >
        <div className="container flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 z-50">
            <Image 
              src="/assets/logo/tilak.svg" 
              alt="Tirupati Tilak" 
              width={38} 
              height={44} 
              className="object-contain"
              priority
            />
            <Image 
              src="/assets/logo/Goodwin.png" 
              alt={settings?.company_name || "Goodwin Batteries"} 
              width={160} 
              height={50} 
              className="object-contain"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            <ul className="flex items-center gap-8">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className={clsx(
                      "text-sm font-semibold tracking-wide transition-colors relative group",
                      pathname === link.href ? "text-primary" : "text-foreground hover:text-primary"
                    )}
                  >
                    {link.name}
                    <span
                      className={clsx(
                        "absolute -bottom-2 left-0 h-[2px] bg-primary transition-all duration-300",
                        pathname === link.href ? "w-full" : "w-0 group-hover:w-full"
                      )}
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Actions */}
          <div className="hidden lg:flex items-center gap-4">
            <button 
              className="text-foreground hover:text-primary p-2 rounded-full hover:bg-surface-hover transition-colors"
              aria-label="Search"
            >
              <Search size={20} />
            </button>
            
            <Link
              href="/dealer-distributor"
              className="text-sm font-semibold text-secondary border border-border hover:border-primary hover:text-primary px-5 py-2.5 rounded-full flex items-center gap-2 transition-all hover:bg-surface"
            >
              <Briefcase size={16} />
              Become a Dealer
            </Link>
            
            <Link
              href="/battery-finder"
              className="text-sm font-bold bg-primary text-white hover:bg-primary/90 px-6 py-2.5 rounded-full flex items-center gap-2 shadow-md hover:shadow-lg transition-all active:scale-[0.98]"
            >
              <BatteryCharging size={18} />
              Find Your Battery
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden z-50 text-foreground p-2 rounded-md hover:bg-surface-hover transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </header>

      {/* Mobile Full-Screen Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-0 z-40 bg-white lg:hidden flex flex-col pt-24 pb-8 px-6 overflow-y-auto"
          >
            <nav className="flex flex-col gap-6 flex-1">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 + 0.1 }}
                >
                  <Link
                    href={link.href}
                    className={clsx(
                      "text-3xl font-heading font-bold transition-colors block",
                      pathname === link.href ? "text-primary" : "text-foreground hover:text-primary"
                    )}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </nav>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col gap-4 mt-8 pt-8 border-t border-border"
            >
              <Link
                href="/battery-finder"
                className="w-full py-4 bg-primary text-white text-center rounded-xl font-bold text-lg flex items-center justify-center gap-2 active:scale-95 transition-transform"
                onClick={() => setMobileMenuOpen(false)}
              >
                <BatteryCharging size={24} />
                Find Your Battery
              </Link>
              <Link
                href="/dealer-distributor"
                className="w-full py-4 border-2 border-border text-foreground text-center rounded-xl font-bold text-lg flex items-center justify-center gap-2 active:scale-95 transition-transform"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Briefcase size={24} />
                Become a Dealer
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
