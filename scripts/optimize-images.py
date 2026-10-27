"""Rebuild lossless delivery assets; requires Pillow. Originals stay untouched.

Decoded RGBA equality is checked before accepting a derivative. ICC profiles are
preserved. Favicon is a separate explicitly resized small browser asset.
"""
import json
from pathlib import Path
from PIL import Image
records = []
for source in sorted(Path('src/assets').rglob('*.png')):
    target = source.with_suffix('.webp')
    with Image.open(source) as image:
        image.save(target, 'WEBP', lossless=True, exact=True, method=6, icc_profile=image.info.get('icc_profile', b''))
        with Image.open(target) as decoded:
            assert decoded.convert('RGBA').tobytes() == image.convert('RGBA').tobytes(), str(source)
    if target.stat().st_size >= source.stat().st_size:
        target.unlink()
        continue
    records.append({'source': str(source), 'target': str(target), 'originalBytes': source.stat().st_size, 'bytes': target.stat().st_size, 'pixelIdentical': True})
with Image.open('src/assets/images/avatar/url-icon.png') as icon:
    icon.thumbnail((48, 48), Image.Resampling.LANCZOS)
    icon.save('public/favicon.png', optimize=True)
Path('docs/portfolio-hardening/evidence/image-derivatives.json').write_text(json.dumps(records, indent=2)+'\n')
print(f'{len(records)} lossless derivatives: {sum(r["originalBytes"] for r in records)} -> {sum(r["bytes"] for r in records)} bytes')

for source in sorted(Path('src/assets/images').rglob('*.webp')):
    if source.stem.endswith('-640') or not any(part in source.parts for part in ['custom-projects', 'cloud-section', 'ai-section', 'full-stack-section']):
        continue
    with Image.open(source) as image:
        if image.width <= 640: continue
        image.thumbnail((640, 2048), Image.Resampling.LANCZOS)
        image.save(source.with_name(source.stem+'-640.webp'), 'WEBP', lossless=True, exact=True, method=4, icc_profile=image.info.get('icc_profile', b''))

for original, width in [('src/assets/images/avatar/url-icon.png',96), ('src/assets/images/mascot/mascot.png',192)]:
    source=Path(original)
    with Image.open(source) as image:
        image.thumbnail((width,width),Image.Resampling.LANCZOS)
        image.save(source.with_name(source.stem+f'-{width}.webp'),'WEBP',lossless=True,exact=True,method=4,icc_profile=image.info.get('icc_profile',b''))
