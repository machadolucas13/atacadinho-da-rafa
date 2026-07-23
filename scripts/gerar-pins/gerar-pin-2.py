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
AZUL = "#2563EB"

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

def create_pin(title, subtitle, tips, filename, width=800, height=1200):
    img = Image.new("RGB", (width, height), hex_to_rgb(BEGE))
    draw = ImageDraw.Draw(img)
    
    title_font = get_font(48, bold=True)
    subtitle_font = get_font(22)
    tip_title_font = get_font(18, bold=True)
    tip_desc_font = get_font(14)
    
    y = 60
    x_center = width // 2
    
    draw.text((x_center, y), title, fill=hex_to_rgb(PRETO), font=title_font, anchor="ma")
    y += 65
    
    draw.text((x_center, y), subtitle, fill=hex_to_rgb(ROSA), font=subtitle_font, anchor="ma")
    y += 45
    
    box_x = 60
    box_y = y
    box_w = width - 120
    box_h = 55
    
    for i, tip in enumerate(tips[:3]):
        draw_rounded_rect(draw, [box_x, box_y + i*75, box_x + box_w, box_y + i*75 + box_h], 12, hex_to_rgb(BRANCO), outline=hex_to_rgb(ROSA_CLARO), width=1)
        draw.text((box_x + 20, box_y + i*75 + 12), tip['title'], fill=hex_to_rgb(PRETO), font=tip_title_font)
        draw.text((box_x + 20, box_y + i*75 + 34), tip['desc'], fill=hex_to_rgb(CINZA), font=tip_desc_font)
    
    logo_y = height - 100
    logo_font = get_font(18, bold=True)
    draw.text((x_center, logo_y), "ATACADINHO DA RAFA", fill=hex_to_rgb(ROSA), font=logo_font, anchor="mm")
    draw.text((x_center, logo_y + 28), "Achados que cabem no bolso", fill=hex_to_rgb(CINZA), font=get_font(16), anchor="mm")
    
    img.save(filename, quality=95)

if __name__ == "__main__":
    os.makedirs("public/posts", exist_ok=True)
    
    tips = [
        {"title": "1. Escolha um nicho que você já entende", "desc": "Moda, finanças, beleza ou tecnologia — pare de perder tempo com coisas que não domina."},
        {"title": "2. Cadastre-se em pelo menos 2 plataformas", "desc": "Kiwify, Hotmart, Shopee Afiliados — quanto mais opções, mais produtos para promover."},
        {"title": "3. Publique conteúdo com recomendação honesta", "desc": "Posts com problema + solução convertem mais do que posts genéricos de ‘ganhe dinheiro’."},
    ]
    
    create_pin(
        title="COMO GANHAR DINHEIRO COMO AFILIADO",
        subtitle="Guia completo para iniciantes | 2026",
        tips=tips,
        filename="public/posts/post-2-afiliado-pin.png"
    )
    print("Pin gerado: public/posts/post-2-afiliado-pin.png")
