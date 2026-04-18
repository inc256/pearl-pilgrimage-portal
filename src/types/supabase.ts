export interface User {
  id: number;
  name: string | null;
  email: string | null;
  password: string | null;
  created_at: string;
  updated_at: string;
}

export interface Package {
  id: number;
  name: string | null;
  type: 'hajj' | 'umrah' | null;
  price: number | null;
  start_date: string | null;
  end_date: string | null;
  created_at: string;
  updated_at: string;
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
  name: string | null;
  stars: number | null;
  description: string | null;
}

export interface HotelItem {
  id: number;
  name: string | null;
  city: string | null;
  stars: number | null;
  image_url: string | null;
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
  image_url: string;
  alt_text: string | null;
  category: string | null;
  order_position: number | null;
  created_at: string | null;
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