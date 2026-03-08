#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="${1:-business-assets}"
DOCX_DIR="$ROOT_DIR/exports/docx"
PDF_DIR="$ROOT_DIR/exports/pdf"

mkdir -p "$DOCX_DIR" "$PDF_DIR"

while IFS= read -r -d '' src; do
  rel_path="${src#${ROOT_DIR}/}"
  rel_base="${rel_path%.md}"

  docx_out="$DOCX_DIR/${rel_base}.docx"
  pdf_out="$PDF_DIR/${rel_base}.pdf"

  mkdir -p "$(dirname "$docx_out")" "$(dirname "$pdf_out")"

  pandoc "$src" -o "$docx_out"
  pandoc "$src" -o "$pdf_out" --pdf-engine=xelatex -V geometry:margin=1in

  printf 'Exported %s\n' "$rel_path"
done < <(find "$ROOT_DIR" -type f -name "*.md" ! -path "$ROOT_DIR/exports/*" -print0 | sort -z)

printf '\nDOCX exports: %s\n' "$DOCX_DIR"
printf 'PDF exports: %s\n' "$PDF_DIR"
