import type {
  Milestone,
  Vendor,
  TimelineData,
} from "./types";

export const TOTAL_MONTHS = 57; // 2022-01 .. 2026-09

export function dateToIndex(date: string): number {
  const [year, month] = date.split("-").map(Number);
  return (year - 2022) * 12 + (month - 1);
}

export function indexToLabel(index: number): string {
  const year = 2022 + Math.floor(index / 12);
  const month = (index % 12) + 1;
  return `${year}-${String(month).padStart(2, "0")}`;
}

export function yearFromDate(date: string): number {
  return Number(date.split("-")[0]);
}

export interface QuarterPoint {
  quarter: string; // "2022Q1"
  label: string; // "22Q1"
  count: number;
}

const QUARTERS = ["Q1", "Q2", "Q3", "Q4"];

/** Aggregate all milestone events by quarter -> acceleration series. */
export function aggregateByQuarter(vendors: Vendor[]): QuarterPoint[] {
  const counts = new Map<string, number>();
  for (const v of vendors) {
    for (const m of v.milestones) {
      const year = yearFromDate(m.date);
      const month = Number(m.date.split("-")[1]);
      const q = Math.floor((month - 1) / 3);
      const key = `${year}Q${q + 1}`;
      counts.set(key, (counts.get(key) ?? 0) + 1);
    }
  }
  // Fill continuous range 2022Q1 .. 2026Q3
  const points: QuarterPoint[] = [];
  for (let year = 2022; year <= 2026; year++) {
    for (const q of QUARTERS) {
      if (year === 2026 && q !== "Q1" && q !== "Q2" && q !== "Q3") break;
      const key = `${year}${q}`;
      points.push({
        quarter: key,
        label: `${String(year).slice(2)}${q}`,
        count: counts.get(key) ?? 0,
      });
    }
  }
  return points;
}

/** Per-vendor release intensity. */
export interface VendorRate {
  id: string;
  name: string;
  color: string;
  region: Vendor["region"];
  count: number;
  first: string;
  last: string;
}

export function vendorStats(vendors: Vendor[]): VendorRate[] {
  return vendors.map((v) => {
    const sorted = [...v.milestones].sort((a, b) =>
      dateToIndex(a.date) - dateToIndex(b.date)
    );
    return {
      id: v.id,
      name: v.name,
      color: v.color,
      region: v.region,
      count: sorted.length,
      first: sorted[0]?.date ?? "",
      last: sorted[sorted.length - 1]?.date ?? "",
    };
  });
}

export function totalMilestones(vendors: Vendor[]): number {
  return vendors.reduce((acc, v) => acc + v.milestones.length, 0);
}

export { type Milestone, type Vendor, type TimelineData };
