# 2026-03-22 工作流程架構規劃

## 系統架構

### 層級 1：Google Drive（共享中樞）
- Win 11 Google Drive 桌面版上傳檔案
- Mac mini 自動同步與讀取
- 所有工具讀取同一來源

### 層級 2：Mac mini 工具分工
| 工具 | 用途 | 配額 |
|------|------|------|
| **OpenClaw** | Telegram 介面、高頻監控、日常任務 | MiniMax Coding Plan ($10/月) |
| **Cowork** | 複雜文件處理、視覺化操作 | Claude Pro 訂閱 ($20/月) |
| **Claude Code** | 系統修復、複雜編碼任務 | Claude Pro 訂閱 ($20/月) |

## 委派流程
OpenClaw 監控 Google Drive → 發現複雜任務 → 委派給 Claude Code → Claude Code 處理 → 回傳結果 → OpenClaw 通知

## 場景
1. **系統修復** → OpenClaw 委派 Claude Code
2. **費用單據 OCR** → OpenClaw 高頻監控 + MiniMax API
3. **文件批次處理** → Cowork 或 OpenClaw+Skill
4. **定時任務** → OpenClaw Skill 執行

## 助理分工
| 助理 | 專長 | 介面 | 適合場景 |
|------|------|------|----------|
| **OpenClaw** | 24/7 監控、即時回應 | Telegram | 輕量任務、日常對話 |
| **Cowork** | 複雜文件處理、批次操作 | 桌面 App | 手動觸發、大量複雜處理 |
| **Claude Code** | 系統修復、技術任務 | 終端機 | 緊急修復、深度問題 |

## 資安防護重點
1. **實體隔離**：Win 11 指揮中心 ↔ Mac mini 代工廠，Google Drive 資料夾動線（Input/Processing/Output/Logs）
2. **最小權限**：sudoers NOPASSWD 範圍最小化，系統維持「隨時可重灌」狀態
3. **白名單驗證**：觸發來源必須通過驗證（Email/TELEGRAM ID 白名單）
4. **Human-in-the-Loop**：財務、金流、刪除等高風險操作必須人類確認
5. **知識庫格式**：YAML Metadata + Markdown，統一格式
6. **HA 自動容錯**：Claude Code 改造 OpenClaw，加入自動重試與 Failover

## 訂閱規劃
- Claude Pro ($20/月)：Cowork + Claude Code
- MiniMax Coding Plan ($10/月)：OpenClaw API
