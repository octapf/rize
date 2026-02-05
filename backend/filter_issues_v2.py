import re
import sys

def filter_issues(file_path):
    regex = re.compile(r"'([^'\n\\]*?)'([a-zA-Z])")
    
    # Try different encodings
    try:
        with open(file_path, 'r', encoding='utf-16') as f:
            content_full = f.read()
    except UnicodeError:
        try:
             with open(file_path, 'r', encoding='utf-8') as f:
                content_full = f.read()
        except UnicodeError:
             with open(file_path, 'r', encoding='latin-1') as f:
                content_full = f.read()
    
    lines = content_full.splitlines()

    seen = set()

    for line in lines:
        if not line.startswith("MATCH:"):
            continue
        
        match_line_start = line.find('MATCH: ') + 7
        rest = line[match_line_start:]
        
        location_match = re.search(r':(\d+):', rest)
        if not location_match:
            continue
            
        line_no_start = location_match.start()
        line_no_end = location_match.end()
        line_no = location_match.group(1)
        
        filepath = rest[:line_no_start]
        content = rest[line_no_end:]
        
        # Check if line contains known valid patterns that confuse the regex?
        # Actually the regex is applied to the content.
        
        for m in regex.finditer(content):
            start_index = m.start()
            
            is_false_positive = False
            if start_index > 0:
                prev_char = content[start_index - 1]
                # If char before ' is letter/digit/_, it's likely closing a previous string
                if prev_char.isalnum() or prev_char == '_':
                    is_false_positive = True
            
            if not is_false_positive:
                group_content = m.group(1)
                # If content is purely symbols like " ? " or " : " or ", " it's a gap
                if re.match(r'^\s*[?:,|=&!{}.]+\s*$', group_content):
                    is_false_positive = True
                if group_content.strip() in ['?', ':', ',', '|', '===', '!==', '&&', '||', 'as', 'in', 'of']:
                     is_false_positive = True

            if not is_false_positive:
                unique_key = f"{filepath}:{line_no}"
                if unique_key not in seen:
                    print(f"{filepath}:{line_no} -> {content.strip()}")
                    seen.add(unique_key)
                    
filter_issues('../issues.txt')
