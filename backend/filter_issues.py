import re
import sys

def filter_issues(file_path):
    regex = re.compile(r"'([^'\n\\]*?)'([a-zA-Z])")
    
    with open(file_path, 'r', encoding='utf-8') as f:
        for line in f:
            if not line.startswith("MATCH:"):
                continue
            
            parts = line.split(':', 3)
            if len(parts) < 4:
                continue
            
            # parts[0] is MATCH
            # parts[1] is filepath (drive letter + path?) 
            # Wait, path on windows has colon C:\...
            # The format is MATCH: C:\...\file.tsx:line:content
            # So split by colon might be tricky.
            # Better to find the first instance of .tsx: or similar.
            
            # Let's verify line format from read_file output
            # MATCH: C:\Users\Arigo\...\mobile\app\login.tsx:51:behavior=...
            
            # rfind the second colon from the left? No.
            # find ':line:' pattern?
            
            match_line_start = line.find('MATCH: ') + 7
            rest = line[match_line_start:]
            # rest is C:\Users\...\file.tsx:51:content
            
            # Last colon before content?
            # content usually doesn't start with digits.
            # searching for :digits:
            
            location_match = re.search(r':(\d+):', rest)
            if not location_match:
                continue
                
            line_no_start = location_match.start()
            line_no_end = location_match.end()
            line_no = getattr(location_match, 'group')(1)
            
            filepath = rest[:line_no_start]
            content = rest[line_no_end:]
            
            # Apply detection regex to content
            # We iterate matches.
            for m in regex.finditer(content):
                start_index = m.start()
                
                # Check preceding char
                is_false_positive = False
                if start_index > 0:
                    prev_char = content[start_index - 1]
                    if prev_char.isalnum() or prev_char == '_':
                        is_false_positive = True
                
                if not is_false_positive:
                    # Also filter out if content looks like just punctuation " ? " or ", "
                    group_content = m.group(1)
                    if group_content.strip() in ['?', ':', ',', '|', '===', '!==', '&&', '||']:
                         # strict symbols check
                         is_false_positive = True
                    
                    # Also check for " ? " with spaces
                    if re.match(r'^\s*[?:,|=&!]+\s*$', group_content):
                        is_false_positive = True

                if not is_false_positive:
                    print(f"{filepath}:{line_no} -> {content.strip()}")

filter_issues('../issues.txt')
