"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip as ReTooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { QuarterPoint } from "@/lib/timeline";

interface AccelerationChartProps {
  data: QuarterPoint[];
}

export function AccelerationChart({ data }: AccelerationChartProps) {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <AreaChart data={data} margin={{ top: 10, right: 12, left: -16, bottom: 0 }}>
        <defs>
          <linearGradient id="accel" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="hsl(219 91% 55%)" stopOpacity={0.35} />
            <stop offset="100%" stopColor="hsl(219 91% 55%)" stopOpacity={0.02} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
        <XAxis
          dataKey="label"
          tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
          tickLine={false}
          axisLine={{ stroke: "hsl(var(--border))" }}
          interval={2}
        />
        <YAxis
          allowDecimals={false}
          tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
          tickLine={false}
          axisLine={false}
        />
        <ReTooltip
          cursor={{ stroke: "hsl(var(--border))" }}
          contentStyle={{
            background: "hsl(var(--card))",
            border: "1px solid hsl(var(--border))",
            borderRadius: 8,
            fontSize: 12,
            boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
          }}
          labelFormatter={(label) => `季度 ${label}`}
          formatter={(value) => [`${value} 个发布事件`, "发布数量"]}
        />
        <Area
          type="monotone"
          dataKey="count"
          stroke="hsl(219 91% 55%)"
          strokeWidth={2}
          fill="url(#accel)"
          activeDot={{ r: 4 }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
