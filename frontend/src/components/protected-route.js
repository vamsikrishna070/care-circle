import React from "react";
import { useAuth } from "@/hooks/use-auth";
import { Loader2 } from "lucide-react";
import { Redirect, Route, } from "wouter";

const _jsxFileName = "src\\components\\protected-route.tsx";
export function ProtectedRoute({ component: Component, ...rest }) {
  const { user, isLoading } = useAuth();

  return (
    React.createElement(Route, {
      ...rest,
      component: (props) => {
        if (isLoading) {
          return (
            React.createElement('div', { className: "flex items-center justify-center min-h-screen bg-background"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 14}}
              , React.createElement(Loader2, { className: "h-10 w-10 animate-spin text-primary"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 15}} )
            )
          );
        }

        if (!user) {
          return React.createElement(Redirect, { to: "/auth", __self: this, __source: {fileName: _jsxFileName, lineNumber: 21}} );
        }

        // @ts-ignore - Component prop type is complex in wouter
        return React.createElement(Component, { ...props, __self: this, __source: {fileName: _jsxFileName, lineNumber: 25}} );
      }, __self: this, __source: {fileName: _jsxFileName, lineNumber: 9}}
    )
  );
}



