import argparse
import re
import sys
import os
import subprocess
from multiprocessing import Pool, cpu_count

def process_content(content):
    pattern = r"import\s*{([^}]+)}\s*from\s*'@/components/ui/[^']+'(\s*;?)(\n|$)"
    
    ui_imports = set()
    
    def collect_imports(match):
        import_statement = match.group(1)
        components = [comp.strip() for comp in import_statement.split(',') if comp.strip()]
        ui_imports.update(components)
        return ''  # Remove the original import

    new_content = re.sub(pattern, collect_imports, content, flags=re.MULTILINE)

    imports_changed = bool(ui_imports)

    if imports_changed:
        sorted_imports = sorted(ui_imports, key=str.lower)
        consolidated_import = f"import {{ {', '.join(sorted_imports)} }} from 'ui'\n"
        
        import_insert_pos = new_content.find("import")
        if import_insert_pos == -1:
            import_insert_pos = 0
        
        new_content = (new_content[:import_insert_pos] + consolidated_import +
                       new_content[import_insert_pos:])

    return new_content, imports_changed

def run_prettier(file_path):
    try:
        subprocess.run(['npx', 'prettier', '--write', file_path], check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    except subprocess.CalledProcessError:
        print(f"Warning: Prettier failed to format {file_path}")

def process_file(file_path):
    with open(file_path, 'r') as file:
        content = file.read()

    new_content, imports_changed = process_content(content)

    if new_content != content:
        with open(file_path, 'w') as file:
            file.write(new_content)
        if imports_changed:
            run_prettier(file_path)
            return file_path
    return None

def find_project_root():
    current_dir = os.getcwd()
    while current_dir != '/':
        if os.path.exists(os.path.join(current_dir, 'package.json')):
            return current_dir
        current_dir = os.path.dirname(current_dir)
    raise Exception("Could not find project root (directory containing 'package.json')")

def get_tsx_files(directory):
    tsx_files = []
    for root, _, files in os.walk(directory):
        if 'ui' in os.path.basename(root):
            continue
        tsx_files.extend([os.path.join(root, file) for file in files if file.endswith('.tsx') and file != 'index.ts'])
    return tsx_files

def main():
    parser = argparse.ArgumentParser(description="Consolidate UI imports in TypeScript files.")
    parser.add_argument("--file", help="Path to a single TypeScript file")
    parser.add_argument("--all", action="store_true", help="Process all .tsx files in src/components and src/app directories")
    parser.add_argument("--folder", help="Path to a folder to process recursively")
    args = parser.parse_args()

    try:
        project_root = find_project_root()
        os.chdir(project_root)  # Change to project root to run npm commands
        
        if args.all:
            all_files = []
            for directory in ['src/components', 'src/app']:
                full_path = os.path.join(project_root, directory)
                if os.path.exists(full_path):
                    all_files.extend(get_tsx_files(full_path))
                else:
                    print(f"Warning: {full_path} directory not found")
        elif args.folder:
            full_path = os.path.join(project_root, args.folder)
            if os.path.exists(full_path):
                all_files = get_tsx_files(full_path)
            else:
                print(f"Error: Folder {full_path} not found")
                sys.exit(1)
        elif args.file:
            all_files = [os.path.join(project_root, args.file)]
        else:
            print("Error: Either --file, --folder, or --all must be specified")
            sys.exit(1)

        with Pool(processes=cpu_count()) as pool:
            results = pool.map(process_file, all_files)
        
        updated_files = [f for f in results if f]
        for file in updated_files:
            print(f"Updated: {file}")
        print(f"Total files updated: {len(updated_files)}")

    except Exception as e:
        print(f"An error occurred: {e}", file=sys.stderr)
        sys.exit(1)

if __name__ == "__main__":
    main()
