import argparse
import os
import re
import sys
import logging
from typing import List, Dict, Optional, Set, Tuple, Any
from pathlib import Path
import json
from datetime import datetime

class ModularizerError(Exception):
    """Base exception class for the modularizer"""
    pass

class ParseError(ModularizerError):
    """Raised when parsing fails"""
    pass

class TypeDefinitionError(ModularizerError):
    """Raised when there's an issue with type definitions"""
    pass

class TypeDefinition:
    def __init__(self, name: str, content: str, kind: str):
        self.name = name
        self.content = content
        self.kind = kind
        self.dependencies: Set[str] = set()
        self.source_location: Optional[Dict[str, int]] = None

    def to_dict(self) -> Dict[str, Any]:
        """Convert type definition to dictionary for logging/debugging"""
        return {
            'name': self.name,
            'kind': self.kind,
            'dependencies': list(self.dependencies),
            'source_location': self.source_location
        }

class TypeScriptModularizer:
    def __init__(self, 
                 input_file: str, 
                 output_dir: str, 
                 use_server: bool = True,
                 verbose: bool = False,
                 dry_run: bool = False):
        self.input_file = input_file
        self.output_dir = output_dir
        self.use_server = use_server
        self.verbose = verbose
        self.dry_run = dry_run
        self.logger = self._setup_logging()
        self.stats: Dict[str, Any] = {
            'start_time': datetime.now().isoformat(),
            'input_file': input_file,
            'output_dir': output_dir,
            'functions_processed': 0,
            'types_processed': 0,
            'warnings': [],
            'errors': []
        }

    def _setup_logging(self) -> logging.Logger:
        """Setup logging configuration"""
        logger = logging.getLogger('ts_modularizer')
        logger.setLevel(logging.DEBUG if self.verbose else logging.INFO)
        
        formatter = logging.Formatter('%(asctime)s - %(levelname)s - %(message)s')
        
        # Console handler
        ch = logging.StreamHandler()
        ch.setFormatter(formatter)
        logger.addHandler(ch)
        
        # File handler
        log_dir = Path(self.output_dir) / 'logs'
        log_dir.mkdir(parents=True, exist_ok=True)
        fh = logging.FileHandler(log_dir / 'modularizer.log')
        fh.setFormatter(formatter)
        logger.addHandler(fh)
        
        return logger

    def _validate_input_file(self) -> None:
        """Validate input file existence and format"""
        if not os.path.exists(self.input_file):
            raise FileNotFoundError(f"Input file not found: {self.input_file}")
        
        if not self.input_file.endswith('.ts'):
            raise ValueError("Input file must be a TypeScript file (.ts)")
        
        # Check if file is readable
        try:
            with open(self.input_file, 'r', encoding='utf-8') as f:
                f.read(1)
        except Exception as e:
            raise IOError(f"Unable to read input file: {str(e)}")

    def _extract_type_dependencies(self, content: str, all_type_names: Set[str]) -> Set[str]:
        """Extract type dependencies with improved pattern matching"""
        dependencies = set()
        content = ' ' + content  # Add leading space for better matching
        
        for type_name in all_type_names:
            patterns = [
                r'[^a-zA-Z](type|interface)\s+' + re.escape(type_name) + r'\b',
                r'[^a-zA-Z]' + re.escape(type_name) + r'[\s,>:)]',
                r'extends\s+' + re.escape(type_name) + r'[\s{]',
                r'implements\s+' + re.escape(type_name) + r'[\s{]',
                r':\s*' + re.escape(type_name) + r'[\s,)}]',
                r'<\s*' + re.escape(type_name) + r'\s*>',
            ]
            
            for pattern in patterns:
                if re.search(pattern, content):
                    dependencies.add(type_name)
                    break
        
        return dependencies

    def _parse_types_and_interfaces(self, content: str, file_path: str) -> List[TypeDefinition]:
        """Enhanced parsing of types and interfaces"""
        types = []
        lines = content.split('\n')
        
        patterns = {
            'type': r'type\s+(\w+)([^=]*?)=\s*({[^}]*}|[^;\n]*)',
            'interface': r'interface\s+(\w+)([^{]*){([^}]*)}',
            'enum': r'enum\s+(\w+)\s*{([^}]*)}',
            'class': r'class\s+(\w+)([^{]*){([^}]*)}'
        }
        
        for kind, pattern in patterns.items():
            for match in re.finditer(pattern, content, re.DOTALL):
                try:
                    name = match.group(1)
                    start_pos = match.start()
                    line_no = content[:start_pos].count('\n') + 1
                    
                    if kind == 'type':
                        full_content = "type {} {}= {}".format(
                            name, match.group(2), match.group(3))
                    elif kind == 'interface':
                        full_content = "interface {} {}{{{}}}"
                        full_content = full_content.format(
                            name, match.group(2), match.group(3))
                    elif kind == 'enum':
                        full_content = "enum {} {{{}}}".format(
                            name, match.group(2))
                    else:  # class
                        full_content = "class {}{}{{{}}}"
                        full_content = full_content.format(
                            name, match.group(2), match.group(3))
                    
                    type_def = TypeDefinition(name, full_content.strip(), kind)
                    type_def.source_location = {'line': line_no, 'file': file_path}
                    types.append(type_def)
                    
                except Exception as e:
                    self.logger.warning(f"Failed to parse {kind} at line {line_no}: {str(e)}")
                    self.stats['warnings'].append({
                        'type': f'parse_{kind}_failed',
                        'line': line_no,
                        'error': str(e)
                    })
        
        return types

    def _clean_type_content(self, content: str) -> str:
        """Clean and format type content"""
        content = re.sub(r'\n\s*\n', '\n\n', content)
        content = re.sub(r'{\s*', '{ ', content)
        content = re.sub(r'\s*}', ' }', content)
        return content.strip()

    def _generate_type_documentation(self, type_def: TypeDefinition) -> str:
        """Generate documentation for type definitions"""
        docs = [f"/**"]
        if type_def.kind == 'interface':
            docs.append(f" * Interface: {type_def.name}")
        else:
            docs.append(f" * Type: {type_def.name}")
        
        if type_def.dependencies:
            docs.append(" *")
            docs.append(" * Dependencies:")
            for dep in sorted(type_def.dependencies):
                docs.append(f" * - {dep}")
        
        docs.append(" */")
        return '\n'.join(docs)

    def _create_types_file(self, types: List[TypeDefinition]) -> None:
        """Create types.d.ts with improved organization and documentation"""
        if not types:
            return

        sorted_types = self._sort_types_by_dependencies(types)
        types_dir = Path(self.output_dir)
        types_dir.mkdir(parents=True, exist_ok=True)
        
        with open(types_dir / 'types.d.ts', 'w', encoding='utf-8') as f:
            f.write('// Generated by TypeScript Modularizer\n')
            f.write(f'// Generated on: {datetime.now().isoformat()}\n\n')
            
            grouped_types: Dict[str, List[TypeDefinition]] = {}
            for type_def in sorted_types:
                grouped_types.setdefault(type_def.kind, []).append(type_def)
            
            for kind, type_list in grouped_types.items():
                f.write(f'\n// {kind.capitalize()} Definitions\n')
                for type_def in type_list:
                    f.write('\n' + self._generate_type_documentation(type_def) + '\n')
                    f.write(self._clean_type_content(type_def.content) + '\n\n')
                    f.write(f'export type {type_def.name} = {type_def.name};\n')

    def _sort_types_by_dependencies(self, types: List[TypeDefinition]) -> List[TypeDefinition]:
        """Sort types based on dependencies with cycle detection"""
        sorted_types: List[TypeDefinition] = []
        visited = set()
        temp_visited = set()
        
        def visit(type_def: TypeDefinition, path: List[str] = None):
            if path is None:
                path = []
            
            if type_def.name in temp_visited:
                cycle = ' -> '.join(path + [type_def.name])
                raise TypeDefinitionError(f"Circular dependency detected: {cycle}")
            
            if type_def.name in visited:
                return
            
            temp_visited.add(type_def.name)
            current_path = path + [type_def.name]
            
            for dep_name in type_def.dependencies:
                dep = next((t for t in types if t.name == dep_name), None)
                if dep:
                    visit(dep, current_path)
            
            temp_visited.remove(type_def.name)
            visited.add(type_def.name)
            sorted_types.append(type_def)

        try:
            for type_def in types:
                if type_def.name not in visited:
                    visit(type_def)
        except TypeDefinitionError as e:
            self.logger.warning(f"Dependency cycle detected: {str(e)}")
            return types

        return sorted_types

    def _extract_functions(self, content: str) -> List[Dict[str, str]]:
        """Extract TypeScript functions from content"""
        functions = []
        # Pattern for function declarations including exports, async, and type annotations
        func_pattern = r'(?:export\s+)?(?:async\s+)?(?:function\s+)?(\w+)\s*(?:<[^>]*>)?\s*\([^)]*\)\s*(?::\s*[^{]*?)?\s*{([^}]+)}'
        
        # Pattern for imports
        import_pattern = r'^import.*?;?\s*$'
        
        # Get all imports
        imports = '\n'.join(re.findall(import_pattern, content, re.MULTILINE))
        
        for match in re.finditer(func_pattern, content, re.MULTILINE | re.DOTALL):
            try:
                name = match.group(1)
                body = match.group(2)
                
                # Get the full function definition
                start_pos = match.start()
                end_pos = match.end()
                full_content = content[start_pos:end_pos]
                
                # Extract JSDoc if present (looking backwards from function start)
                doc_string = ""
                before_function = content[:start_pos].rstrip()
                if before_function.endswith('*/'):
                    doc_start = before_function.rfind('/**')
                    if doc_start != -1:
                        doc_string = before_function[doc_start:]
                
                # Find type dependencies in the function
                type_dependencies = self._extract_type_dependencies(
                    full_content,
                    {t.name for t in self._parse_types_and_interfaces(content, self.input_file)}
                )
                
                functions.append({
                    'name': name,
                    'content': full_content,
                    'imports': imports,
                    'doc_string': doc_string,
                    'type_dependencies': type_dependencies
                })
                
            except Exception as e:
                self.logger.warning(f"Failed to extract function {name}: {str(e)}")
                self.stats['warnings'].append({
                    'type': 'function_extraction_failed',
                    'function': name,
                    'error': str(e)
                })
        
        return functions

    def _create_module_files(self, functions: List[Dict[str, str]]) -> None:
        """Create individual function files with improved organization"""
        if self.dry_run:
            self.logger.info("Dry run - would create the following files:")
            for func in functions:
                self.logger.info(f"- {func['name']}.ts")
            return

        os.makedirs(self.output_dir, exist_ok=True)
        index_exports = []

        for func in functions:
            file_name = self._to_kebab_case(func['name'])
            file_path = os.path.join(self.output_dir, f"{file_name}.ts")
            
            try:
                with open(file_path, 'w', encoding='utf-8') as f:
                    if self.use_server:
                        f.write("'use server'\n\n")
                    
                    if func['imports']:
                        f.write(func['imports'] + '\n\n')
                    
                    if func['type_dependencies']:
                        type_imports = sorted(list(func['type_dependencies']))
                        f.write(f"import type {{ {', '.join(type_imports)} }} from './types';\n\n")
                    
                    if func['doc_string']:
                        f.write(func['doc_string'] + '\n')
                    
                    f.write(func['content'] + '\n')

                index_exports.append(f"export * from './{file_name}'")
                self.stats['functions_processed'] += 1
                
            except Exception as e:
                self.logger.error(f"Failed to create file for function {func['name']}: {str(e)}")
                self.stats['errors'].append({
                    'type': 'file_creation_failed',
                    'function': func['name'],
                    'error': str(e)
                })

        if index_exports:
            with open(os.path.join(self.output_dir, 'index.ts'), 'w', encoding='utf-8') as f:
                f.write('// Generated by TypeScript Modularizer\n')
                f.write(f'// Generated on: {datetime.now().isoformat()}\n\n')
                f.write('\n'.join(sorted(index_exports)) + '\n')

    @staticmethod
    def _to_kebab_case(name: str) -> str:
        """Convert string to kebab case with improved handling"""
        if name.isupper():
            return name.lower()
        
        name = re.sub(r'([a-z0-9])([A-Z])', r'\1-\2', name)
        name = re.sub(r'([A-Z])([A-Z][a-z])', r'\1-\2', name)
        
        return re.sub(r'-+', '-', name.lower()).strip('-')

    def _save_stats(self) -> None:
        """Save processing statistics"""
        stats_dir = Path(self.output_dir) / 'logs'
        stats_dir.mkdir(parents=True, exist_ok=True)
        
        self.stats['end_time'] = datetime.now().isoformat()
        self.stats['duration'] = (
            datetime.fromisoformat(self.stats['end_time']) -
            datetime.fromisoformat(self.stats['start_time'])
        ).total_seconds()
        
        with open(stats_dir / 'stats.json', 'w') as f:
            json.dump(self.stats, f, indent=2)

    def process(self) -> None:
        """Main processing method"""
        try:
            self._validate_input_file()
            self.logger.info(f"Processing {self.input_file}")
            
            with open(self.input_file, 'r', encoding='utf-8') as file:
                content = file.read()

            # Process types and functions
            type_definitions = self._parse_types_and_interfaces(content, self.input_file)
            self.stats['types_processed'] = len(type_definitions)
            
            if type_definitions and not self.dry_run:
                self._create_types_file(type_definitions)
                self.logger.info(f"Created types.d.ts with {len(type_definitions)} definitions")
            
            # Extract and process functions
            functions = self._extract_functions(content)
            if functions and not self.dry_run:
                self._create_module_files(functions)
                self.logger.info(f"Created {len(functions)} function modules")
            
            self._save_stats()
            self.logger.info("Processing completed successfully")
            
        except Exception as e:
            self.logger.error(f"Error during processing: {str(e)}")
            self.stats['errors'].append({
                'type': 'processing_error',
                'error': str(e)
            })

def main():
    parser = argparse.ArgumentParser(description='TypeScript Modularizer - eSplit TypeScript files into modules')
    parser.add_argument('input_file', help='Input TypeScript file to process')
    parser.add_argument('output_dir', help='Output directory for modularized files')
    parser.add_argument('--no-server', action='store_false', dest='use_server',
                        help="Don't add 'use server' directive to files")
    parser.add_argument('--verbose', '-v', action='store_true',
                        help='Enable verbose logging')
    parser.add_argument('--dry-run', '-d', action='store_true',
                        help='Show what would be done without making changes')

    args = parser.parse_args()

    try:
        modularizer = TypeScriptModularizer(
            input_file=args.input_file,
            output_dir=args.output_dir,
            use_server=args.use_server,
            verbose=args.verbose,
            dry_run=args.dry_run
        )
        modularizer.process()
    except Exception as e:
        print(f"Error: {str(e)}", file=sys.stderr)
        sys.exit(1)

if __name__ == '__main__':
    main()
