import React from "react";

import { cn } from "@/lib/utils";









const _jsxFileName = "src\\components\\stats-card.tsx";
export function StatsCard({ title, value, icon, trend, color = "default" }) {
  const colorStyles = {
    default: "bg-card text-card-foreground border-border",
    primary: "bg-primary/10 border-primary/20 text-primary-foreground",
    secondary: "bg-secondary/10 border-secondary/20 text-secondary-foreground",
    accent: "bg-accent/10 border-accent/20 text-accent-foreground",
  };

  return (
    React.createElement('div', { className: cn(
      "p-6 rounded-2xl shadow-sm border transition-all duration-300 hover:shadow-md",
      colorStyles[color]
    ), __self: this, __source: {fileName: _jsxFileName, lineNumber: 21}}
      , React.createElement('div', { className: "flex items-center justify-between"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 25}}
        , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 26}}
          , React.createElement('p', { className: "text-sm font-medium text-muted-foreground"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 27}}, title)
          , React.createElement('h3', { className: "text-3xl font-display font-bold mt-1 text-foreground"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 28}}, value)
        )
        , React.createElement('div', { className: cn(
          "p-3 rounded-xl",
          color === "default" ? "bg-muted text-foreground" : "bg-white/20 text-current"
        ), __self: this, __source: {fileName: _jsxFileName, lineNumber: 30}}
          , icon
        )
      )
      , trend && (
        React.createElement('p', { className: "mt-4 text-sm font-medium flex items-center gap-1 text-muted-foreground"      , __self: this, __source: {fileName: _jsxFileName, lineNumber: 38}}
          , trend
        )
      )
    )
  );
}



