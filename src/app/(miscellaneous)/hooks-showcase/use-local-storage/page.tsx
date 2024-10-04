import { useLocalStorage } from 'hooks'
import { HooksShowcaseWrapper } from '../_components/hooks-showcase-wrapper'

const codeString = `
import { useLocalStorage } from '#/src/ui/cuicui/hooks/use-local-storage/use-local-storage'

function ExampleComponent() {
  const [value, setValue, removeValue] = useLocalStorage('example-key', 'initial value')

  return (
    <div>
      <p>Stored value: {value}</p>
      <button onClick={() => setValue('new value')}>Set new value</button>
      <button onClick={removeValue}>Remove value</button>
    </div>
  )
}
`

export default function UseLocalStorageShowcase() {
	const [value, setValue, removeValue] = useLocalStorage(
		'example-key',
		'initial value'
	)

	return (
		<HooksShowcaseWrapper
			title="useLocalStorage Hook"
			description="A hook for easily managing values in localStorage"
			codeString={codeString}
			fileName="use-local-storage-example.tsx"
			language="typescript"
			explanation="This hook provides a way to store and retrieve values from localStorage, with automatic serialization and deserialization of JSON data."
			actionButtons={[
				{
					label: 'Set New Value',
					onClick: () => setValue('new value ' + Date.now())
				},
				{ label: 'Remove Value', onClick: removeValue }
			]}
		>
			<div className="bg-[#252526] p-4 rounded-lg">
				<p className="mb-2">Current stored value: {value}</p>
				<div className="space-x-2">
					<Button
						variant="outline"
						onClick={() => setValue('new value ' + Date.now())}
					>
						Set New Value
					</Button>
					<Button variant="outline" onClick={removeValue}>
						Remove Value
					</Button>
				</div>
			</div>
		</HooksShowcaseWrapper>
	)
}
