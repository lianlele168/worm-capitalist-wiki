from pathlib import Path
import json
p=Path(__file__).resolve().parents[1]
for name in ['package.json','package-lock.json']:
 f=p/name;d=json.loads(f.read_text(encoding='utf-8-sig'))
 target=d if name=='package.json' else d['packages']['']
 target['engines']={**target.get('engines',{}),'node':'22.x'}
 f.write_text(json.dumps(d,indent=2)+'\n',encoding='utf8')
f=p/'vercel.json';d=json.loads(f.read_text());d['installCommand']='npm ci --no-audit --no-fund';f.write_text(json.dumps(d,indent=2)+'\n')
