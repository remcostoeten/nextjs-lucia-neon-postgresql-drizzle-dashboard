"use client";

import { subSidebarConfig } from "@/core/config/menu-items/sidebar-menu-items";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

type SubSidebarShellProps = {
  isSubSidebarOpen: boolean;
};

function SubSidebarShell({ isSubSidebarOpen }: SubSidebarShellProps) {
  const pathname = usePathname();
  const [currentConfig, setCurrentConfig] = useState<any>(null);

  useEffect(() => {
    const config = subSidebarConfig[pathname];
    setCurrentConfig(config);
  }, [pathname]);

  if (!currentConfig) {
    return null;
  }

  const { component: SidebarContent } = currentConfig;

  return (
    <AnimatePresence>
      {isSubSidebarOpen && (
        <motion.div
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: "var(--sidebar-sub-width)", opacity: 1 }}
          exit={{ width: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="fixed 
          z-[1] left-[var(--sidebar-width)] top-[var(--header-height)] bottom-0 bg-body border-outline-righ overflow-hidden border-outline-right "
        >
          <SidebarContent />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default SubSidebarShell;
