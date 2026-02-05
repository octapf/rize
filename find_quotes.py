import os
import re

def find_issues():
    root_dir = 'mobile/app'
    # Pattern: Single quote, followed by non-quote/non-backslash chars, followed by single quote, followed by a letter.
    # This indicates a string that ended early at an apostrophe (e.g. 'It's)
    pattern = re.compile(r"'([^'\n\\]*?)'([a-zA-Z])")
    
    for dirpath, dirnames, filenames in os.walk(root_dir):
        for filename in filenames:
            if filename.endswith('.tsx'):
                filepath = os.path.join(dirpath, filename)
                try:
                    with open(filepath, 'r', encoding='utf-8') as f:
                        lines = f.readlines()
                        for i, line in enumerate(lines):
                            # Skip comments (naive)
                            if line.strip().startswith('//'): continue
                            
                            matches = pattern.finditer(line)
                            for match in matches:
                                # We found a potential match like 'World's
                                # We want to make sure the first quote wasn't just a quote inside a text node like <Text>... ' ...</Text>
                                # But in JSX text, quotes are not delimiters, so they don't pair up like this regex expects?
                                # Wait, in JSX text: <div>Foo's Bar</div>
                                # "Foo's Bar" contains "oo's". 
                                # Does it start with '? No.
                                # But " 'Foo's " -> regex finds "'Foo's".
                                # If the text contains "'Word's", it matches.
                                # However, in the examples we saw, the code was:
                                # description: '...',
                                # This IS code.
                                
                                # Let's print all matches and I will filter based on context in the output.
                                print(f"{filepath}:{i+1}:{line.strip()}")
                except Exception as e:
                    pass

if __name__ == '__main__':
    find_issues()
