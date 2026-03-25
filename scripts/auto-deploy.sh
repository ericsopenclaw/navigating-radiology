#!/bin/bash
# auto-deploy.sh
# 自動偵測 GitHub 新 repo 並同時部署到 Vercel + Cloudflare Pages
# 需確保：gh auth login && vercel 已登入 && wrangler 已登入

set -e

SITES_DIR="$HOME/Sites/auto-deploy"
mkdir -p "$SITES_DIR"

echo "📡 取得 GitHub repos..."
GH_REPOS=$(gh repo list ericsopenclaw --json name --jq '.[].name' 2>/dev/null || true)

echo "🔍 檢查新專案..."
for REPO in $GH_REPOS; do
  DEPLOY_DIR="$SITES_DIR/$REPO"
  
  # 自動把主 HTML 檔改名為 index.html 避免 404
  prepare_repo() {
    if [ -d "$DEPLOY_DIR" ]; then
      cd "$DEPLOY_DIR"
      git pull 2>/dev/null || true
    else
      git clone --depth 1 "https://github.com/ericsopenclaw/$REPO" "$DEPLOY_DIR" 2>/dev/null
      cd "$DEPLOY_DIR"
    fi
    MAIN_HTML=$(ls *.html 2>/dev/null | head -1)
    if [ -n "$MAIN_HTML" ] && [ "$MAIN_HTML" != "index.html" ]; then
      cp "$MAIN_HTML" index.html
    fi
  }

  if [ -d "$DEPLOY_DIR/.vercel" ]; then
    echo ""
    echo "  ⏭️  $REPO — 已在 Vercel，更新中..."
    prepare_repo
    echo "  ▶️  部署到 Vercel..."
    vercel --prod 2>&1 | tail -2
  else
    echo ""
    echo "  🆕 $REPO — 發現新專案，準備部署..."
    prepare_repo
    echo "  ▶️  部署到 Vercel..."
    vercel --yes 2>&1 | tail -3
  fi

  echo "  ▶️  部署到 Cloudflare Pages..."
  wrangler pages deploy "$DEPLOY_DIR" --project-name="$REPO" 2>&1 | tail -5

  echo "  ✅ $REPO 雙平台部署完成！"
done

echo ""
echo "🎉 全部檢查完成！"
