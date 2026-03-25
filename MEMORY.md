# MEMORY.md - Long-term Memory

## Identity
- **Name:** 蝦蝦 🦐
- **Human:** Eric
- **OS:** Mac mini (Eric's Mac mini)
- **Channel:** Telegram

## System Architecture
- 完整架構藍圖：參考 `ARCHITECTURE.md`
- 日常工作記錄：`memory/YYYY-MM-DD.md`

## 助理分工
| 助理 | 用途 |
|------|------|
| OpenClaw | 24/7 監控、Telegram 介面、MiniMax API |
| Cowork | 複雜文件處理（Claude Pro）|
| Claude Code | 系統修復、技術任務（Claude Pro）|

## 訂閱
- MiniMax Coding Plan ($10/月) → OpenClaw API
- Claude Pro ($20/月) → Claude Code + Cowork（eric020730think@gmail.com）

## 模型設定
- Primary: `minimax-portal/MiniMax-M2.7`（**一律預設使用，不要切換**）
- Failover: `anthropic/claude-sonnet-4-6`（只在 MiniMax 掛掉時才用）

## 瀏覽器偏好
- 預設使用 **openclaw 橘色 Chrome**（openclaw 模式）開啟網頁
- 除非 Eric 明確說「用我的 Chrome」，否則一律用 openclaw 能控制的那個

## 重要約定
- Google Drive 資料夾動線：1_Input / 2_Processing / 3_Output / 4_Logs
- 財務、金流、刪除等高風險操作必須 Human-in-the-Loop
- 知識庫格式：YAML Metadata + Markdown

## 技能
- 程式/編碼相關任務：自動委派給 Claude Code ACP session

## 工作策略（2026-03-25 起）
- **每天 07:00**：GitHub 新 repo 偵測與 Vercel 部署（週一最完整）
- **每天 08:00**：AI 新聞晨報 + 本週技術提案（整合在同一則 Telegram 訊息）
- **週一 08:00**：驚喜專案建構並上線


- **GitHub → Vercel 全自動**：每個新專案推到 GitHub，每天 9:15 cron job 自動偵測並部署
- **Script**：`~/.openclaw/workspace/scripts/auto-import-vercel.sh`
- **Vercel token**：已設定在 `~/.config/vercel/credentials.json`
- **三個已上線專案**：
  - Command Center → https://command-center-deploy-ten.vercel.app
  - HRCT DDx → https://hrct-ddx-deploy.vercel.app
  - Todo App → https://todo-app-deploy-blue.vercel.app

## 待辦
- [x] 設立 Google Drive 共享資料夾
- [x] 確認 Claude Pro 訂閱（eric020730think@gmail.com）
- [x] Claude Code 登入設定
- [x] OpenClaw → Claude Code 委派 Skill 開發
- [x] GitHub + Vercel 自動部署架設
- [ ] HA 自動容錯機制實作
