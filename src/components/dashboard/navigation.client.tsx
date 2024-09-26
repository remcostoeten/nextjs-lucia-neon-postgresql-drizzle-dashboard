"use client";

import {
  Avatar,
  AvatarFallback,
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Switch,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui";
import {
  IconTooltips,
  links,
} from "@/core/config/menu-items/dashboard-navigation-menu-items";
import { signOutAction } from "@/lib/actions/users";
import { ChevronDown, LogOut, Moon, Settings, Sun } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import LogoIcon from "../base/logo";

type NavigationProps = {
  userName: string;
  userEmail: string;
};

export default function Navigation({ userName, userEmail }: NavigationProps) {
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <nav className="bg-neutral-950 text-white flex h-[77px] w-full items-center justify-between px-4">
      <div className="flex items-center space-x-4">
        <Link href="/" className="text-text-title font-semibold">
          <LogoIcon />
        </Link>
      </div>

      <div className="flex-grow flex justify-center">
        <div className="flex items-center space-x-4">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-subtitle hover:text-title trans-all"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>

      <div className="flex items-center space-x-4 mr-4">
        {IconTooltips.map((tooltip) => (
          <Tooltip key={tooltip.label}>
            <TooltipTrigger asChild>
              {tooltip.isButton ? (
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-subtitle hover:text-title trans-all"
                >
                  <tooltip.icon className="h-5 w-5" />
                </Button>
              ) : (
                <Link
                  href={tooltip.href}
                  className="text-text-muted hover:text-text-button"
                >
                  <tooltip.icon className="h-5 w-5" />
                </Link>
              )}
            </TooltipTrigger>
            <TooltipContent>
              <p>{tooltip.label}</p>
            </TooltipContent>
          </Tooltip>
        ))}

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button>
              <div className="bg-neutral-900 flex items-center gap-1.5 transition-all duration-150 pl-0.5 pr-2 py-0.5 rounded-full">
                <Avatar className="h-8 w-8 bg-avatar text-text-title">
                  <AvatarFallback>
                    {userName ? userName.substring(0, 2).toUpperCase() : "U"}
                  </AvatarFallback>
                </Avatar>
                <ChevronDown className="h-3 w-3" />
              </div>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 bg-neutral-800 text-neutral-200">
            <DropdownMenuLabel>
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">
                  {userName || "User"}
                </p>
                <p className="text-xs leading-none text-neutral-400">
                  {userEmail}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link href="/account" className="flex w-full items-center">
                <Settings className="mr-2 h-4 w-4" />
                <span>Account Settings</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center">
                  {theme === "light" ? (
                    <Sun className="mr-2 h-4 w-4" />
                  ) : (
                    <Moon className="mr-2 h-4 w-4" />
                  )}
                  <span>Theme</span>
                </div>
                <Switch
                  checked={theme === "dark"}
                  onCheckedChange={toggleTheme}
                />
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={() => signOutAction()}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
}
