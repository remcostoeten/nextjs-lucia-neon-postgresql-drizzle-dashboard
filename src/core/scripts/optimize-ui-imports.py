import argparse
import re
import sys

def process_file(file_path):
    with open(file_path, 'r') as file:
        content = file.read()

    # Regular expression to match imports from '@/components/ui/*'
    pattern = r"import\s*{([^}]+)}\s*from\s*'@/components/ui/[^']+'"
    
    ui_imports = []
    
    def replace_import(match):
        components = [comp.strip() for comp in match.group(1).split(',')]
        ui_imports.extend(components)
        return ''  # Remove the original import

    # Remove all matching imports and collect components
    new_content = re.sub(pattern, replace_import, content)

    # If we found UI imports, add the consolidated import
    if ui_imports:
        consolidated_import = f"import {{ {', '.join(ui_imports)} }} from 'ui'\n"
        # Find the last import statement
        last_import_index = new_content.rfind('import')
        if last_import_index != -1:
            last_import_end = new_content.find('\n', last_import_index) + 1
            new_content = new_content[:last_import_end] + consolidated_import + new_content[last_import_end:]
        else:
            new_content = consolidated_import + new_content

    return new_content

def main():
    parser = argparse.ArgumentParser(description="Consolidate UI imports in TypeScript files.")
    parser.add_argument("--file", required=True, help="Path to the TypeScript file")
    args = parser.parse_args()

    try:
        new_content = process_file(args.file)
        
        # Write the changes back to the file
        with open(args.file, 'w') as file:
            file.write(new_content)
        
        print(f"Successfully updated {args.file}")
    except Exception as e:
        print(f"An error occurred: {e}", file=sys.stderr)
        sys.exit(1)

if __name__ == "__main__":
    main()
