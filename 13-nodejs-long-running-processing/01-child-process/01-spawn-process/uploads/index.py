import sys
import json
from urllib import request

# ❯ python index.py '{"name": "Carlos"}'
# ❯ python index.py '{"filePath": "my-data.csv"}'
# ❯ python index.py '{"filePath": "my-data.csv", "url": "http://localhost:3000"}'

def main():
  item = json.loads(sys.argv[1])
  url = item.get('url')
  filePath = item.get('filePath')
  data = open(filePath, 'rb').read()

  req = request.Request(url, data)
  response = request.urlopen(req).read().decode('utf-8')
  print(response)

if __name__ == '__main__':
  main()