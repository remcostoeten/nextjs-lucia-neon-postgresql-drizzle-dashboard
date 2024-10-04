import os
import re
import argparse
from typing import List, Set

def combine_ui_imports(file_path: str) -> None:
    with open(file_path, 'r') as file:
        content = file.read()

    # Regular expression to match UI component imports
    pattern = r"import\s+(\w+)\s+from\s+'ui/\w+'"
    
    # Find all UI component imports
    matches = re.findall(pattern, content)
    
    if not matches:
        print(f"No UI component imports found in {file_path}")
        return

    # Create the combined import statement
    combined_import = f"import {{ {', '.join(matches)} }} from 'ui'"
    
    # Replace individual imports with the combined import
    new_content = re.sub(pattern, '', content)
    new_content = combined_import + '\n' + new_content.lstrip()

    # Write the modified content back to the file
    with open(file_path, 'w') as file:
        file.write(new_content)

    print(f"Combined UI imports in {file_path}")

def process_directory(directory: str) -> None:
    for root, _, files in os.walk(directory):
        for file in files:
            if file.endswith('.tsx'):
                file_path = os.path.join(root, file)
                combine_ui_imports(file_path)

def main():
    parser = argparse.ArgumentParser(description="Combine UI component imports in TypeScript files.")
    parser.add_argument("--file", help="Path to a single file to process")
    args = parser.parse_args()

    if args.file:
        if args.file.endswith('.tsx'):
            combine_ui_imports(args.file)
        else:
            print("Error: The specified file must have a .tsx extension.")
    else:
        process_directory('src/app')
        process_directory('src/components')

if __name__ == "__main__":
    main()
