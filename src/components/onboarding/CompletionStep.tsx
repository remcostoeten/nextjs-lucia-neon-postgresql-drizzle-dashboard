'use client';

import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from 'next/navigation';
import { useCallback, useState } from "react";
import { Toaster, toast } from 'sonner';

import AboutYouStep from "@/components/onboarding/AboutYouStep";
import AuthenticationForm from "@/components/onboarding/AuthenticationForm";
import BackgroundEffect from "@/components/onboarding/BackgroundEffect";
import CompletionStep from "@/components/onboarding/CompletionStep";
import Navigation from "@/components/onboarding/Navigation";
import PersonalInfoStep from "@/components/onboarding/PersonalInfoStep";
import { containerVariants } from "@/components/ui/animations";
import { updateOnboardingInfo } from "@/core/server/actions/update-onboarding";

type FormData = {
    username: string;
    firstName: string;
    lastName: string;
    dateOfBirth: Date | null;
    occupation: string;
    gender: string;
    bio: string;
    github: string;
    facebook: string;
    linkedin: string;
    twitter: string;
};

export default function OnboardingPage({ }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [step, setStep] = useState(0);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [formData, setFormData] = useState<FormData>({
        username: "",
        firstName: "",
        lastName: "",
        dateOfBirth: null,
        occupation: "",
        gender: "",
        bio: "",
        github: "",
        facebook: "",
        linkedin: "",
        twitter: "",
    });

    const router = useRouter();

    const handleNext = useCallback(async () => {
        if (step < 3) {
            const formDataToSubmit = new FormData();
            Object.entries(formData).forEach(([key, value]) => {
                if (value !== null && value !== undefined) {
                    formDataToSubmit.append(key, value.toString());
                }
            });

            try {
                const result = await updateOnboardingInfo(null, formDataToSubmit);
                if (result.error) {
                    toast.error(result.error);
                    return;
                }
            } catch (error) {
                toast.error("An error occurred while saving your information.");
                return;
            }
        }
        setStep((prev) => Math.min(prev + 1, 3));
    }, [step, formData]);

    const handleBack = useCallback(() => setStep((prev) => Math.max(prev - 1, 0)), []);
    const handleSkip = useCallback(() => handleNext(), [handleNext]);

    const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    }, []);

    const handleDateSelect = useCallback((date: Date | null) => {
        setFormData((prev) => ({ ...prev, dateOfBirth: date }));
    }, []);

    const handleCompletion = useCallback(async () => {
        const formDataToSubmit = new FormData();
        formDataToSubmit.append('onboardingCompleted', 'true');
        try {
            const result = await updateOnboardingInfo(null, formDataToSubmit);
            if (result.success) {
                toast.success("Onboarding completed successfully!");
                router.push('/dashboard');
            } else {
                toast.error(result.error || "An error occurred while completing onboarding.");
            }
        } catch (error) {
            toast.error("An unexpected error occurred.");
        }
    }, [router]);

    const renderStep = () => {
        if (!isAuthenticated) {
            return (
                <AuthenticationForm
                    setIsAuthenticated={setIsAuthenticated}
                    setUsername={setUsername}
                    setEmail={setEmail}
                    handleStep={setStep}
                />
            );
        }

        switch (step) {
            case 0:
            case 1:
                return (
                    <PersonalInfoStep
                        formData={formData}
                        handleInputChange={handleInputChange}
                        handleDateSelect={handleDateSelect}
                    />
                );
            case 2:
                return (
                    <AboutYouStep
                        formData={formData}
                        handleInputChange={handleInputChange}
                    />
                );
            case 3:
                return (
                    <CompletionStep
                        username={username || email}
                        handleCompletion={handleCompletion}
                    />
                );
            default:
                return null;
        }
    };

    return (
        <div className="flex min-h-screen bg-[#0a0a0a] relative overflow-hidden">
            <Toaster />
            <BackgroundEffect />
            <motion.div
                className="flex-1 flex items-center justify-start z-10 p-8 lg:p-16"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <div className="w-full max-w-md space-y-8">
                    <AnimatePresence mode="wait">
                        {renderStep()}
                    </AnimatePresence>

                    {isAuthenticated && step > 0 && step < 3 && (
                        <Navigation handleBack={handleBack} handleSkip={handleSkip} handleNext={handleNext} />
                    )}
                </div>
            </motion.div>
        </div>
    );
}
