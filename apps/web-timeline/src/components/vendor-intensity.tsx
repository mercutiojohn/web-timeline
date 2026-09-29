"use client";

import type { VendorRate } from "@/lib/timeline";
import { dateToIndex, TOTAL_MONTHS } from "@/lib/timeline";

interface VendorIntensityProps {
  data: VendorRate[];
}

/** Horizontal "release battle line" — per-vendor span from first to last release. */
export function VendorIntensity({ data }: VendorIntensityProps) {
  const sorted = [...data].sort((a, b) => dateToIndex(a.first) - dateToIndex(b.first));
  const maxCount = Math.max(...sorted.map((d) => d.count), 1);

  return (
    <div className="space-y-3">
      {sorted.map((v) => {
        const startLeft = (dateToIndex(v.first) / TOTAL_MONTHS) * 100;
        const spanPct = ((dateToIndex(v.last) - dateToIndex(v.first)) / TOTAL_MONTHS) * 100;
        const countPct = (v.count / maxCount) * 100;
        return (
          <div key={v.id} className="group">
            <div className="mb-1 flex items-center justify-between text-xs">
              <span className="flex items-center gap-2 font-medium">
                <span className="h-2 w-2 rounded-sm" style={{ backgroundColor: v.color }} />
                {v.name}
              </span>
              <span className="tabular-nums text-muted-foreground">
                {v.first} → {v.last} · {v.count} 次发布
              </span>
            </div>
            <div className="relative h-2.5 rounded-full bg-muted/60">
              <div
                className="absolute top-0 h-full rounded-full opacity-40"
                style={{ left: `${startLeft}%`, width: `${Math.max(spanPct, 1.5)}%`, backgroundColor: v.color }}
              />
            </div>
            <div className="mt-1 flex items-center gap-1.5">
              <span
                className="h-1.5 rounded-full"
                style={{ width: `${countPct}%`, backgroundColor: v.color }}
              />
              <span className="text-[10px] tabular-nums text-muted-foreground">
                {v.count} 发布
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
