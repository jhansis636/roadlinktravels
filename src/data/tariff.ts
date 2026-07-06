// Shared tariff data used by public Tariff pages AND the Admin Billing module.
// Editing values here updates every consumer instantly — never duplicate this
// data in other files.

export type TariffValue = number | "Call for details" | "Included";

export interface KmBasisRow {
  vehicle: string;
  minKmPerDay: number;
  farePerKm: TariffValue;
  driverBata: TariffValue;
  amount: TariffValue;
  isContact?: boolean;
}

export interface DayBasisRow {
  vehicle: string;
  rentPerDay: TariffValue;
  freeKmPerDay: string;
  fareAfterFree: TariffValue;
  driverBata: TariffValue;
  total: TariffValue;
  isContact?: boolean;
}

export const kmBasisTariff: KmBasisRow[] = [
  { vehicle: "Swift", minKmPerDay: 300, farePerKm: 13, driverBata: 400, amount: 4300 },
  { vehicle: "Etios", minKmPerDay: 300, farePerKm: 13, driverBata: 400, amount: 4300 },
  { vehicle: "Ciaz or Amaze", minKmPerDay: 300, farePerKm: 14, driverBata: 400, amount: 4600 },
  { vehicle: "Ertiga", minKmPerDay: 350, farePerKm: 17, driverBata: 400, amount: 5500 },
  { vehicle: "Innova", minKmPerDay: 350, farePerKm: 18, driverBata: 500, amount: 6800 },
  { vehicle: "Crysta", minKmPerDay: 400, farePerKm: 20, driverBata: 500, amount: 8500 },
  { vehicle: "Hycross", minKmPerDay: 400, farePerKm: 22, driverBata: 500, amount: 9300 },
  { vehicle: "Audi (Premium Sedan)", minKmPerDay: 350, farePerKm: 85, driverBata: 900, amount: 30650 },
  { vehicle: "Benz (Premium Sedan)", minKmPerDay: 350, farePerKm: 85, driverBata: 900, amount: 30650 },
  { vehicle: "BMW (Premium Sedan)", minKmPerDay: 350, farePerKm: 85, driverBata: 900, amount: 30650 },
  { vehicle: "Jaguar (Premium Sedan)", minKmPerDay: 350, farePerKm: 85, driverBata: 900, amount: 30650 },
  { vehicle: "Tempo Traveller", minKmPerDay: 400, farePerKm: 30, driverBata: 600, amount: 12600 },
  { vehicle: "Urbania", minKmPerDay: 400, farePerKm: 38, driverBata: 600, amount: 15800 },
  { vehicle: "Coach Van", minKmPerDay: 400, farePerKm: 45, driverBata: 800, amount: 18800 },
  { vehicle: "Bus", minKmPerDay: 400, farePerKm: "Call for details", driverBata: "Call for details", amount: "Call for details", isContact: true },
];

export const dayBasisTariff: DayBasisRow[] = [
  { vehicle: "Swift", rentPerDay: 2600, freeKmPerDay: "100 km", fareAfterFree: 12, driverBata: 400, total: 3000 },
  { vehicle: "Etios", rentPerDay: 2600, freeKmPerDay: "100 km", fareAfterFree: 12, driverBata: 400, total: 3000 },
  { vehicle: "Ciaz or Amaze", rentPerDay: 3000, freeKmPerDay: "100 km", fareAfterFree: 13, driverBata: 400, total: 3400 },
  { vehicle: "Ertiga", rentPerDay: 3200, freeKmPerDay: "100 km", fareAfterFree: 14, driverBata: 400, total: 3600 },
  { vehicle: "Innova", rentPerDay: 3400, freeKmPerDay: "100 km", fareAfterFree: 16, driverBata: 400, total: 3800 },
  { vehicle: "Crysta", rentPerDay: 4600, freeKmPerDay: "100 km", fareAfterFree: 17, driverBata: 400, total: 5000 },
  { vehicle: "Hycross", rentPerDay: 5100, freeKmPerDay: "100 km", fareAfterFree: 18, driverBata: 400, total: 5500 },
  { vehicle: "Audi (Luxury Sedan)", rentPerDay: 13000, freeKmPerDay: "100 km", fareAfterFree: 75, driverBata: "Included", total: 13000 },
  { vehicle: "Benz (Luxury Sedan)", rentPerDay: 13000, freeKmPerDay: "100 km", fareAfterFree: 75, driverBata: "Included", total: 13000 },
  { vehicle: "BMW (Luxury Sedan)", rentPerDay: 13000, freeKmPerDay: "100 km", fareAfterFree: 75, driverBata: "Included", total: 13000 },
  { vehicle: "Jaguar (Luxury Sedan)", rentPerDay: 13000, freeKmPerDay: "100 km", fareAfterFree: 75, driverBata: "Included", total: 13000 },
  { vehicle: "Tempo Traveller", rentPerDay: 5000, freeKmPerDay: "100 km", fareAfterFree: 20, driverBata: 400, total: 5400 },
  { vehicle: "Urbania", rentPerDay: 6500, freeKmPerDay: "100 km", fareAfterFree: 30, driverBata: 500, total: 7000 },
  { vehicle: "Coach Van", rentPerDay: 5500, freeKmPerDay: "100 km", fareAfterFree: 40, driverBata: 500, total: 6000 },
  { vehicle: "Bus", rentPerDay: "Call for details", freeKmPerDay: "Call for details", fareAfterFree: "Call for details", driverBata: "Call for details", total: "Call for details", isContact: true },
];

// Vehicle base-name (without trailing labels like "(Premium Sedan)") used for
// display + dedupe in dropdowns.
const stripLabel = (v: string) => v.replace(/\s*\((Premium|Luxury) Sedan\)\s*$/i, "");

export interface BillingVehicleOption {
  /** unique key */
  value: string;
  /** label shown in dropdown */
  label: string;
  /** per-km rate from Km-Basis tariff, undefined if "Call for details" */
  perKmRate?: number;
  /** per-day rate from Day-Basis tariff, undefined if "Call for details" */
  perDayRate?: number;
  /** driver bata per day (km-basis), undefined if not numeric */
  driverBataPerDay?: number;
}

/**
 * Merged vehicle list from both tariff pages — used as the Billing form's
 * Vehicle Type dropdown. Any vehicle added to either tariff array above shows
 * up here automatically.
 */
export const getBillingVehicles = (): BillingVehicleOption[] => {
  const map = new Map<string, BillingVehicleOption>();

  for (const r of kmBasisTariff) {
    const key = stripLabel(r.vehicle);
    map.set(key, {
      value: key,
      label: key,
      perKmRate: typeof r.farePerKm === "number" ? r.farePerKm : undefined,
      driverBataPerDay: typeof r.driverBata === "number" ? r.driverBata : undefined,
    });
  }
  for (const r of dayBasisTariff) {
    const key = stripLabel(r.vehicle);
    const existing = map.get(key) ?? { value: key, label: key };
    map.set(key, {
      ...existing,
      perDayRate: typeof r.rentPerDay === "number" ? r.rentPerDay : undefined,
    });
  }
  return Array.from(map.values());
};

export const getVehicleByName = (name: string): BillingVehicleOption | undefined =>
  getBillingVehicles().find((v) => v.value === name);