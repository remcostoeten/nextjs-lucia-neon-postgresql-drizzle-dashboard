'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from 'ui'
import { useState } from 'react'
import AudioRecorder from './audio-recorder'
import WebcamRecorder from './display-webcam'

export default function MediaRecorder() {
	const [activeTab, setActiveTab] = useState('webcam')

	return (
		<Tabs
			value={activeTab}
			onValueChange={setActiveTab}
			className="w-full max-w-3xl mx-auto"
		>
			<TabsList className="grid w-full grid-cols-2">
				<TabsTrigger value="webcam">Webcam</TabsTrigger>
				<TabsTrigger value="audio">Audio</TabsTrigger>
			</TabsList>
			<TabsContent value="webcam">
				<WebcamRecorder />
			</TabsContent>
			<TabsContent value="audio">
				<AudioRecorder />
			</TabsContent>
		</Tabs>
	)
}
