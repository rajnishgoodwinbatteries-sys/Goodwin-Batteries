import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronRight, ShieldCheck, Download, CheckCircle2, Wrench, FileText, Phone, Zap } from "lucide-react";
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
    <div className="flex flex-col w-full min-h-screen pt-20">
      
      {/* Breadcrumbs */}
      <div className="bg-surface border-b border-border py-4">
        <div className="container flex items-center text-xs font-bold uppercase tracking-wider text-muted-foreground">
          <Link href="/" className="hover:text-brand transition-colors">Home</Link>
          <ChevronRight size={14} className="mx-2" />
          <Link href="/products" className="hover:text-brand transition-colors">Products</Link>
          <ChevronRight size={14} className="mx-2" />
          <Link href={`/products?category=${category?.slug}`} className="hover:text-brand transition-colors">{category?.name}</Link>
          <ChevronRight size={14} className="mx-2" />
          <span className="text-foreground">{product.name}</span>
        </div>
      </div>

      {/* Product Hero */}
      <section className="py-12 md:py-20 bg-background">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            
            {/* Image Gallery */}
            <ProductGallery product={product} />

            {/* Product Info */}
            <div className="flex flex-col">
              <span className="text-brand font-bold uppercase tracking-widest text-sm mb-3">
                {product.series || "Standard"} Series
              </span>
              <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-4">
                {product.name}
              </h1>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                {product.description || "Details coming soon"}
              </p>

              {/* Key Highlights */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
                <div className="bg-surface border border-border p-4 rounded-xl text-center flex flex-col justify-center">
                  <span className="block text-xs uppercase tracking-wider text-muted-foreground mb-1">Capacity</span>
                  <span className="font-bold text-xl text-foreground">{product.ah || "TBA"}</span>
                </div>
                <div className="bg-surface border border-border p-4 rounded-xl text-center flex flex-col justify-center">
                  <span className="block text-xs uppercase tracking-wider text-muted-foreground mb-1">Voltage</span>
                  <span className="font-bold text-xl text-foreground">{product.voltage || "TBA"}</span>
                </div>
                <div className="bg-brand/10 border border-brand/20 p-4 rounded-xl text-center flex flex-col justify-center">
                  <span className="block text-xs uppercase tracking-wider text-brand mb-1">Warranty</span>
                  <span className="font-bold text-lg text-brand flex items-center justify-center gap-1">
                    <ShieldCheck size={16} /> {product.warranty_options && product.warranty_options.length > 0 ? product.warranty_options.join(" / ") : (product.warranty || "TBA")}
                  </span>
                </div>
              </div>

              {/* Actions - Floating Action Bar style */}
              <div className="flex flex-col sm:flex-row gap-4 mb-10 bg-surface p-4 rounded-2xl border border-border shadow-sm">
                <a href={`https://wa.me/919667724411?text=${encodeURIComponent(`Goodwin Batteries Product Enquiry\n\nProduct: ${product.name}\nModel: ${product.series || "N/A"}\nCapacity: ${product.ah || "N/A"}\n\nCustomer enquiry from website.`)}`} target="_blank" rel="noopener noreferrer" className="flex-1 bg-brand text-white px-6 py-4 rounded-xl font-bold uppercase tracking-wider hover:bg-brand-dark transition-all text-center shadow-lg shadow-brand/20 flex items-center justify-center gap-2">
                  <Phone size={18} /> Get Quote / Price
                </a>
                <a href="#specifications" className="flex-1 bg-background border border-border text-foreground px-6 py-4 rounded-xl font-bold uppercase tracking-wider hover:border-brand transition-all text-center flex items-center justify-center gap-2">
                  <FileText size={18} className="text-brand" /> Tech Specs
                </a>
              </div>

              {/* Advanced Features List */}
              {product.features && product.features.length > 0 && (
                <div className="border-t border-border pt-8 mb-8">
                  <h3 className="font-bold text-foreground mb-4 uppercase tracking-wider text-sm flex items-center gap-2">
                    <Zap size={18} className="text-brand" /> Goodwin Technology
                  </h3>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {product.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3 bg-surface p-3 rounded-lg border border-border">
                        <CheckCircle2 size={18} className="text-brand shrink-0 mt-0.5" />
                        <span className="text-sm font-semibold text-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

            </div>
          </div>
        </div>
      </section>

      {/* Deep Dive Section */}
      <section id="specifications" className="py-20 bg-surface border-t border-border">
        <div className="container max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* Tech Specs Table */}
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-heading font-bold text-foreground mb-8">Technical Specifications</h2>
              <div className="bg-background border border-border rounded-xl overflow-hidden shadow-sm">
                <div className="grid grid-cols-1 sm:grid-cols-3 border-b border-border">
                  <div className="p-4 sm:p-5 border-b sm:border-b-0 sm:border-r border-border bg-surface/30 font-bold text-xs uppercase tracking-wider text-muted-foreground flex items-center">Model Number</div>
                  <div className="p-4 sm:p-5 font-bold text-foreground sm:col-span-2">{product.name}</div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 border-b border-border">
                  <div className="p-4 sm:p-5 border-b sm:border-b-0 sm:border-r border-border bg-surface/30 font-bold text-xs uppercase tracking-wider text-muted-foreground flex items-center">Technology</div>
                  <div className="p-4 sm:p-5 font-semibold text-foreground sm:col-span-2">{product.technology || "Details coming soon"}</div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 border-b border-border">
                  <div className="p-4 sm:p-5 border-b sm:border-b-0 sm:border-r border-border bg-surface/30 font-bold text-xs uppercase tracking-wider text-muted-foreground flex items-center">Capacity (Ah)</div>
                  <div className="p-4 sm:p-5 font-semibold text-foreground sm:col-span-2">{product.ah || "Details coming soon"}</div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 border-b border-border">
                  <div className="p-4 sm:p-5 border-b sm:border-b-0 sm:border-r border-border bg-surface/30 font-bold text-xs uppercase tracking-wider text-muted-foreground flex items-center">Voltage</div>
                  <div className="p-4 sm:p-5 font-semibold text-foreground sm:col-span-2">{product.voltage || "Details coming soon"}</div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 border-b border-border">
                  <div className="p-4 sm:p-5 border-b sm:border-b-0 sm:border-r border-border bg-surface/30 font-bold text-xs uppercase tracking-wider text-muted-foreground flex items-center">Dimensions (LxWxH)</div>
                  <div className="p-4 sm:p-5 font-semibold text-foreground sm:col-span-2">{product.dimensions || "Details coming soon"}</div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 border-b border-border">
                  <div className="p-4 sm:p-5 border-b sm:border-b-0 sm:border-r border-border bg-surface/30 font-bold text-xs uppercase tracking-wider text-muted-foreground flex items-center">Weight</div>
                  <div className="p-4 sm:p-5 font-semibold text-foreground sm:col-span-2">{product.weight || "Details coming soon"}</div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3">
                  <div className="p-4 sm:p-5 border-b sm:border-b-0 sm:border-r border-border bg-surface/30 font-bold text-xs uppercase tracking-wider text-muted-foreground flex items-center">Terminal Layout</div>
                  <div className="p-4 sm:p-5 font-semibold text-foreground sm:col-span-2">{product.terminalLayout || "Details coming soon"}</div>
                </div>
              </div>

              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <a href={`/api/datasheet/${product.slug}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 bg-white border border-border text-foreground px-6 py-3 rounded-lg font-bold uppercase tracking-wider hover:border-brand hover:text-brand transition-all">
                  <FileText size={18} /> View Datasheet
                </a>
                <a href={`/api/datasheet/${product.slug}?download=true`} download className="flex items-center justify-center gap-2 bg-brand/10 text-brand px-6 py-3 rounded-lg font-bold uppercase tracking-wider hover:bg-brand hover:text-white transition-colors">
                  <Download size={18} /> Download Datasheet
                </a>
              </div>
            </div>

            {/* Side Tabs: Compatibility & Installation */}
            <div className="flex flex-col gap-8">
              
              <div className="bg-background border border-border rounded-xl p-6 shadow-sm">
                <h3 className="font-bold text-foreground mb-4 uppercase tracking-wider text-sm flex items-center gap-2">
                  <ShieldCheck size={18} className="text-brand" /> Vehicle Compatibility
                </h3>
                <p className="text-sm text-muted-foreground mb-4">Recommended for the following applications:</p>
                <div className="flex flex-wrap gap-2">
                  {product.application && product.application.length > 0 ? product.application.map((app, i) => (
                    <span key={i} className="bg-surface border border-border px-3 py-1.5 rounded-full text-sm font-semibold text-foreground">
                      {app}
                    </span>
                  )) : (
                    <span className="text-muted-foreground text-sm">No applications specified.</span>
                  )}
                </div>
              </div>

              <div className="bg-background border border-border rounded-xl p-6 shadow-sm">
                <h3 className="font-bold text-foreground mb-4 uppercase tracking-wider text-sm flex items-center gap-2">
                  <Wrench size={18} className="text-brand" /> Installation & Care
                </h3>
                <ul className="text-sm text-muted-foreground space-y-3">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand shrink-0 mt-1.5" />
                    Ensure terminals are clean and tightly connected before use.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand shrink-0 mt-1.5" />
                    Always install upright in a well-ventilated space.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand shrink-0 mt-1.5" />
                    Register for your e-warranty within 14 days of purchase.
                  </li>
                </ul>
              </div>

              {/* Need Help Box */}
              <div className="bg-brand text-white rounded-xl p-6 shadow-lg shadow-brand/20">
                <h3 className="font-bold mb-2">Need Expert Advice?</h3>
                <p className="text-white/80 text-sm mb-4">Not sure if this is the right battery for your vehicle?</p>
                <a href={`https://wa.me/919667724411?text=${encodeURIComponent(`Goodwin Batteries Product Enquiry\n\nProduct: ${product.name}\nModel: ${product.series || "N/A"}\nCapacity: ${product.ah || "N/A"}\n\nCustomer enquiry from website.`)}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 bg-white text-brand px-4 py-3 rounded font-bold hover:bg-gray-100 transition-colors">
                  <Phone size={16} /> Contact Support
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
            image: product.image ? `https://www.goodwinbatteries.com${product.image}` : "https://www.goodwinbatteries.com/assets/logo/Goodwin.png",
            description: product.description || "Premium automotive battery by Goodwin.",
            sku: product.slug,
            brand: {
              "@type": "Brand",
              name: "Goodwin Batteries",
            },
            offers: {
              "@type": "Offer",
              url: `https://www.goodwinbatteries.com/products/${product.slug}`,
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
