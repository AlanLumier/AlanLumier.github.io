"""
把桌面 photo 文件夹里的照片处理成网页用图，并生成跑马灯的照片卡片注入 index.html。

- 统一缩放到长边 900px、转成 WebP（体积小、不带 EXIF，避免定位等隐私信息外泄）
- 生成两组相同的卡片（第二组 aria-hidden）用于无缝滚动
- 只依赖 Pillow，构建期跑一次即可

用法：python tools/build-photos.py [源目录]
默认源目录：C:\\Users\\19577\\Desktop\\photo
"""

import hashlib
import json
import os
import sys

from PIL import Image, ImageOps

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)
INDEX_PATH = os.path.join(ROOT, "index.html")
OUT_DIR = os.path.join(ROOT, "assets", "photos")
DEFAULT_SOURCE = r"C:\Users\19577\Desktop\photo"

MAX_SIDE = 900
QUALITY = 78
START = "<!-- PHOTOS_START -->"
END = "<!-- PHOTOS_END -->"


def prepare(source_dir):
    """处理图片，返回 [(文件名, 宽, 高)]"""
    os.makedirs(OUT_DIR, exist_ok=True)
    names = sorted(
        name
        for name in os.listdir(source_dir)
        if name.lower().endswith((".jpg", ".jpeg", ".png", ".webp", ".bmp"))
    )
    if not names:
        raise SystemExit(f"{source_dir} 里没有图片")

    photos = []
    for index, name in enumerate(names, start=1):
        path = os.path.join(source_dir, name)
        with Image.open(path) as image:
            image = ImageOps.exif_transpose(image)
            if image.mode not in ("RGB", "L"):
                image = image.convert("RGB")
            width, height = image.size
            scale = min(1.0, MAX_SIDE / max(width, height))
            size = (max(1, round(width * scale)), max(1, round(height * scale)))
            image = image.resize(size, Image.LANCZOS)

            out_name = f"p{index:02d}.webp"
            # 不传 exif 参数：元数据不会写进新文件
            image.save(os.path.join(OUT_DIR, out_name), "WEBP", quality=QUALITY, method=6)
            photos.append((out_name, round(size[0] / size[1], 4)))
            print(f"{name} -> {out_name} {size[0]}x{size[1]}")
    return photos


def figure(photo_name, aspect, index):
    """一张照片卡片"""
    return (
        f'        <figure class="photo" style="aspect-ratio: {aspect};">\n'
        f'          <img src="./assets/photos/{photo_name}" alt="照片 {index}" '
        f'loading="lazy" decoding="async" />\n'
        f"        </figure>"
    )


def build_group(photos):
    return "\n".join(
        figure(name, aspect, index)
        for index, (name, aspect) in enumerate(photos, start=1)
    )


def inject(photos):
    with open(INDEX_PATH, encoding="utf-8") as handle:
        source = handle.read()

    if START not in source or END not in source:
        raise SystemExit("index.html 里缺少 PHOTOS_START / PHOTOS_END 标记")

    block = (
        f"{START}\n"
        f'      <div class="marquee-group">\n'
        f"{build_group(photos)}\n"
        f"      </div>\n"
        f'      <div class="marquee-group" aria-hidden="true">\n'
        f"{build_group(photos)}\n"
        f"      </div>\n"
        f"      {END}"
    )

    head = source.index(START)
    tail = source.index(END) + len(END)
    patched = source[:head] + block + source[tail:]
    with open(INDEX_PATH, "w", encoding="utf-8") as handle:
        handle.write(patched)
    return len(block)


def main():
    source_dir = sys.argv[1] if len(sys.argv) > 1 else DEFAULT_SOURCE
    if not os.path.isdir(source_dir):
        raise SystemExit(f"找不到源目录：{source_dir}")

    photos = prepare(source_dir)
    size = inject(photos)

    manifest = os.path.join(OUT_DIR, "manifest.json")
    with open(manifest, "w", encoding="utf-8") as handle:
        json.dump(
            [{"file": name, "aspect": aspect} for name, aspect in photos],
            handle,
            ensure_ascii=False,
            indent=2,
        )
    digest = hashlib.sha1(json.dumps(photos).encode()).hexdigest()[:8]
    print(f"\n共 {len(photos)} 张 -> {OUT_DIR}")
    print(f"注入 index.html：{size} 字符（版本 {digest}）")


if __name__ == "__main__":
    main()
