'use client';

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { CheckSquare, FileText, MessageSquare, Moon, Paperclip, Sun, User } from "lucide-react";
import { useTheme } from "next-themes";

export default function EnhancedWelcomeDashboard() {
    const { theme, setTheme } = useTheme()

    const currentDate = new Date()
    const currentHour = currentDate.getHours()
    let greeting = "Good morning"
    if (currentHour >= 12 && currentHour < 18) {
        greeting = "Good afternoon"
    } else if (currentHour >= 18) {
        greeting = "Good evening"
    }

    return (
        <div className="min-h-screen p-8 bg-background text-foreground">
            <div className="max-w-4xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-4xl font-bold">Welcome to Quantask!</h1>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                        className="rounded-full"
                    >
                        {theme === "light" ? <Moon className="h-6 w-6" /> : <Sun className="h-6 w-6" />}
                    </Button>
                </div>
                <p className="text-xl mb-12">
                    {greeting}! Organize your work and improve your performance with us here!
                </p>
                <h2 className="text-2xl font-semibold mb-6">Try things out</h2>
                <div className="grid gap-6 md:grid-cols-3">
                    <OnboardingCard
                        icon={<User className="h-8 w-8 text-indigo-500" />}
                        title="Set up your profile"
                        description="Set up with relevant information such as profile picture, phone number etc"
                        time="1 Min-non technical"
                        action="Settings"
                    >
                        <div className="space-y-2">
                            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-3/4"></div>
                            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-1/2"></div>
                        </div>
                    </OnboardingCard>
                    <OnboardingCard
                        icon={<FileText className="h-8 w-8 text-blue-500" />}
                        title="Create your first page"
                        description="Set up with relevant information such as profile picture, phone number etc"
                        time="2 Min- Technical"
                        action="Create"
                    >
                        <div className="mb-4">
                            <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">Medium</Badge>
                        </div>
                        <h4 className="text-lg font-semibold mb-2">Cudemo Project</h4>
                        <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                            <span className="flex items-center">
                                <Paperclip className="h-4 w-4 mr-1" />
                                3
                            </span>
                            <span className="flex items-center">
                                <MessageSquare className="h-4 w-4 mr-1" />
                                12
                            </span>
                        </div>
                    </OnboardingCard>
                    <OnboardingCard
                        icon={<CheckSquare className="h-8 w-8 text-green-500" />}
                        title="Create your first task"
                        description="Set up with relevant information such as profile picture, phone number etc"
                        time="5 Min- Optional"
                        action="Create"
                    >
                        <div className="flex items-center space-x-2 mb-2">
                            <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                                <CheckSquare className="h-4 w-4 text-green-600" />
                            </div>
                            <span className="text-sm font-medium">Setup meeting w/ client project</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-500 dark:text-gray-400">Today</span>
                            <Badge variant="secondary">Work</Badge>
                        </div>
                    </OnboardingCard>
                </div>
            </div>
        </div>
    )
}

type OnboardingCardProps = {
    icon: JSX.Element;
    title: string;
    description: string;
    time: string;
    action: string;
    children: JSX.Element | JSX.Element[];
};

function OnboardingCard({ icon, title, description, time, action, children }: OnboardingCardProps) {
    return (
        <Card className="flex flex-col h-full">
            <CardHeader>
                <div className="w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-4">
                    {icon}
                </div>
                <h3 className="text-lg font-semibold">{title}</h3>
            </CardHeader>
            <CardContent className="flex-grow">
                {children}
                <p className="text-sm text-muted-foreground mt-4">{description}</p>
                <p className="text-xs font-medium mt-2">
                    <span className="mr-1">★</span>
                    {time}
                </p>
            </CardContent>
            <CardFooter className="flex justify-between items-center">
                <Button variant="link" className="p-0">
                    Learn more →
                </Button>
                <Button variant="default">{action}</Button>
            </CardFooter>
        </Card>
    )
}
