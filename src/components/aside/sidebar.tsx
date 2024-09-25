"use client";

import {
  SidebarItem,
  sidebarItems,
} from "@/core/config/menu-items/sidebar-menu-items";
import { motion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  HelpCircle,
  LucideIcon,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

type SidebarIconProps = {
  item: SidebarItem;
  isActive: boolean;
};

type MainSidebarProps = {
  isSubSidebarOpen: boolean;
  toggleSubSidebar: () => void;
  isCollapsed: boolean;
  toggleCollapse: () => void;
};

function SidebarIcon({ item, isActive }: SidebarIconProps) {
  const [isHovered, setIsHovered] = useState<boolean>(false);

  return (
    <motion.div
      className={`relative z-50 flex items-center justify-center size-10 mb-2 rounded-md transition-colors duration-200 border-r-outline ${
        isActive
          ? "bg-body border-outline text-white"
          : "!border-transparent text-zinc-400 hover:text-title hover:bg-body hover:border-outline"
      }`}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <item.icon className="w-4 h-4" />
      {item.hasAlert && (
        <div className="absolute -top-1 -right-1 flex items-center justify-center size-4 px-1 bg-body border border-outline rounded-full shadow-xl backdrop-filter backdrop-blur-lg z-10">
          <span className="text-[12px] font-bold text-title z-20">
            {item.alertCount && item.alertCount > 99 ? "99+" : item.alertCount}
            <div className="absolute -z-10 inset-0 rounded-full shadow-[0_0_10px_rgba(255,165,0,.7)] blur-[5px]"></div>
          </span>
        </div>
      )}
      {isHovered && (
        <motion.div
          className="absolute left-full -z-10 ml-2 px-2 py-1 bg-body border border-outline text-white text-xs font-medium rounded-md whitespace-nowrap !pointer-events-none"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -10 }}
          transition={{ duration: 0.2 }}
        >
          {item.name}
        </motion.div>
      )}
    </motion.div>
  );
}
export default function MainSidebar({
  isSubSidebarOpen,
  toggleSubSidebar,
  isCollapsed,
  toggleCollapse,
}: MainSidebarProps) {
  const pathname = usePathname();
  const [activePath, setActivePath] = useState<string>("");

  useEffect(() => {
    const matchingItem =
      sidebarItems.find(
        (item) => pathname.startsWith(item.path) && item.path !== "/",
      ) || sidebarItems[0];
    setActivePath(matchingItem.path);
  }, [pathname]);

  return (
    <motion.aside
      initial={{ width: 0, opacity: 0 }}
      animate={{
        width: isCollapsed ? 0 : "var(--sidebar-width)",
        opacity: isCollapsed ? 0 : 1,
      }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className={`fixed left-0 top-[var(--header-height)] bottom-0 flex items-center transition-all duration-300 ease-in-out z-10`}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isCollapsed ? 0 : 1 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        className={`h-full bg-body border-r-outline  flex flex-col items-center py-4 z-40 transition-all duration-300 ease-in-out ${
          isCollapsed ? "w-0" : "w-full"
        }`}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="flex gap-2 flex-col items-center flex-grow"
        >
          {sidebarItems.map((item, index) => (
            <motion.div
              key={item.path}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.1 * (index + 1) }}
            >
              <Link href={item.path}>
                <SidebarIcon item={item} isActive={activePath === item.path} />
              </Link>
            </motion.div>
          ))}
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
          className="flex flex-col items-center mt-auto"
        >
          <SidebarIcon
            item={{ name: "Help", path: "#s", icon: HelpCircle as LucideIcon }}
            isActive={false}
          />
          <button
            onClick={toggleSubSidebar}
            className="size-[55px] opacity-50 flex items-center justify-center text-zinc-400 hover:text-title mt-2"
          >
            {isSubSidebarOpen ? (
              <PanelLeftClose className="w-6 h-6" />
            ) : (
              <PanelLeftOpen className="w-6 h-6" />
            )}
          </button>
        </motion.div>
      </motion.div>
      <motion.button
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3, delay: 0.5 }}
        onClick={toggleCollapse}
        className={`absolute -right-4 top-1/2 transform -translate-y-1/2 p-1 rounded-full bg-body border border-outline text-white hover:bg-opacity-80 z-10`}
      >
        {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
      </motion.button>
    </motion.aside>
  );
}
