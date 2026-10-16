import { getProducts, getCategories } from "@/lib/data";
import ProductsClient from "@/components/products/ProductsClient";
import { Zap, ShieldCheck, BatteryCharging } from "lucide-react";

export default async function ProductsPage() {
  const products = await getProducts();
  const categories = await getCategories();
  
  // Filter out unpublished products just in case
  const publishedProducts = products.filter(p => p.is_published !== false);

  return (
    <div className="flex flex-col w-full min-h-screen bg-white text-slate-900">
      {/* Automotive Tech Header (Amaron & Exide Care Benchmark) */}
      <section className="bg-gradient-to-b from-slate-50 via-white to-slate-50 py-16 md:py-20 border-b border-slate-200 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-1/3 h-full bg-emerald-500/10 blur-[100px] pointer-events-none" />
        <div className="container relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-emerald-300 bg-emerald-50 mb-6 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#00843D] animate-ping" />
            <span className="text-[#00843D] text-xs font-black tracking-widest uppercase">
              Official Product Catalogue
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-black text-slate-900 mb-6 uppercase tracking-tight">
            GOODWIN <span className="text-[#00843D]">BATTERY CATALOGUE</span>
          </h1>
          
          <p className="text-slate-600 text-base sm:text-lg max-w-2xl leading-relaxed mb-8">
            Engineered for high cranking amps, extreme shock resistance, and zero maintenance. Filter by vehicle application, voltage, and warranty terms.
          </p>

          <div className="flex flex-wrap gap-4 text-xs font-bold text-slate-700">
            <div className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-slate-200 shadow-sm">
              <Zap size={14} className="text-amber-500" />
              <span>100% Maintenance-Free VRLA</span>
            </div>
            <div className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-slate-200 shadow-sm">
              <ShieldCheck size={14} className="text-[#00843D]" />
              <span>Up to 60 Months Warranty</span>
            </div>
            <div className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-slate-200 shadow-sm">
              <BatteryCharging size={14} className="text-blue-600" />
              <span>OEM Direct Fitment Standard</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 bg-white flex-1">
        <div className="container">
          <ProductsClient initialProducts={publishedProducts} categories={categories} />
        </div>
      </section>
    </div>
  );
}
