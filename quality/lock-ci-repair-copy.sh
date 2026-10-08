#!/usr/bin/env bash
set -euo pipefail
export PATH=/home/openclaw/.cache/codex-node22-lockrepair/node-v22.23.3-linux-x64/bin:$PATH
site="$1"
case "$site" in create-a-car-wiki|win-a-world-championship-wiki|worm-capitalist-wiki|shift-monitor-1998|little-troubles-in-spooky-town-wiki|primordial-sea-wiki) ;; *) exit 2;; esac
taskbase=/home/openclaw/.cache/codex-node22-lockrepair/repairs/$(date +%s%N)
reportbase='/mnt/d/AI建站/indexing-diagnosis/2026-10-08/lock-ci-probe'
mkdir -p "$taskbase/$site" "$reportbase"
cp "/mnt/d/AI建站/$site/package.json" "$taskbase/$site/"
cp "/mnt/d/AI建站/$site/package-lock.json" "$taskbase/$site/package-lock.original.json"
cp "$taskbase/$site/package-lock.original.json" "$taskbase/$site/package-lock.json"
cd "$taskbase/$site"
npm install --package-lock-only --ignore-scripts --no-audit --no-fund > "$reportbase/$site.repair-copy.log" 2>&1
npm ci --no-audit --no-fund > "$reportbase/$site.clean-linux-ci.log" 2>&1
node -e "for(const p of ['@next/swc-linux-x64-gnu','@unrs/resolver-binding-linux-x64-gnu']) {let m=require(p);console.log(p,require(p+'/package.json').version,typeof m);} console.log(require('next/package.json').version);" > "$reportbase/$site.native-linux-load.log" 2>&1
cp package-lock.json "$reportbase/$site.package-lock.repaired.json"
printf '%s\n' "$taskbase/$site" > "$reportbase/$site.clean-project-path.txt"
printf '%s lock repair and clean Linux npm ci passed\n' "$site"
