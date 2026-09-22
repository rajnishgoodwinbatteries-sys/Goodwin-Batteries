import { supabase } from "./supabase";
import { Product, Category, VehicleType, VehicleBrand, VehicleModel, VehicleVariant, Dealer } from "@/types";
import { unstable_cache } from "next/cache";
import goodwinProducts from "@/data/goodwinProducts.json";
import goodwinCategories from "@/data/goodwinCategories.json";

// ==========================================
// GLOBAL SETTINGS
// ==========================================
export const getGlobalSettings = unstable_cache(
  async () => {
    const { data, error } = await supabase.from("global_settings").select("*").single();
    if (error) {
      console.error("Error fetching global settings:", error);
      return null;
    }
    return data;
  },
  ['global-settings'],
  { revalidate: 3600, tags: ['global-settings'] }
);

// ==========================================
// PRODUCTS & CATEGORIES (Local Static JSON Strategy)
// ==========================================
export const getCategories = async (): Promise<Category[]> => {
  return goodwinCategories as Category[];
};

export const getProducts = async (): Promise<Product[]> => {
  // Return typed products from the unified JSON catalog
  return (goodwinProducts as any[]).map(row => ({
      id: row.id,
      name: row.name,
      slug: row.slug,
      series: row.series,
      category: row.category,
      voltage: row.voltage,
      ah: row.ah,
      cca: row.cca,
      warranty: row.warranty,
      warranty_options: row.warranty_options,
      is_featured: row.is_featured,
      is_published: row.is_published,
      application: row.application || [],
      image: row.image,
      gallery: row.gallery || [],
      videos: row.videos || [],
      description: row.description,
      features: row.features || [],
      terminalLayout: row.terminalLayout,
      dimensions: row.dimensions,
      weight: row.weight,
  })) as Product[];
};

export const getProductBySlug = async (slug: string): Promise<Product | null> => {
  const products = await getProducts();
  const product = products.find(p => p.slug === slug);
  return product || null;
};

export const getApplications = unstable_cache(
  async () => {
    const { data, error } = await supabase.from("applications").select("*").eq("is_published", true).order("display_order", { ascending: true });
    if (error) {
      console.error("Error fetching applications:", error);
      return [];
    }
    
    // Map locally generated premium category images
    const localImageMap: Record<string, string> = {
      "Passenger Vehicles": "/assets/categories/passenger-vehicles.jpg",
      "Two Wheelers": "/assets/categories/two-wheelers.jpg",
      "Commercial Heavy Duty": "/assets/categories/commercial-heavy-duty.jpg",
      "Agricultural & Tractors": "/assets/categories/agricultural-tractors.jpg"
    };

    return (data || []).map((app: any) => ({
      ...app,
      image: localImageMap[app.name] || app.image
    }));
  },
  ['applications'],
  { revalidate: 3600, tags: ['applications'] }
);

// ==========================================
// BATTERY FINDER
// ==========================================
export async function getVehicleTypes(): Promise<VehicleType[]> {
  const { data, error } = await supabase.from("vehicle_types").select("*").order("display_order", { ascending: true });
  if (error) {
    console.error("Error fetching vehicle types:", error);
    return [];
  }
  return data || [];
}

export async function getVehicleBrands(): Promise<VehicleBrand[]> {
  const { data, error } = await supabase.from("manufacturers").select("*").order("display_order", { ascending: true });
  if (error) {
    console.error("Error fetching vehicle brands:", error);
    return [];
  }
  return data || [];
}

export async function getVehicleModels(): Promise<VehicleModel[]> {
  const { data, error } = await supabase.from("vehicle_models").select("*").order("display_order", { ascending: true });
  if (error) {
    console.error("Error fetching vehicle models:", error);
    return [];
  }
  return data || [];
}

export async function getVehicleVariants(): Promise<VehicleVariant[]> {
  const { data, error } = await supabase.from("vehicle_variants").select("*").order("display_order", { ascending: true });
  if (error) {
    console.error("Error fetching vehicle variants:", error);
    return [];
  }
  return data || [];
}

// ==========================================
// DEALERS
// ==========================================
export const getDealers = unstable_cache(
  async (): Promise<Dealer[]> => {
    const { data, error } = await supabase.from("dealers").select("*").eq("is_published", true);
    if (error) {
      console.error("Error fetching dealers:", error);
      return [];
    }
    return (data || []).map((row) => ({
      id: row.id,
      name: row.name,
      address: row.address,
      city: row.city,
      state: row.state,
      pincode: row.pincode,
      phone: row.phone,
      openingHours: row.opening_hours,
      latitude: row.latitude,
      longitude: row.longitude,
    }));
  },
  ['dealers'],
  { revalidate: 3600, tags: ['dealers'] }
);

// ==========================================
// FAQS
// ==========================================
export const getFAQs = unstable_cache(
  async () => {
    const { data, error } = await supabase.from("faqs").select("*").eq("is_published", true).order("display_order", { ascending: true });
    if (error) {
      console.error("Error fetching FAQs:", error);
      return [];
    }
    return data || [];
  },
  ['faqs'],
  { revalidate: 3600, tags: ['faqs'] }
);
