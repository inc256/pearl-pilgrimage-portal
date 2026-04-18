import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { Package, Flight, Hotel, HotelItem, Transport, MinaArafat, Meal, Lecture, IncludesItem, PackageDetails, Faq, Blog, AboutUs, ContactInfo, ContactMessage, Tour, GalleryImage } from '@/types/supabase';

async function fetchHajjPackages(): Promise<Package[]> {
  const { data, error } = await supabase
    .from('packages')
    .select('*')
    .eq('type', 'hajj')
    .order('price', { ascending: true });
  
  if (error) throw error;
  return data || [];
}

async function fetchUmrahPackages(): Promise<Package[]> {
  const { data, error } = await supabase
    .from('packages')
    .select('*')
    .eq('type', 'umrah')
    .order('price', { ascending: true });
  
  if (error) throw error;
  return data || [];
}

async function fetchPackageDetails(packageId: number): Promise<PackageDetails> {
  const [packageRes, flightsRes, hotelsRes, transportsRes, minaRes, mealsRes, lecturesRes, includesRes] = await Promise.all([
    supabase.from('packages').select('*').eq('id', packageId).single(),
    supabase.from('flights').select('*').eq('package_id', packageId),
    supabase.from('hotels').select('*').eq('package_id', packageId),
    supabase.from('transports').select('*').eq('package_id', packageId),
    supabase.from('mina_arafat').select('*').eq('package_id', packageId).single(),
    supabase.from('meals').select('*').eq('package_id', packageId).single(),
    supabase.from('lectures').select('*').eq('package_id', packageId),
    supabase.from('includes_items').select('*').eq('package_id', packageId),
  ]);

  if (packageRes.error) throw packageRes.error;

  return {
    package: packageRes.data,
    flights: flightsRes.data || [],
    hotels: hotelsRes.data || [],
    transports: transportsRes.data || [],
    minaArafat: minaRes.data || null,
    meals: mealsRes.data || null,
    lectures: lecturesRes.data || [],
    includes: includesRes.data || [],
  };
}

export function useHajjPackages() {
  return useQuery({
    queryKey: ['hajj-packages'],
    queryFn: fetchHajjPackages,
  });
}

export function useUmrahPackages() {
  return useQuery({
    queryKey: ['umrah-packages'],
    queryFn: fetchUmrahPackages,
  });
}

export function useAllPackages() {
  return useQuery({
    queryKey: ['all-packages'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('packages')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data || [];
    },
  });
}

export function usePackageDetails(packageId: number) {
  return useQuery({
    queryKey: ['package-details', packageId],
    queryFn: () => fetchPackageDetails(packageId),
    enabled: !!packageId,
  });
}

async function fetchFaqs(): Promise<Faq[]> {
  const { data, error } = await supabase
    .from('faqs')
    .select('*')
    .order('category', { ascending: true });
  
  if (error) throw error;
  return data || [];
}

export function useFaqs() {
  return useQuery({
    queryKey: ['faqs'],
    queryFn: fetchFaqs,
  });
}

async function fetchBlogs(): Promise<Blog[]> {
  const { data, error } = await supabase
    .from('blogs')
    .select('*')
    .order('published_at', { ascending: false });
  
  if (error) throw error;
  return data || [];
}

export function useBlogs() {
  return useQuery({
    queryKey: ['blogs'],
    queryFn: fetchBlogs,
  });
}

async function fetchAboutUs(): Promise<AboutUs[]> {
  try {
    const { data, error } = await supabase
      .from('about_us')
      .select('*')
      .order('order_position', { ascending: true });
    
    if (error) {
      console.warn('About_us table not available:', error.message);
      return [];
    }
    return data || [];
  } catch {
    return [];
  }
}

export function useAboutUs() {
  return useQuery({
    queryKey: ['about-us'],
    queryFn: fetchAboutUs,
  });
}

async function fetchContactInfo(): Promise<ContactInfo[]> {
  const { data, error } = await supabase
    .from('contact_info')
    .select('*')
    .order('order_position', { ascending: true });
  
  if (error) throw error;
  return data || [];
}

export function useContactInfo() {
  return useQuery({
    queryKey: ['contact-info'],
    queryFn: fetchContactInfo,
  });
}

async function fetchHotels(): Promise<HotelItem[]> {
  const { data, error } = await supabase
    .from('hotels')
    .select('*')
    .order('id', { ascending: true });
  
  if (error) throw error;
  return data || [];
}

export function useHotels() {
  return useQuery({
    queryKey: ['hotels'],
    queryFn: fetchHotels,
  });
}

async function fetchGallery(): Promise<GalleryImage[]> {
  try {
    const { data, error } = await supabase
      .from('gallery')
      .select('*')
      .order('order_position', { ascending: true });
    
    if (error) {
      console.warn('Gallery table not available:', error.message);
      return [];
    }
    return data || [];
  } catch {
    return [];
  }
}

export function useGallery() {
  return useQuery({
    queryKey: ['gallery'],
    queryFn: fetchGallery,
  });
}

export async function submitContactMessage(message: Omit<ContactMessage, 'id' | 'created_at'>): Promise<void> {
  const { error } = await supabase
    .from('contact_messages')
    .insert([message]);
  
  if (error) throw error;
}

async function fetchTours(): Promise<Tour[]> {
  try {
    const { data, error } = await supabase
      .from('tours')
      .select('*')
      .order('order_index', { ascending: true });
    
    if (error) {
      console.warn('Tours table not available:', error.message);
      return [];
    }
    return data || [];
  } catch {
    return [];
  }
}

export function useTours() {
  return useQuery({
    queryKey: ['tours'],
    queryFn: fetchTours,
  });
}