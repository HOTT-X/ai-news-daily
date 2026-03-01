# AI News Daily

Generate a daily AI news digest from curated tech RSS feeds with LLM-based scoring, summarization, and trend insights.

从 90 个技术博客 RSS 源抓取近期文章，使用大模型完成评分、分类、摘要和趋势提炼，输出结构化 Markdown 日报。

![AI News Daily 概览](assets/overview.png)

## Features

- 90 源并发抓取（RSS + Atom）
- 三维评分：`relevance` / `quality` / `timeliness`
- 自动分类（6 类）+ 关键词提取
- Top N 文章结构化摘要（支持中英文）
- 今日趋势总结（3-5 句）
- 报告可视化：分类饼图、关键词图、标签云
- 支持 Gemini 与 OpenAI-compatible（DeepSeek / Qwen / OpenAI 等）

## Project Structure

```text
scripts/
  digest.ts                 # 入口
  digest/
    main.ts                 # CLI 与主流程编排
    types.ts                # 类型定义
    constants.ts            # 常量与 RSS 源列表
    rss.ts                  # 抓取与解析
    ai-client.ts            # Gemini + OpenAI-compatible 客户端
    scoring.ts              # 评分与分类
    summarization.ts        # 摘要与趋势总结
    report.ts               # Markdown 报告生成
```

## Requirements

- Node.js >= 16.17（推荐 20+）
- npm
- 至少一个可用模型 API Key：
  - `GEMINI_API_KEY`，或
  - `OPENAI_API_KEY`（配合 `OPENAI_API_BASE`）

## Quick Start

```bash
cd /Users/nebneb/Desktop/AI_daily/ai-daily-digest-main
npm install
npm run digest -- --help
```

## Run

### 1) 使用 Gemini

```bash
export GEMINI_API_KEY="your-gemini-key"
npm run digest -- --hours 48 --top-n 15 --lang zh --output ./output/digest.md
```

### 2) 使用 OpenAI-compatible（推荐给 Qwen / DeepSeek）

```bash
export OPENAI_API_KEY="your-api-key"
export OPENAI_API_BASE="https://dashscope.aliyuncs.com/compatible-mode/v1"
export OPENAI_MODEL="qwen-plus"

npm run digest -- --hours 48 --top-n 15 --lang zh --output ./output/digest.md
```

## CLI Options

```text
--hours <n>     时间范围（小时），默认 48
--top-n <n>     精选文章数量，默认 15
--lang <zh|en>  输出语言，默认 zh
--output <path> 输出文件路径，默认 ./digest-YYYYMMDD.md
--help          显示帮助
```

## Output

生成的 Markdown 报告包含：

- `📝 今日看点`
- `🏆 今日必读（Top 3）`
- `📊 数据概览`
- 按分类分组的文章列表（含摘要、关键词、评分）

## Data Source

RSS 列表来自 Hacker News Popularity Contest 2025 的高热度独立技术博客集合（完整列表见 [`scripts/digest/constants.ts`](scripts/digest/constants.ts)）。

## Notes

- 若同时配置了 `GEMINI_API_KEY` 和 `OPENAI_API_KEY`，会优先 Gemini，失败后自动降级到 OpenAI-compatible。
- `output/`、`dist/`、`node_modules/` 默认已在 `.gitignore` 中忽略。
