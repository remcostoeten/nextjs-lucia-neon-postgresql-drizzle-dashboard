import { motion, Variants } from "framer-motion";
import { Facebook, Github, Linkedin, Twitter } from "lucide-react";
import { Input, Textarea } from 'ui';
import { itemVariants } from "../ui/animations";

type AboutYouStepProps = {
    formData: {
        bio: string;
        github: string;
        facebook: string;
        linkedin: string;
        twitter: string;
    };
    handleInputChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
};

export default function AboutYouStep({ formData, handleInputChange }: AboutYouStepProps) {
    const variants: Variants = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -20 },
        transition: { duration: 0.5 }
    };

    return (
        <motion.div
            key="about-you"
            variants={variants}
        >
            <h2 className="text-2xl font-bold text-title mb-4">Tell us about yourself</h2>
            <form className="space-y-4">
                <motion.div variants={itemVariants} custom={0}>
                    <label htmlFor="bio" className="block text-sm font-medium text-subtitle mb-1">Bio</label>
                    <Textarea
                        id="bio"
                        name="bio"
                        value={formData.bio}
                        onChange={handleInputChange}
                        className="bg-[#0a0a0a] border-outline text-title placeholder-gray-600 focus:border-outline focus:ring-[rgb(39,38,39)]"
                        rows={4}
                    />
                </motion.div>
                {[
                    { name: 'github', icon: Github },
                    { name: 'facebook', icon: Facebook },
                    { name: 'linkedin', icon: Linkedin },
                    { name: 'twitter', icon: Twitter }
                ].map((social, index) => (
                    <motion.div key={social.name} variants={itemVariants} custom={index + 1}>
                        <label htmlFor={social.name} className="block text-sm font-medium text-subtitle mb-1">{social.name.charAt(0).toUpperCase() + social.name.slice(1)}</label>
                        <div className="relative">
                            <social.icon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-subtitle" />
                            <Input
                                id={social.name}
                                name={social.name}
                                value={formData[social.name]}
                                onChange={handleInputChange}
                                className="bg-[#0a0a0a] border-outline text-title placeholder-gray-600 focus:border-outline focus:ring-[rgb(39,38,39)] pl-10"
                                placeholder="Username"
                            />
                        </div>
                    </motion.div>
                ))}
            </form>
        </motion.div>
    );
}
