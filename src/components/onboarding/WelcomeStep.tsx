import { motion } from "framer-motion";
import { Button } from 'ui';

export default function WelcomeStep({ step, username, handleNext }: { username: string; handleNext: () => void; step: React.ReactNode }) {
    return (
        <motion.div
            key="welcome"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
        >
            <h2 className="text-3xl font-bold text-title mb-4">Welcome, {username}!</h2>
            <p className="text-subtitle mb-8">We want to get to know you better.</p>
            {step}
            <Button onClick={handleNext} className="w-full bg-white text-[#0a0a0a] hover:bg-gray-100">
                Get Started
            </Button>
        </motion.div>
    );
}
