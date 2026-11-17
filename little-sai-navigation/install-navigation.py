#!/usr/bin/env python3
"""Install Little Sai's shared navigation into an existing static site.
Run from the Little Sai Village repository root after copying css/ and js/ files.
Safe to run again: existing script tags are not duplicated.
"""
from pathlib import Path
import re

repo=Path.cwd()
script=repo/'js'/'navigation.js'
css=repo/'css'/'navigation.css'
if not script.exists() or not css.exists():
    raise SystemExit('Copy js/navigation.js and css/navigation.css to the repository first.')
count=0
for path in sorted(repo.glob('*.html')):
    html=path.read_text(encoding='utf-8')
    if 'js/navigation.js' in html: continue
    tag='<script src="js/navigation.js" data-root="./"></script>'
    updated,n=re.subn(r'</body\s*>',tag+'\n</body>',html,count=1,flags=re.I)
    if not n:
        print('Skipped (no </body>):',path.name)
        continue
    path.write_text(updated,encoding='utf-8')
    print('Updated:',path.name)
    count+=1
print(f'Installed navigation on {count} root-level pages.')
print('Nested Baby Tracker can stay as it is; the main Village nav has a link to it.')
