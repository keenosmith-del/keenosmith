"""Development-only audit receipt builder. Inputs are reviewed GitHub connector
snapshots plus optional read-only local checkouts; no runtime GitHub crawling.
Usage: python3 scripts/record-project-source-audit.py /tmp
"""
import hashlib
import json
from pathlib import Path
import subprocess
import sys

root = Path(sys.argv[1])
inventory = json.loads((root / 'portfolio-baseline-projects.json').read_text())
remote = {r['id']: r for r in json.loads((root / 'portfolio-remote-audit.json').read_text())}
trees = {r['id']: r for r in json.loads((root / 'portfolio-source-trees.json').read_text())}
for project_id in ['crewai-revenueops', 'eventops-streamlit', 'ms-assessflow']:
    inventory.append({'id': project_id, 'repositoryUrl': remote[project_id]['repository']})
locals_by_id = {
    'kailor-ai': '/Users/keenosmith/Programming/kailor',
    'kailor-insider': '/Users/keenosmith/Programming/kailor-insider',
    'crewai-revenueops': '/Users/keenosmith/Programming/Projects/crewai-revenueops',
    'ms-assessflow': '/Users/keenosmith/Programming/Projects/ms-assesflow',
    'eventops-streamlit': '/Users/keenosmith/Programming/Projects/inference-group/eventops-intelligence-streamlit',
}
local_refs = {
    'crewai-revenueops': ['README.md', 'docs/portfolio/engineering.md', 'backend/app/agents/crews/investigation.py', 'backend/app/flows/reconciliation.py', 'backend/app/reconciliation/engine.py', 'backend/app/accounting/money.py', 'backend/app/security/auth.py', '.github/workflows/verify.yml'],
    'ms-assessflow': ['README.md', 'docs/portfolio/engineering.md', 'backend/app/agents/assessment.py', 'backend/app/services/workflow.py', 'backend/app/security/auth.py', 'backend/app/integrations/microsoft/providers.py', '.github/workflows/verify.yml', 'infra/main.bicep'],
    'eventops-streamlit': ['README.md', 'docs/ARCHITECTURE.md', 'eventops/rag.py', 'eventops/service.py', 'eventops/gemini.py', 'eventops/store.py', 'eventops/pipeline.py', 'eventops/operations.py', 'eventops/providers.py', 'deploy/Caddyfile'],
    'kailor-ai': ['README.md', 'frontend/package.json', 'backend/package.json', 'docs/architecture/ARCHITECTURE.md', 'backend/src/ai.ts', 'backend/src/assessment.ts'],
    'kailor-insider': ['README.md', 'package.json', 'docs/ARCHITECTURE.md', 'backend/src/services/articles.ts', 'backend/src/services/auth.ts'],
}
records = []
for p in inventory:
    pid = p['id']; r = remote.get(pid, {}); tree = trees.get(pid, {}).get('tree', [])
    snapshot = root / f'portfolio-source-{pid}.json'
    reviewed = json.loads(snapshot.read_text())['files'] if snapshot.exists() else []
    sources = [{'path': 'README.md', 'kind': 'documentation', 'sha256': hashlib.sha256(r['readme'].encode()).hexdigest()}] if r.get('readme') else []
    sources += [{'path': f['path'], 'kind': 'configuration' if f['path'].endswith(('.json','.toml','.yml','.yaml','.txt')) else 'source-or-documentation', 'sha256': hashlib.sha256(f['content'].encode()).hexdigest()} for f in reviewed]
    extra_refs = {'vertex-ai-retail': ['apps/api/retail/services/forecasting.py'], 'distributed-reliability': ['docs/kubernetes.md'], 'eventops-streamlit': ['eventops/service.py']}
    for ref in extra_refs.get(pid, []):
        blob = next(item for item in tree if item['path'] == ref)
        sources.append({'path': ref, 'origin': 'supplementary pinned GitHub source review', 'blobSha': blob['sha']})
    local = locals_by_id.get(pid); local_sha = None
    if local:
        local_sha = subprocess.check_output(['git', 'rev-parse', 'HEAD'], cwd=local, text=True).strip()
        for ref in local_refs[pid]:
            f = Path(local) / ref
            if f.exists(): sources.append({'path': ref, 'origin': 'local checkout', 'sha256': hashlib.sha256(f.read_bytes()).hexdigest()})
    documentation_only = bool(tree) and not any(f['path'].endswith(('.py','.ts','.js','.go','.rs','.java','.cs')) for f in tree)
    records.append({'id': pid, 'repository': p.get('repositoryUrl'), 'remoteCommit': r.get('commit'), 'localCommit': local_sha, 'reviewedOn': '2026-10-26', 'sourceStatus': 'documentation-only; no runtime implementation verified' if documentation_only else 'source reviewed' if sources else 'unavailable; preserve prior evidence' if p.get('repositoryUrl') else 'historical placeholder; no repository supplied', 'sources': sources, 'companySuitesExecuted': False})
cv = [{'path': str(p), 'sha256': hashlib.sha256(p.read_bytes()).hexdigest()} for p in sorted(Path('public').glob('*CV-ATS*.pdf'))]
result = {'reviewedOn': '2026-10-26', 'method': 'Current GitHub HEAD, README, recursive tree and selected source/manifests/workflows; read-only local company/new-project checkouts. No project tests or cloud deployments executed.', 'projects': records, 'protectedCVs': cv}
Path('docs/evidence').mkdir(exist_ok=True)
Path('docs/evidence/project-refresh-2026-10-26.json').write_text(json.dumps(result, indent=2)+'\n')
print(f'{len(records)} inventory records; {sum(bool(r["sources"]) for r in records)} with current reviewed sources; {len(cv)} protected CV PDFs.')
