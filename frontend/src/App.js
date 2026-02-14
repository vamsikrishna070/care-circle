import React from "react";
import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

import NotFound from "@/pages/not-found";
import AuthPage from "@/pages/auth-page";
import Dashboard from "@/pages/dashboard";
import MoodCheckIn from "@/pages/mood-check-in";
import JournalPage from "@/pages/journal";
import CareCirclePage from "@/pages/care-circle";
import AnonymousSupportPage from "@/pages/anonymous-support";
import { ProtectedRoute } from "@/components/protected-route";

const _jsxFileName = "src\\App.tsx";
function Router() {
  return (
    React.createElement(Switch, {__self: this, __source: {fileName: _jsxFileName, lineNumber: 18}}
      , React.createElement(Route, { path: "/auth", component: AuthPage, __self: this, __source: {fileName: _jsxFileName, lineNumber: 19}} )
      , React.createElement(ProtectedRoute, { path: "/", component: Dashboard, __self: this, __source: {fileName: _jsxFileName, lineNumber: 20}} )
      , React.createElement(ProtectedRoute, { path: "/mood", component: MoodCheckIn, __self: this, __source: {fileName: _jsxFileName, lineNumber: 21}} )
      , React.createElement(ProtectedRoute, { path: "/journal", component: JournalPage, __self: this, __source: {fileName: _jsxFileName, lineNumber: 22}} )
      , React.createElement(ProtectedRoute, { path: "/care-circle", component: CareCirclePage, __self: this, __source: {fileName: _jsxFileName, lineNumber: 23}} )
      , React.createElement(ProtectedRoute, { path: "/support", component: AnonymousSupportPage, __self: this, __source: {fileName: _jsxFileName, lineNumber: 24}} )
      , React.createElement(Route, { component: NotFound, __self: this, __source: {fileName: _jsxFileName, lineNumber: 25}} )
    )
  );
}

function App() {
  return (
    React.createElement(QueryClientProvider, { client: queryClient, __self: this, __source: {fileName: _jsxFileName, lineNumber: 32}}
      , React.createElement(TooltipProvider, {__self: this, __source: {fileName: _jsxFileName, lineNumber: 33}}
        , React.createElement(Router, {__self: this, __source: {fileName: _jsxFileName, lineNumber: 34}} )
        , React.createElement(Toaster, {__self: this, __source: {fileName: _jsxFileName, lineNumber: 35}} )
      )
    )
  );
}

export default App;



