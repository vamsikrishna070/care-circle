import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

const _jsxFileName = "src\\pages\\not-found.tsx";
export default function NotFound() {
  return (
    React.createElement('div', { className: "min-h-screen w-full flex items-center justify-center bg-gray-50 p-4"      , __self: this, __source: {fileName: _jsxFileName, lineNumber: 8}}
      , React.createElement(Card, { className: "w-full max-w-md mx-4"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 9}}
        , React.createElement(CardContent, { className: "pt-6", __self: this, __source: {fileName: _jsxFileName, lineNumber: 10}}
          , React.createElement('div', { className: "flex mb-4 gap-2"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 11}}
            , React.createElement(AlertCircle, { className: "h-8 w-8 text-red-500"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 12}} )
            , React.createElement('h1', { className: "text-2xl font-bold text-gray-900"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 13}}, "404 Page Not Found"   )
          )

          , React.createElement('p', { className: "mt-4 text-sm text-gray-600"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 16}}, "The page you are looking for does not exist."

          )

          , React.createElement('div', { className: "mt-6", __self: this, __source: {fileName: _jsxFileName, lineNumber: 20}}
            , React.createElement(Link, { href: "/", __self: this, __source: {fileName: _jsxFileName, lineNumber: 21}}
              , React.createElement(Button, { className: "w-full", __self: this, __source: {fileName: _jsxFileName, lineNumber: 22}}, "Return Home"

              )
            )
          )
        )
      )
    )
  );
}



