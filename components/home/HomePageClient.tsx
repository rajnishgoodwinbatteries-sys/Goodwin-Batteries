"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  ChevronRight, ShieldCheck, Zap, Cog, ArrowRight, MapPin, 
  CheckCircle2, BatteryCharging, Search, Sparkles, Award, 
  Flame, Gauge, RefreshCw, PhoneCall, ShieldAlert, Check,
  Clock, Cpu, Shield, Layers, Wrench, BarChart3, HelpCircle
} from "lucide-react";
import VehicleFinder from "@/components/vehicle-finder/VehicleFinder";
import QuickEnquiryForm from "@/components/forms/QuickEnquiryForm";
import Image from "next/image";
import { GlobalSettings } from "@/components/GlobalSettingsProvider";

export default function HomePageClient({ 
  applications = [], 
  products = [], 
  settings 
}: { 
  applications: any[]; 
  products?: any[]; 
  settings: GlobalSettings | null; 
}) {
  const [activeTab, setActiveTab] = useState<"finder" | "warranty" | "dealer">("finder");
  const [quickSerial, setQuickSerial] = useState("");
  const [quickCity, setQuickCity] = useState("");
  const [selectedSeries, setSelectedSeries] = useState("all");

  // Get top featured products
  const featuredProducts = products.filter(p => p.is_featured).length > 0 
    ? products.filter(p => p.is_featured).slice(0, 4) 
    : products.slice(0, 4);

  const seriesFilter = selectedSeries === "all" 
    ? featuredProducts 
    : products.filter(p => p.category === selectedSeries || p.series === selectedSeries).slice(0, 4);

  return (
    <div className="flex flex-col w-full bg-slate-950 text-white overflow-hidden font-sans">
      
      {/* 1. HERO SECTION (OPTIMA & VARTA Benchmark: Dark Automotive Tech, Glowing Emerald Aura) */}
      <section className="relative w-full min-h-[92vh] flex flex-col justify-center pt-28 pb-20 overflow-hidden bg-radial-hero bg-grid-pattern">
        {/* Glowing atmospheric energy blobs */}
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-brand/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-10 left-10 w-80 h-80 bg-amber-500/10 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="container relative z-20 flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8">
          
          {/* Left Text & Value Proposition */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="flex flex-col items-start w-full lg:w-7/12 max-w-2xl"
          >
            {/* Automotive Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-brand/40 bg-brand/10 backdrop-blur-md mb-6 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-brand animate-ping" />
              <span className="text-emerald-400 text-xs font-black tracking-widest uppercase">
                OEM Engineered • 100% Maintenance-Free
              </span>
            </div>
            
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-heading font-black text-white leading-[1.08] tracking-tight mb-6 uppercase">
              UNCOMPROMISING <br />
              <span className="text-gradient-emerald">POWER.</span> <br />
              <span className="text-white">RELENTLESS DRIVE.</span>
            </h1>
            
            <p className="text-base sm:text-lg text-slate-300 mb-8 leading-relaxed max-w-xl font-normal">
              Engineered for grueling Indian roads and extreme tropical heat. Goodwin Batteries deliver maximum cold-cranking amps, ultra-low self-discharge, and proven endurance for cars, motorcycles, and heavy fleets.
            </p>
            
            {/* Hero CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mb-10">
              <a 
                href="#quick-assistant" 
                className="bg-brand hover:bg-brand-dark text-white px-8 py-4 rounded-xl font-extrabold text-sm uppercase tracking-wider transition-all flex items-center justify-center gap-2.5 shadow-xl shadow-brand/30 hover:shadow-brand/50 active:scale-[0.98] glow-brand"
              >
                <BatteryCharging size={18} />
                Find Battery For Vehicle
              </a>
              <Link 
                href="/products" 
                className="glass-dark hover:bg-slate-800 text-slate-200 hover:text-white px-8 py-4 rounded-xl font-bold text-sm uppercase tracking-wider transition-all flex items-center justify-center gap-2 border border-slate-700/80 active:scale-[0.98]"
              >
                Explore Catalogue
                <ChevronRight size={16} />
              </Link>
            </div>

            {/* Micro Highlights Pill Bar */}
            <div className="grid grid-cols-3 gap-3 w-full border-t border-slate-800/80 pt-6">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
                  <Zap size={18} />
                </div>
                <div>
                  <div className="text-xs font-bold text-white leading-tight">High CCA</div>
                  <div className="text-[11px] text-slate-400">Instant Start</div>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
                  <ShieldCheck size={18} />
                </div>
                <div>
                  <div className="text-xs font-bold text-white leading-tight">Up to 60M</div>
                  <div className="text-[11px] text-slate-400">Total Warranty</div>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 shrink-0">
                  <Award size={18} />
                </div>
                <div>
                  <div className="text-xs font-bold text-white leading-tight">Zero Leak</div>
                  <div className="text-[11px] text-slate-400">AGM VRLA Tech</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right 3D Visual with Floating Specs (OPTIMA & VARTA style) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="w-full lg:w-5/12 relative h-[380px] sm:h-[460px] lg:h-[520px] flex items-center justify-center"
          >
            {/* Concentric Energy Aura */}
            <div className="absolute inset-0 bg-gradient-to-tr from-brand/20 via-emerald-500/10 to-transparent rounded-full blur-[70px]" />
            <div className="absolute w-72 h-72 border border-brand/20 rounded-full animate-spin [animation-duration:30s] pointer-events-none" />
            
            {/* Battery Image */}
            <div className="relative w-full h-full max-w-md flex items-center justify-center z-10 drop-shadow-[0_20px_50px_rgba(0,132,61,0.3)]">
              <Image 
                src="/assets/products/goodwin-12vgw-tz5lb.png" 
                alt="Goodwin High Performance Battery" 
                fill 
                className="object-contain" 
                priority
              />
            </div>

            {/* Floating Spec Badge 1 (Top Left) */}
            <motion.div 
              animate={{ y: [0, -6, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="absolute top-6 -left-4 sm:left-4 z-20 glass-dark px-3.5 py-2.5 rounded-xl border border-emerald-500/30 flex items-center gap-2.5 shadow-xl"
            >
              <div className="w-3 h-3 rounded-full bg-emerald-400 shadow-[0_0_10px_#00E676]" />
              <div>
                <div className="text-[10px] text-slate-400 uppercase font-black">Cranking Power</div>
                <div className="text-xs font-extrabold text-white">550+ Cold Amps</div>
              </div>
            </motion.div>

            {/* Floating Spec Badge 2 (Bottom Right) */}
            <motion.div 
              animate={{ y: [0, 6, 0] }}
              transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut" }}
              className="absolute bottom-8 -right-2 sm:right-6 z-20 glass-dark px-4 py-3 rounded-xl border border-amber-500/30 flex items-center gap-3 shadow-xl"
            >
              <div className="p-2 rounded-lg bg-amber-500/20 text-amber-400">
                <ShieldCheck size={18} />
              </div>
              <div>
                <div className="text-[10px] text-slate-400 uppercase font-black">Replacement Guarantee</div>
                <div className="text-xs font-black text-amber-300">Fast Dealer Swap</div>
              </div>
            </motion.div>
          </motion.div>

        </div>
      </section>

      {/* 2. INTERACTIVE QUICK ASSISTANT (Amaron & Exide Benchmark) */}
      <section id="quick-assistant" className="py-12 bg-slate-900 border-y border-slate-800 relative z-30">
        <div className="container">
          <div className="bg-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl">
            
            {/* Tab Navigation */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-5 mb-6">
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setActiveTab("finder")}
                  className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-black uppercase tracking-wider flex items-center gap-2 transition-all ${
                    activeTab === "finder" 
                      ? "bg-brand text-white shadow-lg shadow-brand/30 glow-brand" 
                      : "text-slate-400 hover:text-white hover:bg-slate-900"
                  }`}
                >
                  <BatteryCharging size={16} />
                  1. Find Battery by Vehicle
                </button>

                <button
                  onClick={() => setActiveTab("warranty")}
                  className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-black uppercase tracking-wider flex items-center gap-2 transition-all ${
                    activeTab === "warranty" 
                      ? "bg-brand text-white shadow-lg shadow-brand/30 glow-brand" 
                      : "text-slate-400 hover:text-white hover:bg-slate-900"
                  }`}
                >
                  <ShieldCheck size={16} />
                  2. Check Warranty Status
                </button>

                <button
                  onClick={() => setActiveTab("dealer")}
                  className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-black uppercase tracking-wider flex items-center gap-2 transition-all ${
                    activeTab === "dealer" 
                      ? "bg-brand text-white shadow-lg shadow-brand/30 glow-brand" 
                      : "text-slate-400 hover:text-white hover:bg-slate-900"
                  }`}
                >
                  <MapPin size={16} />
                  3. Locate Nearest Dealer
                </button>
              </div>

              <div className="hidden md:flex items-center gap-2 text-xs text-slate-400">
                <Sparkles size={14} className="text-amber-400" />
                <span>Verified Match in Seconds</span>
              </div>
            </div>

            {/* Tab 1: Vehicle Finder Shortcut */}
            {activeTab === "finder" && (
              <div className="animate-in fade-in duration-300">
                <div className="mb-4">
                  <h3 className="text-lg font-bold text-white">Select Vehicle Type</h3>
                  <p className="text-xs text-slate-400">Click your vehicle to immediately match recommended Goodwin batteries:</p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3.5 mb-6">
                  {[
                    { name: "Motorcycle / Bike", icon: "🏍️", type: "two-wheelers", count: "VRLA AGM" },
                    { name: "Car / Hatchback / SUV", icon: "🚗", type: "passenger-vehicles", count: "High CCA" },
                    { name: "Truck & Commercial", icon: "🚚", type: "commercial-vehicles", count: "Extreme Duty" },
                    { name: "Tractor / Farm", icon: "🚜", type: "tractors", count: "Shock Proof" },
                    { name: "Inverter / Solar", icon: "⚡", type: "inverter-batteries", count: "Deep Cycle" },
                  ].map((v) => (
                    <Link
                      key={v.name}
                      href={`/battery-finder`}
                      className="bg-slate-900 hover:bg-slate-800/90 border border-slate-800 hover:border-brand/60 p-4 rounded-2xl flex flex-col items-center justify-center text-center transition-all group hover:-translate-y-1 shadow-sm hover:shadow-lg"
                    >
                      <span className="text-3xl mb-2 group-hover:scale-110 transition-transform">{v.icon}</span>
                      <span className="text-xs font-bold text-white group-hover:text-brand transition-colors mb-0.5">{v.name}</span>
                      <span className="text-[10px] text-slate-400 font-medium">{v.count}</span>
                    </Link>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-brand/20 text-brand flex items-center justify-center font-bold">
                      <Search size={20} />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white">Know your vehicle model or registration?</div>
                      <div className="text-xs text-slate-400">Access our comprehensive 400+ vehicle fitment directory.</div>
                    </div>
                  </div>
                  <Link
                    href="/battery-finder"
                    className="w-full sm:w-auto bg-brand hover:bg-brand-dark text-white px-6 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-colors text-center"
                  >
                    Open Complete Vehicle Finder &rarr;
                  </Link>
                </div>
              </div>
            )}

            {/* Tab 2: Quick Warranty Verification */}
            {activeTab === "warranty" && (
              <div className="animate-in fade-in duration-300 max-w-2xl py-2">
                <h3 className="text-lg font-bold text-white mb-1">Check Battery Warranty Status</h3>
                <p className="text-xs text-slate-400 mb-5">
                  Enter the serial number stamped on your Goodwin battery or the QR sticker (e.g. <code>GW-TZ5LB-260924-00128</code>):
                </p>

                <form 
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (quickSerial) {
                      window.location.href = `/warranty?serial=${encodeURIComponent(quickSerial)}`;
                    }
                  }}
                  className="flex flex-col sm:flex-row gap-3"
                >
                  <input
                    type="text"
                    value={quickSerial}
                    onChange={(e) => setQuickSerial(e.target.value.toUpperCase())}
                    placeholder="Enter Serial Number..."
                    className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 font-mono uppercase focus:outline-none focus:border-brand"
                  />
                  <button
                    type="submit"
                    className="bg-brand hover:bg-brand-dark text-white px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2"
                  >
                    <ShieldCheck size={16} />
                    Verify Now
                  </button>
                </form>

                <div className="flex items-center gap-4 mt-4 text-[11px] text-slate-400">
                  <span className="flex items-center gap-1"><Check size={12} className="text-emerald-400" /> Instant expiry check</span>
                  <span className="flex items-center gap-1"><Check size={12} className="text-emerald-400" /> Authorized dealer verification</span>
                  <span className="flex items-center gap-1"><Check size={12} className="text-emerald-400" /> Hassle-free replacement</span>
                </div>
              </div>
            )}

            {/* Tab 3: Dealer Locator Shortcut */}
            {activeTab === "dealer" && (
              <div className="animate-in fade-in duration-300 max-w-2xl py-2">
                <h3 className="text-lg font-bold text-white mb-1">Find Nearest Authorized Goodwin Dealer</h3>
                <p className="text-xs text-slate-400 mb-5">
                  Enter your city, district, or 6-digit pincode to locate certified sales and replacement partners:
                </p>

                <form 
                  onSubmit={(e) => {
                    e.preventDefault();
                    window.location.href = `/dealers?q=${encodeURIComponent(quickCity)}`;
                  }}
                  className="flex flex-col sm:flex-row gap-3"
                >
                  <input
                    type="text"
                    value={quickCity}
                    onChange={(e) => setQuickCity(e.target.value)}
                    placeholder="e.g. Delhi, Indore, Jaipur, 452012..."
                    className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-brand"
                  />
                  <button
                    type="submit"
                    className="bg-brand hover:bg-brand-dark text-white px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2"
                  >
                    <MapPin size={16} />
                    Search Stores
                  </button>
                </form>

                <div className="mt-4 flex items-center justify-between text-xs text-slate-400">
                  <span>Over <strong>500+ service points</strong> nationwide.</span>
                  <Link href="/dealer-distributor" className="text-brand font-bold hover:underline">
                    Want to become a dealer? &rarr;
                  </Link>
                </div>
              </div>
            )}

          </div>
        </div>
      </section>

      {/* 3. BATTERY APPLICATION DOMAINS (Tata Green & GS Yuasa Benchmark) */}
      <section className="py-24 bg-slate-950 relative">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand/10 border border-brand/30 text-brand text-xs font-black tracking-widest uppercase mb-3">
              Comprehensive Coverage
            </div>
            <h2 className="text-3xl sm:text-5xl font-heading font-black text-white uppercase tracking-tight mb-4">
              POWER FOR EVERY APPLICATION
            </h2>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
              From high-vibration motorcycle demands to intense commercial logistics, Goodwin manufactures specialized chemistries optimized for each load profile.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Card 1: Two Wheeler (Tata Green & GS Yuasa focus) */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-brand/60 transition-all group hover:-translate-y-1.5 flex flex-col justify-between shadow-xl">
              <div>
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center text-2xl mb-5 group-hover:scale-110 transition-transform">
                  🏍️
                </div>
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-brand transition-colors">
                  Two-Wheeler Series
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed mb-4">
                  Advanced VRLA AGM batteries engineered for rough road vibration, zero water top-up, and instant high cold-cranking torque.
                </p>
                <div className="space-y-1.5 text-xs text-slate-300 font-medium mb-6">
                  <div className="flex items-center gap-2"><Check size={14} className="text-brand" /> Spill-proof sealed construction</div>
                  <div className="flex items-center gap-2"><Check size={14} className="text-brand" /> High cold start for winter mornings</div>
                  <div className="flex items-center gap-2"><Check size={14} className="text-brand" /> Models: TZ4LB, TZ5LB, TZ7, XL5LB</div>
                </div>
              </div>
              <Link 
                href="/products?category=two-wheelers" 
                className="text-xs font-bold text-brand hover:text-emerald-300 flex items-center gap-1 uppercase tracking-wider pt-4 border-t border-slate-800"
              >
                Explore Bike Range &rarr;
              </Link>
            </div>

            {/* Card 2: Four Wheeler / Cars */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-brand/60 transition-all group hover:-translate-y-1.5 flex flex-col justify-between shadow-xl">
              <div>
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center text-2xl mb-5 group-hover:scale-110 transition-transform">
                  🚗
                </div>
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-brand transition-colors">
                  Passenger Car & SUV
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed mb-4">
                  High-capacity starter batteries handling dense electronic accessories, stop-go city traffic, and harsh engine heat.
                </p>
                <div className="space-y-1.5 text-xs text-slate-300 font-medium mb-6">
                  <div className="flex items-center gap-2"><Check size={14} className="text-brand" /> Ultra-low self-discharge alloy</div>
                  <div className="flex items-center gap-2"><Check size={14} className="text-brand" /> High cranking output (35AH - 75AH)</div>
                  <div className="flex items-center gap-2"><Check size={14} className="text-brand" /> Extended 48M - 60M warranty options</div>
                </div>
              </div>
              <Link 
                href="/products?category=passenger-vehicles" 
                className="text-xs font-bold text-brand hover:text-emerald-300 flex items-center gap-1 uppercase tracking-wider pt-4 border-t border-slate-800"
              >
                Explore Car Range &rarr;
              </Link>
            </div>

            {/* Card 3: Commercial & Heavy Duty */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-brand/60 transition-all group hover:-translate-y-1.5 flex flex-col justify-between shadow-xl">
              <div>
                <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center text-2xl mb-5 group-hover:scale-110 transition-transform">
                  🚚
                </div>
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-brand transition-colors">
                  Commercial & Fleet
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed mb-4">
                  Heavy-duty lead grids built for long-haul logistics, heavy vibration resistance, and nonstop operational duty cycles.
                </p>
                <div className="space-y-1.5 text-xs text-slate-300 font-medium mb-6">
                  <div className="flex items-center gap-2"><Check size={14} className="text-brand" /> Reinforced anti-shock internal ribs</div>
                  <div className="flex items-center gap-2"><Check size={14} className="text-brand" /> High cyclic recovery for long idle</div>
                  <div className="flex items-center gap-2"><Check size={14} className="text-brand" /> Capacity: 100AH to 200AH+</div>
                </div>
              </div>
              <Link 
                href="/products?category=commercial-vehicles" 
                className="text-xs font-bold text-brand hover:text-emerald-300 flex items-center gap-1 uppercase tracking-wider pt-4 border-t border-slate-800"
              >
                Explore Heavy Duty &rarr;
              </Link>
            </div>

            {/* Card 4: Inverter & Solar Backup */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-brand/60 transition-all group hover:-translate-y-1.5 flex flex-col justify-between shadow-xl">
              <div>
                <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center text-2xl mb-5 group-hover:scale-110 transition-transform">
                  ⚡
                </div>
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-brand transition-colors">
                  Inverter & Solar
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed mb-4">
                  Robust tubular plate technology designed to handle frequent and deep blackouts with consistent, steady power discharge.
                </p>
                <div className="space-y-1.5 text-xs text-slate-300 font-medium mb-6">
                  <div className="flex items-center gap-2"><Check size={14} className="text-brand" /> High surface area tubular plates</div>
                  <div className="flex items-center gap-2"><Check size={14} className="text-brand" /> Excellent charge acceptance efficiency</div>
                  <div className="flex items-center gap-2"><Check size={14} className="text-brand" /> Extended service life up to 1200+ cycles</div>
                </div>
              </div>
              <Link 
                href="/products?category=inverter-batteries" 
                className="text-xs font-bold text-brand hover:text-emerald-300 flex items-center gap-1 uppercase tracking-wider pt-4 border-t border-slate-800"
              >
                Explore Solar Range &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 4. INSIDE THE POWER: ENGINEERING ARCHITECTURE (Luminous & VARTA Benchmark) */}
      <section className="py-24 bg-radial-dark border-y border-slate-800 relative">
        <div className="container">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            
            {/* Visual Technical Diagram Container */}
            <div className="w-full lg:w-1/2 relative">
              <div className="relative rounded-3xl overflow-hidden border border-slate-700 bg-slate-900/90 shadow-2xl p-8">
                <div className="inline-block text-[11px] font-black uppercase tracking-widest text-emerald-400 mb-4 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                  Engineering Anatomy
                </div>
                <h3 className="text-3xl font-heading font-black text-white mb-6 uppercase">
                  BUILT TO DEFY INDIAN HEAT & SHOCK.
                </h3>
                <div className="relative h-64 sm:h-80 w-full rounded-2xl overflow-hidden bg-slate-950/80 border border-slate-800 flex items-center justify-center p-4">
                  <Image 
                    src="/assets/categories/commercial-heavy-duty.jpg" 
                    alt="Goodwin Heavy Duty Engineering" 
                    fill 
                    className="object-cover opacity-60 mix-blend-luminosity"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />
                  <div className="relative z-10 text-center px-4">
                    <div className="w-16 h-16 rounded-2xl bg-brand/20 border border-brand text-brand flex items-center justify-center mx-auto mb-3 shadow-lg">
                      <Cpu size={32} />
                    </div>
                    <div className="text-xl font-black text-white uppercase tracking-tight">Pure Calcium-Tin Alloy</div>
                    <div className="text-xs text-slate-300 mt-1 max-w-sm">99.99% refined lead with anti-corrosive silver/tin additives.</div>
                  </div>
                </div>

                {/* Stat Badges */}
                <div className="grid grid-cols-2 gap-4 mt-6">
                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                    <div className="text-2xl font-black text-emerald-400">30G</div>
                    <div className="text-xs text-slate-400">Vibration Proofing Standard</div>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                    <div className="text-2xl font-black text-amber-400">55°C+</div>
                    <div className="text-xs text-slate-400">Under-Hood Thermal Resilience</div>
                  </div>
                </div>
              </div>
            </div>

            {/* 4 Core Technology Pillars */}
            <div className="w-full lg:w-1/2 flex flex-col justify-center">
              <div className="inline-flex items-center gap-2 text-xs font-black tracking-widest text-brand uppercase mb-3">
                <Sparkles size={14} /> The Goodwin Standard
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-black text-white uppercase tracking-tight mb-6">
                FOUR PILLARS OF DEPENDABILITY
              </h2>
              <p className="text-slate-300 text-base leading-relaxed mb-8">
                Automotive batteries in India face extreme weather and rough asphalt. Here is how Goodwin’s cell architecture outperforms standard replacements:
              </p>

              <div className="space-y-6">
                {[
                  {
                    title: "1. Ultra-Dense Paste Formulation",
                    desc: "Specially mixed high-density lead oxide formula maximizes active surface contact, ensuring instantaneous ignition even in cold weather.",
                    icon: <Flame size={20} className="text-emerald-400" />
                  },
                  {
                    title: "2. Anti-Corrosion Calcium-Tin Grids",
                    desc: "Eliminates electrolyte water consumption. Never requires refilling and preserves terminal conductivity over years of daily driving.",
                    icon: <Shield size={20} className="text-brand" />
                  },
                  {
                    title: "3. Reinforced Polypropylene Shell",
                    desc: "High-impact polymer container absorbs chassis vibration and withstands intense battery tray vibration on potholed roads.",
                    icon: <Layers size={20} className="text-amber-400" />
                  },
                  {
                    title: "4. Flame-Arrestor Safety Vents",
                    desc: "Micro-porous disc filters prevent external spark ingress while safely exhausting internal gas expansion.",
                    icon: <Wrench size={20} className="text-blue-400" />
                  }
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4 p-3.5 rounded-xl hover:bg-slate-900/60 transition-colors">
                    <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-white mb-1">{item.title}</h4>
                      <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5. PRODUCT CATALOGUE SHOWCASE (Livguard & Exide Benchmark) */}
      <section className="py-24 bg-slate-950 border-b border-slate-800">
        <div className="container">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <div className="text-xs font-black tracking-widest text-brand uppercase mb-2">High Performance Lineup</div>
              <h2 className="text-3xl sm:text-5xl font-heading font-black text-white uppercase">
                FEATURED BATTERIES
              </h2>
            </div>
            
            <Link 
              href="/products" 
              className="text-xs font-bold text-brand hover:text-emerald-300 flex items-center gap-1.5 uppercase tracking-wider group transition-colors"
            >
              View Full 30+ Catalogue 
              <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {seriesFilter.map((product) => (
              <div 
                key={product.id} 
                className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden hover:border-brand/60 transition-all flex flex-col group shadow-xl hover:-translate-y-1.5"
              >
                {/* Visual Area */}
                <div className="relative h-56 p-6 flex items-center justify-center bg-slate-950/60 border-b border-slate-800 overflow-hidden">
                  <div className="absolute inset-0 bg-radial-hero opacity-30 pointer-events-none" />
                  <div className="w-full h-full relative z-10">
                    <Image 
                      src={product.image || "/assets/logo/Goodwin.png"} 
                      alt={product.name} 
                      fill 
                      className="object-contain group-hover:scale-105 transition-transform duration-300" 
                    />
                  </div>
                  {/* Warranty Ribbon */}
                  <div className="absolute top-3 right-3 bg-brand/20 border border-brand/40 text-emerald-300 text-[10px] font-black uppercase px-2.5 py-1 rounded-full backdrop-blur-md">
                    {product.warranty || "36M Warranty"}
                  </div>
                </div>

                {/* Details */}
                <div className="p-5 flex flex-col flex-1 justify-between">
                  <div>
                    <div className="text-[10px] font-bold text-amber-400 uppercase tracking-widest mb-1">
                      {product.series || product.category || "Goodwin Automotive"}
                    </div>
                    <h3 className="font-heading font-bold text-lg text-white mb-2 group-hover:text-brand transition-colors truncate">
                      {product.name}
                    </h3>

                    {/* Specs Pill Matrix */}
                    <div className="grid grid-cols-2 gap-2 mb-4 text-xs">
                      <div className="bg-slate-950 px-2.5 py-1.5 rounded-lg border border-slate-800 text-slate-300">
                        <span className="text-[10px] text-slate-500 block uppercase">Capacity</span>
                        <strong className="text-white">{product.ah || "N/A"}</strong>
                      </div>
                      <div className="bg-slate-950 px-2.5 py-1.5 rounded-lg border border-slate-800 text-slate-300">
                        <span className="text-[10px] text-slate-500 block uppercase">Voltage</span>
                        <strong className="text-white">{product.voltage || "12V"}</strong>
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                    <span className="text-[11px] text-slate-400 font-medium">Ready for dispatch</span>
                    <Link 
                      href={`/products/${product.slug}`}
                      className="text-xs font-bold text-brand hover:text-white flex items-center gap-1 transition-colors"
                    >
                      Specifications <ArrowRight size={13} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. COMPLETE VEHICLE FINDER EMBED (Amaron & VARTA Benchmark) */}
      <section className="py-24 bg-slate-900 relative">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand/10 border border-brand/30 text-brand text-xs font-black tracking-widest uppercase mb-3">
              Precision Matching Engine
            </div>
            <h2 className="text-3xl sm:text-5xl font-heading font-black text-white uppercase tracking-tight mb-4">
              FIND YOUR EXACT VEHICLE MATCH
            </h2>
            <p className="text-slate-400 text-base">
              Select your vehicle make, model, fuel type, and year to receive verified battery recommendations with instant dealer lookup.
            </p>
          </div>

          <div className="max-w-4xl mx-auto bg-slate-950 p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-2xl">
            <VehicleFinder />
          </div>
        </div>
      </section>

      {/* 7. DEALER & DISTRIBUTOR HUB (Livguard & Exide Benchmark) */}
      <section className="py-24 bg-radial-hero relative overflow-hidden border-t border-slate-800">
        <div className="container relative z-10 flex flex-col lg:flex-row items-center justify-between gap-16">
          
          <div className="w-full lg:w-1/2">
            <div className="inline-flex items-center gap-2 text-xs font-black tracking-widest text-amber-400 uppercase mb-3">
              <Award size={14} /> Business Opportunities
            </div>
            <h2 className="text-4xl sm:text-6xl font-heading font-black text-white mb-6 uppercase leading-[1.08]">
              PARTNER WITH <br />
              <span className="text-gradient-emerald">GOODWIN.</span>
            </h2>
            <p className="text-base sm:text-lg text-slate-300 mb-8 leading-relaxed max-w-lg">
              Join India's fastest expanding automotive power network. Enjoy direct manufacturer margins, territory protection, digital warranty automation, and consistent supply reliability.
            </p>

            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
                <div className="text-xl font-black text-emerald-400">High Margins</div>
                <div className="text-xs text-slate-400">Competitive dealer pricing</div>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
                <div className="text-xl font-black text-amber-400">Instant Claims</div>
                <div className="text-xs text-slate-400">Paperless warranty replacement</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                href="/dealer-distributor" 
                className="bg-brand hover:bg-brand-dark text-white px-8 py-4 rounded-xl font-extrabold text-xs uppercase tracking-wider transition-all text-center glow-brand shadow-lg"
              >
                Apply as Dealer / Distributor
              </Link>
              <Link 
                href="/contact" 
                className="glass-dark hover:bg-slate-800 text-white px-8 py-4 rounded-xl font-bold text-xs uppercase tracking-wider transition-all text-center border border-slate-700"
              >
                Speak with Sales Team
              </Link>
            </div>
          </div>
          
          <div className="w-full lg:w-1/2 max-w-md bg-slate-900/90 rounded-3xl shadow-2xl p-6 sm:p-8 border border-slate-700/70 backdrop-blur-xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 rounded-xl bg-brand/20 text-brand">
                <PhoneCall size={20} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Direct Enquiry</h3>
                <p className="text-xs text-slate-400">Our regional sales head will respond within 4 business hours.</p>
              </div>
            </div>
            <QuickEnquiryForm />
          </div>

        </div>
      </section>

      {/* 8. TRUST COUNTERS & FINAL CTA */}
      <section className="py-20 bg-slate-950 border-t border-slate-900 text-center">
        <div className="container max-w-4xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            <div>
              <div className="text-3xl sm:text-4xl font-black text-white mb-1">500+</div>
              <div className="text-xs text-slate-400 uppercase tracking-wider font-bold">Authorized Retailers</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-black text-emerald-400 mb-1">99.8%</div>
              <div className="text-xs text-slate-400 uppercase tracking-wider font-bold">First Start Reliability</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-black text-amber-400 mb-1">60M</div>
              <div className="text-xs text-slate-400 uppercase tracking-wider font-bold">Max Warranty Available</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-black text-blue-400 mb-1">100%</div>
              <div className="text-xs text-slate-400 uppercase tracking-wider font-bold">Made in India</div>
            </div>
          </div>

          <h2 className="text-3xl sm:text-5xl font-heading font-black text-white mb-6 uppercase">
            EXPERIENCE THE POWER OF GOODWIN
          </h2>
          <p className="text-slate-400 text-base max-w-xl mx-auto mb-8">
            Find the perfect battery for your two-wheeler, passenger car, commercial truck, or power inverter today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/battery-finder" 
              className="bg-brand hover:bg-brand-dark text-white px-9 py-4 rounded-xl font-black text-xs uppercase tracking-wider transition-all shadow-xl shadow-brand/20 glow-brand"
            >
              Match Your Vehicle Now
            </Link>
            <Link 
              href="/dealers" 
              className="glass-dark hover:bg-slate-800 text-slate-200 hover:text-white px-9 py-4 rounded-xl font-bold text-xs uppercase tracking-wider transition-all border border-slate-700"
            >
              Locate Local Store
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
