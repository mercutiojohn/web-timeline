# AI 大模型多厂商编年史 · web-timeline

一个 **Mintlify 风格** 的 AI 编年史可视化站点，位于一个 **shadcn + pnpm monorepo** 中。

核心诉求：**横向对比各厂商发版时间战线** + **2022 年起的 LLM / AGI 加速编年史**。

## 目录结构

```
ai-timeline-monorepo/
├── pnpm-workspace.yaml
├── package.json                 # monorepo 根（pnpm 脚本入口）
├── packages/
│   └── ui/                      # 共享 shadcn UI 组件库
│       ├── components.json
│       └── components/ui/*      # shadcn 组件
└── apps/
    └── web-timeline/            # 本站点（Next.js App Router）
        ├── components.json
        └── src/
            ├── app/page.tsx     # Mintlify 风格页面
            ├── components/      # timeline-chart / acceleration-chart / vendor-intensity
            ├── data/timeline.json   # ★ 编年史数据（recharts/echarts 风格）
            └── lib/             # types + 聚合/工具函数
```

## 数据层 `src/data/timeline.json`

recharts / echarts 可消费的结构化 JSON：

```jsonc
{
  "title": "...",
  "range": { "start": "2022-01", "end": "2026-09" },
  "vendors": [
    {
      "id": "openai",
      "name": "OpenAI",
      "region": "overseas",
      "color": "#10A37F",
      "milestones": [
        { "date": "2022-11", "label": "ChatGPT (GPT-3.5)", "desc": "..." }
      ]
    }
  ]
}
```

13 条泳道（厂商/主线）：OpenAI · Anthropic · Google(Gemini) · Meta · DeepSeek · xAI(Grok) · 其他海外(Mistral/Stability) · 百度(文心) · 阿里(通义Qwen) · 科大讯飞(星火) · 字节(豆包) · 月之暗面(Kimi) · 国内政策主线。共 **98 个里程碑事件**，时间跨度 **2022.01 — 2026.09**（57 个月）。

## 可视化

1. 各厂商发版时间战线：13 条并行泳道，横向完整按月时间轴，悬停查看详情。
2. LLM/AGI 加速编年史：recharts AreaChart，按季度聚合发布事件数。
3. 发版战线与强度：各厂商时间跨度条 + 相对发布次数强度。

## 使用

```bash
pnpm install
pnpm dev        # -> http://localhost:3000
pnpm build
```

## 技术栈

pnpm monorepo · shadcn/ui · Next.js 15 + React 19 + TypeScript + Tailwind CSS · recharts 3.x · Mintlify 风格。
