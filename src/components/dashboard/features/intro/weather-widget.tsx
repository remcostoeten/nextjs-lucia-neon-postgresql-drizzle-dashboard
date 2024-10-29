import { motion } from "framer-motion"

type WeatherAdvice = (weather: any) => string

const getWeatherAdvice: WeatherAdvice = (weather) => {
    if (!weather) return ""

    const temp = weather.current.temp_c
    const condition = weather.current.condition.text.toLowerCase()

    if (temp > 25) return `Pack your sunglasses because it's ${temp}°C outside! ☀️`
    if (temp < 10) return `Don't forget your coat, it's chilly at ${temp}°C! 🧥`
    if (condition.includes("rain")) return "Grab an umbrella, it looks like rain! ☔"
    if (condition.includes("snow")) return "Bundle up, it's snowing! ❄️"
    if (temp >= 20 && temp <= 25) return `Perfect weather for a walk at ${temp}°C! 🚶‍♂️`
    return `Enjoy your day, it's ${temp}°C outside! 😊`
}

export default function WeatherWidget({ weather, city }: { weather: any, city: string }) {
    if (!weather) return null

    return (
        <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="border bg-card p-4 rounded-lg mb-8"
        >
            <div>
                <p className="text-lg gradient-alt mb-2">Your location:</p>
                <p className="text-xl subtitle font-semibold">{city}</p>
            </div>
            <p className="text-xl mb-2 gradient-alt">
                {weather.current.temp_c}°C | {weather.current.condition.text}
            </p>
            <p className="text-lg text-blue-800">{getWeatherAdvice(weather)}</p>
        </motion.div>
    )
}
