#!/usr/bin/env python3
import json
from pathlib import Path
root = Path(__file__).resolve().parents[2]
index = root / 'index.html'
source = index.read_text(encoding='utf-8')
if 'id="line-secretary"' in source:
    print('Secretary LINE chat already installed')
    raise SystemExit(0)
operations = json.loads((Path(__file__).parent / 'secretary_line_patch.json').read_text(encoding='utf-8'))
for number, (old, new) in enumerate(operations, 1):
    count = source.count(old)
    if count < 1:
        raise RuntimeError(f'Patch {number}: expected at least one occurrence, found {count}: {old[:70]!r}')
    source = source.replace(old, new, 1)
assert 'SECRETARY_HISTORY' in source and 'assets/secretary-evidence.jpg' in source
index.write_text(source, encoding='utf-8')
print(f'Updated LINE chat with {len(operations)} replacements')
