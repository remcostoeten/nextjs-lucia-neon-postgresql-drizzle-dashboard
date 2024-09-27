'use client';

import React from 'react';
import { useSiteSettingsStore } from 'stores';
import { Dialog, DialogContent, DialogHeader, DialogTitle, Switch } from 'ui';
import { SiteSettingsMenuProps } from './types.sidear';


export const SiteSettingsMenu: React.FC<SiteSettingsMenuProps> = ({ isOpen, onClose, onSettingChange }) => {
    const { disableSidebarAnimations, toggleSidebarAnimations } = useSiteSettingsStore();

    const handleToggleSidebarAnimations = () => {
        toggleSidebarAnimations();
        onSettingChange('disableSidebarAnimations', !disableSidebarAnimations);
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Site Settings</DialogTitle>
                </DialogHeader>
                <div className="flex items-center justify-between py-4">
                    <label htmlFor="disable-animations" className="text-sm font-medium">
                        Disable Sidebar Animations
                    </label>
                    <Switch
                        id="disable-animations"
                        checked={disableSidebarAnimations}
                        onCheckedChange={handleToggleSidebarAnimations}
                    />
                </div>
            </DialogContent>
        </Dialog>
    );
};
