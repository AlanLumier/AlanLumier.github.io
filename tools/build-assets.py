"""
生成站点素材：头像、favicon、Apple touch icon、分享缩略图（OG）。

用法：python tools/build-assets.py [头像源文件]
默认头像源：C:\\Users\\19577\\Desktop\\71DE7209A2F12223A28CEC0F07050DFA.jpg
"""

import os
import sys

from PIL import Image, ImageDraw, ImageFilter, ImageFont, ImageOps

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)
OUT = os.path.join(ROOT, "assets")
DEFAULT_AVATAR = r"C:\Users\19577\Desktop\71DE7209A2F12223A28CEC0F07050DFA.jpg"

WARM = (255, 234, 225)
COOL = (182, 250, 255)
TEXT = (31, 36, 48)
TEXT_SOFT = (91, 100, 114)

FONT_CANDIDATES = [
    r"C:\Windows\Fonts\msyhbd.ttc",
    r"C:\Windows\Fonts\msyh.ttc",
    r"C:\Windows\Fonts\segoeuib.ttf",
]
SOFT_CANDIDATES = [
    r"C:\Windows\Fonts\msyh.ttc",
    r"C:\Windows\Fonts\segoeui.ttf",
]


def load_font(candidates, size):
    for path in candidates:
        if os.path.exists(path):
            return ImageFont.truetype(path, size)
    return ImageFont.load_default()


def gradient(size, start, end):
    """对角线渐变（左上 -> 右下），与站点 background: linear-gradient(135deg…) 一致"""
    width, height = size
    base = Image.new("RGB", (width, height), start)
    pixels = base.load()
    for y in range(height):
        for x in range(width):
            t = (x / max(1, width - 1) + y / max(1, height - 1)) / 2
            pixels[x, y] = (
                round(start[0] + (end[0] - start[0]) * t),
                round(start[1] + (end[1] - start[1]) * t),
                round(start[2] + (end[2] - start[2]) * t),
            )
    return base


def build_avatar(source_path):
    os.makedirs(OUT, exist_ok=True)
    with Image.open(source_path) as raw:
        image = ImageOps.exif_transpose(raw).convert("RGB")
        side = min(image.size)
        left = (image.width - side) // 2
        top = (image.height - side) // 2
        square = image.crop((left, top, left + side, top + side))

        avatar = square.resize((320, 320), Image.LANCZOS)
        avatar.save(os.path.join(OUT, "avatar.webp"), "WEBP", quality=86, method=6)

        # iOS 主屏图标（系统会自己切圆角，这里给方形底）
        icon = square.resize((180, 180), Image.LANCZOS)
        icon.save(os.path.join(OUT, "apple-touch-icon.png"), "PNG")

        # 分享缩略图用同一张头像做圆形
        round_avatar = square.resize((240, 240), Image.LANCZOS)
    print("头像与 touch icon 已生成")
    return round_avatar


def build_og(round_avatar):
    width, height = 1200, 630
    canvas = gradient((width, height), WARM, COOL).convert("RGBA")
    draw = ImageDraw.Draw(canvas)

    # 右下角一片柔和光斑（直接画在整图尺寸上，模糊后不会留下矩形接缝）
    glow = Image.new("RGBA", (width, height), (0, 0, 0, 0))
    ImageDraw.Draw(glow).ellipse((760, 60, 1180, 580), fill=(208, 253, 248, 110))
    glow = glow.filter(ImageFilter.GaussianBlur(120))
    canvas.alpha_composite(glow)

    # 圆形头像 + 渐变描边
    avatar = round_avatar.copy()
    mask = Image.new("L", avatar.size, 0)
    ImageDraw.Draw(mask).ellipse((0, 0, avatar.size[0] - 1, avatar.size[1] - 1), fill=255)
    canvas.paste(avatar, (96, 190), mask)
    draw.ellipse((96, 190, 96 + avatar.size[0], 190 + avatar.size[1]), outline=(255, 255, 255, 210), width=4)

    name_font = load_font(FONT_CANDIDATES, 96)
    tag_font = load_font(SOFT_CANDIDATES, 40)
    small_font = load_font(SOFT_CANDIDATES, 28)

    draw.text((380, 214), "AlanLumier", font=name_font, fill=TEXT)
    draw.text((384, 330), "个人空间 · 作品 / 照片 / 联系", font=tag_font, fill=TEXT_SOFT)
    draw.text((384, 396), "alanlumier.github.io", font=small_font, fill=(15, 122, 134))

    canvas.convert("RGB").save(os.path.join(OUT, "og.png"), "PNG", optimize=True)
    print("分享缩略图 assets/og.png 已生成 1200x630")


def write_favicon():
    svg = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" role="img" aria-label="AlanLumier">
  <defs>
    <linearGradient id="brand" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#d0fdf8" />
      <stop offset="100%" stop-color="#ffc5ce" />
    </linearGradient>
  </defs>
  <rect width="64" height="64" rx="16" fill="url(#brand)" />
  <text x="32" y="45" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif"
        font-size="34" font-weight="700" fill="#1f2430">A</text>
</svg>
"""
    with open(os.path.join(OUT, "favicon.svg"), "w", encoding="utf-8") as handle:
        handle.write(svg)
    print("favicon.svg 已生成")


def main():
    source = sys.argv[1] if len(sys.argv) > 1 else DEFAULT_AVATAR
    if not os.path.exists(source):
        raise SystemExit(f"找不到头像文件：{source}")

    os.makedirs(OUT, exist_ok=True)
    round_avatar = build_avatar(source)
    build_og(round_avatar)
    write_favicon()


if __name__ == "__main__":
    main()
