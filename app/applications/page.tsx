import { categories } from "@/data/mock";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Settings } from "lucide-react";

export default function ApplicationsPage() {
  return (
    <div className="flex flex-col w-full min-h-screen pt-20">
      <section className="bg-surface py-20 border-b border-border relative overflow-hidden">
        <div className="absolute right-0 top-0 w-1/2 h-full bg-brand/10 blur-[100px] pointer-events-none" />
        <div className="container relative z-10 text-center max-w-3xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-foreground mb-6">
            BATTERY <span className="text-brand">APPLICATIONS</span>
          </h1>
          <p className="text-muted-foreground text-lg">
            From everyday passenger vehicles to heavy-duty industrial machinery, Goodwin provides reliable power solutions engineered for specific demands.
          </p>
        </div>
      </section>

      <section className="py-24 bg-background flex-1">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((cat, index) => (
              <div key={cat.id} className="group relative rounded-2xl overflow-hidden bg-surface border border-border shadow-lg flex flex-col h-[400px]">
                {/* Background Image */}
                {cat.image ? (
                  <Image 
                    src={cat.image} 
                    alt={cat.name} 
                    fill 
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                ) : (
                  <div className="absolute inset-0 bg-gray-200 dark:bg-gray-800 transition-transform duration-700 group-hover:scale-105" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10" />
                
                <div className="relative z-20 mt-auto p-8 flex flex-col items-start w-full">
                  <div className="bg-brand w-12 h-12 rounded-full flex items-center justify-center mb-4 shadow-lg shadow-brand/30">
                    <Settings size={24} className="text-white" />
                  </div>
                  <h3 className="text-white font-heading font-bold text-3xl mb-3">{cat.name}</h3>
                  <p className="text-slate-200 text-sm mb-6 line-clamp-3">
                    {cat.description}
                  </p>
                  <Link 
                    href={`/products?category=${cat.slug}`}
                    className="flex items-center gap-2 text-brand font-bold uppercase tracking-wider hover:text-white transition-colors"
                  >
                    View Batteries <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
