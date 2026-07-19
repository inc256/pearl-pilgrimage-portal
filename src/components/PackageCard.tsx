import React from 'react';
import { Link } from "react-router-dom";

interface Accommodation {
  city: string;
  hotelName: string;
  starRating: number;
  description: string;
}

// Shape of the raw "flights" JSON column coming from Supabase, e.g.
// {"notes": "", "return": "", "airline": "", "departure": ""}
interface FlightInfo {
  airline?: string;
  departure?: string;
  return?: string;
  notes?: string;
}

// Shape of the raw "transportation" JSON column coming from Supabase, e.g.
// {"type": "", "description": ""}
interface TransportInfo {
  type?: string;
  description?: string;
}

interface PackageCardProps {
  title: string;
  dates: string;
  price: string;
  typeLabel: string;
  description?: string;
  // Accepts a plain string, the raw Supabase JSON string, or an already-parsed object.
  flight?: string | FlightInfo | null;
  accommodation?: Accommodation[] | string | null;
  accommodationSub?: string;
  // Accepts a plain string, the raw Supabase JSON string, or an already-parsed object.
  transport?: string | TransportInfo | null;
  // Label for the transport row. Not every package uses ground transport
  // (it could be a train, a flight transfer, a private car, etc.), so this
  // is a free-text label instead of something hardcoded to "Ground Transport".
  transportType?: string;
  includes?: string[];
  ctaLabel?: string;
  ctaHref?: string;
  onCtaClick?: () => void;
  orientation?: 'portrait' | 'landscape';
  layout?: 'carousel' | 'grid' | 'default';
  responsive?: boolean;
}

