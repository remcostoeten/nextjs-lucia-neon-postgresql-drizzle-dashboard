import { motion } from "framer-motion";
import { Button } from 'ui';
import { itemVariants } from "../ui/animations";

export default function Navigation({ handleBack, handleSkip, handleNext }) {
    return (
        <motion.div
            className="flex justify-between mt-8"
            variants={itemVariants}
            custom={5}
            initial="hidden"
            animate="visible"
        >
            <Button onClick={handleBack} variant="outline" className="bg-[#0a0a0a] text-title border-outline hover:bg-[rgb(39,38,39)] hover:text-subtitle">
                Back
            </Button>
            <Button onClick={handleSkip} variant="outline" className="bg-[#0a0a0a] text-title border-outline hover:bg-[rgb(39,38,39)] hover:text-subtitle">
                Skip
            </Button>
            <Button onClick={handleNext} className="bg-white text-[#0a0a0a] hover:bg-gray-100">
                Next
            </Button>
        </motion.div>
    );
}
