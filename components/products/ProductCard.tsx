import Link from "next/link";
import { Product } from "@/types";
import Image from "next/image";
import { ArrowRight, MessageCircle, ShieldCheck, Zap } from "lucide-react";

export default function ProductCard({ product }: { product: Product }) {
  const displayWarranty = product.warranty_options && product.warranty_options.length > 0
    ? product.warranty_options.join(" / ")
    : product.warranty;

  return (
    <div className="group bg-white border border-slate-200 hover:border-[#00843D] rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-slate-200/60 hover:-translate-y-1.5 flex flex-col justify-between text-slate-900">
      {/* Top Header Strip */}
      <div className="bg-slate-50 px-4 py-2 border-b border-slate-200 flex items-center justify-between text-[11px]">
        <span className="font-heading font-black text-slate-600 tracking-widest uppercase">
          {product.series || "GOODWIN POWER"}
        </span>
        <span className="text-[#00843D] font-bold flex items-center gap-1">
          <Zap size={12} className="text-amber-500" /> Maintenance-Free
        </span>
      </div>

      {/* Image Area with Subtle Radial Tint */}
      <div className="relative h-52 bg-slate-50/70 p-4 flex items-center justify-center border-b border-slate-100 overflow-hidden">
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
          <h3 className="font-heading font-bold text-xl text-slate-900 mb-1 group-hover:text-[#00843D] transition-colors">
            {product.name}
          </h3>
          
          <div className="text-xs text-slate-500 mb-4 line-clamp-1">
            {product.category || "Automotive & Commercial Starter Battery"}
          </div>

          {/* Specs Matrix */}
          <div className="grid grid-cols-2 gap-2 mb-4">
            <div className="bg-slate-50 border border-slate-200 px-3 py-2 rounded-xl text-center">
              <span className="block text-[10px] uppercase font-bold text-slate-500">Capacity</span>
              <strong className="text-slate-900 text-sm">{product.ah || "Standard AH"}</strong>
            </div>
            <div className="bg-slate-50 border border-slate-200 px-3 py-2 rounded-xl text-center">
              <span className="block text-[10px] uppercase font-bold text-slate-500">Voltage</span>
              <strong className="text-slate-900 text-sm">{product.voltage || "12V"}</strong>
            </div>
          </div>
          
          {/* Warranty Pill */}
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl px-3 py-2 text-center mb-5 flex items-center justify-center gap-1.5 text-xs">
            <ShieldCheck size={15} className="text-[#00843D]" />
            <span className="font-extrabold text-[#00843D]">
              {displayWarranty || "36 Months Warranty"}
            </span>
          </div>
        </div>
        
        {/* Buttons */}
        <div className="flex flex-col gap-2 pt-2 border-t border-slate-100">
          <Link 
            href={`/products/${product.slug}`}
            className="w-full py-2.5 px-4 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold text-xs uppercase tracking-wider text-center flex items-center justify-center gap-1.5 transition-colors shadow-sm"
          >
            View Fitment & Specs
            <ArrowRight size={14} />
          </Link>
          <a
            href={`https://wa.me/919667724411?text=${encodeURIComponent(`Hello Goodwin Batteries,\n\nI want to enquire about the price and availability for:\nProduct: ${product.name}\nCapacity: ${product.ah || "N/A"}\n\nPlease share dealer / price details.`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-2.5 px-4 bg-[#00843D] hover:bg-[#006830] text-white rounded-xl font-bold text-xs uppercase tracking-wider text-center flex items-center justify-center gap-1.5 transition-all shadow-md shadow-emerald-700/20 active:scale-98"
          >
            <MessageCircle size={15} /> Instant WhatsApp Quote
          </a>
        </div>
      </div>
    </div>
  );
}
