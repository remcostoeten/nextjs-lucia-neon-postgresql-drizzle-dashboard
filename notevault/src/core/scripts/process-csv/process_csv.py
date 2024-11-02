# process_csv.py

import csv
import io
import sys
import json

def process_csv_content(csv_content):
    try:
        # Create a string IO object to handle the CSV data
        csv_file = io.StringIO(csv_content.strip())
        
        # Initialize CSV reader
        reader = csv.reader(
            csv_file,
            quotechar='"',
            delimiter=',',
            quoting=csv.QUOTE_ALL,
            skipinitialspace=True
        )
        
        # Skip the header row but save it
        try:
            header = next(reader)
        except StopIteration:
            return json.dumps({
                'error': 'Empty CSV content or invalid header'
            })
        
        # Process each row
        processed_lines = []
        original_count = 0
        
        # Add header to processed lines
        processed_lines.append("user_id,username")
        
        for row in reader:
            if row and len(row) >= 2:  # Ensure we have at least User ID and Username
                original_count += 1
                user_id = row[0].strip().strip('"')
                username = row[1].strip().strip('"')
                processed_line = f"{user_id},{username}"
                processed_lines.append(processed_line)
        
        # Prepare the output
        output = '\n'.join(processed_lines)
        
        # Create the response JSON
        result = {
            'output': output,
            'stats': {
                'total_processed': original_count,
                'valid_entries': len(processed_lines) - 1  # Subtract 1 for header
            }
        }
        
        return json.dumps(result)
        
    except csv.Error as e:
        return json.dumps({
            'error': f'CSV parsing error: {str(e)}'
        })
    except Exception as e:
        return json.dumps({
            'error': f'Unexpected error: {str(e)}'
        })

# Read input from stdin
if __name__ == "__main__":
    input_content = sys.stdin.read()
    result = process_csv_content(input_content)
    print(result)
