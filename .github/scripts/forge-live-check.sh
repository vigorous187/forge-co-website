#!/usr/bin/env bash
# Live verification for forge-co.ca. Usage: forge-live-check.sh full|basic
#   full  = checks for the approved release content (hello@ everywhere, new /contact/ copy)
#   basic = checks that the site is up and static assets/robots/sitemaps are intact (used after rollback)
# Env: BASE_URL (default https://forge-co.ca), BASELINE_DIR (pre-deploy copies of robots/sitemaps/llms.txt)
set -uo pipefail
MODE="${1:-full}"
BASE="${BASE_URL:-https://forge-co.ca}"
BASELINE_DIR="${BASELINE_DIR:-}"
fail=0
bad() { echo "FAIL: $*" >&2; fail=1; }
ok() { echo "ok: $*"; }
tmp="$(mktemp -d)"
trap 'rm -rf "$tmp"' EXIT

fetch() { # path -> body file, prints status code
  local path="$1" out="$tmp/$(echo "$1" | tr '/?=&' '____').body" sep='?'
  [[ "$path" == *\?* ]] && sep='&'
  curl --silent --show-error --location --max-redirs 0 --max-time 30 \
    --output "$out" --dump-header "$out.hdr" --write-out '%{http_code}' \
    --header 'Cache-Control: no-cache' "${BASE}${path}${sep}cb=$(date +%s%N)" || echo 000
}
body() { echo "$tmp/$(echo "$1" | tr '/?=&' '____').body"; }

# 1. Status codes
for p in / /contact/ /about/ /services/ /pricing/ /talent/ /talent/jayden-aj/ /blog/ \
         /sitemap-index.xml /sitemap-0.xml /robots.txt /llms.txt /favicon.svg; do
  code="$(fetch "$p")"
  [[ "$code" == 200 ]] && ok "$p 200" || bad "$p returned $code"
done
code="$(fetch /nope-forge-release-check/)"
[[ "$code" == 404 ]] && ok "unknown path 404" || bad "unknown path returned $code (expected 404)"

# 2. Robots/sitemaps/llms.txt unchanged versus the pre-deploy baseline
if [[ -n "$BASELINE_DIR" ]]; then
  for f in robots.txt sitemap-index.xml sitemap-0.xml llms.txt; do
    if [[ -s "$BASELINE_DIR/$f" ]]; then
      # strip the cache-buster by refetching without it
      curl -fsS --max-time 30 -H 'Cache-Control: no-cache' "${BASE}/${f}" -o "$tmp/cur-$f" 2>/dev/null || { bad "$f refetch failed"; continue; }
      cmp -s "$BASELINE_DIR/$f" "$tmp/cur-$f" && ok "$f unchanged vs pre-deploy" || bad "$f differs from pre-deploy copy"
    fi
  done
fi

# 3. Indexing: public pages must not be noindex, in meta or header
for p in / /contact/ /about/ /services/ /talent/ /talent/jayden-aj/ /blog/; do
  [[ -s "$(body "$p")" ]] || continue
  grep -qi 'noindex' "$(body "$p")" && bad "$p has noindex in HTML"
  grep -qi '^x-robots-tag:.*noindex' "$(body "$p").hdr" && bad "$p has X-Robots-Tag noindex"
  grep -q "<link rel=\"canonical\" href=\"https://forge-co.ca${p}\"" "$(body "$p")" || bad "$p canonical is not https://forge-co.ca${p}"
done
# Intentional noindex pages must stay noindex
for p in /pricing/; do
  grep -qi 'noindex' "$(body "$p")" && ok "$p keeps intentional noindex" || bad "$p lost its intentional noindex"
done
[[ "$fail" == 0 ]] && ok "indexing checks"

if [[ "$MODE" == full ]]; then
  # 4. Contact page content
  c="$(body /contact/)"
  for s in 'Send enquiry' 'Your message' 'Submitting opens an email to our team'; do
    grep -qF "$s" "$c" && ok "/contact/ has '$s'" || bad "/contact/ missing '$s'"
  done
  for s in 'local preview' 'Review email draft' 'Your draft'; do
    grep -qiF "$s" "$c" && bad "/contact/ still contains '$s'"
  done
  # 5. No michael@forge-co.ca anywhere on key pages
  for p in / /contact/ /about/ /services/ /pricing/ /talent/ /talent/jayden-aj/ /blog/; do
    grep -qi 'michael@forge-co.ca' "$(body "$p")" && bad "$p still contains michael@forge-co.ca"
    grep -qi 'hello@forge-co.ca' "$(body "$p")" || bad "$p has no hello@forge-co.ca"
  done
  # 6. Only hello@forge-co.ca mailtos on /contact/
  extra="$(grep -o 'mailto:[^"?<>]*' "$c" | sort -u | grep -v '^mailto:hello@forge-co.ca$' || true)"
  [[ -z "$extra" ]] && ok "/contact/ mailtos are hello@forge-co.ca only" || bad "/contact/ has unexpected mailto: $extra"
  # 7. creator prefill route still loads
  code="$(fetch '/contact/?creator=jayden-aj')"
  [[ "$code" == 200 ]] && ok "/contact/?creator= 200" || bad "/contact/?creator= returned $code"
fi

[[ "$fail" == 0 ]] && echo "ALL LIVE CHECKS PASSED ($MODE)" || echo "LIVE CHECKS FAILED ($MODE)" >&2
exit "$fail"
