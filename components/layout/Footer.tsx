"use client";

import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, Mail, ArrowRight, ShieldCheck, Zap, Award } from "lucide-react";
import { useGlobalSettings } from "@/components/GlobalSettingsProvider";

export default function Footer() {
  const settings = useGlobalSettings();

  return (
    <footer className="bg-[#070B12] text-slate-300 pt-16 pb-10 border-t border-emerald-500/30 relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-emerald-500/5 blur-3xl pointer-events-none" />

      {/* Top Helpline Banner */}
      <div className="container relative z-10 mb-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6 rounded-2xl bg-[#0D1525] border border-white/10 shadow-2xl">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
              <Phone size={22} />
            </div>
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Toll-Free Customer Care</p>
              <a href="tel:9220404411" className="text-base font-black text-white hover:text-emerald-400 transition-colors">
                92204 04411
              </a>
            </div>
          </div>

          <div className="flex items-center gap-4 border-t md:border-t-0 md:border-l border-white/5 pt-4 md:pt-0 md:pl-6">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
              <Zap size={22} />
            </div>
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Dealership & Distributorship</p>
              <a href="tel:9667724411" className="text-base font-black text-white hover:text-amber-400 transition-colors">
                96677 24411
              </a>
            </div>
          </div>

          <div className="flex items-center gap-4 border-t md:border-t-0 md:border-l border-white/5 pt-4 md:pt-0 md:pl-6">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
              <ShieldCheck size={22} />
            </div>
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Instant Digital Warranty</p>
              <Link href="/warranty" className="text-sm font-black text-emerald-400 hover:text-emerald-300 transition-colors flex items-center gap-1">
                Verify Serial Number <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="container relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 mb-16">
          
          {/* Brand Info */}
          <div className="lg:col-span-4 flex flex-col gap-5">
            <Link href="/" className="inline-flex items-center gap-3 bg-white p-2.5 rounded-xl self-start shadow-md">
              <Image 
                src="/assets/logo/tilak.svg" 
                alt="Tirupati Tilak" 
                width={38} 
                height={44} 
                className="object-contain"
              />
              <Image 
                src="/assets/logo/Goodwin.png" 
                alt={settings?.company_name || "Goodwin Batteries"} 
                width={150} 
                height={48} 
                className="object-contain"
              />
            </Link>
            
            <p className="text-xs font-black text-emerald-400 uppercase tracking-widest flex items-center gap-1.5">
              <Award size={14} /> {settings?.tagline || "India's Everyday Power Choice"}
            </p>

            <p className="text-xs leading-relaxed text-slate-400 max-w-sm">
              Engineered with advanced calcium-tin radial alloy grids and high vibration resistance. Powering two-wheelers, cars, commercial fleets, and homes across India with guaranteed reliability.
            </p>

            <div className="flex gap-2 mt-2">
              {[
                { name: "Facebook", code: "Fb", url: "https://facebook.com/goodwinbatteries" },
                { name: "Instagram", code: "Ig", url: "https://instagram.com/goodwinbatteries" },
                { name: "YouTube", code: "Yt", url: "https://youtube.com/@goodwinbatteries" },
                { name: "Twitter/X", code: "X", url: "https://twitter.com/goodwinbattery" },
                { name: "LinkedIn", code: "In", url: "https://linkedin.com/company/goodwinbatteries" }
              ].map((s) => (
                <a 
                  key={s.name}
                  href={s.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center hover:bg-emerald-500 hover:text-black hover:border-emerald-400 transition-all text-xs font-bold font-heading" 
                  title={s.name}
                >
                  {s.code}
                </a>
              ))}
            </div>
          </div>

          {/* Product Ranges */}
          <div className="lg:col-span-3">
            <h4 className="text-white font-heading font-black mb-5 text-sm uppercase tracking-wider flex items-center gap-2">
              <Zap size={14} className="text-emerald-400" /> Battery Categories
            </h4>
            <ul className="flex flex-col gap-3 text-xs">
              <li>
                <Link href="/products?category=two-wheeler" className="text-slate-400 hover:text-emerald-400 transition-colors flex items-center gap-2 group">
                  <ArrowRight size={12} className="text-emerald-400 opacity-0 -ml-3 group-hover:opacity-100 group-hover:ml-0 transition-all"/>
                  Two-Wheeler (VRLA AGM Pro)
                </Link>
              </li>
              <li>
                <Link href="/products?category=four-wheeler" className="text-slate-400 hover:text-emerald-400 transition-colors flex items-center gap-2 group">
                  <ArrowRight size={12} className="text-emerald-400 opacity-0 -ml-3 group-hover:opacity-100 group-hover:ml-0 transition-all"/>
                  Car & SUV (High Cold Crank)
                </Link>
              </li>
              <li>
                <Link href="/products?category=commercial-heavy-duty" className="text-slate-400 hover:text-emerald-400 transition-colors flex items-center gap-2 group">
                  <ArrowRight size={12} className="text-emerald-400 opacity-0 -ml-3 group-hover:opacity-100 group-hover:ml-0 transition-all"/>
                  Commercial & Tractor Fleets
                </Link>
              </li>
              <li>
                <Link href="/products?category=inverter-solar" className="text-slate-400 hover:text-emerald-400 transition-colors flex items-center gap-2 group">
                  <ArrowRight size={12} className="text-emerald-400 opacity-0 -ml-3 group-hover:opacity-100 group-hover:ml-0 transition-all"/>
                  Tubular Inverter & Solar Power
                </Link>
              </li>
              <li>
                <Link href="/products?category=e-rickshaw" className="text-slate-400 hover:text-emerald-400 transition-colors flex items-center gap-2 group">
                  <ArrowRight size={12} className="text-emerald-400 opacity-0 -ml-3 group-hover:opacity-100 group-hover:ml-0 transition-all"/>
                  Electric Vehicle & E-Rickshaw
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Tools & Support */}
          <div className="lg:col-span-2">
            <h4 className="text-white font-heading font-black mb-5 text-sm uppercase tracking-wider flex items-center gap-2">
              <ShieldCheck size={14} className="text-emerald-400" /> Quick Tools
            </h4>
            <ul className="flex flex-col gap-3 text-xs">
              <li><Link href="/battery-finder" className="text-slate-400 hover:text-emerald-400 transition-colors flex items-center gap-2 group"><ArrowRight size={12} className="text-emerald-400 opacity-0 -ml-3 group-hover:opacity-100 group-hover:ml-0 transition-all"/> Vehicle Finder</Link></li>
              <li><Link href="/warranty" className="text-slate-400 hover:text-emerald-400 transition-colors flex items-center gap-2 group"><ArrowRight size={12} className="text-emerald-400 opacity-0 -ml-3 group-hover:opacity-100 group-hover:ml-0 transition-all"/> Warranty Lookup</Link></li>
              <li><Link href="/dealer-distributor" className="text-slate-400 hover:text-emerald-400 transition-colors flex items-center gap-2 group"><ArrowRight size={12} className="text-emerald-400 opacity-0 -ml-3 group-hover:opacity-100 group-hover:ml-0 transition-all"/> Become a Dealer</Link></li>
              <li><Link href="/dealers" className="text-slate-400 hover:text-emerald-400 transition-colors flex items-center gap-2 group"><ArrowRight size={12} className="text-emerald-400 opacity-0 -ml-3 group-hover:opacity-100 group-hover:ml-0 transition-all"/> Dealer Locator</Link></li>
              <li><Link href="/battery-care" className="text-slate-400 hover:text-emerald-400 transition-colors flex items-center gap-2 group"><ArrowRight size={12} className="text-emerald-400 opacity-0 -ml-3 group-hover:opacity-100 group-hover:ml-0 transition-all"/> Maintenance Tips</Link></li>
              <li><Link href="/dealer/login" className="text-slate-400 hover:text-emerald-400 transition-colors flex items-center gap-2 group"><ArrowRight size={12} className="text-emerald-400 opacity-0 -ml-3 group-hover:opacity-100 group-hover:ml-0 transition-all"/> Dealer Login</Link></li>
            </ul>
          </div>

          {/* Offices & Contact */}
          <div className="lg:col-span-3">
            <h4 className="text-white font-heading font-black mb-5 text-sm uppercase tracking-wider">Offices & Plant</h4>
            <ul className="flex flex-col gap-4 text-xs">
              <li className="flex items-start gap-2.5">
                <MapPin size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                <span className="text-slate-400 leading-relaxed">
                  <strong className="text-white">Head Office:</strong><br />
                  Shop No. 51, Gokhale Market, Opp. Tis Hazari Court, Delhi – 110054
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                <span className="text-slate-400 leading-relaxed">
                  <strong className="text-white">Corporate Office:</strong><br />
                  202, 2nd Floor – Samiksh Landmark, Near Choithram Circle, A.B. Road, Indore – 452012
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail size={16} className="text-emerald-400 shrink-0" />
                <span className="text-slate-400">
                  <a href="mailto:sales@goodwinbatteries.com" className="hover:text-emerald-400 transition-colors">sales@goodwinbatteries.com</a>
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500">
            &copy; {new Date().getFullYear()} {settings?.company_name || "Goodwin Batteries"}. All rights reserved. Registered Trademark.
          </p>
          <div className="flex items-center gap-6 text-xs">
            <Link href="/privacy" className="text-slate-400 hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="text-slate-400 hover:text-white transition-colors">Terms of Use</Link>
            <Link href="/admin/login" className="text-slate-400 hover:text-white transition-colors">Admin Portal</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
