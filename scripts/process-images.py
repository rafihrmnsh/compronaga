# Mengubah hasil ekstraksi PDF menjadi WebP teroptimasi + manifest ukuran gambar.
import glob, json, os, re
from PIL import Image
S="/tmp/claude-0/-home-claude/2db915ba-324d-532f-80d4-6e46bf430a2c/scratchpad"
OUT="public/images"
def natural(f):
    return [int(t) if t.isdigit() else t for t in re.split(r'(\d+)', os.path.basename(f))]
def save(im, path, maxw=1400, q=80):
    im = im.convert("RGB")
    if im.width > maxw:
        im = im.resize((maxw, round(im.height*maxw/im.width)), Image.LANCZOS)
    im.save(path, "WEBP", quality=q, method=6)
    return {"src": "/"+path.replace("public/",""), "w": im.width, "h": im.height}
def trim(im, n=3):
    return im.crop((n,n,im.width-n,im.height-n))
man = {}
def group(key, files, folder, prefix):
    out=[]
    for i,f in enumerate(sorted(files, key=natural),1):
        out.append(save(trim(Image.open(f)), f"{OUT}/{folder}/{prefix}-{i:02d}.webp"))
    man[key]=out
group("tools", glob.glob(S+"/out/t-*.png"), "tools", "tools")
for page,slug in {23:"batamindo-greenhouse-farm",24:"fire-pump-seiko",26:"inkali",28:"pondasi-tanki",29:"gedung-logistik-kemendag",30:"rsud-jampang-kulon"}.items():
    group(slug, glob.glob(f"{S}/out/s-{page}-*.png"), "projects", slug)
for page,slug in {35:"oil-and-gas",36:"mechanical-piping-steel",39:"mud-pit",41:"hdpe-pipe",43:"piping-fabrication-welding-valve",46:"storage-tank-repair"}.items():
    group(slug, glob.glob(f"{S}/out/s-{page}-*.png"), "gc", slug)
man["hero"]=save(Image.open(S+"/img/pg-010-002.png"), OUT+"/hero.webp", 1600, 78)
man["about"]=save(Image.open(S+"/img/pg-011-003.png"), OUT+"/about.webp", 1200, 78)
# logo (RGB + soft mask dari PDF) -> RGBA
rgb=Image.open(S+"/img/pg-001-000.png").convert("RGB"); mask=Image.open(S+"/img/pg-001-001.png").convert("L")
rgb.putalpha(mask); rgb.save("public/logo.png"); print("logo", rgb.size)
json.dump(man, open("src/data/images.generated.json","w"), indent=1)
print({k:len(v) if isinstance(v,list) else 1 for k,v in man.items()})
