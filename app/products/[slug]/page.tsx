import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronRight, ShieldCheck, Download, CheckCircle2, Wrench, FileText, Phone, Zap, Search } from "lucide-react";
import { getProductBySlug, getProducts, getCategories } from "@/lib/data";
import ProductGallery from "@/components/ProductGallery";

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export default async function ProductDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  
  if (!product) {
    notFound();
  }

  const categories = await getCategories();
  const category = categories.find(c => c.id === product.category);

  return (
    <div className="flex flex-col w-full min-h-screen bg-[#070B12] text-slate-100 pt-20">
      
      {/* Breadcrumbs */}
      <div className="bg-[#0B0F19] border-b border-white/5 py-4">
        <div className="container flex items-center text-xs font-bold uppercase tracking-wider text-slate-400">
          <Link href="/" className="hover:text-emerald-400 transition-colors">Home</Link>
          <ChevronRight size={14} className="mx-2 text-slate-600" />
          <Link href="/products" className="hover:text-emerald-400 transition-colors">Products</Link>
          <ChevronRight size={14} className="mx-2 text-slate-600" />
          <Link href={`/products?category=${category?.slug}`} className="hover:text-emerald-400 transition-colors">{category?.name}</Link>
          <ChevronRight size={14} className="mx-2 text-slate-600" />
          <span className="text-emerald-400">{product.name}</span>
        </div>
      </div>

      {/* Product Hero */}
      <section className="py-12 md:py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-radial-hero pointer-events-none" />
        <div className="container relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            
            {/* Image Gallery */}
            <ProductGallery product={product} />

            {/* Product Info */}
            <div className="flex flex-col">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  <Zap size={12} className="text-emerald-400" /> {product.series || "Gold"} Series
                </span>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-white/5 text-slate-300 border border-white/10">
                  {category?.name || "Automotive Battery"}
                </span>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-amber-500/10 text-amber-300 border border-amber-500/20">
                  Heavy-Duty German Spec
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black font-heading text-white tracking-tight mb-4">
                {product.name}
              </h1>

              <p className="text-base sm:text-lg text-slate-300 mb-8 leading-relaxed font-normal">
                {product.description || "Engineered with ultra-pure lead alloy grids, high vibration dampeners, and rapid charge acceptance for extreme Indian weather."}
              </p>

              {/* Key Highlights Matrix */}
              <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-8">
                <div className="bg-[#0D1525] border border-white/10 p-4 rounded-2xl text-center flex flex-col justify-center relative overflow-hidden group hover:border-emerald-500/30 transition-colors">
                  <div className="absolute inset-0 bg-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span className="block text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-1">Capacity</span>
                  <span className="font-black text-xl sm:text-2xl text-white">{product.ah || "TBA"}</span>
                </div>
                <div className="bg-[#0D1525] border border-white/10 p-4 rounded-2xl text-center flex flex-col justify-center relative overflow-hidden group hover:border-emerald-500/30 transition-colors">
                  <div className="absolute inset-0 bg-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span className="block text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-1">Voltage</span>
                  <span className="font-black text-xl sm:text-2xl text-white">{product.voltage || "12V"}</span>
                </div>
                <div className="bg-gradient-to-br from-emerald-950/60 to-emerald-900/20 border border-emerald-500/30 p-4 rounded-2xl text-center flex flex-col justify-center relative overflow-hidden">
                  <span className="block text-[11px] font-bold uppercase tracking-widest text-emerald-400 mb-1">Warranty</span>
                  <span className="font-black text-base sm:text-lg text-emerald-300 flex items-center justify-center gap-1">
                    <ShieldCheck size={16} className="shrink-0" />
                    {product.warranty_options && product.warranty_options.length > 0 ? product.warranty_options.join(" / ") : (product.warranty || "24+24 M")}
                  </span>
                </div>
              </div>

              {/* High-conversion Action Strip */}
              <div className="flex flex-col sm:flex-row gap-3 mb-8 bg-[#0D1525] p-3 rounded-2xl border border-white/10 shadow-2xl">
                <a 
                  href={`https://wa.me/919667724411?text=${encodeURIComponent(`Goodwin Batteries Order / Dealership Enquiry\n\nProduct: ${product.name}\nSeries: ${product.series || "Gold"}\nCapacity: ${product.ah || "N/A"}\nVoltage: ${product.voltage || "12V"}\n\nKindly share pricing, nearest dealer availability, and delivery timeframe.`)}`} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex-1 bg-gradient-to-r from-[#00843D] to-[#00A84D] text-white px-6 py-4 rounded-xl font-bold uppercase tracking-wider hover:brightness-110 transition-all text-center shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 group"
                >
                  <Phone size={18} className="group-hover:scale-110 transition-transform" /> 
                  <span>Instant Price & Dealer Quote</span>
                </a>
                <a 
                  href="#specifications" 
                  className="bg-white/5 border border-white/10 text-slate-200 px-6 py-4 rounded-xl font-bold uppercase tracking-wider hover:bg-white/10 hover:border-emerald-500/40 transition-all text-center flex items-center justify-center gap-2"
                >
                  <FileText size={18} className="text-emerald-400" /> 
                  <span>Specifications</span>
                </a>
              </div>

              {/* Goodwin Tech Advantages Checklist */}
              {product.features && product.features.length > 0 ? (
                <div className="border-t border-white/10 pt-6">
                  <h3 className="font-bold text-white mb-4 uppercase tracking-wider text-xs flex items-center gap-2">
                    <Zap size={16} className="text-emerald-400" /> Goodwin High-Performance Engineering
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {product.features.map((feature, i) => (
                      <div key={i} className="flex items-start gap-2.5 bg-[#0D1525]/60 border border-white/5 p-3 rounded-xl">
                        <CheckCircle2 size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                        <span className="text-xs font-semibold text-slate-200">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="border-t border-white/10 pt-6">
                  <h3 className="font-bold text-white mb-4 uppercase tracking-wider text-xs flex items-center gap-2">
                    <Zap size={16} className="text-emerald-400" /> Goodwin High-Performance Engineering
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      "High-Density Silver-Calcium Alloy Plates",
                      "Instant High Cold Cranking Amperage (CCA)",
                      "Ultra Vibration & Heat Resistant Design",
                      "Zero Maintenance Sealed VRLA / Low-Water Architecture"
                    ].map((feat, i) => (
                      <div key={i} className="flex items-start gap-2.5 bg-[#0D1525]/60 border border-white/5 p-3 rounded-xl">
                        <CheckCircle2 size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                        <span className="text-xs font-semibold text-slate-200">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      </section>

      {/* Deep Dive Section: Specs + Fitment + Engineering */}
      <section id="specifications" className="py-16 md:py-24 bg-[#0A0E17] border-t border-white/10">
        <div className="container max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-12">
            
            {/* Tech Specs Table */}
            <div className="lg:col-span-2">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <span className="text-xs font-black uppercase tracking-widest text-emerald-400 block mb-1">
                    Certified Technical Matrix
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-heading font-black text-white">
                    Technical Specifications
                  </h2>
                </div>
                <div className="hidden sm:flex items-center gap-2 text-xs font-bold text-slate-400 bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
                  <ShieldCheck size={14} className="text-emerald-400" /> BIS Certified
                </div>
              </div>

              <div className="bg-[#0D1525] border border-white/10 rounded-2xl overflow-hidden shadow-2xl divide-y divide-white/5">
                {[
                  { label: "Model Number", val: product.name, bold: true },
                  { label: "Battery Series", val: `${product.series || "Goodwin Gold"} High-Crank`, bold: false },
                  { label: "Technology", val: product.technology || "Heavy-Duty Calcium-Tin Expanded Grid", bold: false },
                  { label: "Rated Capacity", val: product.ah ? `${product.ah} @ 20Hr Rate` : "Factory Standard", bold: true },
                  { label: "Nominal Voltage", val: product.voltage || "12 Volts DC", bold: false },
                  { label: "Dimensions (L x W x H)", val: product.dimensions || "Standard JIS/DIN Case Specification", bold: false },
                  { label: "Total Filled Weight", val: product.weight || "Engineered Heavy-Duty Mass", bold: false },
                  { label: "Terminal Layout & Polarity", val: product.terminalLayout || "Left / Right Terminal (Standard Post)", bold: false },
                  { label: "Warranty Coverage", val: product.warranty_options && product.warranty_options.length > 0 ? product.warranty_options.join(" / ") : (product.warranty || "Standard Replacement Warranty"), bold: true }
                ].map((row, idx) => (
                  <div key={idx} className="grid grid-cols-1 sm:grid-cols-3 hover:bg-white/[0.02] transition-colors">
                    <div className="p-4 sm:p-5 sm:border-r sm:border-white/5 bg-white/[0.02] text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center">
                      {row.label}
                    </div>
                    <div className={`p-4 sm:p-5 text-sm sm:col-span-2 flex items-center ${row.bold ? "text-white font-bold" : "text-slate-300 font-medium"}`}>
                      {row.val}
                    </div>
                  </div>
                ))}
              </div>

              {/* Datasheet Download Strip */}
              <div className="mt-8 flex flex-col sm:flex-row gap-4 p-5 rounded-2xl bg-gradient-to-r from-emerald-950/40 to-transparent border border-emerald-500/20 items-center justify-between">
                <div>
                  <h4 className="text-white font-bold text-sm mb-1">Official Product Engineering Datasheet</h4>
                  <p className="text-xs text-slate-400">Download complete discharge curves, CCA values, and dimension CAD schematics.</p>
                </div>
                <div className="flex gap-2 w-full sm:w-auto">
                  <a 
                    href={`/api/datasheet/${product.slug}`} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex-1 sm:flex-initial flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider border border-white/10 transition-all"
                  >
                    <FileText size={14} className="text-emerald-400" /> View Online
                  </a>
                  <a 
                    href={`/api/datasheet/${product.slug}?download=true`} 
                    download 
                    className="flex-1 sm:flex-initial flex items-center justify-center gap-2 bg-emerald-500 text-black px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider hover:bg-emerald-400 transition-all shadow-md shadow-emerald-500/20"
                  >
                    <Download size={14} /> Download PDF
                  </a>
                </div>
              </div>
            </div>

            {/* Side Column: Vehicle Compatibility & Care Guide */}
            <div className="flex flex-col gap-6">
              
              {/* Compatibility Box */}
              <div className="bg-[#0D1525] border border-white/10 rounded-2xl p-6 shadow-xl">
                <h3 className="font-bold text-white mb-3 uppercase tracking-wider text-xs flex items-center gap-2">
                  <ShieldCheck size={16} className="text-emerald-400" /> Vehicle Compatibility
                </h3>
                <p className="text-xs text-slate-400 mb-4">Recommended for the following automotive applications:</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {product.application && product.application.length > 0 ? product.application.map((app, i) => (
                    <span key={i} className="bg-white/5 border border-white/10 px-3 py-1 rounded-full text-xs font-bold text-slate-200">
                      {app}
                    </span>
                  )) : (
                    <span className="text-slate-400 text-xs">Motorcycles, Scooters, Cars, Commercial Fleets.</span>
                  )}
                </div>

                <Link
                  href="/battery-finder"
                  className="w-full inline-flex items-center justify-center gap-2 text-xs font-black uppercase tracking-wider py-3 rounded-xl bg-white/5 hover:bg-white/10 text-emerald-400 border border-emerald-500/30 transition-all"
                >
                  <Search size={14} /> Find By Exact Vehicle Model
                </Link>
              </div>

              {/* Installation & Maintenance */}
              <div className="bg-[#0D1525] border border-white/10 rounded-2xl p-6 shadow-xl">
                <h3 className="font-bold text-white mb-4 uppercase tracking-wider text-xs flex items-center gap-2">
                  <Wrench size={16} className="text-emerald-400" /> Installation & Care Standards
                </h3>
                <ul className="text-xs text-slate-300 space-y-3 leading-relaxed">
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0 mt-1.5" />
                    <span>Clean battery tray and ensure terminal clamps are tightened to OE torque.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0 mt-1.5" />
                    <span>Always connect <strong>Positive (+)</strong> terminal first, then <strong>Negative (-)</strong>.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0 mt-1.5" />
                    <span>Activate your Goodwin digital e-warranty within 14 days of purchase at any authorized dealer.</span>
                  </li>
                </ul>
              </div>

              {/* Need Help Box */}
              <div className="bg-gradient-to-br from-[#00843D] to-[#0D1525] p-6 rounded-2xl border border-emerald-500/40 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-400/10 rounded-full blur-2xl pointer-events-none" />
                <h3 className="font-black text-white text-base mb-1">Looking for Bulk or Dealer Supply?</h3>
                <p className="text-slate-200 text-xs mb-4 leading-relaxed">
                  Connect directly with our regional dispatch team for stockist discounts, GST billing, and immediate dispatch.
                </p>
                <a 
                  href="tel:9667724411" 
                  className="flex items-center justify-center gap-2 bg-white text-emerald-950 font-black px-4 py-3 rounded-xl text-xs uppercase tracking-wider hover:bg-slate-100 transition-all shadow-md"
                >
                  <Phone size={14} /> Call Regional Sales: 96677 24411
                </a>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org/",
            "@type": "Product",
            name: product.name,
            image: product.image ? `https://goodwinbatteries.in${product.image}` : "https://goodwinbatteries.in/assets/logo/Goodwin.png",
            description: product.description || "Premium automotive battery by Goodwin.",
            sku: product.slug,
            brand: {
              "@type": "Brand",
              name: "Goodwin Batteries",
            },
            offers: {
              "@type": "Offer",
              url: `https://goodwinbatteries.in/products/${product.slug}`,
              priceCurrency: "INR",
              price: "0",
              availability: "https://schema.org/InStock",
              itemCondition: "https://schema.org/NewCondition",
            },
          }),
        }}
      />
    </div>
  );
}
