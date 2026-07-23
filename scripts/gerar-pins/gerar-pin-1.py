from PIL import Image, ImageDraw, ImageFont
import os

def hex_to_rgb(hex_color):
    hex_color = hex_color.lstrip('#')
    return tuple(int(hex_color[i:i+2], 16) for i in (0, 2, 4))

ROSA = "#E11D48"
ROSA_CLARO = "#F4A7B9"
BEGE = "#F5F0EB"
PRETO = "#1A1A1A"
BRANCO = "#FFFFFF"
CINZA = "#8C8C8C"

def get_font(size, bold=False):
    font_paths = [
        "C:/Users/LG/.kilo/skills/canvas-design/canvas-fonts/BricolageGrotesque-Bold.ttf",
        "C:/Users/LG/.kilo/skills/canvas-design/canvas-fonts/BricolageGrotesque-Regular.ttf",
        "C:/Users/LG/.kilo/skills/canvas-design/canvas-fonts/CrimsonPro-Bold.ttf",
        "C:/Users/LG/.kilo/skills/canvas-design/canvas-fonts/CrimsonPro-Regular.ttf",
    ]
    if bold:
        for p in font_paths:
            if "Bold" in p and os.path.exists(p):
                return ImageFont.truetype(p, size)
    for p in font_paths:
        if os.path.exists(p):
            return ImageFont.truetype(p, size)
    return ImageFont.load_default()

def draw_rounded_rect(draw, xy, radius, fill, outline=None, width=1):
    x1, y1, x2, y2 = xy
    draw.rounded_rectangle([x1, y1, x2, y2], radius=radius, fill=fill, outline=outline, width=width)

def create_pin(title, subtitle, products, filename, width=800, height=1200):
    img = Image.new("RGB", (width, height), hex_to_rgb(BEGE))
    draw = ImageDraw.Draw(img)
    
    title_font = get_font(52, bold=True)
    subtitle_font = get_font(24)
    product_font = get_font(20)
    price_font = get_font(22, bold=True)
    
    y = 60
    x_center = width // 2
    
    draw.text((x_center, y), title, fill=hex_to_rgb(PRETO), font=title_font, anchor="ma")
    y += 70
    
    draw.text((x_center, y), subtitle, fill=hex_to_rgb(ROSA), font=subtitle_font, anchor="ma")
    y += 50
    
    grid_x = 60
    grid_y = y + 20
    grid_w = (width - 120) // 2
    grid_h = 200
    gap = 20
    
    for i, product in enumerate(products[:4]):
        col = i % 2
        row = i // 2
        px = grid_x + col * (grid_w + gap)
        py = grid_y + row * (grid_h + gap)
        
        draw_rounded_rect(draw, [px, py, px + grid_w, py + grid_h], 16, hex_to_rgb(BRANCO), outline=hex_to_rgb(ROSA_CLARO), width=2)
        
        inner_margin = 20
        text_y = py + 30
        draw.text((px + inner_margin, text_y), product['name'], fill=hex_to_rgb(PRETO), font=product_font)
        text_y += 30
        draw.text((px + inner_margin, text_y), f"R$ {product['price']}", fill=hex_to_rgb(ROSA), font=price_font)
        text_y += 35
        tag_y = text_y
        tag_bg_x1 = px + inner_margin
        tag_bg_y1 = tag_y
        tag_bg_x2 = tag_bg_x1 + 90
        tag_bg_y2 = tag_bg_y1 + 28
        draw_rounded_rect(draw, [tag_bg_x1, tag_bg_y1, tag_bg_x2, tag_bg_y2], 14, hex_to_rgb(ROSA))
        draw.text((tag_bg_x1 + 45, tag_bg_y1 + 14), '★', fill=hex_to_rgb(BRANCO), font=get_font(16), anchor="mm")
        draw.text((tag_bg_x1 + 100, tag_bg_y1 + 14), product['store'], fill=hex_to_rgb(CINZA), font=get_font(16), anchor="lm")
    
    logo_y = height - 100
    logo_font = get_font(18, bold=True)
    draw.text((x_center, logo_y), "ATACADINHO DA RAFA", fill=hex_to_rgb(ROSA), font=logo_font, anchor="mm")
    draw.text((x_center, logo_y + 28), "Achados que cabem no bolso", fill=hex_to_rgb(CINZA), font=get_font(16), anchor="mm")
    
    img.save(filename, quality=95)

if __name__ == "__main__":
    os.makedirs("public/posts", exist_ok=True)
    
    products = [
        {"name": "Calça jeans reta lavagem média", "price": "39,90", "store": "Marisa"},
        {"name": "Calça jeans mom fit", "price": "49,90", "store": "Renner"},
        {"name": "Calça jeans wide leg", "price": "49,90", "store": "Riachuelo"},
        {"name": "Calça jeans cargo preta", "price": "45,00", "store": "Shein"},
    ]
    
    create_pin(
        title="25 CALÇAS JEANS",
        subtitle="Até R$ 150 | 2026",
        products=products,
        filename="public/posts/post-1-jeans-pin.png"
    )
    print("Pin gerado: public/posts/post-1-jeans-pin.png")
