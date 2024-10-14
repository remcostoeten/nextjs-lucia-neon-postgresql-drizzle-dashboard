'use client';

import { cn } from 'cn';
import { useState } from 'react';
import { Button, IconNames, ScrollArea } from 'ui';
import type { Activity } from './activities.d';
import { ActivityCard } from './activity-card';
import { AnimateHeight } from './animate-height';

// Mock function to generate random activities
function generateMockActivities(count: number): Activity[] {
    const iconNames: IconNames[] = ['Activity', 'Folder', 'Book', 'Pencil', 'Code', 'Music', 'Video', 'Image', 'File', 'Coffee'];
    const colors = ['default', 'red', 'blue', 'green', 'yellow', 'purple', 'pink'];

    return Array.from({ length: count }, (_, i) => ({
        id: `activity-${i + 1}`,
        name: `Activity ${i + 1}`,
        icon: iconNames[Math.floor(Math.random() * iconNames.length)],
        color: colors[Math.floor(Math.random() * colors.length)],
        duration: Math.floor(Math.random() * 120) + 15, // Random duration between 15 and 135 minutes
    }));
}

export default function RecentActivities() {
    const [isExpanded, setIsExpanded] = useState(true);
    const [activities] = useState<Activity[]>(generateMockActivities(10));

    return (
        <div className="mt-6 overflow-hidden rounded-xl border px-4 py-3">
            <div className="flex justify-between">
                <h2 className="text-lg font-semibold">Recent Activities</h2>
                <Button
                    variant="outline"
                    size="sm"
                    className="text-xs"
                    aria-expanded={isExpanded}
                    aria-controls="recent-activities-list"
                    onClick={() => setIsExpanded((prev) => !prev)}
                >
                    {isExpanded ? 'Hide' : 'Show'}
                </Button>
            </div>
            <AnimateHeight height={isExpanded ? 'auto' : 0}>
                <ScrollArea className="mt-4">
                    <ul
                        id="recent-activities-list"
                        className={cn(
                            'relative flex gap-4',
                            activities.length === 0 && 'overflow-hidden'
                        )}
                    >
                        {activities.length === 0 ? (
                            <>
                                <div className="absolute inset-0 z-10 flex flex-col items-center justify-center">
                                    <p className="max-w-[40ch] text-center text-sm text-subtitle backdrop-blur-3xl backdrop-opacity-100">
                                        When you decide to become a good student and create activities,
                                        your recent ones will show up here.
                                    </p>
                                </div>
                                {Array.from({ length: 8 }, (_, i) => (
                                    <ActivityCard.Skeleton key={i} opacity={50} animate={false} />
                                ))}
                            </>
                        ) : (
                            activities.map((activity) => (
                                <ActivityCard
                                    key={activity.id}
                                    {...activity}
                                    icon={activity.icon === 'default' ? 'Folder' : activity.icon}
                                />
                            ))
                        )}
                    </ul>
                </ScrollArea>
            </AnimateHeight>
        </div>
    );
}
