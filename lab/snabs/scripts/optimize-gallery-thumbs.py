#!/usr/bin/env python3
"""Generate 144×144 gallery thumb PNGs (2× for 72px UI). Uses Tinify if TINIFY_API_KEY is set."""

from __future__ import annotations

import os
import sys
from io import BytesIO
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "assets" / "images" / "gallery" / "thumbs"
THUMB = 144

SOURCES = [
    ("assets/mango.png", "mango-pack.png", "fit"),
    ("assets/cilek.png", "cilek-pack.png", "fit"),
    ("assets/images/gallery/mango-detail-gallery-02.png", "mango-detail-gallery-02.png", "cover"),
    ("assets/images/gallery/mango-detail-gallery-03.png", "mango-detail-gallery-03.png", "cover"),
    ("assets/images/gallery/mango-detail-gallery-04.png", "mango-detail-gallery-04.png", "cover"),
    ("assets/images/gallery/mango-detail-gallery-05.png", "mango-detail-gallery-05.png", "cover"),
]


def via_tinify(src: Path, dest: Path, method: str) -> bool:
    key = os.environ.get("TINIFY_API_KEY")
    if not key:
        return False
    try:
        import tinify
    except ImportError:
        return False

    tinify.key = key
    resized = tinify.from_file(str(src)).resize(
        method="fit" if method == "fit" else "cover",
        width=THUMB,
        height=THUMB,
    )
    resized.to_file(str(dest))
    return True


def via_pillow(src: Path, dest: Path, method: str) -> None:
    from PIL import Image

    img = Image.open(src).convert("RGBA")
    if method == "fit":
        img.thumbnail((THUMB, THUMB), Image.Resampling.LANCZOS)
        canvas = Image.new("RGBA", (THUMB, THUMB), (255, 255, 255, 255))
        ox = (THUMB - img.width) // 2
        oy = (THUMB - img.height) // 2
        canvas.paste(img, (ox, oy), img)
        out = canvas
    else:
        w, h = img.size
        side = min(w, h)
        left = (w - side) // 2
        top = (h - side) // 2
        cropped = img.crop((left, top, left + side, top + side))
        out = cropped.resize((THUMB, THUMB), Image.Resampling.LANCZOS)

    buf = BytesIO()
    out.save(buf, format="PNG", optimize=True, compress_level=9)
    dest.write_bytes(buf.getvalue())


def main() -> int:
    OUT.mkdir(parents=True, exist_ok=True)
    engine = "tinify" if os.environ.get("TINIFY_API_KEY") else "pillow"
    print(f"Thumb engine: {engine}")

    for rel, name, method in SOURCES:
        src = ROOT / rel
        dest = OUT / name
        if not src.is_file():
            print(f"skip missing: {rel}", file=sys.stderr)
            continue
        before = src.stat().st_size
        if not via_tinify(src, dest, method):
            via_pillow(src, dest, method)
        after = dest.stat().st_size
        print(f"{name}: {before // 1024}KB -> {after // 1024}KB")

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
