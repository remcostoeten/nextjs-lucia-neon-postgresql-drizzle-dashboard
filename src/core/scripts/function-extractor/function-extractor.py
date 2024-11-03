#!/usr/bin/env python3

import argparse
import os
import re
from typing import List, Dict
import ast
from pathlib import Path

class TypeScriptFunction:
    def __init__(self, name: str, content: str, imports: List[str], types: List[str]):
        self.name = name
        self.content = content
        self.imports = imports
        self.types = types

def parse_arguments():
    parser = argparse.ArgumentParser(
        description='Extract functions from a TypeScript file into separate files',
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog='''
Examples:
  python extract-fnc.py -f path/to/file.tsx -d output/path -n functions
  python extract-fnc.py --file path/to/file.tsx --dest output/path --dirname functions
        '''
    )
    parser.add_argument(
        '-f', '--file',
        required=True,
        help='Path to the TypeScript/TSX file to process'
    )
    parser.add_argument(
        '-d', '--dest',
        required=True,
        help='Destination directory for the output files'
    )
    parser.add_argument(
        '-n', '--dirname',
        required=True,
        help='Name of the directory to create for the extracted functions'
    )
    return parser.parse_args()

def to_kebab_case(name: str) -> str:
    # Convert camelCase or PascalCase to kebab-case
    s1 = re.sub('(.)([A-Z][a-z]+)', r'\1-\2', name)
    return re.sub('([a-z0-9])([A-Z])', r'\1-\2', s1).lower()

def extract_imports(content: str) -> List[str]:
    import_lines = []
    for line in content.split('\n'):
        if line.strip().startswith('import '):
            import_lines.append(line.strip())
    return import_lines

def extract_types(content: str) -> List[str]:
    type_lines = []
    type_pattern = r'type\s+\w+\s*=\s*{[^}]+}'
    types = re.finditer(type_pattern, content, re.MULTILINE | re.DOTALL)
    for type_match in types:
        type_lines.append(type_match.group(0))
    return type_lines

def extract_functions(content: str) -> List[TypeScriptFunction]:
    functions = []
    
    # Pattern to match export functions with their content
    function_pattern = r'(?:\/\*\*(?:[^*]|\*(?!\/))*\*\/\s*)?export\s+(?:async\s+)?function\s+(\w+)[^{]*{([^}]+)}|export\s+const\s+(\w+)\s*=\s*(?:async\s+)?(?:function\s*)?[^{]*{([^}]+)}'
    
    matches = re.finditer(function_pattern, content, re.MULTILINE | re.DOTALL)
    
    for match in matches:
        # Get function name and content
        fn_name = match.group(1) or match.group(3)
        fn_content = match.group(0)
        
        # Extract imports and types needed for this function
        imports = extract_imports(content)
        types = extract_types(content)
        
        functions.append(TypeScriptFunction(fn_name, fn_content, imports, types))
    
    return functions

def create_function_file(function: TypeScriptFunction, output_dir: Path) -> str:
    filename = f"{to_kebab_case(function.name)}.ts"
    filepath = output_dir / filename
    
    content = "'use server'\n\n"  # Add 'use server' directive
    
    # Add imports
    content += "\n".join(function.imports) + "\n\n"
    
    # Add types
    if function.types:
        content += "\n".join(function.types) + "\n\n"
    
    # Add function content
    content += function.content + "\n"
    
    with open(filepath, 'w') as f:
        f.write(content)
    
    return filename

def create_index_file(filenames: List[str], output_dir: Path):
    content = ""
    for filename in filenames:
        basename = os.path.splitext(filename)[0]
        content += f"export * from './{basename}'\n"
    
    with open(output_dir / 'index.ts', 'w') as f:
        f.write(content)

def main():
    args = parse_arguments()
    
    # Create output directory
    output_dir = Path(args.dest) / args.dirname
    output_dir.mkdir(parents=True, exist_ok=True)
    
    print(f"Processing file: {args.file}")
    print(f"Output directory: {output_dir}")
    
    # Read input file
    with open(args.file, 'r') as f:
        content = f.read()
    
    # Extract functions
    functions = extract_functions(content)
    
    # Create individual files for each function
    created_files = []
    for function in functions:
        filename = create_function_file(function, output_dir)
        created_files.append(filename)
        print(f"Created file: {filename}")
    
    # Create index.ts
    create_index_file(created_files, output_dir)
    print("Created index.ts")
    
    print("\nSummary:")
    print(f"Total functions extracted: {len(functions)}")
    print(f"Files created: {len(created_files) + 1}")  # +1 for index.ts

if __name__ == "__main__":
    main()