export interface User {
  id: number;
  name: string | null;
  email: string | null;
  password: string | null;
  created_at: string;
  updated_at: string;
}

export interface Package {
  idx?: number;
  id: number;
  name: string | null;
  type: 'hajj' | 'umrah' | null;
  price: string | null;
  start_date: string | null;
  end_date: string | null;
  created_at: string;
  updated_at: string;
  flights: string; // JSON string
  accommodations: string; // JSON string array
  transportation: string; // JSON string
  mina_arafat: string; // JSON string
  meals: string; // JSON string
  lectures: string; // JSON string array
  includes: string; // JSON string array
  cover_image: string | null;
}

export interface FlightInfo {
  notes: string;
  return: string;
  airline: string;
  departure: string;
}

export interface Accommodation {
  name: string;
  city: string;
  stars: number;
  // add more if needed
}

export interface Transportation {
  type: string;
  description: string;
}

export interface MinaArafat {
  minaTentType: string;
  tentFeatures: string;
  arafatDetails: string;
}

export interface Meals {
  mina: string;
  makkah: string;
  madinah: string;
}

export interface Lecture {
  title: string;
  description: string;
}

export interface IncludeItem {
  text: string;
}

export interface Flight {
  id: number;
  package_id: number | null;
  airline: string | null;
  departure: string | null;
  return_info: string | null;
  notes: string | null;
}

export interface Hotel {
  id: number;
  package_id: number | null;
  city: string | null;
  image: string | null;
  name: string | null;
  stars: number | null;
  location: string | null;
  description: string | null;
}

export interface HotelItem {
  id: number;
  name: string | null;
  city: string | null;
  stars: number | null;
  image: string | null;
}

export interface Transport {
  id: number;
  package_id: number | null;
  type: string | null;
  description: string | null;
}

export interface MinaArafat {
  id: number;
  package_id: number | null;
  mina_details: string | null;
  arafat_details: string | null;
}

export interface Meal {
  id: number;
  package_id: number | null;
  makkah_meals: string | null;
  madinah_meals: string | null;
  mina_meals: string | null;
}

export interface Lecture {
  id: number;
  package_id: number | null;
  title: string | null;
  description: string | null;
}

export interface IncludesItem {
  id: number;
  package_id: number | null;
  item: string | null;
}

export interface Faq {
  id: number;
  category: string | null;
  question: string | null;
  answer: string | null;
  created_at: string;
  updated_at: string;
}

export interface Blog {
  id: number;
  title: string | null;
  excerpt: string | null;
  content: string | null;
  category: string | null;
  image_url: string | null;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface AboutUs {
  id: string;
  section_title: string;
  content: string;
  image_url: string | null;
  order_position: number | null;
  created_at: string;
  updated_at: string | null;
}

export interface ContactInfo {
  id: string;
  label: string;
  value: string;
  icon: string | null;
  type: string | null;
  order_position: number | null;
  created_at: string;
}

export interface GalleryImage {
  id: string;
  title: string | null;
  image_url: string | null;
  alt_text: string | null;
  category: string | null;
  order_position: number | null;
  created_at: string | null;
  media_type?: 'image' | 'video';
  video_url?: string | null;
}

export interface Tour {
  id: number;
  title: string | null;
  description: string | null;
  image_url: string | null;
  price: number | null;
  duration: string | null;
  location: string | null;
  order_index: number | null;
  created_at: string;
  updated_at: string;
}

export interface ContactMessage {
  id: number;
  first_name: string | null;
  last_name: string | null;
  email: string | null;
  phone: string | null;
  subject: string | null;
  message: string | null;
  created_at: string;
}

export interface PackageDetails {
  package: Package;
  flights: Flight[];
  hotels: Hotel[];
  transports: Transport[];
  minaArafat: MinaArafat | null;
  meals: Meal | null;
  lectures: Lecture[];
  includes: IncludesItem[];
}