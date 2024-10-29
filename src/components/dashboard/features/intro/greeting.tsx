'use client';

import CurrentTime from "@/components/dashboard/features/intro/current-time";
import { motion } from "framer-motion";

function getGreeting(hour: number): string {
    if (hour >= 0 && hour < 5) return "Good night"
    if (hour >= 5 && hour < 7) return "Rise and shine"
    if (hour >= 7 && hour < 12) return "Good morning"
    if (hour >= 12 && hour < 13) return "It's high noon"
    if (hour >= 13 && hour < 17) return "Good afternoon"
    if (hour >= 17 && hour < 19) return "Good evening"
    if (hour >= 19 && hour < 22) return "Hope you're having a pleasant night"
    return "Burning the midnight oil"
}

export default function Greeting({ user }: { user: any }) {
    const currentHour = new Date().getHours()
    const greeting = getGreeting(currentHour)

    return (
        <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <h1 className="text-5xl font-semibold gradient-alt leading-[55px] mb-4">
                <span>{greeting},</span>
                <span className="text-title"> {user.displayName}!</span>{" "}
                <span className="wave">👋</span>
            </h1>
            <div className="flex justify-between items-center mb-6">
                <div>
                    <p className="text-lg gradient-alt">Current time:</p>
                    <CurrentTime format="full" showPeriod={true} />
                </div>
            </div>
        </motion.div>
    )
}
