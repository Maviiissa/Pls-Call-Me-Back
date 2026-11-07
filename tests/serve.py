from http.server import SimpleHTTPRequestHandler,ThreadingHTTPServer
from pathlib import Path
import re
class Handler(SimpleHTTPRequestHandler):
 def __init__(self,*args,**kwargs):super().__init__(*args,directory=str(Path(__file__).resolve().parents[1]),**kwargs)
 def end_headers(self):self.send_header('Accept-Ranges','bytes');super().end_headers()
 def do_GET(self):
  p=Path(self.translate_path(self.path));r=self.headers.get('Range','')
  if not r or not p.is_file():return super().do_GET()
  m=re.fullmatch(r'bytes=(\d+)-(\d*)',r)
  if not m:return super().do_GET()
  size=p.stat().st_size;start=int(m[1]);end=min(int(m[2]) if m[2] else size-1,size-1)
  if start>=size:self.send_error(416);return
  self.send_response(206);self.send_header('Content-Type',self.guess_type(str(p)));self.send_header('Content-Range',f'bytes {start}-{end}/{size}');self.send_header('Content-Length',str(end-start+1));self.end_headers()
  with p.open('rb') as f:
   f.seek(start);self.wfile.write(f.read(end-start+1))
 def log_message(self,*args):pass
ThreadingHTTPServer(('127.0.0.1',8000),Handler).serve_forever()
