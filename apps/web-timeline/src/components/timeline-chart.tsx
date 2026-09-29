"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@repo/ui/components/ui/tooltip";
import type { Vendor } from "@/lib/types";
import { dateToIndex, indexToLabel, TOTAL_MONTHS } from "@/lib/timeline";

interface TimelineChartProps {
  vendors: Vendor[];
}

const REGION_LABEL: Record<Vendor["region"], string> = {
  overseas: "海外厂商",
  china: "国内厂商",
  policy: "政策主线",
};

function YearTicks() {
  const ticks = [];
  for (let y = 2022; y <= 2026; y++) {
    const left = ((y - 2022) * 12) / TOTAL_MONTHS * 100;
    ticks.push({ year: y, left });
  }
  return (
    <div className="relative h-8 text-xs font-medium text-muted-foreground">
      {ticks.map((t) => (
        <span
          key={t.year}
          className="absolute top-1 -translate-x-1/2 tabular-nums"
          style={{ left: `${t.left}%` }}
        >
          {t.year}
        </span>
      ))}
      <div className="absolute inset-x-0 bottom-0 border-b border-border" />
    </div>
  );
}

export function TimelineChart({ vendors }: TimelineChartProps) {
  const regions: Vendor["region"][] = ["overseas", "china", "policy"];

  return (
    <TooltipProvider delayDuration={80}>
      <div className="w-full">
        <div className="mb-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
          {regions.map((r) => (
            <span key={r} className="inline-flex items-center gap-2 text-muted-foreground">
              <span className="h-2.5 w-2.5 rounded-sm bg-muted-foreground/50" />
              {REGION_LABEL[r]}
            </span>
          ))}
          <span className="ml-auto hidden text-xs text-muted-foreground md:block">
            悬停事件点查看详情
          </span>
        </div>

        <YearTicks />

        <div className="mt-1 flex flex-col">
          {vendors.map((vendor) => (
            <div
              key={vendor.id}
              className="group grid grid-cols-[160px_1fr] items-center gap-x-4 border-b border-border/60 py-2.5 last:border-0"
            >
              <div className="flex items-center gap-2 pr-2 text-sm font-medium">
                <span
                  className="h-2.5 w-2.5 shrink-0 rounded-sm"
                  style={{ backgroundColor: vendor.color }}
                />
                <span className="truncate">{vendor.name}</span>
              </div>

              <div className="relative h-7">
                {Array.from({ length: TOTAL_MONTHS }, (_, i) =>
                  i % 3 === 0 ? (
                    <div
                      key={i}
                      className="pointer-events-none absolute top-0 h-full w-px bg-border/70"
                      style={{ left: `${(i / TOTAL_MONTHS) * 100}%` }}
                    />
                  ) : null
                )}

                {vendor.milestones.map((m, idx) => {
                  const left = (dateToIndex(m.date) / TOTAL_MONTHS) * 100;
                  return (
                    <Tooltip key={`${vendor.id}-${idx}`}>
                      <TooltipTrigger asChild>
                        <button
                          type="button"
                          className="absolute top-1/2 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-background shadow-sm transition-transform hover:scale-150 hover:ring-2 hover:ring-ring/40 focus:outline-none"
                          style={{ left: `${left}%`, backgroundColor: vendor.color }}
                          aria-label={`${m.date} ${m.label}`}
                        />
                      </TooltipTrigger>
                      <TooltipContent side="top" className="max-w-xs">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span
                              className="h-2 w-2 rounded-sm"
                              style={{ backgroundColor: vendor.color }}
                            />
                            <span className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                              {vendor.name} · {m.date}
                            </span>
                          </div>
                          <p className="text-sm font-semibold">{m.label}</p>
                          <p className="text-xs leading-relaxed text-muted-foreground">
                            {m.desc}
                          </p>
                        </div>
                      </TooltipContent>
                    </Tooltip>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-1 grid grid-cols-[160px_1fr] gap-x-4">
          <div />
          <div className="relative h-6">
            {[2022, 2023, 2024, 2025, 2026].map((y) => {
              const left = ((y - 2022) * 12) / TOTAL_MONTHS * 100;
              const months = y === 2026 ? 9 : 12;
              return (
                <div
                  key={y}
                  className="absolute top-0 h-full border-l border-dotted border-border"
                  style={{ left: `${left}%`, width: `${(months / TOTAL_MONTHS) * 100}%` }}
                />
              );
            })}
            {Array.from({ length: TOTAL_MONTHS }, (_, i) =>
              i % 6 === 0 ? (
                <span
                  key={i}
                  className="absolute -bottom-1 -translate-x-1/2 text-[9px] text-muted-foreground/70"
                  style={{ left: `${(i / TOTAL_MONTHS) * 100}%` }}
                >
                  {indexToLabel(i).slice(2)}
                </span>
              ) : null
            )}
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}
