'use client'

import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from 'ui'
import AudioRecorder from './audio-recorder'
import WebcamRecorder from './display-webcam'

export default function MediaRecorder() {
	const [activeTab, setActiveTab] = useState('Audio')

	return (
		<Tabs
			value={activeTab}
			onValueChange={setActiveTab}
			className="w-full max-w-3xl mx-auto"
		>
			<TabsList className="grid w-full grid-cols-2">
				<TabsTrigger value="audio">Audio</TabsTrigger>
				<TabsTrigger value="webcam">Webcam</TabsTrigger>
			</TabsList>
			<TabsContent value="Audio">
				<WebcamRecorder />
			</TabsContent>
			<TabsContent value="Video">
				<AudioRecorder />
			</TabsContent>
		</Tabs>
	)
}
