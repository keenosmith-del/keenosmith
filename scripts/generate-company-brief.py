"""Generate the current brief from the same narrative as the portfolio case study.
Run with Python + reportlab; Node is required to load the shared content module.
"""
from pathlib import Path
import json
import subprocess
from xml.sax.saxutils import escape
from reportlab.pdfgen.canvas import Canvas
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.colors import HexColor
from reportlab.platypus import Paragraph

ROOT = Path(__file__).resolve().parents[1]
story = json.loads(subprocess.check_output([
    'node', '--input-type=module', '-e',
    "import {companyStory} from './src/data/companyVentures.js'; console.log(JSON.stringify(companyStory))"
], cwd=ROOT))
output = ROOT / 'public/documents/kailor-insider-engineering-brief.pdf'
canvas = Canvas(str(output), pagesize=(595.28, 841.89), invariant=1)
canvas.setTitle('kailor and kailor insider - engineering brief')
canvas.setAuthor('Keeno Smith')
body = ParagraphStyle('body', fontName='Helvetica', fontSize=10.5, leading=16, textColor=HexColor('#323234'))
heading = ParagraphStyle('heading', fontName='Helvetica-Bold', fontSize=20, leading=25, textColor=HexColor('#29292b'))
small = ParagraphStyle('small', parent=body, fontSize=8.5, leading=12)

def paragraph(text, style, y):
    # Standard PDF fonts need straight punctuation for portable rendering.
    text = text.replace('’', "'").replace('–', '-').replace('—', '-')
    p = Paragraph(escape(text), style)
    _, height = p.wrap(491, 730)
    p.drawOn(canvas, 52, y-height)
    return y-height

for page, indices in enumerate([[0, 1], [2, 3], [4], [5, 6]], 1):
    canvas.setFillColor(HexColor('#faf9f6'))
    canvas.rect(0, 0, 596, 842, fill=1, stroke=0)
    canvas.setFillColor(HexColor('#29292b'))
    canvas.setFont('Helvetica-Bold', 11)
    canvas.drawString(52, 795, 'kailor / kailor insider')
    canvas.setFont('Helvetica', 8)
    canvas.drawRightString(543, 795, 'Engineering brief | 26 October 2026')
    y = 758
    for index in indices:
        section = story[index]
        y = paragraph(section['label'], small, y)-8
        y = paragraph(section['title'], heading, y)-14
        for text in section['paragraphs']:
            y = paragraph(text, body, y)-11
        y -= 12
    if page == 3:
        y = paragraph('Source repositories (authorised access may be required)', heading, y)-14
        for label, url in [('kailor', 'https://github.com/keenosmith-del/kailor'), ('kailor insider', 'https://github.com/keenosmith-del/kailor-insider')]:
            y = paragraph(f'{label}: {url}', small, y)-7
        y = paragraph('Evidence: local source review, 26 October 2026. kailor revision 3d6d459; kailor insider revision f5f3c2f. Architecture, article/auth/media/database services, canvas implementation and deployment reports inspected. Company suites were not rerun for this portfolio iteration.', body, y-10)
    if y < 65:
        raise RuntimeError(f'Page {page} exceeds its content area: {y}')
    canvas.setFont('Helvetica', 8)
    canvas.drawString(52, 38, 'Current narrative shared with the portfolio company case study')
    canvas.drawRightString(543, 38, f'{page} / 4')
    canvas.showPage()
canvas.save()
print(output)
