"use client";

import { useState, useMemo } from "react";
import ProductCard from "@/components/products/ProductCard";
import { Filter, Search, RotateCcw } from "lucide-react";
import { Product, Category } from "@/types";

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
      // Search matching
      const query = searchQuery.toLowerCase();
      const matchesSearch =
        !query ||
        product.name.toLowerCase().includes(query) ||
        (product.series && product.series.toLowerCase().includes(query)) ||
        (product.category && product.category.toLowerCase().includes(query));

      // Category matching
      const matchesCategory =
        selectedCategory === "All" || product.category === selectedCategory;

      const matchesWarranty = 
        selectedWarranty === "All" || product.warranty === selectedWarranty;
        
      const matchesVoltage =
        selectedVoltage === "All" || product.voltage === selectedVoltage;

      return matchesSearch && matchesCategory && matchesWarranty && matchesVoltage;
    });

    // Sort logically
    return filtered.sort((a, b) => {
      if (a.category !== b.category) {
        return (a.category || "").localeCompare(b.category || "");
      }
      if (a.voltage !== b.voltage) {
        return (a.voltage || "").localeCompare(b.voltage || "");
      }
      return (a.name || "").localeCompare(b.name || "");
    });
  }, [initialProducts, searchQuery, selectedCategory, selectedWarranty, selectedVoltage]);

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("All");
    setSelectedWarranty("All");
    setSelectedVoltage("All");
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8 text-white">
      {/* Sidebar / Filters (Livguard & Exide Benchmark) */}
      <aside className="w-full lg:w-72 shrink-0">
        <div className="sticky top-28 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <Filter size={18} className="text-brand" />
              <h3 className="font-bold text-base text-white uppercase tracking-wider">Catalogue Filters</h3>
            </div>
            {(selectedCategory !== "All" || selectedWarranty !== "All" || selectedVoltage !== "All" || searchQuery) && (
              <button
                onClick={handleResetFilters}
                className="text-[11px] font-bold text-slate-400 hover:text-white flex items-center gap-1 transition-colors"
              >
                <RotateCcw size={12} /> Reset
              </button>
            )}
          </div>

          <div className="space-y-6">
            {/* Search Input */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                Keyword Search
              </label>
              <div className="relative">
                <Search
                  size={15}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
                />
                <input
                  type="text"
                  placeholder="e.g. TZ4LB, 12V 35AH..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-9 pr-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand shadow-inner"
                />
              </div>
            </div>

            {/* Categories */}
            <div>
              <h4 className="font-bold text-xs text-white mb-2.5 uppercase tracking-wider">
                Application Categories
              </h4>
              <ul className="flex flex-col gap-1">
                <li>
                  <button
                    onClick={() => setSelectedCategory("All")}
                    className={`text-xs transition-colors text-left w-full px-3 py-2 rounded-lg font-semibold flex items-center justify-between ${
                      selectedCategory === "All"
                        ? "bg-brand text-white shadow-md font-bold"
                        : "text-slate-300 hover:bg-slate-800"
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
                            ? "bg-brand text-white shadow-md font-bold"
                            : "text-slate-300 hover:bg-slate-800"
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
              <h4 className="font-bold text-xs text-white mb-2.5 uppercase tracking-wider">
                Voltage
              </h4>
              <div className="flex flex-wrap gap-1.5">
                <button
                  onClick={() => setSelectedVoltage("All")}
                  className={`text-xs px-3 py-1.5 rounded-lg border font-bold transition-all ${
                    selectedVoltage === "All" 
                      ? "bg-brand text-white border-brand shadow-sm" 
                      : "bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-600"
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
                        ? "bg-brand text-white border-brand shadow-sm" 
                        : "bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-600"
                    }`}
                  >
                    {volt}
                  </button>
                ))}
              </div>
            </div>

            {/* Warranty */}
            <div>
              <h4 className="font-bold text-xs text-white mb-2.5 uppercase tracking-wider">
                Warranty Coverage
              </h4>
              <div className="flex flex-wrap gap-1.5">
                <button
                  onClick={() => setSelectedWarranty("All")}
                  className={`text-xs px-3 py-1.5 rounded-lg border font-bold transition-all ${
                    selectedWarranty === "All" 
                      ? "bg-brand text-white border-brand shadow-sm" 
                      : "bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-600"
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
                        ? "bg-brand text-white border-brand shadow-sm" 
                        : "bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-600"
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

      {/* Product Grid */}
      <div className="flex-1">
        <div className="flex items-center justify-between mb-6 bg-slate-900 border border-slate-800 px-4 py-3 rounded-xl">
          <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">
            Showing <strong className="text-white">{filteredProducts.length}</strong> Batteries
          </p>
          <span className="text-xs text-emerald-400 font-bold flex items-center gap-1">
            • Ready for Dispatch
          </span>
        </div>

        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-12 text-center flex flex-col items-center justify-center">
            <h3 className="text-xl font-bold text-white mb-2">
              No matching batteries found
            </h3>
            <p className="text-slate-400 text-sm max-w-sm mb-6">
              Try adjusting your search criteria or resetting filters to view our standard lineup.
            </p>
            <button
              onClick={handleResetFilters}
              className="px-6 py-2.5 bg-brand hover:bg-brand-dark text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-colors shadow-md"
            >
              Reset All Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
