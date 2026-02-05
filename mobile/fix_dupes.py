import re
import os

file_path = 'app/_layout.tsx'

if not os.path.exists(file_path):
    print(f"Error: {file_path} not found in {os.getcwd()}")
    exit(1)

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Find the start and end of the Stack component
# We look for the OPENING tag of the Stack component
start_marker = '<Stack screenOptions={{ headerShown: false }}>'
end_marker = '</Stack>'

start_idx = content.find(start_marker)
if start_idx == -1:
    print("Could not find start marker")
    exit(1)

# Find the closing tag of the Stack component. 
# We search from end to ensure we get the last one if nested? 
# Actually, let's search format start_idx.
end_idx = content.find(end_marker, start_idx)
if end_idx == -1:
    print("Could not find end marker")
    exit(1)

print(f"Found block from {start_idx} to {end_idx}")

pre_block = content[:start_idx + len(start_marker)]
block_content = content[start_idx + len(start_marker):end_idx]
post_block = content[end_idx:]

lines = block_content.split('\n')
unique_lines = []
seen_names = set()
duplicates_count = 0

for line in lines:
    stripped_line = line.strip()
    if not stripped_line:
        unique_lines.append(line)
        continue
        
    # Check if it's a Stack.Screen
    if '<Stack.Screen' in stripped_line:
        # Extract name
        match = re.search(r'name="([^"]+)"', stripped_line)
        if match:
            name = match.group(1)
            if name in seen_names:
                duplicates_count += 1
                # print(f"Removing duplicate: {name}")
                continue
            seen_names.add(name)
            unique_lines.append(line)
        else:
            # Stack.Screen without name? Keep it.
            unique_lines.append(line)
    else:
        # Keep comments and other stuff
        unique_lines.append(line)

print(f"Found {duplicates_count} duplicates.")

new_content = pre_block + '\n'.join(unique_lines) + post_block

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(new_content)

print("File updated.")
