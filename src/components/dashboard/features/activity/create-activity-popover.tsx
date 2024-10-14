'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { ChevronRightIcon, PlusIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { PanelGroup } from 'react-resizable-panels'
import { toast } from 'sonner'
import {
    Button,
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    Icon,
    IconNames,
    iconNames,
    Input,
    Label,
    Popover,
    PopoverContent,
    PopoverTrigger,
    ResizablePanel,
    ScrollArea,
    Separator
} from 'ui'
import { z } from 'zod'
import { useActivities } from './use-activities'

interface Activity {
    id: string;
    name: string;
    duration: number;
    icon: IconNames;
    color: string;
}

interface StepHeadingProps {
    title: string
    description: string
}

type CreateActivityInput = {
    name: string
    duration: number
    icon: IconNames
    color: string
}

interface CreateActivityPopoverProps {
    isOpen?: boolean;
    onClose?: () => void;
    editingActivity?: Activity;
    onUpdate?: (activity: Activity) => void;
}

const StepHeading = ({ title, description }: StepHeadingProps) => {
    return (
        <div className="flex flex-col gap-1.5">
            <div className="font-medium text-foreground">{title}</div>
            <div className="max-w-[40ch] text-sm text-gray-foreground-muted">
                {description}
            </div>
            <Separator className="my-3" />
        </div>
    )
}

interface IconPickerProps {
    iconOnClickHandler: (icon: IconNames) => void
}

const colorChoices = [
    { name: 'default', value: '#111827' },
    { name: 'red', value: '#F87171' },
    { name: 'green', value: '#34D399' },
    { name: 'blue', value: '#3B82F6' },
    { name: 'yellow', value: '#FACC15' },
    { name: 'purple', value: '#A855F7' }
]

function IconPicker({ iconOnClickHandler }: IconPickerProps) {
    return (
        <ScrollArea className="mt-2 h-[300px]">
            <div className="mt-2 grid grid-cols-6 gap-2">
                {iconNames.map(icon => (
                    <button
                        type="button"
                        key={icon}
                        className="grid place-items-center rounded-lg p-2 text-foreground transition-colors hover:bg-gray-element"
                        onClick={() => {
                            iconOnClickHandler(icon)
                        }}
                    >
                        <Icon name={icon} size={20} strokeWidth={1.5} />
                    </button>
                ))}
            </div>
        </ScrollArea>
    )
}

const formSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    duration: z.number().min(1, 'Duration must be at least 1 minute'),
    icon: z.string().default('default'),
    color: z.string().default('default')
})

