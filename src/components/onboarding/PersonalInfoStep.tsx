import { format } from "date-fns";
import { motion } from "framer-motion";
import { CalendarIcon } from "lucide-react";
import { Button, Calendar, Input, Popover, PopoverContent, PopoverTrigger, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from 'ui';

type PersonalInfoStepProps = {
    formData: {
        username: string;
        firstName: string;
        lastName: string;
        dateOfBirth?: Date;
        occupation: string;
        gender: string;
    };
    handleInputChange: (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    handleDateSelect: (date: Date | null) => void;
};

export default function PersonalInfoStep({ formData, handleInputChange, handleDateSelect }: PersonalInfoStepProps) {
    return (
        <motion.div
            key="personal-info"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ delay: 0.5, duration: 0.5 }}
        >
            <h2 className="text-3xl font-bold text-title mb-4">Welcome, {formData.username}!</h2>
            <motion.p
                initial={{ opacity: 0, y: 30, x: -10 }} animate={{ opacity: 1, y: 0, x: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="text-xs text-subtitle mb-4">We would like to get to know you a bit better for a more personalized work-experience. Please provide your personal information. You can always choose to skip and fill in the information later under your profile page.</motion.p>
            <form className="space-y-4">
                <motion.div
                    initial={{ opacity: 0, y: 30, x: -10 }} animate={{ opacity: 1, y: 0, x: 0 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                >
                    <label htmlFor="firstName" className="block text-sm font-medium text-subtitle mb-1">First Name</label>
                    <Input
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="bg-[#0a0a0a] border-outline text-title placeholder-gray-600 focus:border-outline focus:ring-[rgb(39,38,39)]"
                    />
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, y: 30, x: -10 }} animate={{ opacity: 1, y: 0, x: 0 }}
                    transition={{ delay: 0.75, duration: 0.75 }}
                >
                    <label htmlFor="lastName" className="block text-sm font-medium text-subtitle mb-1">Last Name</label>
                    <Input
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="bg-[#0a0a0a] border-outline text-title placeholder-gray-600 focus:border-outline focus:ring-[rgb(39,38,39)]"
                    />
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, y: 30, x: -10 }} animate={{ opacity: 1, y: 0, x: 0 }}
                    transition={{ delay: 1, duration: 1 }}
                >
                    <label htmlFor="dateOfBirth" className="block text-sm font-medium text-subtitle mb-1">Date of Birth</label>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                variant={"outline"}
                                className={`w-full justify-start text-left font-normal bg-[#0a0a0a] border-outline text-title hover:bg-[rgb(39,38,39)] hover:text-subtitle ${!formData.dateOfBirth && "text-muted-foreground"}`}
                            >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {formData.dateOfBirth ? format(formData.dateOfBirth, "PPP") : <span>Pick a date</span>}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0 bg-[#0a0a0a] border-outline">
                            <Calendar
                                mode="single"
                                selected={formData.dateOfBirth}
                                onSelect={handleDateSelect}
                                initialFocus
                            />
                        </PopoverContent>
                    </Popover>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, y: 30, x: -10 }} animate={{ opacity: 1, y: 0, x: 0 }}
                    transition={{ delay: 1.25, duration: 1.25 }}
                >
                    <label htmlFor="occupation" className="block text-sm font-medium text-subtitle mb-1">Occupation</label>
                    <Input
                        id="occupation"
                        name="occupation"
                        value={formData.occupation}
                        onChange={handleInputChange}
                        className="bg-[#0a0a0a] border-outline text-title placeholder-gray-600 focus:border-outline focus:ring-[rgb(39,38,39)]"
                    />
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, y: 30, x: -10 }} animate={{ opacity: 1, y: 0, x: 0 }}
                    transition={{ delay: 1.5, duration: 1.5 }}
                >
                    <label htmlFor="gender" className="block text-sm font-medium text-subtitle mb-1">Gender</label>
                    <Select onValueChange={(value) => handleInputChange({ target: { name: 'gender', value } })}>
                        <SelectTrigger className="w-full bg-[#0a0a0a] border-outline text-title">
                            <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                        <SelectContent className="bg-[#0a0a0a] border-outline text-title">
                            <SelectItem value="male">Male</SelectItem>
                            <SelectItem value="female">Female</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                            <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                        </SelectContent>
                    </Select>
                </motion.div>
            </form>
        </motion.div>
    );
}
