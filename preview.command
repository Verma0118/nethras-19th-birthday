#!/bin/bash
cd "$(dirname "$0")"

PORT=8080
while lsof -nP -iTCP:"$PORT" -sTCP:LISTEN >/dev/null 2>&1; do
  PORT=$((PORT + 1))
done

URL="http://localhost:$PORT"
echo ""
echo "  Nethraflix preview"
echo "  ------------------"
echo "  Open: $URL"
echo "  Press Ctrl+C to stop"
echo ""

open "$URL" 2>/dev/null || xdg-open "$URL" 2>/dev/null || true
python3 -m http.server "$PORT"