export default function CreateActivityPopover({
    isOpen,
    onClose,
    editingActivity,
    onUpdate
}: CreateActivityPopoverProps = {}) {
    const [popoverOpen, setPopoverOpen] = useState(false)
    const [step, setStep] = useState<1 | 2 | 3>(1)

    const router = useRouter()
    const { createActivity } = useActivities()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            duration: 30,
            icon: 'default',
            color: 'default'
        }
    })

    useEffect(() => {
        if (editingActivity) {
            form.reset({
                name: editingActivity.name,
                duration: editingActivity.duration,
                icon: editingActivity.icon,
                color: editingActivity.color
            });
        }
    }, [editingActivity, form]);

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            const activityInput: CreateActivityInput = {
                name: values.name,
                duration: values.duration,
                icon: values.icon as CreateActivityInput['icon'],
                color: values.color as CreateActivityInput['color']
            };

            if (editingActivity) {
                await onUpdate?.({ ...activityInput, id: editingActivity.id });
                toast.success('Activity updated successfully');
            } else {
                await createActivity(activityInput);
                toast.success('Activity created successfully');
            }

            form.reset({
                name: '',
                duration: 30,
                icon: 'default',
                color: 'default'
            });
            setPopoverOpen(false);
            onClose?.();
            router.refresh();
        } catch (error) {
            toast.error(editingActivity ? 'Failed to update activity' : 'Failed to create activity');
        }
    }

    return (
        <Popover
            open={isOpen !== undefined ? isOpen : popoverOpen}
            onOpenChange={() => {
                if (isOpen === undefined) {
                    setPopoverOpen((prev) => !prev);
                }
                onClose?.();
                setStep(1);
            }}
        >
            <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" className="size-8">
                    <PlusIcon size={15} strokeWidth={1.5} />
                </Button>
            </PopoverTrigger>

            <PopoverContent align="start" side="right" className="w-[328px]">
                <PanelGroup>
                    <ResizablePanel>
                        <Form {...form}>
                            <form
                                onSubmit={form.handleSubmit(onSubmit)}
                                className="p-4"
                            >
                                {step === 1 && (
                                    <div>
                                        <StepHeading
                                            title="Create a new activity"
                                            description="Add a new activity to track your progress and manage your time"
                                        />
                                        <div className="space-y-2">
                                            <FormField
                                                control={form.control}
                                                name="name"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel className="text-xs text-foreground">
                                                            Name
                                                        </FormLabel>
                                                        <FormControl>
                                                            <Input
                                                                type="text"
                                                                placeholder="Reading"
                                                                {...field}
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <FormField
                                                control={form.control}
                                                name="duration"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel className="text-xs text-foreground">
                                                            Duration (minutes)
                                                        </FormLabel>
                                                        <FormControl>
                                                            <Input
                                                                type="number"
                                                                placeholder="30"
                                                                {...field}
                                                                onChange={e =>
                                                                    field.onChange(
                                                                        parseInt(
                                                                            e.target
                                                                                .value
                                                                        )
                                                                    )
                                                                }
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <div className="flex items-start justify-between gap-3">
                                                <div className="mt-1 flex flex-1 flex-col gap-2">
                                                    <Label className="text-xs text-foreground">
                                                        Icon
                                                    </Label>
                                                    <Button
                                                        type="button"
                                                        variant="outline"
                                                        className="flex-1 justify-between bg-section-lighter px-3 py-2 hover:bg-gray-element"
                                                        style={{
                                                            color: form.watch('color') === 'default' ? '#6B7280' : '#3B82F6'
                                                        }}
                                                        onClick={() => {
                                                            setStep(2)
                                                        }}
                                                    >
                                                        <Icon
                                                            name={
                                                                form.watch(
                                                                    'icon'
                                                                ) !== 'default'
                                                                    ? (form.watch(
                                                                        'icon'
                                                                    ) as IconNames)
                                                                    : 'Activity'
                                                            }
                                                            size={18}
                                                            strokeWidth={1.5}
                                                        />
                                                        <ChevronRightIcon
                                                            className="text-gray-solid"
                                                            size={18}
                                                            strokeWidth={1.5}
                                                        />
                                                    </Button>
                                                </div>
                                                <div className="mt-1 flex flex-1 flex-col space-y-2">
                                                    <Label className="text-xs text-foreground">
                                                        Color
                                                    </Label>
                                                    <Button
                                                        type="button"
                                                        variant="outline"
                                                        className="flex-1 justify-between bg-section-lighter px-3 py-2 hover:bg-gray-element"
                                                        onClick={() => {
                                                            setStep(3)
                                                        }}
                                                    >
                                                        <div
                                                            className="size-[18px] rounded-md"
                                                            style={{
                                                                backgroundColor:
                                                                    form.watch(
                                                                        'color'
                                                                    ) === 'default'
                                                                        ? '#111827'
                                                                        : '#F87171'
                                                            }}
                                                        />
                                                        <ChevronRightIcon
                                                            className="text-gray-solid"
                                                            size={18}
                                                            strokeWidth={1.5}
                                                        />
                                                    </Button>
                                                </div>
                                            </div>
                                            <Button
                                                type="submit"
                                                disabled={
                                                    form.formState.isSubmitting
                                                }
                                                className="!mt-4 w-full"
                                                size="sm"
                                            >
                                                {form.formState.isSubmitting
                                                    ? (editingActivity ? 'Updating...' : 'Creating...')
                                                    : (editingActivity ? 'Update activity' : 'Create activity')}
                                            </Button>
                                        </div>
                                    </div>
                                )}
                                {step === 2 && (
                                    <div>
                                        <StepHeading
                                            title="Select an icon"
                                            description="Choose an icon that represents your activity."
                                        />
                                        <IconPicker
                                            iconOnClickHandler={icon => {
                                                form.setValue('icon', icon)
                                                setStep(1)
                                            }}
                                        />
                                    </div>
                                )}
                                {step === 3 && (
                                    <div>
                                        <StepHeading
                                            title="Select a color"
                                            description="Choose a color to easily identify your activity."
                                        />
                                        <div className="mt-2 flex flex-wrap justify-between gap-4">
                                            {colorChoices.map(color => (
                                                <button
                                                    type="button"
                                                    key={color.name}
                                                    className="size-8 rounded-lg transition-all hover:scale-110"
                                                    style={{
                                                        backgroundColor: color.value
                                                    }}
                                                    onClick={() => {
                                                        form.setValue(
                                                            'color',
                                                            color.name
                                                        )
                                                        setStep(1)
                                                    }}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </form>
                        </Form>
                    </ResizablePanel>
                </PanelGroup>
            </PopoverContent>
        </Popover>
    )
}
