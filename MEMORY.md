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
- Primary: `minimax-portal/MiniMax-M2.7`
- Failover: `anthropic/claude-sonnet-4-6`

## 重要約定
- Google Drive 資料夾動線：1_Input / 2_Processing / 3_Output / 4_Logs
- 財務、金流、刪除等高風險操作必須 Human-in-the-Loop
- 知識庫格式：YAML Metadata + Markdown

## 技能
- 程式/編碼相關任務：自動委派給 Claude Code ACP session

## 待辦
- [x] 設立 Google Drive 共享資料夾
- [x] 確認 Claude Pro 訂閱（eric020730think@gmail.com）
- [x] Claude Code 登入設定
- [x] OpenClaw → Claude Code 委派 Skill 開發
- [ ] HA 自動容錯機制實作
