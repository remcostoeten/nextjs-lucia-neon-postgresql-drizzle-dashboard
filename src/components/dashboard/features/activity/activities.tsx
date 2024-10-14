'use client'

import { useState } from 'react'
import { Button } from 'ui'
import { RecentActivities } from './recent-activities'
import { PlusIcon } from 'lucide-react'
import CreateActivityPopover from './create-activity-popover'

export default function ActivitiesFeature() {
    const [isCreatePopoverOpen, setIsCreatePopoverOpen] = useState(false)

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-foreground">Activities</h1>
                <Button
                    variant="ghost"
                    size="icon"
                    className="size-8"
                    onClick={() => setIsCreatePopoverOpen(true)}
                >
                    <PlusIcon size={15} strokeWidth={1.5} />
                </Button>
            </div>

            <CreateActivityPopover
                isOpen={isCreatePopoverOpen}
                onClose={() => setIsCreatePopoverOpen(false)}
            />

            <RecentActivities />
        </div>
    )
}

