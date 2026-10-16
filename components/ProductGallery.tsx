"use client";

import { useState } from "react";
import Image from "next/image";
import { Product } from "@/types";
import { Play } from "lucide-react";

export default function ProductGallery({ product }: { product: Product }) {
  // Setup the media array: first the main image, then unique gallery images, then videos.
  const mainImage = product.image;
  const galleryImages = (product.gallery || []).filter(img => img !== mainImage);
  const videos = product.videos || [];

  const [activeMedia, setActiveMedia] = useState<{ type: "image" | "video", url: string }>({
    type: "image",
    url: mainImage,
  });

  return (
    <div className="sticky top-28 flex flex-col gap-4">
      {/* Main Viewer */}
      <div className="bg-[#0D1525] rounded-3xl border border-white/10 aspect-square flex items-center justify-center p-6 md:p-10 relative overflow-hidden shadow-2xl group">
        <div className="absolute inset-0 bg-radial-hero pointer-events-none" />
        <div className="absolute top-4 right-4 z-20">
          <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
            OEM Specification
          </span>
        </div>
        
        <div className="w-full h-full bg-[#131D31]/70 backdrop-blur-md rounded-2xl flex items-center justify-center relative z-10 border border-white/10 p-6 md:p-8 transition-all group-hover:border-emerald-500/30">
          {activeMedia.type === "image" ? (
            <Image
              src={activeMedia.url}
              alt={product.name}
              fill
              priority
              className="object-contain p-4 transition-transform duration-700 ease-out group-hover:scale-105 drop-shadow-[0_15px_30px_rgba(0,0,0,0.6)]"
            />
          ) : (
            <video
              src={activeMedia.url}
              controls
              autoPlay
              className="max-h-full max-w-full object-contain rounded-xl"
            />
          )}
        </div>
      </div>

      {/* Thumbnails */}
      {(galleryImages.length > 0 || videos.length > 0) && (
        <div className="flex gap-3 overflow-x-auto pb-2 custom-scrollbar">
          {/* Main Image Thumbnail */}
          <button
            onClick={() => setActiveMedia({ type: "image", url: mainImage })}
            className={`shrink-0 w-20 h-20 bg-[#0D1525] rounded-xl border-2 overflow-hidden flex items-center justify-center p-1 transition-all relative ${
              activeMedia.url === mainImage 
                ? "border-emerald-500 shadow-lg shadow-emerald-500/20 scale-105" 
                : "border-white/10 hover:border-emerald-500/50 opacity-70 hover:opacity-100"
            }`}
          >
            <Image src={mainImage} alt="Main view" fill className="object-contain p-2" />
          </button>

          {/* Gallery Thumbnails */}
          {galleryImages.map((img, i) => (
            <button
              key={i}
              onClick={() => setActiveMedia({ type: "image", url: img })}
              className={`shrink-0 w-20 h-20 bg-[#0D1525] rounded-xl border-2 overflow-hidden flex items-center justify-center p-1 transition-all relative ${
                activeMedia.url === img 
                  ? "border-emerald-500 shadow-lg shadow-emerald-500/20 scale-105" 
                  : "border-white/10 hover:border-emerald-500/50 opacity-70 hover:opacity-100"
              }`}
            >
              <Image src={img} alt={`Gallery view ${i + 1}`} fill className="object-contain p-2" />
            </button>
          ))}

          {/* Video Thumbnails */}
          {videos.map((vid, i) => (
            <button
              key={`vid-${i}`}
              onClick={() => setActiveMedia({ type: "video", url: vid })}
              className={`shrink-0 w-20 h-20 bg-slate-900 rounded-xl border-2 overflow-hidden flex items-center justify-center relative transition-all group ${
                activeMedia.url === vid 
                  ? "border-emerald-500 shadow-lg shadow-emerald-500/20 scale-105" 
                  : "border-white/10 hover:border-emerald-500/50 opacity-80 hover:opacity-100"
              }`}
            >
              <Play className="text-emerald-400 w-8 h-8 opacity-80 group-hover:opacity-100 transition-opacity" />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-transparent transition-colors" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
