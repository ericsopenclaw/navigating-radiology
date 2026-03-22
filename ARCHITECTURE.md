# 數位助理架構藍圖

_建立日期：2026-03-22_
_最後更新：2026-03-22_

---

## 一、系統架構

### 層級 1：Google Drive（共享中樞）
- Win 11 Google Drive 桌面版上傳檔案
- Mac mini 自動同步與讀取
- 所有工具讀取同一來源

**Google Drive 路徑：**
```
~/Google Drive → ~/Library/CloudStorage/GoogleDrive-ericsopenclaw@gmail.com/我的雲端硬碟/
```

**本地捷徑：**
```
~/openclaw-input  → 1_Input/
~/openclaw-processing → 2_Processing/
~/openclaw-output → 3_Output/
~/openclaw-logs → 4_Logs/
```

### 層級 2：Mac mini 工具分工

| 助理 | 專長 | 介面 | 適合場景 | 成本 |
|------|------|------|----------|------|
| **OpenClaw** | 24/7 監控、即時回應 | Telegram | 輕量任務、日常對話、高頻監控 | MiniMax Coding Plan ($10/月) |
| **Cowork** | 複雜文件處理、批次操作 | 桌面 App | 手動觸發、大量複雜處理 | Claude Pro ($20/月) |
| **Claude Code** | 系統修復、技術任務 | 終端機 | 緊急修復、深度問題 | Claude Pro ($20/月) |

---

## 二、委派流程

```
OpenClaw 監控 Google Drive
  → 發現複雜任務
  → 委派給 Claude Code（使用 Pro 訂閱配額）
  → Claude Code 處理
  → 回傳結果給 OpenClaw
  → OpenClaw 通知你（ Telegram）
```

---

## 三、工作流場景

### 場景一：系統修復
1. 你發現問題（ Telegram 告訴 OpenClaw）
2. OpenClaw 分析：「這是複雜的系統問題」
3. OpenClaw 委派給 Claude Code
4. Claude Code 執行（使用 Pro 訂閱配額）
5. 若過程斷線，觸發 Failover 自動重試
6. Claude Code 回報給 OpenClaw：「已修復完成」
7. OpenClaw 通知你

### 場景二：費用單據 OCR
1. Win 11：拍照 → Google Drive/input/
2. OpenClaw：高頻監控（Skill）→ 發現新檔案
3. 自動 OCR → 寫入 Excel
4. Telegram 通知你

### 場景三：文件批次處理
**Option A：Cowork（手動）**
1. Win 11：PDF → Google Drive/convert/
2. 打開 Cowork → 批次處理
3. 從 Google Drive 下載結果

**Option B：OpenClaw + Skill（自動）**
1. Win 11：上傳到 Google Drive
2. Telegram：「執行批次轉檔」
3. OpenClaw 呼叫預寫好的 Skill
4. 背景處理完成
5. Telegram 通知結果

### 場景四：定時任務
1. 定時觸發 OpenClaw Skill
2. OpenClaw 執行整理任務
3. Telegram 通知結果

---

## 四、資安防護重點

### 1. 實體隔離與資料氣閘（Air-lock）
- 嚴格區分「Win 11 指揮中心」與「Mac mini 代工廠」
- Google Drive 資料夾動線：
  - `1_Input/`：原始檔案輸入
  - `2_Processing/`：處理中
  - `3_Output/`：處理完成輸出
  - `4_Logs/`：錯誤紀錄稽核

### 2. 最小權限原則（PoLP）
- sudoers NOPASSWD 範圍最小化
- 系統維持「隨時可重灌」的輕量化標準
- Mac mini 內不放任何不可取代的唯一檔案

### 3. 觸發來源白名單驗證
- 任何自動化腳本必須驗證來源
- Email TELEGRAM 白名單機制
- AI 必須先驗證寄件者屬於公司內部，才能啟動後續程序

### 4. Human-in-the-Loop（人在迴路）
- 財務、金流、刪除等高風險操作
- AI 最終產出必須是「CSV 報表」或「待確認草稿」
- 交由人類做最後審核與匯入

### 5. 企業知識庫格式
- 統一格式：YAML Metadata + Markdown (.md)
- 存放於 Google Drive/Knowledge_Base/
- 未來可遷移至 Notion 等企業管理軟體

### 6. HA 自動容錯
- Claude Code 改造 OpenClaw 底層
- 加入自動重試與 Failover 邏輯
- 確保 MiniMax API 高併發下依然穩定

---

## 五、模型設定

### 當前配置
| 優先級 | 模型 | 用途 |
|--------|------|------|
| **1️⃣ 主模型** | `minimax-portal/MiniMax-M2.7` | 預設、日常任務、高頻監控 |
| **2️⃣ Failover** | `anthropic/claude-sonnet-4-6` | MiniMax 故障時自動切換 |

### 訂閱規劃
| 訂閱 | 費用 | 用途 |
|------|------|------|
| MiniMax Coding Plan | $10/月 固定 | OpenClaw API、日常任務 |
| Claude Pro | $20/月 | Claude Code + Cowork |

---

## 六、待辦事項

| 優先級 | 項目 | 狀態 |
|--------|------|------|
| 🔴 高 | 設立 Google Drive 共享資料夾 | ✅ 已完成 |
| 🔴 高 | 確認 Claude Pro 訂閱狀態 | ✅ 已完成（eric020730think@gmail.com） |
| 🔴 高 | Claude Code 登入設定 | ✅ 已完成 |
| 🟡 中 | OpenClaw → Claude Code 委派 Skill 開發 | ✅ 已完成（已驗證） |
| 🟡 中 | HA 自動容錯機制實作 | 待辦 |

## 七、已開發技能

| 技能 | 路徑 | 狀態 |
|------|------|------|
| 1. Google Drive 監控 | `skills/drive-monitor/` | ✅ 完成 |
| 2. OCR 單據處理 | `skills/ocr-receipt/` | ✅ 完成 |
| 3. PDF 批次轉檔 | `skills/pdf-converter/` | ✅ 完成 |
| 4. HA 自動容錯 | `skills/ha-failover/` | ✅ 完成 |

## 八、驗證記錄

- Claude Code 登入：`eric020730think@gmail.com`（Pro 訂閱）
- Claude Code 委派測試：✅ 成功
- 技能一測試：✅ 成功（偵測到 PDF）
- 技能二測試：✅ 成功（OCR 處理，結果寫入 receipts.csv）
- 技能三測試：✅ 完成（PDF 轉換工具已建立）
- 技能四測試：✅ 成功（健康檢查通過，Failover 模型已設定）

---

_本文件為架構藍圖，視情況持續更新。_
