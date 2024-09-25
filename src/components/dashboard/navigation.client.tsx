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
import { signOutAction } from "@/lib/actions/users";
import {
  ChevronDown,
  CreditCard,
  Globe,
  HelpCircle,
  LogOut,
  Moon,
  Settings,
  Sun,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import LogoIcon from "../base/logo";

type NavigationClientProps = {
  userName: string;
  userEmail: string;
};

export default function IntegratedNavigation({
  userName,
  userEmail,
}: NavigationClientProps) {
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <nav className="bg-bg-body text-text-regular-nav flex h-[77px] w-full items-center justify-between px-4 border-b-outline">
      <div className="flex items-center space-x-4">
        <Link href="/" className="text-text-title font-semibold">
          <LogoIcon />
        </Link>
        <Button variant="ghost" className="text-text-title">
          {userName || "User"}
          <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
      </div>

      <div className="flex-grow"></div>

      <div className="flex items-center space-x-4">
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              href="/dashboard"
              className="text-text-title hover:text-text-button"
            >
              <Globe className="h-5 w-5" />
            </Link>
          </TooltipTrigger>
          <TooltipContent>
            <p>Home</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              href="/settings"
              className="text-text-muted hover:text-text-button"
            >
              <Settings className="h-5 w-5" />
            </Link>
          </TooltipTrigger>
          <TooltipContent>
            <p>Settings</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              href="/billing"
              className="text-text-muted hover:text-text-button"
            >
              <CreditCard className="h-5 w-5" />
            </Link>
          </TooltipTrigger>
          <TooltipContent>
            <p>Billing</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="text-text-muted hover:text-text-button"
            >
              <HelpCircle className="h-5 w-5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Help</p>
          </TooltipContent>
        </Tooltip>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" className="rounded-full p-0">
              <Avatar className="h-8 w-8 bg-avatar text-text-title">
                <AvatarFallback>
                  {userName ? userName.substring(0, 2).toUpperCase() : "U"}
                </AvatarFallback>
              </Avatar>
              <ChevronDown className="ml-2 h-4 w-4 text-text-muted" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 bg-bg-dropdown text-text-dropdown-item">
            <DropdownMenuLabel>
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">
                  {userName || "User"}
                </p>
                <p className="text-xs leading-none text-text-muted">
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
