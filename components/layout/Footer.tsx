"use client";

import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, Mail, ArrowRight } from "lucide-react";
import { useGlobalSettings } from "@/components/GlobalSettingsProvider";

export default function Footer() {
  const settings = useGlobalSettings();

  return (
    <footer className="bg-secondary text-secondary-foreground pt-20 pb-10 border-t-4 border-primary">
      <div className="container relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
          
          {/* Brand Info */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <Link href="/" className="inline-flex items-center gap-3 bg-white p-3 rounded-lg self-start">
              <Image 
                src="/assets/logo/tilak.svg" 
                alt="Tirupati Tilak" 
                width={42} 
                height={48} 
                className="object-contain"
              />
              <Image 
                src="/assets/logo/Goodwin.png" 
                alt={settings?.company_name || "Goodwin Batteries"} 
                width={160} 
                height={54} 
                className="object-contain"
              />
            </Link>
            
            <p className="text-sm font-bold text-primary uppercase tracking-wider">
              {settings?.tagline || "India's Everyday Power Choice"}
            </p>

            <p className="text-sm leading-relaxed text-gray-300 max-w-sm">
              Reliable battery solutions engineered to keep your vehicle, business, and machines powered with confidence.
            </p>

            <div className="flex gap-2 mt-2">
              <a href="https://facebook.com/goodwinbatteries" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary hover:text-white transition-colors text-xs font-bold font-heading" title="Facebook">
                Fb
              </a>
              <a href="https://instagram.com/goodwinbatteries" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary hover:text-white transition-colors text-xs font-bold font-heading" title="Instagram">
                Ig
              </a>
              <a href="https://youtube.com/@goodwinbatteries" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary hover:text-white transition-colors text-xs font-bold font-heading" title="YouTube">
                Yt
              </a>
              <a href="https://twitter.com/goodwinbattery" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary hover:text-white transition-colors text-xs font-bold font-heading" title="Twitter/X">
                X
              </a>
              <a href="https://linkedin.com/company/goodwinbatteries" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary hover:text-white transition-colors text-xs font-bold font-heading" title="LinkedIn">
                In
              </a>
            </div>
          </div>

          {/* Explore */}
          <div className="lg:col-span-2 lg:col-start-6">
            <h4 className="text-white font-heading font-bold mb-6 text-lg tracking-wide">Explore</h4>
            <ul className="flex flex-col gap-4">
              <li><Link href="/products" className="text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-2 group"><ArrowRight size={14} className="text-primary opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all"/> Products</Link></li>
              <li><Link href="/battery-finder" className="text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-2 group"><ArrowRight size={14} className="text-primary opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all"/> Find Your Battery</Link></li>
              <li><Link href="/applications" className="text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-2 group"><ArrowRight size={14} className="text-primary opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all"/> Applications</Link></li>
              <li><Link href="/why-goodwin" className="text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-2 group"><ArrowRight size={14} className="text-primary opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all"/> Why Goodwin</Link></li>
              <li><Link href="/about" className="text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-2 group"><ArrowRight size={14} className="text-primary opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all"/> About Us</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div className="lg:col-span-2">
            <h4 className="text-white font-heading font-bold mb-6 text-lg tracking-wide">Support</h4>
            <ul className="flex flex-col gap-4">
              <li><Link href="/dealer-distributor" className="text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-2 group"><ArrowRight size={14} className="text-primary opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all"/> Become a Dealer</Link></li>
              <li><Link href="/dealers" className="text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-2 group"><ArrowRight size={14} className="text-primary opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all"/> Find a Dealer</Link></li>
              <li><Link href="/dealer/login" className="text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-2 group"><ArrowRight size={14} className="text-primary opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all"/> Dealer Portal Login</Link></li>
              <li><Link href="/support" className="text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-2 group"><ArrowRight size={14} className="text-primary opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all"/> Warranty Support</Link></li>
              <li><Link href="/battery-care" className="text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-2 group"><ArrowRight size={14} className="text-primary opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all"/> Battery Care</Link></li>
              <li><Link href="/contact" className="text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-2 group"><ArrowRight size={14} className="text-primary opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all"/> Contact Us</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-3">
            <h4 className="text-white font-heading font-bold mb-6 text-lg tracking-wide">Contact Us</h4>
            <ul className="flex flex-col gap-5">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-primary shrink-0 mt-1" />
                <span className="text-sm text-gray-400">
                  <strong className="text-white font-semibold">Head Office:</strong><br />
                  Shop No. 51, Gokhale Market,<br />
                  Opposite Tis Hazari Court, Delhi – 110054
                </span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-primary shrink-0 mt-1" />
                <span className="text-sm text-gray-400">
                  <strong className="text-white font-semibold">Corporate Office:</strong><br />
                  202, 2nd Floor – Samiksh Landmark,<br />
                  Near Choithram Circle, A.B. Road, Indore – 452012
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-primary shrink-0" />
                <div className="flex flex-col text-sm text-gray-400">
                  <span><strong className="text-white font-semibold">Sales:</strong> <a href="tel:9667724411" className="hover:text-white transition-colors">96677 24411</a></span>
                  <span className="mt-1"><strong className="text-white font-semibold">Support:</strong> <a href="tel:9220404411" className="hover:text-white transition-colors">92204 04411</a></span>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-primary shrink-0" />
                <div className="flex flex-col text-sm text-gray-400">
                  <span><strong className="text-white font-semibold">Sales:</strong> <a href="mailto:sales@goodwinbatteries.com" className="hover:text-white transition-colors">sales@goodwinbatteries.com</a></span>
                  <span className="mt-1"><strong className="text-white font-semibold">Support:</strong> <a href="mailto:support@goodwinbatteries.com" className="hover:text-white transition-colors">support@goodwinbatteries.com</a></span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} {settings?.company_name || "Goodwin Batteries"}. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="text-sm text-gray-500 hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="text-sm text-gray-500 hover:text-white transition-colors">Terms & Conditions</Link>
            <Link href="/admin/login" className="text-sm text-gray-500 hover:text-white transition-colors">Admin Login</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
