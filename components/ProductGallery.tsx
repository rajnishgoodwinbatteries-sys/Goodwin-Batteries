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
    <div className="sticky top-24 flex flex-col gap-4">
      {/* Main Viewer */}
      <div className="bg-surface rounded-2xl border border-border aspect-square flex items-center justify-center p-8 md:p-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-tr from-brand/5 to-transparent pointer-events-none" />
        <div className="w-full h-full bg-white rounded-xl shadow-2xl flex items-center justify-center relative z-10 border border-gray-100 p-4 md:p-8">
          {activeMedia.type === "image" ? (
            <Image
              src={activeMedia.url}
              alt={product.name}
              fill
              className="object-contain hover:scale-105 transition-transform duration-500"
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
            className={`shrink-0 w-20 h-20 bg-white rounded-lg border-2 overflow-hidden flex items-center justify-center p-1 transition-all relative ${
              activeMedia.url === mainImage ? "border-brand shadow-md" : "border-border hover:border-brand/50 opacity-70 hover:opacity-100"
            }`}
          >
            <Image src={mainImage} alt="Main view" fill className="object-contain p-1" />
          </button>

          {/* Gallery Thumbnails */}
          {galleryImages.map((img, i) => (
            <button
              key={i}
              onClick={() => setActiveMedia({ type: "image", url: img })}
              className={`shrink-0 w-20 h-20 bg-white rounded-lg border-2 overflow-hidden flex items-center justify-center p-1 transition-all relative ${
                activeMedia.url === img ? "border-brand shadow-md" : "border-border hover:border-brand/50 opacity-70 hover:opacity-100"
              }`}
            >
              <Image src={img} alt={`Gallery view ${i + 1}`} fill className="object-contain p-1" />
            </button>
          ))}

          {/* Video Thumbnails */}
          {videos.map((vid, i) => (
            <button
              key={`vid-${i}`}
              onClick={() => setActiveMedia({ type: "video", url: vid })}
              className={`shrink-0 w-20 h-20 bg-slate-900 rounded-lg border-2 overflow-hidden flex items-center justify-center relative transition-all group ${
                activeMedia.url === vid ? "border-brand shadow-md" : "border-border hover:border-brand/50 opacity-80 hover:opacity-100"
              }`}
            >
              <Play className="text-white w-8 h-8 opacity-70 group-hover:opacity-100 transition-opacity" />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
