export type SidebarIconProps = {
    item: SidebarItem;
    isActive: boolean;
    onClick?: () => void;
};

export type MainSidebarProps = {
    isSubSidebarOpen: boolean;
    toggleSubSidebar: () => void;
    isCollapsed: boolean;
    toggleCollapse: () => void;
};

export type SiteSettingsMenuProps = {
    isOpen: boolean;
    onClose: () => void;
    onSettingChange: (setting: string, value: boolean) => void;
}

export type SubSidebarShellProps = {
    isSubSidebarOpen: boolean;
};
