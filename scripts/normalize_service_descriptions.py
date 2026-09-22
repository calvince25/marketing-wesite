from pathlib import Path
import re

path = Path(__file__).resolve().parents[1] / 'src' / 'lib' / 'services.ts'
lines = path.read_text().splitlines()
current_title = None
changed = 0
for i, line in enumerate(lines):
    title_match = re.search(r'\btitle:\s*"([^"]+)"', line)
    if title_match:
        current_title = title_match.group(1)
    if current_title and 'description: "Professional ' in line:
        indent = line[:len(line) - len(line.lstrip())]
        lines[i] = f'{indent}description: "{current_title} for Kenyan businesses, with practical strategy and implementation support.",' 
        changed += 1

path.write_text('\n'.join(lines) + '\n')
print(f'Updated {changed} generic service descriptions in {path}')
