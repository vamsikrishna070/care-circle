import React from "react";
import { ShieldCheck, ShieldAlert, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";



const _jsxFileName = "src\\components\\risk-badge.tsx";
export function RiskBadge({ level }) {
  const styles = {
    Stable: {
      bg: "bg-green-100 dark:bg-green-900/30",
      text: "text-green-700 dark:text-green-300",
      border: "border-green-200 dark:border-green-800",
      icon: ShieldCheck,
      label: "Stable Status"
    },
    Moderate: {
      bg: "bg-yellow-100 dark:bg-yellow-900/30",
      text: "text-yellow-700 dark:text-yellow-300",
      border: "border-yellow-200 dark:border-yellow-800",
      icon: AlertTriangle,
      label: "Moderate Risk"
    },
    High: {
      bg: "bg-red-100 dark:bg-red-900/30",
      text: "text-red-700 dark:text-red-300",
      border: "border-red-200 dark:border-red-800",
      icon: ShieldAlert,
      label: "High Risk"
    }
  };

  const config = styles[level] || styles.Stable;
  const Icon = config.icon;

  return (
    React.createElement('div', { className: cn(
      "flex items-center gap-2 px-4 py-2 rounded-full border",
      config.bg, config.text, config.border
    ), __self: this, __source: {fileName: _jsxFileName, lineNumber: 35}}
      , React.createElement(Icon, { className: "w-5 h-5" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 39}} )
      , React.createElement('span', { className: "font-semibold text-sm" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 40}}, config.label)
    )
  );
}



