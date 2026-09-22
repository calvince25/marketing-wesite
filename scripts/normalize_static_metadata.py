from pathlib import Path
import re

ROOT = Path(__file__).resolve().parents[1]
APP = ROOT / 'src' / 'app'

for path in sorted(APP.rglob('page.tsx')):
    relative = path.relative_to(APP)
    if any(part.startswith('[') for part in relative.parts) or 'admin' in relative.parts:
        continue
    text = path.read_text()
    if 'export const metadata' not in text or 'alternates:' in text:
        continue

    route = '/' + str(relative.parent).replace('\\', '/')
    if route == '/.':
        route = '/'

    # Next's root layout already appends the brand template. Keep titles readable.
    text = text.replace(" | GrowthLab Limited'", "'")
    text = text.replace(' | GrowthLab Limited"', '"')

    pattern = r"(description:\s*(['\"`].*?['\"`]),?\n)"
    match = re.search(pattern, text)
    if not match:
        continue
    insertion = match.group(1) + f"  alternates: {{ canonical: '{route}' }},\n"
    text = text[:match.start()] + insertion + text[match.end():]
    path.write_text(text)
    print(path)
