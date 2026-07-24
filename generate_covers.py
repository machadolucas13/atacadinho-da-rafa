import random
import math
from PIL import Image, ImageDraw, ImageFont, ImageFilter, ImageEnhance

W, H = 1080, 1920
FONT_DIR = "C:/Users/LG/.kilo/skills/canvas-design/canvas-fonts"
OUTPUT_DIR = "C:/Users/LG/Desktop/atacadinho da rafa/public/posts"

def add_star_field(draw, img_w, img_h, count=200, seed=42):
    rng = random.Random(seed)
    for _ in range(count):
        x = rng.randint(0, img_w)
        y = rng.randint(0, img_h)
        r = rng.uniform(0.5, 2.5)
        alpha = rng.randint(40, 200)
        color = (255, 255, 255, alpha)
        draw.ellipse([x - r, y - r, x + r, y + r], fill=color)

def add_nebula_gradient(draw, img_w, img_h, color_centers, blur_radius=80):
    layers = []
    for cx, cy, radius, color in color_centers:
        layer = Image.new("RGBA", (img_w, img_h), (0, 0, 0, 0))
        layer_draw = ImageDraw.Draw(layer)
        gradient = Image.new("RGBA", (radius * 2, radius * 2), (0, 0, 0, 0))
        gdraw = ImageDraw.Draw(gradient)
        for i in range(radius, 0, -1):
            ratio = i / radius
            r = int(color[0] * ratio * ratio)
            g = int(color[1] * ratio * ratio)
            b = int(color[2] * ratio * ratio)
            a = int(color[3] * (1 - ratio * 0.5) * (ratio / radius))
            gdraw.ellipse([radius - i, radius - i, radius + i, radius + i], fill=(r, g, b, a))
        layer.paste(gradient, (cx - radius, cy - radius), gradient)
        layer = layer.filter(ImageFilter.GaussianBlur(radius=blur_radius))
        layers.append(layer)
    result = layers[0]
    for layer in layers[1:]:
        result = Image.alpha_composite(result, layer)
    return result

def draw_text_centered(draw, text, font, y, img_w, text_color, shadow=True):
    bbox = draw.textbbox((0, 0), text, font=font)
    tw = bbox[2] - bbox[0]
    x = (img_w - tw) / 2
    if shadow:
        draw.text((x + 3, y + 3), text, font=font, fill=(0, 0, 0, 100))
    draw.text((x, y), text, font=font, fill=text_color)
    return y + (bbox[3] - bbox[1])

DARK_BG = (10, 10, 26)
TEXT_COLOR = (240, 235, 245, 255)
TEXT_COLOR_WARM = (255, 235, 210, 255)
TEXT_COLOR_GREEN = (200, 240, 220, 255)
TEXT_COLOR_ROSE = (255, 220, 230, 255)
TEXT_COLOR_BLUE = (180, 210, 255, 255)
TEXT_COLOR_CORAL = (255, 180, 160, 255)
ACCENT_GOLD = (255, 200, 100, 255)
ACCENT_PINK = (240, 140, 180, 255)
ACCENT_BLUE = (140, 180, 240, 255)
ACCENT_TEAL = (100, 220, 200, 255)
ACCENT_CORAL = (255, 130, 100, 255)

