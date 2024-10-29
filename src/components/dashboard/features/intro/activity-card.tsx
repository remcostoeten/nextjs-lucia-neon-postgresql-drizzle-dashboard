'use client';

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { motion } from "framer-motion";

type Activity = {
    title: string;
    description: string;
    time: string;
    action: string;
    icon?: JSX.Element;
    badge?: { text: string; color: string };
    projectName?: string;
    attachments?: number;
    comments?: number;
    task?: { title: string; status: string };
}

const activities: Activity[] = [
    {
        title: "Set up your profile",
        description: "Set up with relevant information such as profile picture, phone number etc",
        time: "1 Min-non technical",
        action: "Settings",
        icon: (
            <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
        ),
    },
    {
        title: "Create your first page",
        description: "Set up with relevant information such as profile picture, phone number etc",
        time: "2 Min- Technical",
        action: "Create",
        badge: { text: "Medium", color: "blue" },
        projectName: "Cudemo Project",
        attachments: 3,
        comments: 12,
    },
    {
        title: "Create your first task",
        description: "Set up with relevant information such as profile picture, phone number etc",
        time: "5 Min- Optional",
        action: "Create",
        task: { title: "Setup meeting w/ client project", status: "Today" },
        badge: { text: "Work", color: "gray" },
    },
]

export default function ActivityCards() {
    return (
        <div className="grid gap-6 md:grid-cols-3">
            {activities.map((activity, index) => (
                <motion.div
                    key={activity.title}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.1 * (index + 1) }}
                >
                    <Card className="bg-white shadow-sm h-full">
                        <CardContent className="p-6">
                            {activity.icon && (
                                <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
                                    {activity.icon}
                                </div>
                            )}
                            {activity.badge && (
                                <Badge className={`mb-4 font-normal bg-${activity.badge.color}-100 text-${activity.badge.color}-800`}>
                                    {activity.badge.text}
                                </Badge>
                            )}
                            {activity.projectName && <h3 className="text-lg font-semibold mb-2">{activity.projectName}</h3>}
                            {activity.attachments && activity.comments && (
                                <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                                    <span className="flex items-center">
                                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                                        </svg>
                                        {activity.attachments}
                                    </span>
                                    <span className="flex items-center">
                                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                                        </svg>
                                        {activity.comments}
                                    </span>
                                </div>
                            )}
                            {activity.task && (
                                <div className="flex items-center space-x-2 mb-4">
                                    <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                                        <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <span className="text-sm font-medium">{activity.task.title}</span>
                                </div>
                            )}
                            <p className="text-xs text-gray-500 mb-2">
                                <span className="mr-1">★</span>
                                {activity.time}
                            </p>
                            <h3 className="text-lg font-semibold mb-2">{activity.title}</h3>
                            <p className="text-sm text-gray-600">{activity.description}</p>
                        </CardContent>
                        <CardFooter className="px-6 py-4 bg-gray-50 flex justify-between items-center">
                            <Button variant="link" className="p-0 h-auto font-normal text-gray-600">
                                Learn more →
                            </Button>
                            <Button variant="secondary" className="bg-gray-900 text-white hover:bg-gray-800">
                                {activity.action}
                            </Button>
                        </CardFooter>
                    </Card>
                </motion.div>
            ))}
        </div>
    )
}
