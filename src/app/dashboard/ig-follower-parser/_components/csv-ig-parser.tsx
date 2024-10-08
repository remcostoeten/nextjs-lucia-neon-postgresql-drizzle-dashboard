"use client"

import confetti from 'canvas-confetti';
import { ChevronDown, ChevronUp, Clipboard, ClipboardCheck, Copy, FileText, Play, Save, Trash2, User, Users } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { Button, Card, Label, RadioGroup, RadioGroupItem, ScrollArea, Textarea } from 'ui';

type Statistics = {
    processed: number;
    ignored: number;
    failed: string[];
};

export default function CsvModifier() {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [mode, setMode] = useState('both');
    const [isLoading, setIsLoading] = useState(false);
    const [statistics, setStatistics] = useState<Statistics>({ processed: 0, ignored: 0, failed: [] });
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isPasted, setIsPasted] = useState(false);
    const [isCopied, setIsCopied] = useState(false);

    useEffect(() => {
        console.log('Current input:', input);
        console.log('Input length:', input.length);
        console.log('Number of lines:', input.split('\n').length);
    }, [input]);

    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newInput = e.target.value;
        setInput(newInput);
        setIsPasted(false);
    };

    const handlePaste = async () => {
        try {
            const text = await navigator.clipboard.readText();
            setInput(text);
            setIsPasted(true);
        } catch (err) {
            console.error('Failed to read clipboard contents: ', err);
        }
    };

    const handleClear = () => {
        setInput('');
        setOutput('');
        setStatistics({ processed: 0, ignored: 0, failed: [] });
        setIsPasted(false);
    };

    const handleSubmit = () => {
        setIsLoading(true);
        setTimeout(() => {
            const lines = input.trim().split('\n');
            let processed = 0;
            let ignored = 0;
            let failed: string[] = [];
            const processedLines: string[] = [];

            for (let i = 0; i < lines.length; i++) {
                const line = lines[i].trim();
                const match = line.match(/^"?(\d+)"?,\s*"?([^",]+)"?/);
                if (match) {
                    const [, id, username] = match;
                    processed++;
                    let processedLine = '';
                    if (mode === 'id') processedLine = id.trim();
                    else if (mode === 'username') processedLine = username.trim();
                    else processedLine = `${id.trim()},${username.trim()}`;
                    processedLines.push(processedLine);
                } else {
                    ignored++;
                    failed.push(`Line ${i + 1}: Invalid format`);
                }
            }

            setOutput(processedLines.join('\n'));
            setStatistics({ processed, ignored, failed });
            setIsLoading(false);
            setIsCollapsed(false);
            confetti();
        }, 100);
    };

    const handleCopyOutput = () => {
        navigator.clipboard.writeText(output).then(() => {
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000);
        });
    };

    const handleSaveList = () => {
        const blob = new Blob([output], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'processed_list.csv';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    return (
        <div className="space-y-4 p-4 bg-[#1e1e1e] text-white min-h-screen">
            <Card className="p-6 bg-[#252526] border-[#3e3e42]">
                <h2 className="text-2xl font-bold mb-4">CSV Modifier</h2>
                <Textarea
                    placeholder="Paste your CSV content here..."
                    value={input}
                    onChange={handleInputChange}
                    className="mb-2 bg-[#1e1e1e] text-white border-[#3e3e42]"
                    rows={10}
                />
                <div className="flex justify-between items-center mb-2 text-sm">
                    <span>{input.length} characters</span>
                    <span>{input.split('\n').filter(line => line.trim() !== '').length} lines</span>
                </div>
                <div className="flex space-x-2 mb-4">
                    <Button onClick={handlePaste} variant="outline" className="bg-[#3e3e42] text-white border-[#3e3e42]">
                        {isPasted ? <ClipboardCheck className="w-4 h-4 mr-2" /> : <Clipboard className="w-4 h-4 mr-2" />}
                        {isPasted ? 'Pasted' : 'Paste'}
                    </Button>
                    <Button onClick={handleClear} variant="outline" className="bg-[#3e3e42] text-white border-[#3e3e42]" disabled={input.trim() === ''}>
                        <Trash2 className="w-4 h-4 mr-2" />
                        Clear
                    </Button>
                    <Button onClick={handleSubmit} className="bg-[#0e639c] text-white" disabled={input.trim() === '' || isLoading}>
                        <Play className="w-4 h-4 mr-2" />
                        {isLoading ? 'Processing...' : 'Submit'}
                    </Button>
                </div>
                <RadioGroup
                    defaultValue="both"
                    className="flex space-x-4"
                    onValueChange={(value) => setMode(value as 'id' | 'username' | 'both')}
                >
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="id" id="id" className="border-[#3e3e42] text-white" />
                        <Label htmlFor="id" className="flex items-center">
                            <FileText className="w-4 h-4 mr-2" />
                            Profile ID only
                        </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="username" id="username" className="border-[#3e3e42] text-white" />
                        <Label htmlFor="username" className="flex items-center">
                            <User className="w-4 h-4 mr-2" />
                            Username only
                        </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="both" id="both" className="border-[#3e3e42] text-white" />
                        <Label htmlFor="both" className="flex items-center">
                            <Users className="w-4 h-4 mr-2" />
                            Both
                        </Label>
                    </div>
                </RadioGroup>
            </Card>

            <Card className="p-6 bg-[#252526] border-[#3e3e42]">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold">Output</h2>
                    <div className="space-x-2">
                        <Button onClick={handleCopyOutput} className="bg-[#3e3e42] text-white">
                            {isCopied ? <ClipboardCheck className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
                            {isCopied ? 'Copied!' : 'Copy'}
                        </Button>
                        <Button onClick={handleSaveList} className="bg-[#0e639c] text-white">
                            <Save className="w-4 h-4 mr-2" />
                            Save List
                        </Button>
                        <Button onClick={() => setIsCollapsed(!isCollapsed)} className="bg-[#3e3e42] text-white">
                            {isCollapsed ? <ChevronDown className="w-4 h-4 mr-2" /> : <ChevronUp className="w-4 h-4 mr-2" />}
                            {isCollapsed ? 'Expand' : 'Collapse'}
                        </Button>
                    </div>
                </div>
                <ScrollArea className={`max-h-[50vh] ${isCollapsed ? 'hidden' : ''}`}>
                    <pre className="text-sm bg-[#1e1e1e] p-4 rounded-md overflow-x-auto">
                        <code className="text-white">
                            {output || 'No output yet. Process some data to see results.'}
                        </code>
                    </pre>
                </ScrollArea>
                <div className="mt-4">
                    <h3 className="text-lg font-semibold">Statistics</h3>
                    <p>Processed: {statistics.processed}</p>
                    <p>Ignored: {statistics.ignored}</p>
                    {statistics.failed.length > 0 && (
                        <div>
                            <p>Failed lines:</p>
                            <ul className="list-disc list-inside">
                                {statistics.failed.map((failure, index) => (
                                    <li key={index}>{failure}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </Card>
        </div>
    );
}

