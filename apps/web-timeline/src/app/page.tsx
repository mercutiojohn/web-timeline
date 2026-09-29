import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/ui/card";
import timelineRaw from "@/data/timeline.json";
import type { TimelineData } from "@/lib/types";
import {
  aggregateByQuarter,
  totalMilestones,
  vendorStats,
} from "@/lib/timeline";
import { TimelineChart } from "@/components/timeline-chart";
import { AccelerationChart } from "@/components/acceleration-chart";
import { VendorIntensity } from "@/components/vendor-intensity";

export default function Home() {
  const timeline = timelineRaw as unknown as TimelineData;
  const vendors = timeline.vendors;
  const quarterData = aggregateByQuarter(vendors);
  const stats = vendorStats(vendors);
  const total = totalMilestones(vendors);
  const overseas = vendors.filter((v) => v.region === "overseas").length;
  const china = vendors.filter((v) => v.region === "china").length;

  const statCards = [
    { label: "厂商 / 主线", value: vendors.length, note: `${overseas} 海外 · ${china} 国内 · 1 政策` },
    { label: "发布事件", value: total, note: "模型/产品/政策里程碑" },
    { label: "时间跨度", value: "57", note: "2022.01 — 2026.09 按月" },
    { label: "加速峰值", value: `${Math.max(...quarterData.map((q) => q.count))}`, note: "单季发布数（按季度聚合）" },
  ];

  return (
    <main className="min-h-screen bg-background">
      <header className="border-b border-border/70 bg-gradient-to-b from-secondary/40 to-background">
        <div className="mx-auto max-w-6xl px-6 py-14 md:py-20">
          <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1 text-xs font-medium text-muted-foreground">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
            Generative AI · LLM · AGI
          </p>
          <h1 className="text-3xl font-semibold tracking-tight md:text-5xl">
            {timeline.title}
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
            {timeline.subtitle} —— 从 2022 年 ChatGPT 引爆大众认知，到大模型军备竞赛、
            开源模型崛起、多模态、深度推理、AI Agent 与监管落地，一条被极致加速的编年史。
          </p>

          <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-4">
            {statCards.map((c) => (
              <Card key={c.label} className="border-border/80 bg-card/70 shadow-none">
                <CardContent className="p-4">
                  <p className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
                    {c.label}
                  </p>
                  <p className="mt-1 text-2xl font-semibold tabular-nums">{c.value}</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">{c.note}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-6xl space-y-10 px-6 py-12">
        <section>
          <div className="mb-6">
            <h2 className="text-xl font-semibold tracking-tight">
              各厂商发版时间战线 · 横向对比
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              13 条并行泳道，横向标尺为 2022.01 — 2026.09 完整按月时间轴。每个圆点代表一次关键发布，
              悬停可查看厂商、日期与事件说明。
            </p>
          </div>
          <Card className="border-border/80 shadow-none">
            <CardContent className="overflow-x-auto p-6">
              <div className="min-w-[720px]">
                <TimelineChart vendors={vendors} />
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="grid gap-6 lg:grid-cols-5">
          <Card className="border-border/80 shadow-none lg:col-span-3">
            <CardHeader>
              <CardTitle className="text-base font-semibold">
                2022 起 LLM / AGI 加速编年史
              </CardTitle>
              <CardDescription className="text-sm">
                按季度聚合各厂商发布事件数量。2022 年末 ChatGPT 引爆后进入加速通道，
                2024 起随推理模型、开源与多模态密集落地持续走高。
              </CardDescription>
            </CardHeader>
            <CardContent>
              <AccelerationChart data={quarterData} />
            </CardContent>
          </Card>

          <Card className="border-border/80 shadow-none lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-base font-semibold">各厂商发版战线与强度</CardTitle>
              <CardDescription className="text-sm">
                横向条 = 该厂商从首次到最近一次发布的持续时间线；下方短条 = 发布总次数相对强度。
              </CardDescription>
            </CardHeader>
            <CardContent>
              <VendorIntensity data={stats} />
            </CardContent>
          </Card>
        </section>

        <footer className="border-t border-border/70 pt-8 text-sm text-muted-foreground">
          <p>
            数据为整理汇编的公开编年史信息（2022.01 — 2026.09），用于横向对比各厂商发版节奏与
            LLM/AGI 整体加速趋势；具体日期与版本以各厂商官方发布为准。
          </p>
        </footer>
      </div>
    </main>
  );
}
