import os
import re

def find_issues():
    # Only checking specific folders where I suspect issues or haven't seen output
    target_dirs = [
        r'C:\Users\Arigo\OneDrive\Escritorio\web-dev\rize\mobile\app\technique',
        r'C:\Users\Arigo\OneDrive\Escritorio\web-dev\rize\mobile\app\tutorials', 
    ]
    
    # Also check a few others just in case
    # root_dir = r'C:\Users\Arigo\OneDrive\Escritorio\web-dev\rize\mobile\app' 
    
    pattern = re.compile(r"'([^'\n\\]*?)'([a-zA-Z])")
    
    for root_dir in target_dirs:
        if not os.path.exists(root_dir):
            print(f"Directory not found: {root_dir}")
            continue
            
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
