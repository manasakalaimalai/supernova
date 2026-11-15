#!/bin/bash
set -euo pipefail

echo "=== Validating all image paths in recap.html ==="
echo ""

# Extract all image src paths from recap.html
images=$(grep -oP '(?<=src=")[^"]*\.jpg' recap.html | sort -u)

missing=0
found=0

for img in $images; do
  # Remove leading slash to get relative path
  rel_path="${img#/}"
  
  if git ls-files | grep -q "^${rel_path}$"; then
    echo "✓ $img"
    ((found++))
  else
    echo "✗ MISSING: $img"
    ((missing++))
  fi
done

echo ""
echo "Summary: $found found, $missing missing"
echo ""

if [ $missing -gt 0 ]; then
  echo "=== Checking filesystem vs git ==="
  for img in $images; do
    rel_path="${img#/}"
    if [ -f "$rel_path" ]; then
      if ! git ls-files | grep -q "^${rel_path}$"; then
        echo "! File exists but not committed: $rel_path"
      fi
    fi
  done
fi

exit $missing
