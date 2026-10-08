from pathlib import Path
import json,urllib.request,datetime,hashlib
p=Path(__file__).resolve().parents[1]
def write(name,text):
 f=p/name;f.parent.mkdir(parents=True,exist_ok=True);f.write_text(text.strip()+'\n',encoding='utf8')
s=(p/'quality/apply-scope-repair.py').read_text(encoding='utf-8-sig')
exec(s[s.index('tracker=(p/'):])
