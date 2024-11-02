import { CSSProperties } from 'react'

type CustomTheme = {
	[key: string]: CSSProperties
}

export const customTheme: CustomTheme = {
	'code[class*="language-"]': {
		color: '#f1f5f9',
		background: 'none',
		fontFamily:
			'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
		textAlign: 'left',
		whiteSpace: 'pre',
		wordSpacing: 'normal',
		wordBreak: 'normal',
		wordWrap: 'normal',
		lineHeight: '1.5',
		fontSize: '14px',
		tabSize: 2,
		hyphens: 'none'
	},
	'pre[class*="language-"]': {
		color: '#f1f5f9',
		background: 'none',
		fontFamily:
			'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
		textAlign: 'left',
		whiteSpace: 'pre',
		wordSpacing: 'normal',
		wordBreak: 'normal',
		wordWrap: 'normal',
		lineHeight: '1.5',
		fontSize: '14px',
		tabSize: 2,
		hyphens: 'none',
		padding: '1em',
		margin: '0.5em 0',
		overflow: 'auto'
	},
	comment: {
		color: '#636e7b',
		fontStyle: 'italic'
	},
	'block-comment': {
		color: '#636e7b',
		fontStyle: 'italic'
	},
	prolog: {
		color: '#636e7b'
	},
	doctype: {
		color: '#636e7b'
	},
	cdata: {
		color: '#636e7b'
	},
	punctuation: {
		color: '#94a3b8'
	},
	tag: {
		color: '#f472b6'
	},
	'attr-name': {
		color: '#f472b6'
	},
	namespace: {
		color: '#f472b6'
	},
	deleted: {
		color: '#ef4444'
	},
	'function-name': {
		color: '#60a5fa'
	},
	boolean: {
		color: '#c084fc'
	},
	number: {
		color: '#c084fc'
	},
	function: {
		color: '#60a5fa'
	},
	property: {
		color: '#f472b6'
	},
	'class-name': {
		color: '#93c5fd'
	},
	constant: {
		color: '#c084fc'
	},
	symbol: {
		color: '#f472b6'
	},
	selector: {
		color: '#a5b4fc'
	},
	important: {
		color: '#f472b6',
		fontWeight: 'bold'
	},
	atrule: {
		color: '#f472b6'
	},
	keyword: {
		color: '#f472b6'
	},
	builtin: {
		color: '#93c5fd'
	},
	string: {
		color: '#a5b4fc'
	},
	char: {
		color: '#a5b4fc'
	},
	'attr-value': {
		color: '#a5b4fc'
	},
	regex: {
		color: '#f472b6'
	},
	variable: {
		color: '#f1f5f9'
	},
	operator: {
		color: '#94a3b8'
	},
	entity: {
		color: '#f472b6',
		cursor: 'help'
	},
	url: {
		color: '#94a3b8'
	},
	bold: {
		fontWeight: 'bold'
	},
	italic: {
		fontStyle: 'italic'
	},
	inserted: {
		color: '#34d399'
	}
}
