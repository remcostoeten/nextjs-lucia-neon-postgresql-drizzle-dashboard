import { getUserAuth } from '@/core/server/auth/utils'
import { exec } from 'child_process'
import { NextRequest, NextResponse } from 'next/server'
import path from 'path'
import { promisify } from 'util'

const execAsync = promisify(exec)

function validateCSVFormat(csvContent: string): string | null {
    if (!csvContent.includes(',')) {
        return 'CSV must contain comma-separated values'
    }

    const lines = csvContent.trim().split('\n')
    if (lines.length < 2) {
        return 'CSV must contain at least a header row and one data row'
    }

    const headerColumns = lines[0].split(',').length
    if (headerColumns < 2) {
        return 'CSV must contain at least two columns (User ID and Username)'
    }

    for (let i = 1; i < lines.length; i++) {
        const columns = lines[i].split(',').length
        if (columns !== headerColumns) {
            return `Row ${i + 1} has ${columns} columns while header has ${headerColumns} columns`
        }
    }

    return null
}

export async function POST(req: NextRequest) {
    try {
        // Check authentication
        const { session } = await getUserAuth()
        if (!session) {
            return NextResponse.json(
                {
                    error: 'Authentication required',
                    details: 'Please log in to process CSV files'
                },
                { status: 401 }
            )
        }

        // Parse and validate request body
        const body = await req.json()
        const { input } = body

        if (!input || typeof input !== 'string') {
            return NextResponse.json(
                {
                    error: 'Invalid input',
                    details: 'Input must be a non-empty string containing CSV data'
                },
                { status: 400 }
            )
        }

        // Validate CSV format
        const validationError = validateCSVFormat(input)
        if (validationError) {
            return NextResponse.json(
                {
                    error: 'Invalid CSV format',
                    details: validationError
                },
                { status: 400 }
            )
        }

        // Get the path to the Python script
        const scriptPath = path.join(process.cwd(), 'core', 'scripts', 'process_csv.py')

        // Execute Python script with input piped directly
        const { stdout, stderr } = await execAsync(`python3 "${scriptPath}"`, {
            input: input,
            timeout: 30000 // 30 second timeout
        })

        if (stderr) {
            console.error('Python script error:', stderr)
            return NextResponse.json({
                error: 'Processing Error',
                details: stderr
            }, { status: 500 })
        }

        // Parse the JSON output from the Python script
        const result = JSON.parse(stdout)

        // Check if the Python script returned an error
        if (result.error) {
            return NextResponse.json({
                error: 'Processing Error',
                details: result.error
            }, { status: 500 })
        }

        // Return successful response
        return NextResponse.json(result)

    } catch (error) {
        console.error('Error processing CSV:', error)
        return NextResponse.json(
            {
                error: 'CSV Processing Error',
                details: error instanceof Error ? error.message : 'Unknown error occurred'
            },
            { status: 500 }
        )
    }
}
