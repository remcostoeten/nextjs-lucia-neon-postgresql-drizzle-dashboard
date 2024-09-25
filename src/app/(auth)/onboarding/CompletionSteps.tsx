import confetti from 'canvas-confetti';
import { motion } from "framer-motion";
import { toast } from 'sonner';
import { Button } from 'ui';

export default function CompletionStep({ username }) {
    const handleCompletion = () => {
        toast.success("You're all set! Redirecting to dashboard...");
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
        });
        setTimeout(() => {
            toast.success("Welcome to your dashboard!");
            // Here you would typically use router.push('/dashboard') or similar
        }, 5000);
    };

    return (
        <motion.div
            key="finish"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="text-center"
        >
            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
            >
                <h2 className="text-3xl font-bold text-title mb-4">Welcome Aboard!</h2>
                <p className="text-subtitle mb-8">We're excited to have you join us, {username}!</p>
            </motion.div>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
            >
                <Button
                    className="w-full bg-white text-[#0a0a0a] hover:bg-gray-100"
                    onClick={handleCompletion}
                >
                    Get Started
                </Button>
            </motion.div>
        </motion.div>
    );
}
