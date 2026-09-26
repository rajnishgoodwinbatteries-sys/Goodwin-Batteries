import Link from "next/link";
import { Product } from "@/types";
import Image from "next/image";
import { ArrowRight, MessageCircle, ShieldCheck } from "lucide-react";

export default function ProductCard({ product }: { product: Product }) {
  const displayWarranty = product.warranty_options && product.warranty_options.length > 0
    ? product.warranty_options.join(" / ")
    : product.warranty;

  return (
    <div className="group bg-surface hover:bg-surface-hover border border-border rounded-xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col">
      {/* Brand Header */}
      <div className="bg-background text-center py-2 border-b border-border">
        <span className="text-xs font-heading font-bold text-foreground tracking-widest uppercase">
          GOODWIN BATTERIES
        </span>
      </div>

      {/* Image Area */}
      <div className="relative h-48 bg-transparent p-4 flex items-center justify-center border-b border-border overflow-hidden">
        <div className="w-full h-full rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform duration-500 relative">
          <Image 
            src={product.image || "/assets/logo/Goodwin.png"} 
            alt={product.name} 
            fill
            className="object-contain"
          />
        </div>
      </div>
      
      {/* Content Area */}
      <div className="p-6 flex flex-col flex-1">
        <h3 className="font-heading font-bold text-xl text-foreground mb-2 text-center">
          {product.name}
        </h3>
        
        <p className="text-muted-foreground text-sm mb-4 text-center font-bold">
          {product.ah || "Details coming soon"} &bull; {product.voltage || "Details coming soon"}
        </p>
        
        <div className="bg-background border border-border rounded p-3 text-center mb-6 mt-auto">
          <span className="block text-xs uppercase text-brand font-bold mb-1">Warranty</span>
          <span className="font-bold text-foreground text-sm flex items-center justify-center gap-1">
            <ShieldCheck size={14} className="text-brand"/> {displayWarranty || "Details coming soon"}
          </span>
        </div>
        
        <div className="flex flex-col gap-2">
          <Link 
            href={`/products/${product.slug}`}
            className="w-full py-3 px-4 border border-border rounded font-bold text-sm text-center flex items-center justify-center gap-2 hover:bg-foreground hover:text-background hover:border-foreground transition-all"
          >
            View Details
          </Link>
          <a
            href={`https://wa.me/919667724411?text=${encodeURIComponent(`Goodwin Batteries Product Enquiry\n\nProduct: ${product.name}\nModel: ${product.series || "N/A"}\nCapacity: ${product.ah || "N/A"}\n\nCustomer enquiry from website.`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3 px-4 bg-brand text-white rounded font-bold text-sm text-center flex items-center justify-center gap-2 hover:bg-brand-dark transition-all"
          >
            <MessageCircle size={16} /> Get Quote / Price
          </a>
        </div>
      </div>
    </div>
  );
}
