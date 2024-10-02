import { Skeleton } from 'ui';

export default function GeolocationLoader() {
    return (
        <>
            <div className="border shadow-sm w-full">
                <div className="flex flex-col space-y-1.5 p-6">
                    <h3 className="leading-none tracking-tight">
                        <Skeleton className="w-[198px] max-w-full" />
                    </h3>
                </div>
                <div className="p-6 pt-0">
                    <div className="flex gap-2 mb-4">
                        <div className="flex h-10 w-full border border-input focus:border-1 px-3 py-2 file:border-0 flex-grow">
                            <Skeleton className="w-[473px] max-w-full" />
                        </div>
                        <div className="inline-flex items-center justify-center transition-colors border-transparent hover:border hover:border-outline h-10 px-4 py-2">
                            <Skeleton className="w-[66px] max-w-full" />
                        </div>
                    </div>
                    <div className="border shadow-sm mt-4">
                        <div className="flex flex-col space-y-1.5 p-6">
                            <h3 className="leading-none tracking-tight">
                                <Skeleton className="w-[165px] max-w-full" />
                            </h3>
                        </div>
                        <div className="p-6 pt-0">
                            <div className="flex gap-2 mb-4">
                                <div className="flex h-10 w-full border border-input focus:border-1 px-3 py-2 file:border-0 flex-grow">
                                    <Skeleton className="w-[264px] max-w-full" />
                                </div>
                                <div className="inline-flex items-center justify-center transition-colors border-transparent hover:border hover:border-outline h-10 px-4 py-2">
                                    <Skeleton className="w-[44px] max-w-full" />
                                </div>
                            </div>
                            <div className="relative h-[200px]">
                                <style>
                                    <Skeleton className="w-[1969px] max-w-full" />
                                </style>
                                <div className="h-full w-full"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
