"""Read-only reconciliation; never regenerates or modifies downloadable CVs."""
from pathlib import Path
import hashlib
import json
import re
from pypdf import PdfReader

normal = lambda text: re.sub(r'\s+', ' ', text).strip()
common = json.loads(Path('src/components/pages/CV/data/common.json').read_text())
results=[]
for variant in ['ai','full-stack','cloud']:
    source=Path(f'src/components/pages/CV/data/{variant}.json')
    data=json.loads(source.read_text())
    pdf=Path('public')/data['pdf'].lstrip('/')
    if not pdf.exists(): pdf=Path('public')/Path(data['pdf']).name
    digest=hashlib.sha256(pdf.read_bytes()).hexdigest()
    text=normal(' '.join(page.extract_text() or '' for page in PdfReader(pdf).pages))
    checks=[data['headline'],data['emphasis'],*data['summary']]
    checks += [f"{item['label']}: {item['text']}" for item in data['skills']]
    for experience in data['experience']:
        checks += [experience['title'],experience['employer'],experience['dates'],*experience.get('paragraphs',[]),*experience.get('bullets',[])]
    checks += [f"{item['label']}: {item['text']}" for item in common['education']+common['credentials']]
    missing=[value for value in checks if normal(value) not in text]
    # PDF line wrapping may separate a hyphenated word across a line.
    missing=[value for value in missing if normal(value).replace('-','') not in text.replace('- ','').replace('-','')]
    assert digest==data['sourceSha256'],variant+' source PDF hash differs'
    assert not missing,(variant,missing)
    results.append({'variant':variant,'pdf':str(pdf),'structured':str(source),'sha256':digest,'checks':len(checks),'result':'matched; no PDF or structured CV modified'})
Path('docs/evidence/cv-reconciliation-2026-10-26.json').write_text(json.dumps(results,indent=2)+'\n')
print('All three authoritative CV PDFs match structured headlines, skills, role dates/responsibilities, education and credentials; no documents changed.')
