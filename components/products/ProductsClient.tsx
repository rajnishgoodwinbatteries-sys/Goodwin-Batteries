"use client";

import { useState, useMemo } from "react";
import ProductCard from "@/components/products/ProductCard";
import { Filter, Search, RotateCcw, ArrowUpDown, Truck, ShieldCheck, Tag, Zap } from "lucide-react";
import { Product, Category } from "@/types";
import { getProductPricing, formatINR } from "@/lib/pricing";

export default function ProductsClient({
  initialProducts,
  categories,
}: {
  initialProducts: Product[];
  categories: Category[];
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedWarranty, setSelectedWarranty] = useState<string>("All");
  const [selectedVoltage, setSelectedVoltage] = useState<string>("All");
  const [priceRange, setPriceRange] = useState<string>("All");
  const [sortBy, setSortBy] = useState<string>("featured");

  const warrantyOptions = useMemo(() => {
    const options = new Set(initialProducts.map(p => p.warranty).filter(Boolean));
    return Array.from(options).sort();
  }, [initialProducts]);

  const voltageOptions = useMemo(() => {
    const options = new Set(initialProducts.map(p => p.voltage).filter(Boolean));
    return Array.from(options).sort();
  }, [initialProducts]);

  const filteredProducts = useMemo(() => {
    const filtered = initialProducts.filter((product) => {
      const pricing = getProductPricing(product);

      // Search matching
      const query = searchQuery.toLowerCase();
      const matchesSearch =
        !query ||
        product.name.toLowerCase().includes(query) ||
        (product.series && product.series.toLowerCase().includes(query)) ||
        (product.category && product.category.toLowerCase().includes(query)) ||
        (product.ah && product.ah.toLowerCase().includes(query));

      // Category matching
      const matchesCategory =
        selectedCategory === "All" || product.category === selectedCategory;

      const matchesWarranty = 
        selectedWarranty === "All" || product.warranty === selectedWarranty;
        
      const matchesVoltage =
        selectedVoltage === "All" || product.voltage === selectedVoltage;

      // Price range
      let matchesPrice = true;
      if (priceRange === "under-1000") {
        matchesPrice = pricing.price < 1000;
      } else if (priceRange === "1000-2000") {
        matchesPrice = pricing.price >= 1000 && pricing.price <= 2000;
      } else if (priceRange === "2000-5000") {
        matchesPrice = pricing.price > 2000 && pricing.price <= 5000;
      } else if (priceRange === "above-5000") {
        matchesPrice = pricing.price > 5000;
      }

      return matchesSearch && matchesCategory && matchesWarranty && matchesVoltage && matchesPrice;
    });

    // Sorting
    return filtered.sort((a, b) => {
      const pricingA = getProductPricing(a);
      const pricingB = getProductPricing(b);

      if (sortBy === "price-asc") {
        return pricingA.price - pricingB.price;
      }
      if (sortBy === "price-desc") {
        return pricingB.price - pricingA.price;
      }
      if (sortBy === "capacity-desc") {
        const ahA = parseFloat((a.ah || "").replace(/[^\d.]/g, "")) || 0;
        const ahB = parseFloat((b.ah || "").replace(/[^\d.]/g, "")) || 0;
        return ahB - ahA;
      }
      if (sortBy === "warranty-desc") {
        const wA = parseInt((a.warranty || "").replace(/\D/g, "")) || 0;
        const wB = parseInt((b.warranty || "").replace(/\D/g, "")) || 0;
        return wB - wA;
      }

      // Default: featured / category
      if (a.category !== b.category) {
        return (a.category || "").localeCompare(b.category || "");
      }
      return (a.name || "").localeCompare(b.name || "");
    });
  }, [initialProducts, searchQuery, selectedCategory, selectedWarranty, selectedVoltage, priceRange, sortBy]);

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("All");
    setSelectedWarranty("All");
    setSelectedVoltage("All");
    setPriceRange("All");
    setSortBy("featured");
  };

  const hasActiveFilters =
    selectedCategory !== "All" ||
    selectedWarranty !== "All" ||
    selectedVoltage !== "All" ||
    priceRange !== "All" ||
    searchQuery !== "";

  return (
    <div className="flex flex-col gap-8 text-slate-900">
      
      {/* E-Commerce Value Props Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 bg-gradient-to-r from-emerald-50 via-white to-emerald-50 p-4 rounded-2xl border border-emerald-100 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#00843D] text-white flex items-center justify-center shrink-0">
            <Truck size={18} />
          </div>
          <div>
            <span className="text-xs font-black uppercase text-slate-900 block">Free Doorstep Fitment</span>
            <span className="text-[11px] text-slate-500 font-medium">Technician arrives in 2-4 hrs</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0">
            <Tag size={18} />
          </div>
          <div>
            <span className="text-xs font-black uppercase text-slate-900 block">Factory Direct Pricing</span>
            <span className="text-[11px] text-slate-500 font-medium">Best online discounts & GST bill</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0">
            <ShieldCheck size={18} />
          </div>
          <div>
            <span className="text-xs font-black uppercase text-slate-900 block">100% Genuine Sealed</span>
            <span className="text-[11px] text-slate-500 font-medium">Original brand warranty card</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-slate-900 text-white flex items-center justify-center shrink-0">
            <ShieldCheck size={18} />
          </div>
          <div>
            <span className="text-xs font-black uppercase text-slate-900 block">100% Secure Checkout</span>
            <span className="text-[11px] text-slate-500 font-medium">UPI, Cards & Instant Dispatch</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar / Filters */}
        <aside className="w-full lg:w-72 shrink-0">
          <div className="sticky top-28 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Filter size={18} className="text-[#00843D]" />
                <h3 className="font-bold text-base text-slate-900 uppercase tracking-wider">Catalogue Filters</h3>
              </div>
              {hasActiveFilters && (
                <button
                  onClick={handleResetFilters}
                  className="text-[11px] font-bold text-slate-500 hover:text-slate-900 flex items-center gap-1 transition-colors"
                >
                  <RotateCcw size={12} /> Reset
                </button>
              )}
            </div>

            <div className="space-y-6">
              {/* Search Input */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-2">
                  Keyword Search
                </label>
                <div className="relative">
                  <Search
                    size={15}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                  <input
                    type="text"
                    placeholder="e.g. TZ4LB, 12V 35AH..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-slate-50 hover:bg-white focus:bg-white border border-slate-200 rounded-xl pl-9 pr-3.5 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#00843D] focus:ring-2 focus:ring-emerald-500/20 shadow-sm transition-all"
                  />
                </div>
              </div>

              {/* Price Filter Chips */}
              <div>
                <h4 className="font-bold text-xs text-slate-900 mb-2.5 uppercase tracking-wider">
                  Price Range
                </h4>
                <div className="grid grid-cols-2 gap-1.5">
                  {[
                    { id: "All", label: "All Prices" },
                    { id: "under-1000", label: "Under ₹1,000" },
                    { id: "1000-2000", label: "₹1,000 - ₹2,000" },
                    { id: "2000-5000", label: "₹2,000 - ₹5,000" },
                    { id: "above-5000", label: "₹5,000+" },
                  ].map((chip) => (
                    <button
                      key={chip.id}
                      onClick={() => setPriceRange(chip.id)}
                      className={`text-xs px-2.5 py-2 rounded-lg font-bold text-left transition-all border ${
                        priceRange === chip.id
                          ? "bg-[#00843D] text-white border-[#00843D] shadow-xs"
                          : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                      }`}
                    >
                      {chip.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Categories */}
              <div>
                <h4 className="font-bold text-xs text-slate-900 mb-2.5 uppercase tracking-wider">
                  Application Categories
                </h4>
                <ul className="flex flex-col gap-1">
                  <li>
                    <button
                      onClick={() => setSelectedCategory("All")}
                      className={`text-xs transition-colors text-left w-full px-3 py-2 rounded-lg font-semibold flex items-center justify-between ${
                        selectedCategory === "All"
                          ? "bg-[#00843D] text-white shadow-md font-bold"
                          : "text-slate-700 hover:bg-slate-100"
                      }`}
                    >
                      <span>All Applications</span>
                      <span className="text-[10px] opacity-70">({initialProducts.length})</span>
                    </button>
                  </li>
                  {categories.map((cat) => {
                    const count = initialProducts.filter(p => p.category === cat.id).length;
                    return (
                      <li key={cat.id}>
                        <button
                          onClick={() => setSelectedCategory(cat.id)}
                          className={`text-xs transition-colors text-left w-full px-3 py-2 rounded-lg font-semibold flex items-center justify-between ${
                            selectedCategory === cat.id
                              ? "bg-[#00843D] text-white shadow-md font-bold"
                              : "text-slate-700 hover:bg-slate-100"
                          }`}
                        >
                          <span className="truncate">{cat.name}</span>
                          <span className="text-[10px] opacity-70">({count})</span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>

              {/* Voltage */}
              <div>
                <h4 className="font-bold text-xs text-slate-900 mb-2.5 uppercase tracking-wider">
                  Voltage
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  <button
                    onClick={() => setSelectedVoltage("All")}
                    className={`text-xs px-3 py-1.5 rounded-lg border font-bold transition-all ${
                      selectedVoltage === "All" 
                        ? "bg-[#00843D] text-white border-[#00843D] shadow-sm" 
                        : "bg-slate-50 text-slate-700 border-slate-200 hover:border-slate-300"
                    }`}
                  >
                    All
                  </button>
                  {voltageOptions.map(volt => (
                    <button
                      key={volt}
                      onClick={() => setSelectedVoltage(volt)}
                      className={`text-xs px-3 py-1.5 rounded-lg border font-bold transition-all ${
                        selectedVoltage === volt 
                          ? "bg-[#00843D] text-white border-[#00843D] shadow-sm" 
                          : "bg-slate-50 text-slate-700 border-slate-200 hover:border-slate-300"
                      }`}
                    >
                      {volt}
                    </button>
                  ))}
                </div>
              </div>

              {/* Warranty */}
              <div>
                <h4 className="font-bold text-xs text-slate-900 mb-2.5 uppercase tracking-wider">
                  Warranty Coverage
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  <button
                    onClick={() => setSelectedWarranty("All")}
                    className={`text-xs px-3 py-1.5 rounded-lg border font-bold transition-all ${
                      selectedWarranty === "All" 
                        ? "bg-[#00843D] text-white border-[#00843D] shadow-sm" 
                        : "bg-slate-50 text-slate-700 border-slate-200 hover:border-slate-300"
                    }`}
                  >
                    All
                  </button>
                  {warrantyOptions.map(warr => (
                    <button
                      key={warr}
                      onClick={() => setSelectedWarranty(warr)}
                      className={`text-xs px-3 py-1.5 rounded-lg border font-bold transition-all ${
                        selectedWarranty === warr 
                          ? "bg-[#00843D] text-white border-[#00843D] shadow-sm" 
                          : "bg-slate-50 text-slate-700 border-slate-200 hover:border-slate-300"
                      }`}
                    >
                      {warr}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Product Grid & Top Sort Bar */}
        <div className="flex-1">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 bg-slate-50 border border-slate-200 p-3.5 rounded-2xl">
            <p className="text-xs text-slate-600 font-bold uppercase tracking-wider">
              Showing <strong className="text-slate-900 font-black">{filteredProducts.length}</strong> Batteries
            </p>

            {/* Sort Control */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500 font-bold uppercase tracking-wider flex items-center gap-1">
                <ArrowUpDown size={13} /> Sort:
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-white border border-slate-200 text-xs text-slate-800 font-bold px-3 py-1.5 rounded-xl focus:outline-none focus:border-[#00843D] shadow-xs"
              >
                <option value="featured">Recommended</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="capacity-desc">Capacity (Ah): High to Low</option>
                <option value="warranty-desc">Warranty: Longest First</option>
              </select>
            </div>
          </div>

          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-12 text-center flex flex-col items-center justify-center">
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                No matching batteries found
              </h3>
              <p className="text-slate-600 text-sm max-w-sm mb-6">
                Try adjusting your search criteria, price range, or category filter to view other models.
              </p>
              <button
                onClick={handleResetFilters}
                className="px-6 py-2.5 bg-[#00843D] hover:bg-[#006830] text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-colors shadow-md shadow-emerald-700/20"
              >
                Reset All Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
