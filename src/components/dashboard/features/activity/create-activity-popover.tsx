'use client'

import { PlusIcon } from 'lucide-react'
import { useState } from 'react'
import { Button } from 'ui'
import { CreateActivityForm } from './create-activity-form'
import { RecentActivities } from './recent-activities'

export default function ActivitiesFeature() {
    const [isCreateFormOpen, setIsCreateFormOpen] = useState(false)

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-foreground">Activities</h1>
                <Button
                    variant="ghost"
                    size="icon"
                    className="size-8"
                    onClick={() => setIsCreateFormOpen(!isCreateFormOpen)}
                >
                    <PlusIcon size={15} strokeWidth={1.5} />
                </Button>
            </div>

            {isCreateFormOpen && <CreateActivityForm />}

            <RecentActivities />
        </div>
    )
}
