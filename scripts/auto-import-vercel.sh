#!/bin/bash
# auto-import-vercel.sh
# 自動偵測 GitHub 新 repo 並部署到 Vercel
# 需確保：gh auth login && vercel 已登入 (vercel whoami)

set -e

SITES_DIR="$HOME/Sites/vercel-auto"
mkdir -p "$SITES_DIR"

echo "📡 取得 GitHub repos..."
GH_REPOS=$(gh repo list ericsopenclaw --json name --jq '.[].name' 2>/dev/null || true)

echo "🔍 檢查新專案..."
for REPO in $GH_REPOS; do
  DEPLOY_DIR="$SITES_DIR/$REPO"
  
  if [ -d "$DEPLOY_DIR/.vercel" ]; then
    echo "  ⏭️  $REPO — 已在 Vercel，略過"
    cd "$DEPLOY_DIR"
    vercel --prod 2>&1 | tail -2
  else
    echo "  🆕 $REPO — 發現新專案，準備部署..."
    cd "$SITES_DIR"
    git clone --depth 1 "https://github.com/ericsopenclaw/$REPO" "$DEPLOY_DIR" 2>/dev/null
    cd "$DEPLOY_DIR"
    # 自動把主 HTML 檔改名為 index.html 避免 404
    MAIN_HTML=$(ls *.html 2>/dev/null | head -1)
    if [ -n "$MAIN_HTML" ] && [ "$MAIN_HTML" != "index.html" ]; then
      cp "$MAIN_HTML" index.html
      git add index.html
      git commit -m "Add index.html for Vercel root" 2>/dev/null || true
      git push 2>/dev/null || true
    fi
    RESULT=$(vercel --yes 2>&1 | tail -3)
    echo "  ✅ $REPO 部署成功！"
    echo "$RESULT"
  fi
done

echo "🎉 檢查完成！"
