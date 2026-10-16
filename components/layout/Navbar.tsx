"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Menu, X, Search, BatteryCharging, Briefcase, 
  ShieldCheck, Phone, MapPin, Zap, ChevronDown, Sparkles 
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";
import Image from "next/image";
import { useGlobalSettings } from "@/components/GlobalSettingsProvider";

const productCategories = [
  { name: "Four Wheeler / Car", href: "/products?category=passenger-vehicles", icon: "🚗", desc: "High CCA batteries for cars & SUVs" },
  { name: "Two Wheeler / Bike", href: "/products?category=two-wheelers", icon: "🏍️", desc: "VRLA AGM maintenance-free batteries" },
  { name: "Commercial & Trucks", href: "/products?category=commercial-vehicles", icon: "🚚", desc: "Heavy-duty vibration resistant power" },
  { name: "Tractor & Farm", href: "/products?category=tractors", icon: "🚜", desc: "Rugged agricultural cranking power" },
  { name: "Inverter & Tubular", href: "/products?category=inverter-batteries", icon: "⚡", desc: "Deep cycle home & office backup" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [productsDropdownOpen, setProductsDropdownOpen] = useState(false);
  const pathname = usePathname();
  const settings = useGlobalSettings();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [mobileMenuOpen]);

  return (
    <>
      {/* Top Utility Bar (Amaron / Exide / VARTA benchmark) */}
      <div className="hidden lg:block bg-slate-950 text-slate-300 text-xs py-2 border-b border-white/5 relative z-50">
        <div className="container flex justify-between items-center">
          <div className="flex items-center gap-6">
            <a 
              href="tel:9220404411" 
              className="flex items-center gap-1.5 hover:text-brand transition-colors text-slate-300 font-medium"
            >
              <Phone size={13} className="text-brand" />
              <span>Customer Care: <strong className="text-white">9220404411</strong></span>
            </a>
            <span className="text-slate-600">•</span>
            <div className="flex items-center gap-1.5 text-slate-400">
              <Zap size={13} className="text-amber-400" />
              <span>OEM Grade High Cranking Power</span>
            </div>
          </div>

          <div className="flex items-center gap-6 font-medium">
            <Link 
              href="/warranty" 
              className="flex items-center gap-1 hover:text-white transition-colors text-slate-300"
            >
              <ShieldCheck size={13} className="text-brand" />
              <span>Instant Warranty Check</span>
            </Link>
            <span className="text-slate-600">•</span>
            <Link 
              href="/dealers" 
              className="flex items-center gap-1 hover:text-white transition-colors text-slate-300"
            >
              <MapPin size={13} className="text-amber-400" />
              <span>Find Nearest Dealer</span>
            </Link>
            <span className="text-slate-600">•</span>
            <Link 
              href="/dealer/login" 
              className="text-brand hover:underline font-bold"
            >
              Dealer Portal
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <header
        className={clsx(
          "sticky top-0 left-0 w-full z-40 transition-all duration-300 ease-in-out border-b backdrop-blur-xl",
          {
            "bg-slate-950/90 border-white/10 shadow-xl py-3.5": isScrolled,
            "bg-slate-950/95 border-white/5 py-4": !isScrolled,
          }
        )}
      >
        <div className="container flex items-center justify-between">
          {/* Logo with High-Tech Aura */}
          <Link href="/" className="flex items-center gap-3 z-50 group">
            <div className="relative">
              <div className="absolute inset-0 bg-brand/30 blur-md rounded-full group-hover:bg-brand/50 transition-all" />
              <Image 
                src="/assets/logo/tilak.svg" 
                alt="Goodwin Tilak" 
                width={36} 
                height={42} 
                className="object-contain relative z-10" 
                priority
              />
            </div>
            <div className="flex flex-col">
              <Image 
                src="/assets/logo/Goodwin.png" 
                alt={settings?.company_name || "Goodwin Batteries"} 
                width={150} 
                height={46} 
                className="object-contain invert brightness-200" 
                priority
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center gap-7">
            <ul className="flex items-center gap-7">
              <li>
                <Link
                  href="/"
                  className={clsx(
                    "text-sm font-semibold tracking-wide transition-colors relative py-1",
                    pathname === "/" ? "text-brand" : "text-slate-200 hover:text-white"
                  )}
                >
                  Home
                  {pathname === "/" && (
                    <motion.div layoutId="navIndicator" className="absolute -bottom-1 left-0 right-0 h-[2px] bg-brand rounded-full" />
                  )}
                </Link>
              </li>

              {/* Products Dropdown */}
              <li 
                className="relative"
                onMouseEnter={() => setProductsDropdownOpen(true)}
                onMouseLeave={() => setProductsDropdownOpen(false)}
              >
                <Link
                  href="/products"
                  className={clsx(
                    "text-sm font-semibold tracking-wide transition-colors flex items-center gap-1 py-1",
                    pathname.startsWith("/products") ? "text-brand" : "text-slate-200 hover:text-white"
                  )}
                >
                  Products
                  <ChevronDown size={14} className={clsx("transition-transform duration-200", productsDropdownOpen && "rotate-180")} />
                </Link>

                <AnimatePresence>
                  {productsDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.15 }}
                      className="absolute top-full left-0 w-80 pt-3 z-50"
                    >
                      <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-3 backdrop-blur-xl">
                        <div className="text-[11px] font-extrabold uppercase tracking-widest text-brand px-3 py-1.5">
                          Battery Categories
                        </div>
                        {productCategories.map((cat) => (
                          <Link
                            key={cat.name}
                            href={cat.href}
                            className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-800/80 transition-colors group"
                            onClick={() => setProductsDropdownOpen(false)}
                          >
                            <span className="text-2xl mt-0.5">{cat.icon}</span>
                            <div>
                              <div className="text-sm font-bold text-white group-hover:text-brand transition-colors">
                                {cat.name}
                              </div>
                              <div className="text-xs text-slate-400 leading-tight">
                                {cat.desc}
                              </div>
                            </div>
                          </Link>
                        ))}
                        <div className="mt-2 pt-2 border-t border-slate-800 px-3 py-1 flex justify-between items-center">
                          <Link 
                            href="/products" 
                            className="text-xs font-bold text-brand hover:underline"
                            onClick={() => setProductsDropdownOpen(false)}
                          >
                            View All Catalogue &rarr;
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>

              <li>
                <Link
                  href="/battery-finder"
                  className={clsx(
                    "text-sm font-semibold tracking-wide transition-colors flex items-center gap-1.5 py-1",
                    pathname === "/battery-finder" ? "text-brand" : "text-slate-200 hover:text-white"
                  )}
                >
                  <Sparkles size={14} className="text-amber-400 animate-pulse" />
                  Battery Finder
                </Link>
              </li>

              <li>
                <Link
                  href="/why-goodwin"
                  className={clsx(
                    "text-sm font-semibold tracking-wide transition-colors py-1",
                    pathname === "/why-goodwin" ? "text-brand" : "text-slate-200 hover:text-white"
                  )}
                >
                  Why Goodwin
                </Link>
              </li>

              <li>
                <Link
                  href="/warranty"
                  className={clsx(
                    "text-sm font-semibold tracking-wide transition-colors py-1",
                    pathname === "/warranty" ? "text-brand" : "text-slate-200 hover:text-white"
                  )}
                >
                  Warranty
                </Link>
              </li>

              <li>
                <Link
                  href="/dealers"
                  className={clsx(
                    "text-sm font-semibold tracking-wide transition-colors py-1",
                    pathname === "/dealers" ? "text-brand" : "text-slate-200 hover:text-white"
                  )}
                >
                  Dealers
                </Link>
              </li>

              <li>
                <Link
                  href="/about"
                  className={clsx(
                    "text-sm font-semibold tracking-wide transition-colors py-1",
                    pathname === "/about" ? "text-brand" : "text-slate-200 hover:text-white"
                  )}
                >
                  About
                </Link>
              </li>
            </ul>
          </nav>

          {/* Actions */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="/dealer-distributor"
              className="text-xs font-bold text-slate-300 hover:text-white border border-slate-700 hover:border-slate-500 px-4 py-2.5 rounded-full flex items-center gap-1.5 transition-all bg-slate-900/60"
            >
              <Briefcase size={14} />
              Become a Dealer
            </Link>

            <Link
              href="/battery-finder"
              className="text-xs font-extrabold uppercase tracking-wider bg-brand hover:bg-brand-dark text-white px-5 py-2.5 rounded-full flex items-center gap-2 shadow-lg shadow-brand/25 hover:shadow-brand/40 transition-all active:scale-[0.98] glow-brand"
            >
              <BatteryCharging size={16} />
              Find Your Battery
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="xl:hidden z-50 text-white p-2 rounded-lg bg-slate-900 border border-slate-800 hover:bg-slate-800 transition-colors focus-visible:outline-none"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile Full-Screen Automotive Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="fixed inset-0 z-30 bg-slate-950 text-white xl:hidden flex flex-col pt-24 pb-8 px-6 overflow-y-auto"
          >
            {/* Quick Helper Banner */}
            <div className="mb-6 p-4 rounded-xl bg-gradient-to-r from-brand/20 to-amber-500/10 border border-brand/30 flex items-center justify-between">
              <div>
                <div className="text-xs text-amber-400 font-bold uppercase tracking-wider">Helpline</div>
                <a href="tel:9220404411" className="text-lg font-black text-white hover:text-brand">9220404411</a>
              </div>
              <Link 
                href="/warranty" 
                onClick={() => setMobileMenuOpen(false)}
                className="bg-brand text-white text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1"
              >
                <ShieldCheck size={14} /> Warranty
              </Link>
            </div>

            <nav className="flex flex-col gap-4 flex-1">
              {[
                { name: "Home", href: "/" },
                { name: "Products & Catalogue", href: "/products" },
                { name: "Vehicle Battery Finder", href: "/battery-finder" },
                { name: "Why Goodwin (Engineering)", href: "/why-goodwin" },
                { name: "Locate Dealer", href: "/dealers" },
                { name: "Check Warranty Status", href: "/warranty" },
                { name: "About Goodwin", href: "/about" },
                { name: "Support & Contact", href: "/support" },
                { name: "Dealer Portal", href: "/dealer/login" },
              ].map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                >
                  <Link
                    href={link.href}
                    className={clsx(
                      "text-xl font-heading font-bold transition-colors py-1 block",
                      pathname === link.href ? "text-brand" : "text-slate-300 hover:text-white"
                    )}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </nav>
            
            <div className="flex flex-col gap-3 mt-8 pt-6 border-t border-slate-800">
              <Link
                href="/battery-finder"
                className="w-full py-3.5 bg-brand text-white text-center rounded-xl font-bold text-base flex items-center justify-center gap-2 active:scale-95 transition-transform shadow-lg shadow-brand/20"
                onClick={() => setMobileMenuOpen(false)}
              >
                <BatteryCharging size={20} />
                Find Your Battery
              </Link>
              <Link
                href="/dealer-distributor"
                className="w-full py-3 border border-slate-700 text-slate-200 text-center rounded-xl font-bold text-sm flex items-center justify-center gap-2 active:scale-95 transition-transform"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Briefcase size={18} />
                Become a Dealer / Partner
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
