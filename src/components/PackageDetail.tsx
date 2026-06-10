import { Plane, Hotel, Bus, Calendar, DollarSign, Check, Utensils, Tent, BookOpen } from "lucide-react";
import { Package as PackageType, FlightInfo, Accommodation, Transportation, MinaArafat, Meals, Lecture, IncludeItem } from "@/types/supabase";
import { useCurrency } from "@/hooks/useCurrency";

interface PackageDetailProps {
  package: PackageType;
}

const PackageDetail = ({ package: pkg }: PackageDetailProps) => {
  const { formatPrice } = useCurrency();
  
  const parseJson = <T,>(jsonString: string, fallback: T): T => {
    try {
      return JSON.parse(jsonString);
    } catch {
      return fallback;
    }
  };

  const flights: FlightInfo = parseJson(pkg.flights, { notes: "", return: "", airline: "", departure: "" });
  const accommodations: Accommodation[] = parseJson(pkg.accommodations, []);
  const transportation: Transportation = parseJson(pkg.transportation, { type: "", description: "" });
  const minaArafat: MinaArafat = parseJson(pkg.mina_arafat, { minaTentType: "", tentFeatures: "", arafatDetails: "" });
  const meals: Meals = parseJson(pkg.meals, { mina: "", makkah: "", madinah: "" });
  const lectures: Lecture[] = parseJson(pkg.lectures, []);
  const includes: IncludeItem[] = parseJson(pkg.includes, []);

  const hasFlightsData = flights.airline || flights.notes || flights.return || flights.departure;
  const hasAccommodationsData = accommodations.length > 0;
  const hasTransportationData = transportation.type || transportation.description;
  const hasMinaArafatData = minaArafat.minaTentType || minaArafat.tentFeatures || minaArafat.arafatDetails;
  const hasMealsData = meals.mina || meals.makkah || meals.madinah;
  const hasLecturesData = lectures.length > 0;
  const hasIncludesData = includes.length > 0;

  return (
    <div className="max-w-4xl mx-auto bg-card rounded-lg border border-border p-6 md:p-10">
      <div className="mb-8">
        <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-2">
          {pkg.name || 'Package Details'}
        </h1>
        <div className="flex items-center gap-4 text-muted-foreground">
          {pkg.price && (
            <div className="flex items-center gap-2">
              <DollarSign size={20} />
              <span className="font-semibold text-lg">{formatPrice(pkg.price)} / person</span>
            </div>
          )}
          {(pkg.start_date || pkg.end_date) && (
            <div className="flex items-center gap-2">
              <Calendar size={20} />
              <span>
                {pkg.start_date ? new Date(pkg.start_date).toLocaleDateString() : 'TBD'} - {pkg.end_date ? new Date(pkg.end_date).toLocaleDateString() : 'TBD'}
              </span>
            </div>
          )}
        </div>
      </div>

      <div className="space-y-8">
        {hasFlightsData && (
          <div className="flex items-start gap-3">
            <Plane className="text-primary mt-1 shrink-0" size={24} />
            <div>
              <h3 className="font-semibold text-foreground mb-2">Flight Information</h3>
              <div className="text-muted-foreground space-y-1">
                {flights.airline && <p><strong>Airline:</strong> {flights.airline}</p>}
                {flights.departure && <p><strong>Departure:</strong> {flights.departure}</p>}
                {flights.return && <p><strong>Return:</strong> {flights.return}</p>}
                {flights.notes && <p><strong>Notes:</strong> {flights.notes}</p>}
              </div>
            </div>
          </div>
        )}

        {hasAccommodationsData && (
          <div className="flex items-start gap-3">
            <Hotel className="text-primary mt-1 shrink-0" size={24} />
            <div>
              <h3 className="font-semibold text-foreground mb-2">Accommodations</h3>
              <div className="text-muted-foreground space-y-2">
                {accommodations.map((acc, index) => (
                  <div key={index}>
                    <p><strong>{acc.city}:</strong> {acc.name} ({acc.stars} stars)</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {hasTransportationData && (
          <div className="flex items-start gap-3">
            <Bus className="text-primary mt-1 shrink-0" size={24} />
            <div>
              <h3 className="font-semibold text-foreground mb-2">Transportation</h3>
              <div className="text-muted-foreground">
                {transportation.type && <p><strong>Type:</strong> {transportation.type}</p>}
                {transportation.description && <p>{transportation.description}</p>}
              </div>
            </div>
          </div>
        )}

        {hasMinaArafatData && (
          <div className="flex items-start gap-3">
            <Tent className="text-primary mt-1 shrink-0" size={24} />
            <div>
              <h3 className="font-semibold text-foreground mb-2">Mina & Arafat Facilities</h3>
              <div className="text-muted-foreground space-y-1">
                {minaArafat.minaTentType && <p><strong>Mina Tent Type:</strong> {minaArafat.minaTentType}</p>}
                {minaArafat.tentFeatures && <p><strong>Tent Features:</strong> {minaArafat.tentFeatures}</p>}
                {minaArafat.arafatDetails && <p><strong>Arafat Details:</strong> {minaArafat.arafatDetails}</p>}
              </div>
            </div>
          </div>
        )}

        {hasMealsData && (
          <div className="flex items-start gap-3">
            <Utensils className="text-primary mt-1 shrink-0" size={24} />
            <div>
              <h3 className="font-semibold text-foreground mb-2">Meals</h3>
              <div className="text-muted-foreground space-y-1">
                {meals.makkah && <p><strong>Makkah:</strong> {meals.makkah}</p>}
                {meals.madinah && <p><strong>Madinah:</strong> {meals.madinah}</p>}
                {meals.mina && <p><strong>Mina:</strong> {meals.mina}</p>}
              </div>
            </div>
          </div>
        )}

        {hasLecturesData && (
          <div className="flex items-start gap-3">
            <BookOpen className="text-primary mt-1 shrink-0" size={24} />
            <div>
              <h3 className="font-semibold text-foreground mb-2">Lectures & Ceremonies</h3>
              <div className="text-muted-foreground space-y-2">
                {lectures.map((lecture, index) => (
                  <div key={index}>
                    <p className="font-medium">{lecture.title}</p>
                    {lecture.description && <p className="text-sm">{lecture.description}</p>}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {hasIncludesData && (
          <div>
            <h3 className="font-semibold text-foreground mb-4">What's Included</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {includes.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Check size={16} className="text-primary" />
                  <span className="text-muted-foreground">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PackageDetail;