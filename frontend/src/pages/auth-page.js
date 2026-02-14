import React from "react";
import { useAuth } from "@/hooks/use-auth";
import { useLocation } from "wouter";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2 } from "lucide-react";

const _jsxFileName = "src\\pages\\auth-page.tsx";
export default function AuthPage() {
  const { user, loginMutation, registerMutation } = useAuth();
  const [, setLocation] = useLocation();

  React.useEffect(() => {
    if (user) {
      setLocation("/");
    }
  }, [user, setLocation]);

  if (user) {
    return null;
  }

  return (
    React.createElement('div', { className: "min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-background to-secondary/20 p-4"        , __self: this, __source: {fileName: _jsxFileName, lineNumber: 24}}
      , React.createElement(Card, { className: "w-full max-w-md shadow-xl border-border/50 backdrop-blur-sm bg-card/95"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 25}}
        , React.createElement(CardHeader, { className: "text-center space-y-2" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 26}}
          , React.createElement('h1', { className: "text-3xl font-display font-bold text-primary"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 27}}, "CareCircle+")
          , React.createElement(CardDescription, {__self: this, __source: {fileName: _jsxFileName, lineNumber: 28}}, "Your safe space for emotional wellness"     )
        )
        , React.createElement(CardContent, {__self: this, __source: {fileName: _jsxFileName, lineNumber: 30}}
          , React.createElement(Tabs, { defaultValue: "login", className: "w-full", __self: this, __source: {fileName: _jsxFileName, lineNumber: 31}}
            , React.createElement(TabsList, { className: "grid w-full grid-cols-2 mb-6"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 32}}
              , React.createElement(TabsTrigger, { value: "login", __self: this, __source: {fileName: _jsxFileName, lineNumber: 33}}, "Sign In" )
              , React.createElement(TabsTrigger, { value: "register", __self: this, __source: {fileName: _jsxFileName, lineNumber: 34}}, "Create Account" )
            )

            , React.createElement(TabsContent, { value: "login", __self: this, __source: {fileName: _jsxFileName, lineNumber: 37}}
              , React.createElement(AuthForm, { 
                mode: "login", 
                onSubmit: (data) => loginMutation.mutate(data),
                isPending: loginMutation.isPending, __self: this, __source: {fileName: _jsxFileName, lineNumber: 38}}
              )
            )

            , React.createElement(TabsContent, { value: "register", __self: this, __source: {fileName: _jsxFileName, lineNumber: 45}}
              , React.createElement(AuthForm, { 
                mode: "register", 
                onSubmit: (data) => registerMutation.mutate(data),
                isPending: registerMutation.isPending, __self: this, __source: {fileName: _jsxFileName, lineNumber: 46}}
              )
            )
          )
        )
      )
    )
  );
}

function AuthForm({ mode, onSubmit, isPending }



) {
  const schema = z.object({
    username: z.string().min(3, "Username must be at least 3 characters"),
    password: z.string().min(6, "Password must be at least 6 characters"),
  });

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      username: "",
      password: ""
    }
  });

  return (
    React.createElement('form', { onSubmit: form.handleSubmit(onSubmit), className: "space-y-4", __self: this, __source: {fileName: _jsxFileName, lineNumber: 78}}
      , React.createElement('div', { className: "space-y-2", __self: this, __source: {fileName: _jsxFileName, lineNumber: 79}}
        , React.createElement(Label, { htmlFor: `${mode}-username`, __self: this, __source: {fileName: _jsxFileName, lineNumber: 80}}, "Username")
        , React.createElement(Input, { 
          id: `${mode}-username`, 
          ...form.register("username"), 
          placeholder: "Enter your username"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 81}}
        )
        , form.formState.errors.username && (
          React.createElement('p', { className: "text-sm text-destructive" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 87}}, form.formState.errors.username.message)
        )
      )

      , React.createElement('div', { className: "space-y-2", __self: this, __source: {fileName: _jsxFileName, lineNumber: 91}}
        , React.createElement(Label, { htmlFor: `${mode}-password`, __self: this, __source: {fileName: _jsxFileName, lineNumber: 92}}, "Password")
        , React.createElement(Input, { 
          id: `${mode}-password`, 
          type: "password", 
          ...form.register("password"), 
          placeholder: "Enter your password"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 93}}
        )
        , form.formState.errors.password && (
          React.createElement('p', { className: "text-sm text-destructive" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 100}}, form.formState.errors.password.message)
        )
      )

      , React.createElement(Button, { type: "submit", className: "w-full font-bold" , disabled: isPending, __self: this, __source: {fileName: _jsxFileName, lineNumber: 104}}
        , isPending && React.createElement(Loader2, { className: "mr-2 h-4 w-4 animate-spin"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 105}} )
        , mode === "login" ? "Sign In" : "Create Account"
      )
    )
  );
}