def generate_cover(filename, title_lines, subtitle, accent_color, nebula_colors, visual_elements_fn, star_seed=1, nebula_seed=1):
    print(f"Generating {filename}...")
    img = Image.new("RGB", (W, H), DARK_BG)
    overlay = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    draw = ImageDraw.Draw(overlay)

    nebula_centers = [
        (cx, cy, r, col) for cx, cy, r, col in nebula_colors
    ]
    nebula = add_nebula_gradient(draw, W, H, nebula_centers, blur_radius=120)
    img.paste(nebula, (0, 0), nebula)
    add_star_field(draw, W, H, count=250, seed=star_seed)
    img.paste(overlay, (0, 0), overlay)

    final = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    final.paste(img)
    d = ImageDraw.Draw(final)

    add_star_field(d, W, H, count=30, seed=star_seed + 1000)

    visual_elements_fn(d, final)

    font_title = ImageFont.truetype(f"{FONT_DIR}/BricolageGrotesque-Bold.ttf", 56)
    font_sub = ImageFont.truetype(f"{FONT_DIR}/Outfit-Regular.ttf", 32)
    font_small = ImageFont.truetype(f"{FONT_DIR}/Outfit-Regular.ttf", 22)

    y_pos = 380
    for line in title_lines:
        d.text((W // 2, y_pos), line, font=font_title, fill=(255, 255, 255, 255), anchor="mt")
        y_pos += 72

    semi = Image.new("RGBA", (W, 2), (*accent_color[:3], 60))
    final.paste(semi, (W // 2 - 120, y_pos), semi)
    y_pos += 30

    d.text((W // 2, y_pos), subtitle, font=font_sub, fill=accent_color, anchor="mt")

    final = final.convert("RGB")
    outpath = f"{OUTPUT_DIR}/{filename}"
    final.save(outpath, "PNG")
    print(f"  Saved: {filename}")

# ============================================================
# IMAGE 1: Como Criar Conteudo Instagram Seguidores
# ============================================================
def visual_ig(d, final):
    # Instagram-style grid dots
    for row in range(3):
        for col in range(3):
            dx = 300 + col * 100
            dy = 550 + row * 60
            d.ellipse([dx - 3, dy - 3, dx + 3, dy + 3], fill=(255, 130, 180, 40))
    # Heart icon (simple)
    hx, hy = W // 2, 1450
    d.ellipse([hx - 30, hy - 15, hx - 5, hy + 10], fill=(255, 130, 180, 60))
    d.ellipse([hx + 5, hy - 15, hx + 30, hy + 10], fill=(255, 130, 180, 60))
    d.polygon([(hx - 30, hy - 5), (hx + 30, hy - 5), (hx, hy + 25)], fill=(255, 130, 180, 60))
    # Small sparkle dots
    for i in range(8):
        sx = W // 2 + random.Random(i + 500).randint(-200, 200)
        sy = 800 + random.Random(i + 501).randint(-100, 100)
        sr = random.Random(i + 502).uniform(0.5, 1.5)
        d.ellipse([sx - sr, sy - sr, sx + sr, sy + sr], fill=(255, 255, 255, 80))

generate_cover(
    "como-criar-conteudo-instagram-seguidores.png",
    ["Como Criar Conteudo", "Instagram que Atrai", "Seguidores"],
    "→ Estrategia · Carrossel · Reels · Engajamento",
    ACCENT_PINK,
    [(200, 500, 500, (80, 15, 40, 55)), (600, 1200, 550, (100, 20, 50, 50)), (400, 800, 400, (60, 10, 35, 40))],
    visual_ig,
    star_seed=10,
    nebula_seed=10
)

# ============================================================
# IMAGE 2: Como Montar Guarda Roupa Capsula Gastando Pouco 2026
# ============================================================
def visual_closet(d, final):
    # Minimalist hanger shape
    hx, hy = W // 2, 600
    d.arc([hx - 40, hy - 60, hx + 40, hy + 60], 180, 0, fill=(200, 220, 240, 80), width=2)
    d.line([hx, hy + 60, hx, hy + 120], fill=(200, 220, 240, 60), width=2)
    # Small square blocks (clothing items)
    for i in range(4):
        bx = W // 2 - 100 + i * 55
        by = 1000 + (i % 2) * 40
        d.rectangle([bx, by, bx + 35, by + 25], outline=(180, 200, 220, 50), width=1)
    # Hanger outline bottom
    d.arc([hx - 60, hy + 80, hx + 60, hy + 200], 0, 180, fill=(200, 220, 240, 30), width=1)
    # Subtle vertical lines (wardrobe rails)
    for i in range(5):
        lx = 200 + i * 170
        d.line([lx, 1300, lx, 1550], fill=(180, 200, 220, 15), width=1)
    # Sparkle dots
    for i in range(6):
        sx = W // 2 + random.Random(i + 600).randint(-150, 150)
        sy = 500 + random.Random(i + 601).randint(-80, 80)
        d.ellipse([sx - 1, sy - 1, sx + 1, sy + 1], fill=(255, 255, 255, 100))

generate_cover(
    "como-montar-guarda-roupa-capsula-gastando-poco-2026.png",
    ["Guarda Roupa", "Capsula · Gastando Pouco", "2026"],
    "→ Essenciais · Combinacoes · Estilo Minimalista",
    ACCENT_TEAL,
    [(300, 600, 450, (15, 40, 35, 50)), (700, 1300, 500, (20, 30, 25, 45)), (540, 400, 350, (10, 50, 40, 35))],
    visual_closet,
    star_seed=20,
    nebula_seed=20
)

# ============================================================
# IMAGE 3: Como Ganhar Dinheiro Como Afiliado Guia 2026
# ============================================================
def visual_affiliate(d, final):
    # Dollar sign / coin circle
    cx, cy = W // 2, 600
    d.ellipse([cx - 50, cy - 50, cx + 50, cy + 50], outline=ACCENT_GOLD, width=2)
    d.ellipse([cx - 40, cy - 40, cx + 40, cy + 40], outline=ACCENT_GOLD, width=1)
    d.text((cx, cy), "$", font=ImageFont.truetype(f"{FONT_DIR}/BricolageGrotesque-Bold.ttf", 36), fill=ACCENT_GOLD, anchor="mm")
    # Connected dots (network/affiliate chain)
    for i in range(6):
        angle = i * math.pi / 3
        nx = cx + int(math.cos(angle) * 120)
        ny = cy + int(math.sin(angle) * 120)
        d.ellipse([nx - 4, ny - 4, nx + 4, ny + 4], fill=ACCENT_GOLD)
        # Line from center to dot
        d.line([cx, cy, nx, ny], fill=ACCENT_GOLD, width=1)
    # Small upward arrow trend
    arrow_x = W // 2 + 150
    arrow_y = 750
    d.line([arrow_x - 15, arrow_y + 20, arrow_x, arrow_y - 15, arrow_x + 15, arrow_y + 20], fill=ACCENT_GOLD, width=2)
    # Sparkle dots
    for i in range(10):
        sx = W // 2 + random.Random(i + 700).randint(-200, 200)
        sy = 900 + random.Random(i + 701).randint(-100, 100)
        sr = random.Random(i + 702).uniform(0.5, 2)
        d.ellipse([sx - sr, sy - sr, sx + sr, sy + sr], fill=(255, 255, 255, 60))

generate_cover(
    "como-ganhar-dinheiro-como-afiliado-guia-2026.png",
    ["Como Ganhar Dinheiro", "Como Afiliado", "Guia 2026"],
    "→ Renda Extra · Trabalho Remoto · Monetize",
    ACCENT_GOLD,
    [(400, 700, 500, (60, 40, 10, 55)), (700, 1300, 550, (80, 50, 10, 50)), (540, 400, 400, (40, 30, 5, 40))],
    visual_affiliate,
    star_seed=30,
    nebula_seed=30
)

# ============================================================
# IMAGE 4: Como Organizar Apartamento Pequeno Com Pouco Dinheiro
# ============================================================
def visual_apartment(d, final):
    # Room outline (simple floor plan)
    rx, ry = W // 2, 700
    d.rectangle([rx - 120, ry - 80, rx + 120, ry + 80], outline=(180, 200, 220, 80), width=2)
    # Window
    d.rectangle([rx + 80, ry - 50, rx + 110, ry + 50], fill=(100, 180, 240, 30), outline=(180, 200, 220, 60))
    # Door
    d.rectangle([rx - 100, ry + 60, rx - 30, ry + 80], outline=(180, 200, 220, 60))
    # Floating shelves (organization)
    for i in range(3):
        sx = rx - 80 + i * 55
        d.line([sx - 15, ry - 40, sx + 15, ry - 40], fill=(200, 220, 240, 40), width=2)
        d.rectangle([sx - 10, ry - 35, sx + 10, ry - 25], fill=(180, 200, 220, 20))
    # Small plant icon (interior design element)
    px, py = rx + 60, ry - 20
    d.ellipse([px - 8, py - 15, px + 8, py + 5], fill=(100, 200, 100, 40))
    d.line([px, py + 5, px, py + 20], fill=(100, 200, 100, 40), width=2)
    # Grid lines (space planning)
    for i in range(4):
        gx = rx - 100 + i * 55
        d.line([gx, ry + 90, gx, ry + 180], fill=(180, 200, 220, 8), width=1)
    # Sparkle dots
    for i in range(8):
        sx = W // 2 + random.Random(i + 800).randint(-180, 180)
        sy = 900 + random.Random(i + 801).randint(-80, 80)
        d.ellipse([sx - 1, sy - 1, sx + 1, sy + 1], fill=(255, 255, 255, 90))

generate_cover(
    "como-organizar-apartamento-pequeno-com-pouco-dinheiro.png",
    ["Como Organizar", "Apartamento Pequeno", "Com Pouco Dinheiro"],
    "→ Espaco · Decacao · Organizacao Inteligente",
    ACCENT_BLUE,
    [(300, 700, 450, (10, 25, 60, 50)), (700, 1200, 500, (15, 30, 70, 45)), (540, 500, 350, (5, 20, 45, 35))],
    visual_apartment,
    star_seed=40,
    nebula_seed=40
)

print("\nAll 4 cover images generated successfully!")