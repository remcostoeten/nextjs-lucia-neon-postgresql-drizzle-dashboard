import CurrentTime from '@/components/dashboard/features/intro/current-time'
import EmptyStateMessage from '@/components/effects/empty-state-loader'
import { validateRequest } from '@/core/server/auth/lucia'
import { getCity } from 'actions'
import { db, userProfiles } from 'db'
import { eq } from 'drizzle-orm'

const WEATHER_API_KEY = '34fbe462685d4f289e8134528231509'

async function getWeather(city: any) {
	const response = await fetch(
		`https://api.weatherapi.com/v1/current.json?key=${WEATHER_API_KEY}&q=${city}&aqi=no`
	)
	if (!response.ok) {
		throw new Error('Failed to fetch weather data')
	}
	return response.json()
}

function getGreeting(hour: number): string {
	if (hour >= 0 && hour < 5) return 'Good night'
	if (hour >= 5 && hour < 7) return 'Rise and shine'
	if (hour >= 7 && hour < 12) return 'Good morning'
	if (hour >= 12 && hour < 13) return "It's high noon"
	if (hour >= 13 && hour < 17) return 'Good afternoon'
	if (hour >= 17 && hour < 19) return 'Good evening'
	if (hour >= 19 && hour < 22) return "Hope you're having a pleasant night"
	return 'Burning the midnight oil'
}

async function Dashboard() {
	const { user } = await validateRequest()

	if (!user) {
		return <div>Please sign in to access the dashboard.</div>
	}

	const userProfile = await db.query.userProfiles.findFirst({
		where: eq(userProfiles.userId, user.id)
	})

	const displayName =
		userProfile?.firstName || user.name || user.email || 'Guest'
	const currentHour = new Date().getHours()
	const greeting = getGreeting(currentHour)

	const city = await getCity()
	const weather = await getWeather(city).catch(err => {
		console.error('Error fetching weather:', err)
		return null
	})

	const getWeatherAdvice = () => {
		if (!weather) return ''

		const temp = weather.current.temp_c
		const condition = weather.current.condition.text.toLowerCase()

		if (temp > 25)
			return (
				"Pack your sunglasses because it's " + temp + '°C outside! ☀️'
			)
		if (temp < 10)
			return "Don't forget your coat, it's chilly at " + temp + '°C! 🧥'
		if (condition.includes('rain'))
			return 'Grab an umbrella, it looks like rain! ☔'
		if (condition.includes('snow')) return "Bundle up, it's snowing! ❄️"
		if (temp >= 20 && temp <= 25)
			return 'Perfect weather for a walk at ' + temp + '°C! 🚶‍♂️'
		return "Enjoy your day, it's " + temp + '°C outside! 😊'
	}

	return (
		<>
			<div className="p-6 w-fit  my-8">
				<h1 className="text-5xl font-semibold gradient-alt leading-[55px] mb-4">
					<span>{greeting},</span>
					<span className="text-title"> {displayName}!</span>{' '}
					<span className="wave">👋</span>
				</h1>
				<div className="flex justify-between items-center mb-6 ">
					<div>
						<p className="text-lg gradient-alt">Current time:</p>
						<CurrentTime format="full" showPeriod={true} />
					</div>
					<div>
						<p className="text-lg gradient-altl">Your location:</p>
						<p className="text-xl subtitle font-semibold">{city}</p>
					</div>
				</div>
				{weather && (
					<div className="border bg-card p-4 rounded-lg">
						<p className="text-xl mb-2 gradient-alt">
							{weather.current.temp_c}°C |{' '}
							{weather.current.condition.text}
						</p>
						<p className="text-lg text-blue-800">
							{getWeatherAdvice()}
						</p>
					</div>
				)}
			</div>
			<EmptyStateMessage
				message="You don't have any recent activities yet. Go ahead and get busy!"
				cardCount={6}
				animate={true}
				opacity={75}
			/>
		</>
	)
}

export default Dashboard
