"use client";

import { useState, useEffect } from "react";
import { 
  Battery, Car, Truck, Bike, Tractor, Search, Phone, 
  Loader2, Info, ArrowLeft, RotateCcw, Download, CheckCircle, Zap, ShieldCheck 
} from "lucide-react";
import clsx from "clsx";
import Link from "next/link";
import Image from "next/image";
import { useGlobalSettings } from "@/components/GlobalSettingsProvider";

import vehicleFitments from "@/data/vehicleFitments.json";
import goodwinProducts from "@/data/goodwinProducts.json";

export default function VehicleFinder() {
  const settings = useGlobalSettings();
  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5 | 6 | 7>(1);
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("Initializing...");

  // Data Options
  const [types, setTypes] = useState<string[]>([]);
  const [brands, setBrands] = useState<string[]>([]);
  const [models, setModels] = useState<string[]>([]);
  const [variants, setVariants] = useState<string[]>([]);
  const [fuels, setFuels] = useState<string[]>([]);
  const [years, setYears] = useState<string[]>([]);
  
  const [selections, setSelections] = useState({
    type: "",
    brand: "",
    model: "",
    variant: "",
    fuel: "",
    year: ""
  });

  // Results
  const [recommendedProduct, setRecommendedProduct] = useState<any | null>(null);
  const [fitmentStatus, setFitmentStatus] = useState<"verified" | "unverified">("verified");

  // Search
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    // Initial load of Types
    const uniqueTypes = Array.from(new Set(vehicleFitments.map(f => f.type))).sort();
    setTypes(uniqueTypes);
  }, []);

  const resetFinder = () => {
    setStep(1);
    setSelections({ type: "", brand: "", model: "", variant: "", fuel: "", year: "" });
    setRecommendedProduct(null);
    setSearchQuery("");
    setSearchResults([]);
  };

  const goBack = () => {
    if (step > 1) {
      setStep((prev) => (prev - 1) as any);
    }
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.length < 2) {
      setSearchResults([]);
      return;
    }
    
    setIsSearching(true);
    // Find matching models
    const matches = vehicleFitments.filter(f => 
      f.model.toLowerCase().includes(query.toLowerCase()) || 
      f.brand.toLowerCase().includes(query.toLowerCase())
    );
    
    // Deduplicate by brand + model
    const uniqueMatches: any[] = [];
    const seen = new Set();
    for (const m of matches) {
      const key = `${m.brand}-${m.model}`;
      if (!seen.has(key)) {
        seen.add(key);
        uniqueMatches.push(m);
      }
      if (uniqueMatches.length >= 10) break;
    }
      
    setSearchResults(uniqueMatches);
    setIsSearching(false);
  };

  const selectSearchResult = (fitment: any) => {
    setSearchQuery("");
    setSearchResults([]);
    setSelections(s => ({ 
      ...s, 
      type: fitment.type, 
      brand: fitment.brand, 
      model: fitment.model,
      variant: "", fuel: "", year: ""
    }));
    
    setStep(4);
    setLoading(true);
    setLoadingText("Loading variants...");
    
    setTimeout(() => {
      const v = Array.from(new Set(vehicleFitments
        .filter(f => f.type === fitment.type && f.brand === fitment.brand && f.model === fitment.model)
        .map(f => f.variant)
      ));
      setVariants(v.sort());
      setLoading(false);
    }, 250);
  };

  const handleTypeSelect = (type: string) => {
    setSelections(s => ({ ...s, type, brand: "", model: "", variant: "", fuel: "", year: "" }));
    setStep(2);
    setLoading(true);
    setLoadingText("Loading brands...");
    setTimeout(() => {
      const b = Array.from(new Set(vehicleFitments.filter(f => f.type === type).map(f => f.brand)));
      setBrands(b.sort());
      setLoading(false);
    }, 250);
  };

  const handleBrandSelect = (brand: string) => {
    setSelections(s => ({ ...s, brand, model: "", variant: "", fuel: "", year: "" }));
    setStep(3);
    setLoading(true);
    setLoadingText("Loading models...");
    setTimeout(() => {
      const m = Array.from(new Set(vehicleFitments.filter(f => f.type === selections.type && f.brand === brand).map(f => f.model)));
      setModels(m.sort());
      setLoading(false);
    }, 250);
  };

  const handleModelSelect = (model: string) => {
    setSelections(s => ({ ...s, model, variant: "", fuel: "", year: "" }));
    setStep(4);
    setLoading(true);
    setLoadingText("Loading variants...");
    setTimeout(() => {
      const v = Array.from(new Set(vehicleFitments
        .filter(f => f.type === selections.type && f.brand === selections.brand && f.model === model)
        .map(f => f.variant)
      ));
      setVariants(v.sort());
      setLoading(false);
    }, 250);
  };

  const handleVariantSelect = (variant: string) => {
    setSelections(s => ({ ...s, variant, fuel: "", year: "" }));
    setStep(5);
    setLoading(true);
    setLoadingText("Loading fuels...");
    setTimeout(() => {
      const fl = Array.from(new Set(vehicleFitments
        .filter(f => f.type === selections.type && f.brand === selections.brand && f.model === selections.model && f.variant === variant)
        .map(f => f.fuel)
      ));
      setFuels(fl.sort());
      setLoading(false);
    }, 250);
  };

  const handleFuelSelect = (fuel: string) => {
    setSelections(s => ({ ...s, fuel, year: "" }));
    setStep(6);
    setLoading(true);
    setLoadingText("Loading years...");
    setTimeout(() => {
      const f = vehicleFitments.find(f => 
        f.type === selections.type && 
        f.brand === selections.brand && 
        f.model === selections.model && 
        f.variant === selections.variant && 
        f.fuel === fuel
      );
      if (f) {
        const y: string[] = [];
        for (let i = f.yearTo; i >= f.yearFrom; i--) {
          y.push(i.toString());
        }
        setYears(y);
      } else {
        setYears([]);
      }
      setLoading(false);
    }, 250);
  };

  const handleYearSelect = (year: string) => {
    setSelections(s => ({ ...s, year }));
    setStep(7);
    setLoading(true);
    setLoadingText("Finding verified battery match...");

    setTimeout(() => {
      const match = vehicleFitments.find(f => 
        f.type === selections.type && 
        f.brand === selections.brand && 
        f.model === selections.model && 
        f.variant === selections.variant && 
        f.fuel === selections.fuel
      );

      if (match && match.batteryModel) {
        const prod = goodwinProducts.find(p => p.slug === match.batteryProductId || p.slug === match.batteryModel || p.name === match.batteryModel);
        if (prod) {
          setRecommendedProduct(prod);
          setFitmentStatus("verified");
        } else {
          setRecommendedProduct(null);
          setFitmentStatus("unverified");
        }
      } else {
        setRecommendedProduct(null);
        setFitmentStatus("unverified");
      }
      
      setLoading(false);
    }, 450);
  };

  const getIconForType = (typeName: string) => {
    if (typeName.includes("Passenger") || typeName.includes("Car")) return <Car size={28} />;
    if (typeName.includes("Two") || typeName.includes("Bike") || typeName.includes("Motorcycle") || typeName.includes("Scooter")) return <Bike size={28} />;
    if (typeName.includes("Commercial") || typeName.includes("Truck")) return <Truck size={28} />;
    if (typeName.includes("Tractor")) return <Tractor size={28} />;
    return <Battery size={28} />;
  };

  const whatsappMessage = encodeURIComponent(
    `Hello Goodwin Batteries,\n\nI used the Battery Finder and need a battery for:\n\n` +
    `Vehicle: ${selections.brand} ${selections.model}\n` +
    `Variant: ${selections.variant}\n` +
    `Fuel: ${selections.fuel}\n` +
    `Year: ${selections.year}\n\n` +
    (recommendedProduct ? 
      `Recommended Goodwin Battery:\n${recommendedProduct.name}\n${recommendedProduct.voltage} / ${recommendedProduct.capacity}\n\n` :
      `The database showed this as Unverified. Can you please help me find the exact match?\n\n`
    ) +
    `Please confirm availability and price.`
  );
  
  const whatsappUrl = `https://wa.me/${settings?.whatsapp_main || "919667724411"}?text=${whatsappMessage}`;

  return (
    <div className="bg-slate-900 rounded-3xl shadow-2xl border border-slate-800 overflow-hidden min-h-[500px] flex flex-col relative text-white">
      {/* Header */}
      <div className="bg-slate-950 p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between shrink-0 border-b border-slate-800 gap-4">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-black tracking-widest text-brand uppercase mb-1">
            <Zap size={14} className="text-amber-400" /> Instant Match Engine
          </div>
          <h3 className="text-2xl font-heading font-black tracking-tight text-white uppercase">
            Goodwin Battery Finder
          </h3>
          <p className="text-slate-400 text-xs sm:text-sm">
            Select your vehicle parameters to get an OEM-grade verified battery recommendation.
          </p>
        </div>
        
        {/* Search */}
        <div className="relative z-20 w-full md:w-72">
          <div className="relative">
            <input 
              type="text" 
              placeholder="Search make or model..." 
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full bg-slate-900 text-white placeholder:text-slate-500 border border-slate-700 rounded-xl py-2.5 pl-10 pr-4 focus:outline-none focus:border-brand text-xs sm:text-sm transition-all shadow-inner"
            />
            <Search size={16} className="absolute left-3.5 top-3.5 text-slate-400" />
          </div>
          
          {searchQuery.length >= 2 && (
            <div className="absolute top-full mt-2 w-full bg-slate-900 border border-slate-700 rounded-xl shadow-2xl overflow-hidden max-h-60 overflow-y-auto z-50">
              {isSearching ? (
                <div className="p-4 text-center text-slate-400 text-xs">Searching database...</div>
              ) : searchResults.length > 0 ? (
                searchResults.map(res => (
                  <button 
                    key={res.id} 
                    onClick={() => selectSearchResult(res)}
                    className="w-full text-left px-4 py-3 border-b border-slate-800 hover:bg-slate-800 text-slate-200 text-xs font-semibold transition-colors flex items-center justify-between"
                  >
                    <span>{res.brand} {res.model}</span>
                    <span className="text-[10px] text-slate-500 uppercase">{res.type}</span>
                  </button>
                ))
              ) : (
                <div className="p-4 text-center text-slate-400 text-xs">No matching vehicle found</div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Stepped Progress Bar */}
      <div className="flex items-center justify-between bg-slate-950/70 px-6 py-3 border-b border-slate-800">
        <div className="flex text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-400 overflow-x-auto whitespace-nowrap scrollbar-hide shrink-0 items-center gap-1 sm:gap-2">
          <span className={clsx("cursor-pointer transition-colors px-2 py-1 rounded-md", step >= 1 ? "text-brand bg-brand/10" : "hover:text-white")} onClick={() => setStep(1)}>1. Type</span>
          <span className="text-slate-600">&rsaquo;</span>
          <span className={clsx("cursor-pointer transition-colors px-2 py-1 rounded-md", step >= 2 ? "text-brand bg-brand/10" : "hover:text-white")} onClick={() => step >= 2 && setStep(2)}>2. Brand</span>
          <span className="text-slate-600">&rsaquo;</span>
          <span className={clsx("cursor-pointer transition-colors px-2 py-1 rounded-md", step >= 3 ? "text-brand bg-brand/10" : "hover:text-white")} onClick={() => step >= 3 && setStep(3)}>3. Model</span>
          <span className="text-slate-600">&rsaquo;</span>
          <span className={clsx("cursor-pointer transition-colors px-2 py-1 rounded-md", step >= 4 ? "text-brand bg-brand/10" : "hover:text-white")} onClick={() => step >= 4 && setStep(4)}>4. Variant</span>
          <span className="text-slate-600">&rsaquo;</span>
          <span className={clsx("cursor-pointer transition-colors px-2 py-1 rounded-md", step >= 5 ? "text-brand bg-brand/10" : "hover:text-white")} onClick={() => step >= 5 && setStep(5)}>5. Fuel</span>
          <span className="text-slate-600">&rsaquo;</span>
          <span className={clsx("cursor-pointer transition-colors px-2 py-1 rounded-md", step >= 6 ? "text-brand bg-brand/10" : "hover:text-white")} onClick={() => step >= 6 && setStep(6)}>6. Year</span>
        </div>
        
        <button 
          onClick={resetFinder} 
          className="text-slate-400 hover:text-white flex items-center gap-1 text-[10px] sm:text-xs font-bold uppercase tracking-widest transition-colors shrink-0 ml-4 hover:underline"
        >
          <RotateCcw size={13} /> Reset
        </button>
      </div>

      {/* Main Content Area */}
      <div className="p-6 md:p-8 flex-1 flex flex-col relative min-h-[360px] bg-slate-900">
        {loading && (
          <div className="absolute inset-0 z-20 bg-slate-950/80 backdrop-blur-md flex flex-col items-center justify-center rounded-2xl">
            <Loader2 size={36} className="animate-spin text-brand mb-3" />
            <p className="text-white font-black tracking-widest uppercase text-xs">{loadingText}</p>
          </div>
        )}

        {/* Back Button */}
        {step > 1 && step < 7 && !loading && (
          <button 
            onClick={goBack} 
            className="mb-4 inline-flex items-center gap-1 text-slate-400 hover:text-white transition-colors text-xs font-bold tracking-wider uppercase"
          >
            <ArrowLeft size={14} /> Back to Previous Step
          </button>
        )}

        {/* Step 1: Type */}
        {step === 1 && (
          <div className="animate-in fade-in duration-300">
            <h4 className="text-base sm:text-lg font-bold mb-6 text-center text-white">Select Vehicle Category</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
              {types.map((vt) => (
                <button
                  key={vt}
                  onClick={() => handleTypeSelect(vt)}
                  className="flex flex-col items-center justify-center p-6 border border-slate-800 bg-slate-950/80 rounded-2xl hover:border-brand/70 hover:bg-slate-800/80 transition-all text-white group active:scale-95 shadow-md hover:-translate-y-1"
                >
                  <div className="text-slate-400 group-hover:text-brand transition-colors mb-3 group-hover:scale-110">
                    {getIconForType(vt)}
                  </div>
                  <span className="font-bold text-xs sm:text-sm text-center">{vt}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Brand */}
        {step === 2 && (
          <div className="animate-in fade-in duration-300">
            <h4 className="text-base sm:text-lg font-bold mb-6 text-center text-white">Select Vehicle Make</h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 max-w-4xl mx-auto">
              {brands.map((brand) => (
                <button
                  key={brand}
                  onClick={() => handleBrandSelect(brand)}
                  className="py-3.5 px-3 border border-slate-800 bg-slate-950/80 rounded-xl hover:border-brand/70 hover:bg-slate-800 text-center font-bold text-xs sm:text-sm text-white active:scale-95 transition-all truncate"
                >
                  {brand}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 3: Model */}
        {step === 3 && (
          <div className="animate-in fade-in duration-300">
            <h4 className="text-base sm:text-lg font-bold mb-6 text-center text-white">Select {selections.brand} Model</h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 max-w-4xl mx-auto">
              {models.map((model) => (
                <button
                  key={model}
                  onClick={() => handleModelSelect(model)}
                  className="py-3.5 px-3 border border-slate-800 bg-slate-950/80 rounded-xl hover:border-brand/70 hover:bg-slate-800 text-center font-bold text-xs sm:text-sm text-white active:scale-95 transition-all truncate"
                >
                  {model}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 4: Variant */}
        {step === 4 && (
          <div className="animate-in fade-in duration-300">
            <h4 className="text-base sm:text-lg font-bold mb-6 text-center text-white">Select Vehicle Variant</h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 max-w-4xl mx-auto">
              {variants.map((variant) => (
                <button
                  key={variant}
                  onClick={() => handleVariantSelect(variant)}
                  className="py-3.5 px-3 border border-slate-800 bg-slate-950/80 rounded-xl hover:border-brand/70 hover:bg-slate-800 text-center font-bold text-xs sm:text-sm text-white active:scale-95 transition-all truncate"
                >
                  {variant}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 5: Fuel */}
        {step === 5 && (
          <div className="animate-in fade-in duration-300">
            <h4 className="text-base sm:text-lg font-bold mb-6 text-center text-white">Select Fuel Type</h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
              {fuels.map((fuel) => (
                <button
                  key={fuel}
                  onClick={() => handleFuelSelect(fuel)}
                  className="py-5 px-4 border border-slate-800 bg-slate-950/80 rounded-2xl hover:border-brand/70 hover:bg-slate-800 text-center font-bold text-white flex flex-col items-center justify-center gap-2 active:scale-95 transition-all"
                >
                  <span className="text-2xl">{fuel === "Electric" ? "⚡" : fuel === "Diesel" ? "🛢️" : "⛽"}</span>
                  <span className="text-xs sm:text-sm">{fuel}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 6: Year */}
        {step === 6 && (
          <div className="animate-in fade-in duration-300">
            <h4 className="text-base sm:text-lg font-bold mb-6 text-center text-white">Select Manufacturing Year</h4>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3 max-w-3xl mx-auto">
              {years.map((year) => (
                <button
                  key={year}
                  onClick={() => handleYearSelect(year)}
                  className="py-3.5 px-2 border border-slate-800 bg-slate-950/80 rounded-xl hover:border-brand/70 hover:bg-slate-800 text-center font-bold text-xs sm:text-sm text-white active:scale-95 transition-all"
                >
                  {year}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 7: Result - VERIFIED MATCH (Amaron / VARTA Benchmark) */}
        {step === 7 && fitmentStatus === "verified" && recommendedProduct && (
          <div className="animate-in zoom-in-95 duration-400 flex flex-col items-center py-2">
            <div className="w-full max-w-3xl bg-slate-950 border border-slate-800 rounded-3xl p-6 md:p-8 flex flex-col md:flex-row items-center gap-8 shadow-2xl relative overflow-hidden">
              {/* Verified Badge */}
              <div className="absolute top-0 right-0 bg-brand text-white px-4 py-1.5 text-[11px] font-black uppercase tracking-wider rounded-bl-xl flex items-center gap-1 shadow-md">
                <CheckCircle size={14} /> OEM VERIFIED FITMENT
              </div>
              
              {/* Battery Visual */}
              <div className="w-48 h-48 bg-slate-900 rounded-2xl flex items-center justify-center shrink-0 border border-slate-800 p-4 relative z-10 drop-shadow-xl">
                {recommendedProduct.image ? (
                  <div className="w-full h-full relative">
                    <Image 
                      src={recommendedProduct.image} 
                      alt={recommendedProduct.name} 
                      fill 
                      className="object-contain" 
                    />
                  </div>
                ) : (
                  <Battery size={64} className="text-slate-600" />
                )}
              </div>
              
              {/* Product Information */}
              <div className="flex-1 text-center md:text-left relative z-10">
                <span className="text-brand font-bold text-xs tracking-widest uppercase mb-1 block">
                  {recommendedProduct.series || "Goodwin Power"} Series
                </span>
                <h4 className="text-2xl sm:text-3xl font-heading font-black text-white mb-4">
                  {recommendedProduct.name}
                </h4>
                
                {/* Specs Matrix */}
                <div className="grid grid-cols-3 gap-2.5 mb-5">
                  <div className="bg-slate-900 px-3 py-2 rounded-xl border border-slate-800 text-center">
                    <span className="text-[10px] text-slate-400 block uppercase font-bold">Capacity</span>
                    <strong className="text-white text-sm">{recommendedProduct.ah || "N/A"}</strong>
                  </div>
                  <div className="bg-slate-900 px-3 py-2 rounded-xl border border-slate-800 text-center">
                    <span className="text-[10px] text-slate-400 block uppercase font-bold">Voltage</span>
                    <strong className="text-white text-sm">{recommendedProduct.voltage || "12V"}</strong>
                  </div>
                  <div className="bg-brand/10 px-3 py-2 rounded-xl border border-brand/30 text-center">
                    <span className="text-[10px] text-emerald-400 block uppercase font-bold">Warranty</span>
                    <strong className="text-emerald-300 text-sm">
                      {recommendedProduct.warranty_options?.length ? recommendedProduct.warranty_options[0] : recommendedProduct.warranty || "36M"}
                    </strong>
                  </div>
                </div>

                <div className="bg-slate-900 rounded-xl p-3 mb-6 border border-slate-800 text-xs text-slate-400 text-left">
                  <span className="font-bold text-white block mb-0.5">Matched for your vehicle:</span>
                  {selections.brand} {selections.model} ({selections.variant}) • {selections.fuel} • {selections.year}
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Link 
                    href={`/products/${recommendedProduct.slug}`} 
                    className="bg-slate-800 hover:bg-slate-700 text-white px-5 py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-all text-center flex-1 border border-slate-700"
                  >
                    View Specs
                  </Link>
                  <a 
                    href={`/api/datasheet/${recommendedProduct.slug}?download=true`} 
                    download 
                    className="glass-dark hover:bg-slate-800 text-slate-300 hover:text-white px-5 py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 flex-1 border border-slate-700"
                  >
                    <Download size={14} /> Datasheet
                  </a>
                  <a 
                    href={whatsappUrl} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="bg-brand hover:bg-brand-dark text-white px-5 py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 flex-1 shadow-lg shadow-brand/20 active:scale-95"
                  >
                    <Phone size={14} /> WhatsApp Dealer
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 7: Empty State / UNVERIFIED MATCH */}
        {step === 7 && fitmentStatus === "unverified" && (
          <div className="animate-in zoom-in-95 duration-400 flex flex-col items-center py-6">
            <div className="w-16 h-16 bg-slate-950 border border-slate-800 rounded-2xl flex items-center justify-center mb-5 text-amber-400">
              <Info size={28} />
            </div>
            <h4 className="text-xl font-heading font-black mb-3 text-center text-white uppercase tracking-wider">
              Custom Vehicle Verification
            </h4>
            <p className="text-slate-300 font-semibold mb-2 text-center text-sm">
              We want to ensure 100% exact tray dimensions and terminal polarity for your vehicle.
            </p>
            <p className="text-slate-400 mb-6 max-w-md text-center text-xs leading-relaxed">
              For <strong>{selections.brand} {selections.model} {selections.variant}</strong> ({selections.fuel}, {selections.year}), contact our technical fitment team directly via WhatsApp for an immediate match confirmation.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 w-full max-w-md mb-8">
              <a 
                href={whatsappUrl} 
                target="_blank" 
                rel="noreferrer" 
                className="bg-brand hover:bg-brand-dark text-white px-6 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all w-full flex items-center justify-center gap-2 shadow-lg shadow-brand/20"
              >
                <Phone size={16} /> WhatsApp Fitment Team
              </a>
              <Link 
                href="/products" 
                className="glass-dark hover:bg-slate-800 text-slate-200 px-6 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all w-full flex items-center justify-center gap-2 border border-slate-700"
              >
                Browse All Batteries
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
