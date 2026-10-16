import { getProducts, getCategories } from "@/lib/data";
import ProductsClient from "@/components/products/ProductsClient";
import { Zap, ShieldCheck, BatteryCharging } from "lucide-react";

export default async function ProductsPage() {
  const products = await getProducts();
  const categories = await getCategories();
  
  // Filter out unpublished products just in case
  const publishedProducts = products.filter(p => p.is_published !== false);

  return (
    <div className="flex flex-col w-full min-h-screen bg-slate-950 text-white">
      {/* Automotive Tech Header (VARTA & OPTIMA Benchmark) */}
      <section className="bg-radial-hero bg-grid-pattern py-20 border-b border-slate-800 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-1/2 h-full bg-brand/15 blur-[120px] pointer-events-none" />
        <div className="container relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-brand/40 bg-brand/10 backdrop-blur-md mb-6 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-brand animate-ping" />
            <span className="text-emerald-400 text-xs font-black tracking-widest uppercase">
              Official Product Catalogue
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-black text-white mb-6 uppercase tracking-tight">
            GOODWIN <span className="text-gradient-emerald">BATTERY CATALOGUE</span>
          </h1>
          
          <p className="text-slate-300 text-base sm:text-lg max-w-2xl leading-relaxed mb-8">
            Engineered for high cranking amps, extreme shock resistance, and zero maintenance. Filter by vehicle application, voltage, and warranty terms.
          </p>

          <div className="flex flex-wrap gap-4 text-xs font-bold text-slate-300">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800">
              <Zap size={14} className="text-amber-400" />
              <span>100% Maintenance-Free VRLA</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800">
              <ShieldCheck size={14} className="text-emerald-400" />
              <span>Up to 60 Months Warranty</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800">
              <BatteryCharging size={14} className="text-blue-400" />
              <span>OEM Direct Fitment Standard</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 bg-slate-950 flex-1">
        <div className="container">
          <ProductsClient initialProducts={publishedProducts} categories={categories} />
        </div>
      </section>
    </div>
  );
}
