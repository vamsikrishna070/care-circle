import React from "react";
const _jsxFileName = "src\\components\\layout.tsx";
 function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }import { useState } from "react";
import { Link, useLocation } from "wouter";
import { 
  LayoutDashboard, 
  Smile, 
  BookHeart, 
  HeartHandshake, 
  MessageCircleHeart, 
  LogOut,
  Menu,
  X
} from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";





export function Layout({ children }) {
  const [location] = useLocation();
  const { logoutMutation, user } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { href: "/", label: "Dashboard", icon: LayoutDashboard },
    { href: "/mood", label: "Check-in", icon: Smile },
    { href: "/journal", label: "Journal", icon: BookHeart },
    { href: "/care-circle", label: "Care Circle", icon: HeartHandshake },
    { href: "/support", label: "Anonymous Support", icon: MessageCircleHeart },
  ];

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  return (
    React.createElement('div', { className: "min-h-screen bg-background flex"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 39}}
      /* Mobile Menu Overlay */
      , mobileMenuOpen && (
        React.createElement('div', { 
          className: "fixed inset-0 bg-black/50 z-40 md:hidden"    ,
          onClick: () => setMobileMenuOpen(false), __self: this, __source: {fileName: _jsxFileName, lineNumber: 42}}
        )
      )

      /* Sidebar Navigation */
      , React.createElement('aside', { className: cn(
        "fixed md:sticky top-0 left-0 z-50 h-screen w-64 bg-card border-r border-border transition-transform duration-300 ease-in-out md:translate-x-0 flex flex-col shadow-lg md:shadow-none",
        mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
      ), __self: this, __source: {fileName: _jsxFileName, lineNumber: 49}}
        , React.createElement('div', { className: "p-6 border-b border-border flex justify-between items-center"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 53}}
          , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 54}}
            , React.createElement('h1', { className: "text-2xl font-display font-bold text-primary"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 55}}, "CareCircle+")
            , React.createElement('p', { className: "text-sm text-muted-foreground" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 56}}, "Emotional Support" )
          )
          , React.createElement('button', { 
            className: "md:hidden p-2 text-muted-foreground"  ,
            onClick: () => setMobileMenuOpen(false), __self: this, __source: {fileName: _jsxFileName, lineNumber: 58}}

            , React.createElement(X, { size: 20, __self: this, __source: {fileName: _jsxFileName, lineNumber: 62}} )
          )
        )

        , React.createElement('nav', { className: "flex-1 p-4 space-y-2 overflow-y-auto"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 66}}
          , navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location === item.href;
            return (
              React.createElement(Link, { key: item.href, href: item.href, __self: this, __source: {fileName: _jsxFileName, lineNumber: 71}}
                , React.createElement('div', { className: cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 cursor-pointer font-medium",
                  isActive 
                    ? "bg-primary/10 text-primary shadow-sm" 
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                ), __self: this, __source: {fileName: _jsxFileName, lineNumber: 72}}
                  , React.createElement(Icon, { size: 20, __self: this, __source: {fileName: _jsxFileName, lineNumber: 78}} )
                  , React.createElement('span', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 79}}, item.label)
                )
              )
            );
          })
        )

        , React.createElement('div', { className: "p-4 border-t border-border"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 86}}
          , React.createElement('div', { className: "flex items-center gap-3 px-4 py-3 mb-2"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 87}}
            , React.createElement('div', { className: "w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold"        , __self: this, __source: {fileName: _jsxFileName, lineNumber: 88}}
              , _optionalChain([user, 'optionalAccess', _ => _.username, 'access', _2 => _2.charAt, 'call', _3 => _3(0), 'access', _4 => _4.toUpperCase, 'call', _5 => _5()])
            )
            , React.createElement('div', { className: "flex-1 min-w-0" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 91}}
              , React.createElement('p', { className: "text-sm font-medium truncate"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 92}}, _optionalChain([user, 'optionalAccess', _6 => _6.username]))
              , React.createElement('p', { className: "text-xs text-muted-foreground" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 93}}, "Online")
            )
          )
          , React.createElement(Button, { 
            variant: "ghost", 
            className: "w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10 gap-3"     ,
            onClick: handleLogout, __self: this, __source: {fileName: _jsxFileName, lineNumber: 96}}

            , React.createElement(LogOut, { size: 20, __self: this, __source: {fileName: _jsxFileName, lineNumber: 101}} ), "Sign Out"

          )
        )
      )

      /* Main Content */
      , React.createElement('main', { className: "flex-1 min-w-0 flex flex-col min-h-screen"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 108}}
        , React.createElement('div', { className: "md:hidden p-4 border-b border-border bg-card flex items-center justify-between sticky top-0 z-30"          , __self: this, __source: {fileName: _jsxFileName, lineNumber: 109}}
          , React.createElement('h1', { className: "text-xl font-display font-bold text-primary"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 110}}, "CareCircle+")
          , React.createElement('button', { 
            className: "p-2 text-foreground" ,
            onClick: () => setMobileMenuOpen(true), __self: this, __source: {fileName: _jsxFileName, lineNumber: 111}}

            , React.createElement(Menu, { size: 24, __self: this, __source: {fileName: _jsxFileName, lineNumber: 115}} )
          )
        )
        , React.createElement('div', { className: "flex-1 p-4 md:p-8 lg:p-12 max-w-7xl mx-auto w-full"      , __self: this, __source: {fileName: _jsxFileName, lineNumber: 118}}
          , children
        )
      )
    )
  );
}



