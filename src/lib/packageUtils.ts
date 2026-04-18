import { PackageDetails } from '@/types/supabase';

export interface DisplayPackage {
  title: string;
  price: string;
  dates: string;
  description: string;
  features: string[];
  flight: {
    airline: string;
    class: string;
  };
  hotels: {
    makkah: { name: string; stars: number };
    madinah: { name: string; stars: number };
  };
  transport: string;
  meals: {
    makkah: string;
    madinah: string;
    mina: string;
  };
  minaArafat: {
    mina: string;
    arafat: string;
  };
  lectures: { title: string; description: string }[];
  includes: string[];
}

export function transformPackageForDisplay(details: PackageDetails): DisplayPackage {
  const { package: pkg, flights, hotels, transports, minaArafat, meals, lectures, includes } = details;

  const makkahHotel = hotels.find(h => h.city?.toLowerCase() === 'makkah');
  const madinahHotel = hotels.find(h => h.city?.toLowerCase() === 'madinah');
  const flight = flights[0];
  const transport = transports[0];

  return {
    title: pkg.name || 'Package',
    price: pkg.price ? `$${pkg.price.toLocaleString()}` : 'Contact for pricing',
    dates: pkg.start_date && pkg.end_date 
      ? `${formatDate(pkg.start_date)} – ${formatDate(pkg.end_date)}` 
      : 'Flexible dates',
    description: `${pkg.type === 'hajj' ? 'Hajj' : 'Umrah'} package with premium accommodations`,
    features: [
      flight?.airline ? `${flight.airline} flights` : null,
      makkahHotel?.name ? `${makkahHotel.name} (${makkahHotel.stars}-star)` : null,
      madinahHotel?.name ? `${madinahHotel.name} (${madinahHotel.stars}-star)` : null,
      transport?.description || (transport?.type === 'private' ? 'Private transport' : 'Shared transport'),
      meals?.makkah_meals ? 'Meals included' : null,
      lectures?.length ? 'Pre-travel lectures included' : null,
    ].filter(Boolean) as string[],
    flight: {
      airline: flight?.airline || 'Various airlines',
      class: flight?.notes || 'Economy class',
    },
    hotels: {
      makkah: makkahHotel ? { name: makkahHotel.name!, stars: makkahHotel.stars || 5 } : { name: 'Premium hotel', stars: 5 },
      madinah: madinahHotel ? { name: madinahHotel.name!, stars: madinahHotel.stars || 5 } : { name: 'Premium hotel', stars: 5 },
    },
    transport: transport?.description || transport?.type || 'Ground transportation',
    meals: {
      makkah: meals?.makkah_meals || 'Breakfast & dinner',
      madinah: meals?.madinah_meals || 'Breakfast included',
      mina: meals?.mina_meals || 'All meals included',
    },
    minaArafat: {
      mina: minaArafat?.mina_details || 'Air-conditioned tents',
      arafat: minaArafat?.arafat_details || 'Premium facilities',
    },
    lectures: lectures.map(l => ({ title: l.title || '', description: l.description || '' })),
    includes: includes.map(i => i.item || '').filter(Boolean),
  };
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { day: 'numeric', month: 'short' });
}