const PackageCard: React.FC<PackageCardProps> = ({
  title,
  dates,
  price,
  typeLabel,
  description,
  flight,
  accommodation,
  accommodationSub,
  transport,
  transportType = 'Transport',
  includes = [],
  ctaLabel = 'Book Now',
  ctaHref,
  onCtaClick,
  orientation = 'portrait',
  layout = 'default',
  responsive = true,
}) => {
  const isPortrait = orientation === 'portrait';
  const isCarousel = layout === 'carousel';
  const isGrid = layout === 'grid';

  const isInternalLink = ctaHref?.startsWith("/");

  const actionElement = ctaHref ? (
    isInternalLink ? (
      <Link
        to={ctaHref}
        onClick={onCtaClick}
        className="inline-flex items-center justify-center rounded-[5px] border border-[#5C0120] bg-[#5C0120] px-4 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold uppercase tracking-[0.06em] text-white transition-colors hover:bg-[#4a0019] w-full sm:w-auto"
      >
        {ctaLabel}
      </Link>
    ) : (
      <a
        href={ctaHref}
        onClick={onCtaClick}
        className="inline-flex items-center justify-center rounded-[5px] border border-[#5C0120] bg-[#5C0120] px-4 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold uppercase tracking-[0.06em] text-white transition-colors hover:bg-[#4a0019] w-full sm:w-auto"
      >
        {ctaLabel}
      </a>
    )
  ) : (
    <button
      type="button"
      onClick={onCtaClick}
      className="inline-flex items-center justify-center rounded-[5px] border border-[#5C0120] bg-[#5C0120] px-4 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold uppercase tracking-[0.06em] text-white transition-colors hover:bg-[#4a0019] w-full sm:w-auto"
    >
      {ctaLabel}
    </button>
  );

  // Responsive card wrapper classes
  const getWrapperClasses = () => {
    let classes = 'w-full';
    if (isCarousel) {
      classes += ' max-w-[340px] sm:max-w-[380px] md:max-w-[420px]';
    } else if (isGrid) {
      classes += ' max-w-full';
    }
    return classes;
  };

  // Helper function to render star rating
  const renderStars = (rating: number) => {
    return '★'.repeat(rating) + '☆'.repeat(5 - rating);
  };

  // Supabase stores city names as "Makkah"/"Madinah" (and sometimes other
  // spellings). Normalize these to the preferred display names.
  const CITY_DISPLAY_MAP: Record<string, string> = {
    makkah: 'Mecca',
    mecca: 'Mecca',
    madinah: 'Madina',
    madina: 'Madina',
    medina: 'Madina',
  };
  const normalizeCityName = (city: string) => {
    const key = city.trim().toLowerCase();
    return CITY_DISPLAY_MAP[key] || city;
  };

  const safeJsonParse = (value: string): any | null => {
    const trimmed = value.trim();
    if (!trimmed) return null;
    try {
      return JSON.parse(trimmed);
    } catch {
      return null;
    }
  };

  // Flights only render when there's actually something to show. The raw
  // Supabase field is a JSON string like:
  // {"notes": "", "return": "", "airline": "", "departure": ""}
  // If every field is blank, we treat it as "no flight info" and hide the row.
  const getFlightDisplay = (): { value: string; sub?: string } | null => {
    if (!flight) return null;

    let flightObj: FlightInfo | null = null;

    if (typeof flight === 'string') {
      const parsed = safeJsonParse(flight);
      if (parsed && typeof parsed === 'object') {
        flightObj = parsed;
      } else {
        // Plain string value (not JSON) - show as-is if non-empty
        return flight.trim() ? { value: flight.trim() } : null;
      }
    } else if (typeof flight === 'object') {
      flightObj = flight;
    }

    if (!flightObj) return null;

    const { airline, departure, return: returnDate, notes } = flightObj;
    const hasAnyValue = [airline, departure, returnDate, notes].some(
      (v) => v && String(v).trim()
    );
    if (!hasAnyValue) return null;

    const parts: string[] = [];
    if (airline && airline.trim()) parts.push(airline.trim());
    if (departure && departure.trim()) parts.push(`Dep ${departure.trim()}`);
    if (returnDate && returnDate.trim()) parts.push(`Ret ${returnDate.trim()}`);

    return {
      value: parts.length > 0 ? parts.join(' • ') : 'Flight included',
      sub: notes && notes.trim() ? notes.trim() : undefined,
    };
  };

  // Transport, unlike flights, is treated as a standard package inclusion.
  // If the underlying data is empty, we still show the row but fall back to
  // a generic "Catered For" value rather than hiding it.
  const getTransportDisplay = (): { value: string; sub?: string } | null => {
    if (!transport) return null;

    let transportObj: TransportInfo | null = null;

    if (typeof transport === 'string') {
      const parsed = safeJsonParse(transport);
      if (parsed && typeof parsed === 'object') {
        transportObj = parsed;
      } else {
        return { value: transport.trim() || 'Catered For' };
      }
    } else if (typeof transport === 'object') {
      transportObj = transport;
    }

    if (!transportObj) return { value: 'Catered For' };

    const { type, description: transportDesc } = transportObj;
    const value = (type && type.trim()) || 'Catered For';
    const sub = transportDesc && transportDesc.trim() ? transportDesc.trim() : undefined;

    return { value, sub };
  };

  const flightDisplay = getFlightDisplay();
  const transportDisplay = getTransportDisplay();

  // Normalize accommodation data - handles both array and empty cases.
  // If nothing real is provided, we return an EMPTY array (no placeholder
  // "Premium Accommodation" card) so the section simply doesn't render.
  const getNormalizedAccommodation = (): Accommodation[] => {
    // Nothing provided at all
    if (!accommodation) {
      return [];
    }

    // Already an array
    if (Array.isArray(accommodation)) {
      if (accommodation.length === 0) {
        return [];
      }
      // Show up to 2 hotels (e.g. Makkah + Madinah)
      return accommodation.slice(0, 2);
    }

    // Coming from Supabase as a JSON string
    if (typeof accommodation === 'string') {
      const trimmed = accommodation.trim();
      if (!trimmed) return [];
      try {
        const parsed = JSON.parse(trimmed);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed.slice(0, 2);
        }
        return [];
      } catch (error) {
        console.error('Error parsing accommodation:', error);
        return [];
      }
    }

    return [];
  };

  const normalizedAccommodation = getNormalizedAccommodation();
  const hasAccommodation = normalizedAccommodation.length > 0;
  const hasMultipleHotels = normalizedAccommodation.length > 1;

  // Render accommodation items for portrait view
  const renderAccommodationItems = () => {
    if (!hasAccommodation) return null;

    return normalizedAccommodation.map((item, index) => (
      <div key={`${item.city}-${index}`} className="bg-[#fcf9f9] rounded-[5px] px-3 sm:px-4 py-2 sm:py-[0.6rem] border border-[rgba(92,1,32,0.04)] flex justify-between items-center gap-2">
        <span className="text-[0.45rem] sm:text-[0.55rem] uppercase tracking-[0.14em] text-[#9a7e7e] font-semibold flex-shrink-0">
          {normalizeCityName(item.city)}
        </span>
        <span className="text-[0.7rem] sm:text-[0.8rem] font-semibold text-[#1e1212] text-right">
          {item.hotelName}
          <small className="block font-normal text-[0.5rem] sm:text-[0.6rem] text-[#6f5b5b]">
            {renderStars(item.starRating)} {item.starRating} Star{item.starRating > 1 ? 's' : ''}
            {item.description && ` • ${item.description}`}
          </small>
        </span>
      </div>
    ));
  };

  // Render accommodation items for landscape view - responsive grid
  const renderAccommodationGrid = () => {
    if (!hasAccommodation) return null;

    return (
      <div className={`grid ${hasMultipleHotels ? 'grid-cols-2' : 'grid-cols-1'} gap-1.5 sm:gap-2`}>
        {normalizedAccommodation.map((item, index) => (
          <div key={`${item.city}-${index}`} className="bg-[#fcf9f9] rounded-[5px] px-2 sm:px-3 py-1.5 sm:py-2 border border-[rgba(92,1,32,0.04)] flex flex-col">
            <span className="text-[0.4rem] sm:text-[0.45rem] uppercase tracking-[0.14em] text-[#9a7e7e] font-semibold">
              {normalizeCityName(item.city)}
            </span>
            <span className="text-[0.6rem] sm:text-[0.7rem] font-semibold text-[#1e1212] leading-relaxed">
              {item.hotelName}
              <small className="block font-normal text-[0.45rem] sm:text-[0.55rem] text-[#6f5b5b]">
                {renderStars(item.starRating)} {item.starRating} Star{item.starRating > 1 ? 's' : ''}
                {item.description && ` • ${item.description}`}
              </small>
            </span>
          </div>
        ))}
      </div>
    );
  };

  // Render includes tags
  const renderIncludes = () => {
    if (includes.length === 0) return null;
    const displayIncludes = includes.slice(0, 4);
    return (
      <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-3 sm:mt-[0.4rem] mb-3 sm:mb-[1.4rem] pt-3 sm:pt-5 border-t border-[rgba(92,1,32,0.05)]">
        {displayIncludes.map((item) => (
          <span
            key={item}
            className="bg-[#fcf7f8] border border-[rgba(92,1,32,0.06)] rounded-[5px] px-2.5 sm:px-4 py-0.5 sm:py-[0.2rem] text-[0.5rem] sm:text-[0.6rem] font-medium text-[#2d1c1c] tracking-[0.01em]"
          >
            {item}
          </span>
        ))}
        {includes.length > 4 && (
          <span className="text-[0.5rem] sm:text-[0.6rem] text-muted-foreground font-medium">
            +{includes.length - 4} more
          </span>
        )}
      </div>
    );
  };

  // Portrait Card
  const PortraitCard = () => (
    <article className={`${getWrapperClasses()} bg-white rounded-[5px] border border-[rgba(92,1,32,0.04)] shadow-[0_8px_28px_-8px_rgba(92,1,32,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_48px_-16px_rgba(92,1,32,0.14)] p-4 sm:p-6 md:p-8`}>
      {/* Badge Row */}
      <div className="flex justify-between items-center mb-3 sm:mb-5 gap-2">
        <span className="bg-[#faf0f3] text-[#5C0120] text-[0.5rem] sm:text-[0.6rem] font-bold tracking-[0.22em] uppercase px-3 sm:px-5 py-1 sm:py-[0.35rem] rounded-[5px] border border-[rgba(92,1,32,0.07)] truncate">
          {typeLabel}
        </span>
        <span className="text-[0.6rem] sm:text-[0.7rem] font-normal text-[#8b7676] bg-[#f7f2f2] px-2.5 sm:px-4 py-0.5 sm:py-[0.2rem] rounded-[5px] tracking-[0.01em] whitespace-nowrap">
          {dates}
        </span>
      </div>

      {/* Title & Description */}
      <h3 className="text-[1.3rem] sm:text-[1.5rem] md:text-[1.7rem] font-bold text-[#1e1212] mt-1 mb-1.5 sm:mb-[0.4rem] tracking-[-0.02em] leading-tight">
        {title}
      </h3>
      {description && (
        <p className="text-[0.75rem] sm:text-[0.85rem] text-[#524848] leading-relaxed mb-4 sm:mb-6 font-normal">
          {description}
        </p>
      )}

      {/* Info Items */}
      <div className="flex flex-col gap-1.5 sm:gap-2 mb-4 sm:mb-6">
        {flightDisplay && renderInfoItem('Flight', flightDisplay.value, flightDisplay.sub)}
        {renderAccommodationItems()}
        {transportDisplay && renderInfoItem(transportType, transportDisplay.value, transportDisplay.sub)}
      </div>

      {/* Includes */}
      {renderIncludes()}

      {/* Footer */}
      <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3 sm:gap-4 border-t border-[rgba(92,1,32,0.05)] pt-3 sm:pt-5">
        <span className="text-[1.2rem] sm:text-[1.3rem] md:text-[1.5rem] font-bold text-[#5C0120] bg-[#faf0f3] px-3 sm:px-[1.4rem] py-0.5 sm:py-[0.1rem] rounded-[5px] border border-[rgba(92,1,32,0.04)] text-center sm:text-left">
          {price}
        </span>
        {actionElement}
      </div>
    </article>
  );

  // Helper for rendering single info item (used for flight and transport)
  const renderInfoItem = (label: string, value: string, subValue?: string) => (
    <div className="bg-[#fcf9f9] rounded-[5px] px-3 sm:px-4 py-2 sm:py-[0.6rem] border border-[rgba(92,1,32,0.04)] flex justify-between items-center gap-2">
      <span className="text-[0.45rem] sm:text-[0.55rem] uppercase tracking-[0.14em] text-[#9a7e7e] font-semibold flex-shrink-0">
        {label}
      </span>
      <span className="text-[0.7rem] sm:text-[0.8rem] font-semibold text-[#1e1212] text-right">
        {value}
        {subValue && (
          <small className="block font-normal text-[0.5rem] sm:text-[0.6rem] text-[#6f5b5b]">
            {subValue}
          </small>
        )}
      </span>
    </div>
  );

  // Landscape Card
  const LandscapeCard = () => (
    <article className={`${getWrapperClasses()} bg-white rounded-[5px] border border-[rgba(92,1,32,0.04)] shadow-[0_8px_28px_-8px_rgba(92,1,32,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_48px_-16px_rgba(92,1,32,0.14)] p-4 sm:p-6 md:p-8 flex flex-col md:flex-row items-stretch gap-4 md:gap-0`}>
      {/* Left Column */}
      <div className="flex-1 md:pr-6">
        {/* Badge Row */}
        <div className="flex justify-between items-center mb-2 sm:mb-3 gap-2">
          <span className="bg-[#faf0f3] text-[#5C0120] text-[0.5rem] sm:text-[0.55rem] font-bold tracking-[0.22em] uppercase px-3 sm:px-5 py-1 sm:py-[0.25rem] rounded-[5px] border border-[rgba(92,1,32,0.07)] truncate">
            {typeLabel}
          </span>
          <span className="text-[0.55rem] sm:text-[0.65rem] font-normal text-[#8b7676] bg-[#f7f2f2] px-2.5 sm:px-[0.9rem] py-0.5 sm:py-[0.15rem] rounded-[5px] whitespace-nowrap">
            {dates}
          </span>
        </div>

        {/* Title & Description */}
        <h3 className="text-[1.2rem] sm:text-[1.4rem] md:text-[1.6rem] font-bold text-[#1e1212] mt-1 mb-1 sm:mb-[0.3rem] tracking-[-0.02em] leading-tight">
          {title}
        </h3>
        {description && (
          <p className="text-[0.7rem] sm:text-[0.8rem] text-[#524848] leading-relaxed mb-3 sm:mb-5 font-normal">
            {description}
          </p>
        )}

        {/* Info Grid */}
        <div className="mb-3 sm:mb-5">
          {flightDisplay && (
            <div className="bg-[#fcf9f9] rounded-[5px] px-2 sm:px-3 py-1.5 sm:py-2 border border-[rgba(92,1,32,0.04)] flex flex-col mb-1.5 sm:mb-2">
              <span className="text-[0.4rem] sm:text-[0.45rem] uppercase tracking-[0.14em] text-[#9a7e7e] font-semibold">
                Flight
              </span>
              <span className="text-[0.6rem] sm:text-[0.7rem] font-semibold text-[#1e1212] leading-relaxed">
                {flightDisplay.value}
                {flightDisplay.sub && (
                  <small className="block font-normal text-[0.45rem] sm:text-[0.55rem] text-[#6f5b5b]">
                    {flightDisplay.sub}
                  </small>
                )}
              </span>
            </div>
          )}

          {renderAccommodationGrid()}

          {transportDisplay && (
            <div className="bg-[#fcf9f9] rounded-[5px] px-2 sm:px-3 py-1.5 sm:py-2 border border-[rgba(92,1,32,0.04)] flex flex-col mt-1.5 sm:mt-2">
              <span className="text-[0.4rem] sm:text-[0.45rem] uppercase tracking-[0.14em] text-[#9a7e7e] font-semibold">
                {transportType}
              </span>
              <span className="text-[0.6rem] sm:text-[0.7rem] font-semibold text-[#1e1212] leading-relaxed">
                {transportDisplay.value}
                {transportDisplay.sub && (
                  <small className="block font-normal text-[0.45rem] sm:text-[0.55rem] text-[#6f5b5b]">
                    {transportDisplay.sub}
                  </small>
                )}
              </span>
            </div>
          )}
        </div>

        {/* Includes */}
        {renderIncludes()}
      </div>

      {/* Right Column - Price & CTA */}
      <div className="md:flex-1 min-w-[120px] md:pl-6 md:border-l border-[rgba(92,1,32,0.06)] flex flex-row md:flex-col justify-between items-center md:items-stretch gap-3 md:gap-4 pt-3 md:pt-[0.2rem] pb-0 md:pb-[0.2rem]">
        <span className="text-[1.2rem] sm:text-[1.3rem] md:text-[1.5rem] font-bold text-[#5C0120] bg-[#faf0f3] px-4 sm:px-6 py-1 sm:py-[0.15rem] rounded-[5px] text-center border border-[rgba(92,1,32,0.04)] w-full">
          {price}
        </span>
        {actionElement}
      </div>
    </article>
  );

  // Responsive rendering
  if (responsive) {
    if (isPortrait) {
      return <PortraitCard />;
    } else {
      return <LandscapeCard />;
    }
  }

  return isPortrait ? <PortraitCard /> : <LandscapeCard />;
};

export default PackageCard;