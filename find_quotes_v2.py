import os
import re

def find_issues():
    root_dir = r'C:\Users\Arigo\OneDrive\Escritorio\web-dev\rize\mobile\app'
    pattern = re.compile(r"'([^'\n\\]*?)'([a-zA-Z])")
    
    # print(f"Scanning {root_dir}")

    for dirpath, dirnames, filenames in os.walk(root_dir):
        for filename in filenames:
            if filename.endswith('.tsx'):
                filepath = os.path.join(dirpath, filename)
                try:
                    with open(filepath, 'r', encoding='utf-8') as f:
                        lines = f.readlines()
                        for i, line in enumerate(lines):
                            if line.strip().startswith('//'): continue
                            
                            matches = pattern.finditer(line)
                            for match in matches:
                                print(f"MATCH: {filepath}:{i+1}:{line.strip()}")
                except Exception as e:
                    print(e)

if __name__ == '__main__':
    find_issues()
