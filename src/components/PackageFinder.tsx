import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAllPackages } from "@/hooks/useSupabase";

type PilgrimageType = "umrah" | "hajj";

const getMonthKey = (date: string | null) => {
  const match = date?.match(/^(\d{4})-(\d{2})/);
  return match ? `${match[1]}-${match[2]}` : "";
};

const getYearKey = (date: string | null) => date?.match(/^(\d{4})/)?.[1] ?? "";

const formatMonth = (monthKey: string) => {
  const [year, month] = monthKey.split("-").map(Number);
  return new Date(year, month - 1, 1).toLocaleDateString("en", {
    month: "long",
    year: "numeric",
  });
};

const PackageFinder = () => {
  const navigate = useNavigate();
  const { data: packages, isLoading } = useAllPackages();
  const [pilgrimageType, setPilgrimageType] = useState<PilgrimageType>("umrah");
  const [departurePeriod, setDeparturePeriod] = useState("");
  const [tier, setTier] = useState("");

  const typePackages = useMemo(
    () => packages?.filter((pkg) => pkg.type === pilgrimageType) ?? [],
    [packages, pilgrimageType],
  );
  const getPeriodKey = pilgrimageType === "hajj" ? getYearKey : getMonthKey;
  const availablePeriods = useMemo(
    () => [...new Set(typePackages.map((pkg) => getPeriodKey(pkg.start_date)).filter(Boolean))],
    [typePackages, getPeriodKey],
  );
  const periodPackages = useMemo(
    () => departurePeriod
      ? typePackages.filter((pkg) => getPeriodKey(pkg.start_date) === departurePeriod)
      : typePackages,
    [typePackages, departurePeriod, getPeriodKey],
  );
  const tiers = useMemo(
    () => [...new Set(periodPackages.map((pkg) => pkg.name).filter((name): name is string => !!name))],
    [periodPackages],
  );
  const selectedPackage = periodPackages.find((pkg) => pkg.name === tier) ?? periodPackages[0];

  const changePilgrimageType = (type: PilgrimageType) => {
    setPilgrimageType(type);
    setDeparturePeriod("");
    setTier("");
  };

  const bookPackage = () => {
    if (!selectedPackage) return;

    const searchParams = new URLSearchParams();
    searchParams.set("packageId", String(selectedPackage.id));
    searchParams.set("type", pilgrimageType);
    searchParams.set("tier", selectedPackage.name || "");
    searchParams.set(
      pilgrimageType === "hajj" ? "departureYear" : "departureMonth",
      getPeriodKey(selectedPackage.start_date),
    );
    navigate(`/booking?${searchParams.toString()}`);
  };

  return (
    <section className="w-full bg-[#f6f3f4] py-8 sm:py-10 md:py-12">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
        <div className="rounded-md bg-white p-4 shadow-[0_18px_55px_rgba(46,20,30,0.12)] sm:p-6 lg:p-8">
          <div className="grid grid-cols-2 gap-3 border-b border-[#e7d9d4] pb-5" role="tablist" aria-label="Pilgrimage type">
            {(["umrah", "hajj"] as const).map((type) => (
              <button
                key={type}
                type="button"
                role="tab"
                aria-selected={pilgrimageType === type}
                onClick={() => changePilgrimageType(type)}
                className={`w-full border px-4 py-3 text-sm font-semibold capitalize transition-colors sm:py-4 ${
                  pilgrimageType === type
                    ? "border-[#6b1d3a] bg-[#f7eef1] text-[#6b1d3a]"
                    : "border-transparent text-[#61545a] hover:bg-[#faf7f8]"
                }`}
              >
                {type}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 gap-4 pt-5 sm:grid-cols-2 sm:gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_auto] lg:items-end">
            <label className="block text-sm font-medium text-[#65535b]">
              Departure {pilgrimageType === "hajj" ? "year" : "month"}
              <select
                value={departurePeriod}
                onChange={(event) => {
                  setDeparturePeriod(event.target.value);
                  setTier("");
                }}
                className="mt-2 h-12 w-full border border-[#ddcfc9] bg-white px-4 text-base text-[#22161b] outline-none focus:border-[#6b1d3a] focus:ring-2 focus:ring-[#6b1d3a]/15"
              >
                <option value="">Any {pilgrimageType === "hajj" ? "year" : "month"}</option>
                {availablePeriods.map((period) => (
                  <option key={period} value={period}>
                    {pilgrimageType === "hajj" ? period : formatMonth(period)}
                  </option>
                ))}
              </select>
            </label>

            <label className="block text-sm font-medium text-[#65535b]">
              Package tier
              <select
                value={tier}
                onChange={(event) => setTier(event.target.value)}
                className="mt-2 h-12 w-full border border-[#ddcfc9] bg-white px-4 text-base text-[#22161b] outline-none focus:border-[#6b1d3a] focus:ring-2 focus:ring-[#6b1d3a]/15"
              >
                <option value="">Any tier</option>
                {tiers.map((packageName) => (
                  <option key={packageName} value={packageName}>{packageName}</option>
                ))}
              </select>
            </label>

            <Button
              type="button"
              onClick={bookPackage}
              disabled={isLoading || !selectedPackage}
              className="h-12 w-full bg-[#641d39] px-8 text-white hover:bg-[#50162d] sm:col-span-2 lg:col-span-1 lg:w-auto lg:min-w-48"
            >
              {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              Book
              {!isLoading ? <ArrowRight className="ml-2 h-4 w-4" /> : null}
            </Button>
          </div>

          {!isLoading && !typePackages.length ? (
            <p className="mt-4 text-sm text-[#765c67]">
              No {pilgrimageType} packages are currently available. Contact us to register your interest.
            </p>
          ) : null}
        </div>
      </div>
    </section>
  );
};

export default PackageFinder;