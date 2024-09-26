"use client";

import { motion } from "framer-motion";
import { Bell, Cog, CreditCard, HelpCircle, Shield, User } from "lucide-react";
import Link from "next/link";
import React from "react";

type MenuItem = {
  icon: React.ComponentType;
  text: string;
  href: string;
};

const SettingsSidebar: React.FC = () => {
  const menuItems: MenuItem[] = [
    { icon: User, text: "Account", href: "/dashboard/settings/account" },
    {
      icon: Bell,
      text: "Notifications",
      href: "/dashboard/settings/notifications",
    },
    {
      icon: Shield,
      text: "Privacy & Security",
      href: "/dashboard/settings/privacy",
    },
    { icon: CreditCard, text: "Billing", href: "/dashboard/settings/billing" },
    { icon: Cog, text: "General", href: "/dashboard/settings/general" },
  ];

  return (
    <div className="text-white p-4 h-full w-[230px] overflow-y-auto">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-2xl font-bold mb-6"
      >
        Settings
      </motion.h2>
      <nav>
        <ul className="space-y-2">
          {menuItems.map((item, index) => (
            <motion.li
              key={item.text}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * (index + 1) }}
            >
              <Link
                href={item.href}
                className="flex items-center space-x-3 p-2 rounded-md hover:bg-card border-outline transition-colors duration-200"
              >
                <item.icon
                  size={20}
                  className="text-gray-400"
                  aria-hidden="true"
                />
                <span>{item.text}</span>
              </Link>
            </motion.li>
          ))}
        </ul>
      </nav>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mt-8 p-4 bg-card border-outline rounded-md shadow-md"
      >
        <div className="flex items-center mb-2">
          <HelpCircle
            size={20}
            className="text-blue-400 mr-2"
            aria-hidden="true"
          />
          <h3 className="text-lg font-semibold">Need Help?</h3>
        </div>
        <p className="text-sm mb-4 text-gray-300">
          Check our documentation or contact support
        </p>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md w-full hover:bg-blue-600 transition-colors duration-200">
          View Documentation
        </button>
      </motion.div>
    </div>
  );
};

export default SettingsSidebar;
