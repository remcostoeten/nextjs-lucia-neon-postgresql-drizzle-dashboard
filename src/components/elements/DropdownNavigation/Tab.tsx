import { ChevronDown } from "lucide-react";
import React from "react";

type TabProps = {
  children: React.ReactNode;
  tab: number;
  handleSetSelected: (val: number | null) => void;
  selected: number | null;
};

export function Tab({ children, tab, handleSetSelected, selected }: TabProps) {
  const isSelected = selected === tab;

  return (
    <button
      id={`shift-tab-${tab}`}
      onMouseEnter={() => handleSetSelected(tab)}
      onClick={() => handleSetSelected(tab)}
      className={`flex items-center hover:text-white active:text-white gap-1 rounded-full px-3 py-1.5 text-sm transition-colors ${
        isSelected
          ? "border-outline bg-gradient-to-tr from-body via-card to-bod text-white "
          : "text-subtitle border-outline bg-[#0a0a0a]"
      }`}
    >
      <span>{children}</span>
      <ChevronDown
        className={`transition-transform ${isSelected ? "rotate-180" : ""}`}
      />
    </button>
  );
}
