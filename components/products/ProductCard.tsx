import Link from "next/link";
import { Product } from "@/types";
import Image from "next/image";
import { ArrowRight, MessageCircle, ShieldCheck, Zap } from "lucide-react";

export default function ProductCard({ product }: { product: Product }) {
  const displayWarranty = product.warranty_options && product.warranty_options.length > 0
    ? product.warranty_options.join(" / ")
    : product.warranty;

  return (
    <div className="group bg-slate-900 border border-slate-800 hover:border-brand/60 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1.5 flex flex-col justify-between text-white">
      {/* Top Header Strip */}
      <div className="bg-slate-950 px-4 py-2 border-b border-slate-800/80 flex items-center justify-between text-[11px]">
        <span className="font-heading font-black text-slate-400 tracking-widest uppercase">
          {product.series || "GOODWIN POWER"}
        </span>
        <span className="text-emerald-400 font-bold flex items-center gap-1">
          <Zap size={12} className="text-amber-400" /> Maintenance-Free
        </span>
      </div>

      {/* Image Area with Radial Glow */}
      <div className="relative h-52 bg-slate-950/60 p-4 flex items-center justify-center border-b border-slate-800/80 overflow-hidden">
        <div className="absolute inset-0 bg-radial-hero opacity-30 pointer-events-none group-hover:opacity-50 transition-opacity" />
        <div className="w-full h-full relative z-10 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
          <Image 
            src={product.image || "/assets/logo/Goodwin.png"} 
            alt={product.name} 
            fill
            className="object-contain"
          />
        </div>
      </div>
      
      {/* Content Area */}
      <div className="p-5 flex flex-col flex-1 justify-between">
        <div>
          <h3 className="font-heading font-bold text-xl text-white mb-1 group-hover:text-brand transition-colors">
            {product.name}
          </h3>
          
          <div className="text-xs text-slate-400 mb-4 line-clamp-1">
            {product.category || "Automotive & Commercial Starter Battery"}
          </div>

          {/* Specs Matrix */}
          <div className="grid grid-cols-2 gap-2 mb-4">
            <div className="bg-slate-950/90 border border-slate-800 px-3 py-2 rounded-xl text-center">
              <span className="block text-[10px] uppercase font-bold text-slate-500">Capacity</span>
              <strong className="text-white text-sm">{product.ah || "Standard AH"}</strong>
            </div>
            <div className="bg-slate-950/90 border border-slate-800 px-3 py-2 rounded-xl text-center">
              <span className="block text-[10px] uppercase font-bold text-slate-500">Voltage</span>
              <strong className="text-white text-sm">{product.voltage || "12V"}</strong>
            </div>
          </div>
          
          {/* Warranty Pill */}
          <div className="bg-brand/10 border border-brand/30 rounded-xl px-3 py-2 text-center mb-5 flex items-center justify-center gap-1.5 text-xs">
            <ShieldCheck size={15} className="text-emerald-400" />
            <span className="font-extrabold text-emerald-300">
              {displayWarranty || "36 Months Warranty"}
            </span>
          </div>
        </div>
        
        {/* Buttons */}
        <div className="flex flex-col gap-2 pt-2 border-t border-slate-800">
          <Link 
            href={`/products/${product.slug}`}
            className="w-full py-2.5 px-4 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-bold text-xs uppercase tracking-wider text-center flex items-center justify-center gap-1.5 transition-colors border border-slate-700"
          >
            View Fitment & Specs
            <ArrowRight size={14} />
          </Link>
          <a
            href={`https://wa.me/919667724411?text=${encodeURIComponent(`Hello Goodwin Batteries,\n\nI want to enquire about the price and availability for:\nProduct: ${product.name}\nCapacity: ${product.ah || "N/A"}\n\nPlease share dealer / price details.`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-2.5 px-4 bg-brand hover:bg-brand-dark text-white rounded-xl font-bold text-xs uppercase tracking-wider text-center flex items-center justify-center gap-1.5 transition-all shadow-md shadow-brand/20 active:scale-98"
          >
            <MessageCircle size={15} /> Instant WhatsApp Quote
          </a>
        </div>
      </div>
    </div>
  );
}
