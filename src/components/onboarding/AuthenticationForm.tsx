'use client';

import { motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from 'sonner';
import { Button, Checkbox, Input } from 'ui';
import { itemVariants } from "../ui/animations";
import OAuthButtons from "./OAuthButtons";

export type AuthenticationFormProps = {
    setIsAuthenticated: (isAuthenticated: boolean) => void;
    setUsername: (username: string) => void;
    setEmail: (email: string) => void;
    handleStep: (step: number) => void;
};

export default function AuthenticationForm({ handleStep, setIsAuthenticated, setUsername, setEmail }: AuthenticationFormProps) {
    const [isLogin, setIsLogin] = useState<boolean>(true);
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [password, setPassword] = useState<string>("");
    const [usernameLocal, setUsernameLocal] = useState<string>("");
    const [emailLocal, setEmailLocal] = useState<string>("");

    const toggleView = () => setIsLogin(!isLogin);

    const simulateAuthentication = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Basic form validation
        if (!emailLocal || (isLogin && !password) || (!isLogin && (!usernameLocal || !password))) {
            toast.error("Please fill in all required fields.");
            return;
        }

        // Simulate a quick authentication process
        toast.promise(
            new Promise((resolve) => setTimeout(resolve, 1000)), // Simulate a 1-second auth process
            {
                loading: 'Authenticating...',
                success: () => {
                    setIsAuthenticated(true);
                    setUsername(usernameLocal || emailLocal.split('@')[0]);
                    setEmail(emailLocal);
                    handleStep(1);
                    return `${isLogin ? "Login" : "Registration"} successful!`;
                },
                error: 'Authentication failed. Please try again.',
            }
        );
    };

    return (
        <motion.div
            key="auth"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
        >
            <motion.div className="space-y-2" variants={itemVariants}>
                <h1 className="text-3xl font-bold text-title">{isLogin ? "Login" : "Register"}</h1>
                <p className="text-subtitle">
                    {isLogin
                        ? "Enter your email below to login to your account"
                        : "Create an account to get started"}
                </p>
            </motion.div>
            <form className="space-y-4" onSubmit={simulateAuthentication}>
                {!isLogin && (
                    <motion.div className="space-y-2" variants={itemVariants} custom={0}>
                        <label htmlFor="username" className="text-sm font-medium text-subtitle">
                            Username
                        </label>
                        <Input
                            id="username"
                            value={usernameLocal}
                            onChange={(e) => setUsernameLocal(e.target.value)}
                            placeholder="johndoe"
                            required
                            className="bg-[#0a0a0a] border-outline text-title placeholder-gray-600 focus:border-outline focus:ring-[rgb(39,38,39)]"
                        />
                    </motion.div>
                )}
                <motion.div className="space-y-2" variants={itemVariants} custom={1}>
                    <label htmlFor="email" className="text-sm font-medium text-subtitle">
                        Email
                    </label>
                    <Input
                        id="email"
                        value={emailLocal}
                        onChange={(e) => setEmailLocal(e.target.value)}
                        placeholder="your@email.com"
                        required
                        type="email"
                    />
                </motion.div>
                <motion.div className="space-y-2" variants={itemVariants} custom={2}>
                    <div className="flex items-center justify-between">
                        <label htmlFor="password" className="text-sm font-medium text-subtitle">
                            Password
                        </label>
                        {isLogin && (
                            <Link href="#" className="text-sm text-[rgb(255,108,0)] hover:underline">
                                Forgot your password?
                            </Link>
                        )}
                    </div>
                    <div className="relative">
                        <Input
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            placeholder="your password"
                            type={showPassword ? "text" : "password"}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-subtitle hover:text-subtitle"
                        >
                            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </button>
                    </div>
                </motion.div>
                {isLogin && (
                    <motion.div className="flex items-center space-x-2" variants={itemVariants} custom={3}>
                        <Checkbox id="remember" className="border-outline text-[rgb(255,108,0)] focus:ring-[rgb(255,108,0)]" />
                        <label
                            htmlFor="remember"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-subtitle"
                        >
                            Remember me
                        </label>
                    </motion.div>
                )}
                <motion.div variants={itemVariants} custom={4}>
                    <Button className="w-full bg-white text-[#0a0a0a] hover:bg-gray-100" type="submit">
                        {isLogin ? "Login" : "Register"}
                    </Button>
                </motion.div>
                <motion.div className="relative" variants={itemVariants} custom={5}>
                    <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t border-outline" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-[#0a0a0a] px-2 text-gray-500">Or continue with</span>
                    </div>
                </motion.div>
                <OAuthButtons />
            </form>
            <motion.p className="text-center text-sm text-gray-500 mt-4" variants={itemVariants} custom={7}>
                {isLogin ? "Don't have an account? " : "Already have an account? "}
                <button onClick={toggleView} className="text-[rgb(255,108,0)] hover:underline">
                    {isLogin ? "Sign up" : "Log in"}
                </button>
            </motion.p>
        </motion.div>
    );
}
