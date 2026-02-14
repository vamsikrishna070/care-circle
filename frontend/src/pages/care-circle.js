import React from "react";
import { Layout } from "@/components/layout";
import { useCareCircle } from "@/hooks/use-care-circle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { BellRing, Plus, Phone, Mail, UserRound, Loader2 } from "lucide-react";

const _jsxFileName = "src\\pages\\care-circle.tsx";
export default function CareCirclePage() {
  const { contacts, createContactMutation, notifyCircleMutation, isLoading } = useCareCircle();

  return (
    React.createElement(Layout, {__self: this, __source: {fileName: _jsxFileName, lineNumber: 17}}
      , React.createElement('div', { className: "max-w-4xl mx-auto space-y-8"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 18}}
        , React.createElement('div', { className: "flex flex-col md:flex-row md:items-center justify-between gap-4"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 19}}
          , React.createElement('div', { className: "space-y-1", __self: this, __source: {fileName: _jsxFileName, lineNumber: 20}}
            , React.createElement('h1', { className: "text-3xl font-display font-bold text-foreground"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 21}}, "Care Circle" )
            , React.createElement('p', { className: "text-muted-foreground", __self: this, __source: {fileName: _jsxFileName, lineNumber: 22}}, "Your trusted support network."   )
          )

          , React.createElement('div', { className: "flex gap-3" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 25}}
             , React.createElement(AddContactDialog, { onAdd: (data) => createContactMutation.mutate(data), isPending: createContactMutation.isPending, __self: this, __source: {fileName: _jsxFileName, lineNumber: 26}} )

             , React.createElement(Dialog, {__self: this, __source: {fileName: _jsxFileName, lineNumber: 28}}
               , React.createElement(DialogTrigger, { asChild: true, __self: this, __source: {fileName: _jsxFileName, lineNumber: 29}}
                 , React.createElement(Button, { variant: "destructive", className: "shadow-lg shadow-destructive/20 animate-pulse"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 30}}
                   , React.createElement(BellRing, { className: "mr-2 h-4 w-4"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 31}} ), "Alert Circle"

                 )
               )
               , React.createElement(DialogContent, {__self: this, __source: {fileName: _jsxFileName, lineNumber: 35}}
                 , React.createElement(DialogHeader, {__self: this, __source: {fileName: _jsxFileName, lineNumber: 36}}
                   , React.createElement(DialogTitle, {__self: this, __source: {fileName: _jsxFileName, lineNumber: 37}}, "Send Alert?" )
                   , React.createElement(DialogDescription, {__self: this, __source: {fileName: _jsxFileName, lineNumber: 38}}, "This will notify all your Care Circle contacts that you need support immediately."

                   )
                 )
                 , React.createElement('div', { className: "flex justify-end gap-3 mt-4"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 42}}
                   , React.createElement(Button, { 
                     variant: "destructive", 
                     onClick: () => notifyCircleMutation.mutate(),
                     disabled: notifyCircleMutation.isPending, __self: this, __source: {fileName: _jsxFileName, lineNumber: 43}}

                     , notifyCircleMutation.isPending ? "Sending..." : "Yes, Send Alert"
                   )
                 )
               )
             )
          )
        )

        , isLoading ? (
          React.createElement('div', { className: "flex justify-center py-20"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 57}}, React.createElement(Loader2, { className: "animate-spin", __self: this, __source: {fileName: _jsxFileName, lineNumber: 57}} ))
        ) : contacts.length === 0 ? (
          React.createElement('div', { className: "text-center py-20 bg-muted/20 rounded-2xl border border-dashed"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 59}}
            , React.createElement(UserRound, { className: "w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 60}} )
            , React.createElement('h3', { className: "text-lg font-medium text-foreground"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 61}}, "No contacts yet"  )
            , React.createElement('p', { className: "text-muted-foreground mb-4" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 62}}, "Add trusted friends or family members."     )
            , React.createElement(AddContactDialog, { onAdd: (data) => createContactMutation.mutate(data), isPending: createContactMutation.isPending, __self: this, __source: {fileName: _jsxFileName, lineNumber: 63}} )
          )
        ) : (
          React.createElement('div', { className: "grid md:grid-cols-2 lg:grid-cols-3 gap-6"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 66}}
            , contacts.map((contact) => (
              React.createElement(Card, { key: contact._id, className: "hover:shadow-md transition-all border-border/60"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 68}}
                , React.createElement(CardHeader, { className: "flex flex-row items-center gap-4 pb-2"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 69}}
                  , React.createElement(Avatar, { className: "h-12 w-12 bg-primary/10 text-primary"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 70}}
                    , React.createElement(AvatarFallback, {__self: this, __source: {fileName: _jsxFileName, lineNumber: 71}}, contact.name.charAt(0).toUpperCase())
                  )
                  , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 73}}
                    , React.createElement(CardTitle, { className: "text-lg", __self: this, __source: {fileName: _jsxFileName, lineNumber: 74}}, contact.name)
                    , React.createElement(CardDescription, { className: "text-xs", __self: this, __source: {fileName: _jsxFileName, lineNumber: 75}}, "Trusted Contact" )
                  )
                )
                , React.createElement(CardContent, { className: "space-y-3 pt-2" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 78}}
                  , React.createElement('div', { className: "flex items-center gap-3 text-sm text-muted-foreground bg-muted/30 p-2 rounded-lg"       , __self: this, __source: {fileName: _jsxFileName, lineNumber: 79}}
                    , React.createElement(Mail, { className: "w-4 h-4 text-primary"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 80}} )
                    , React.createElement('span', { className: "truncate", __self: this, __source: {fileName: _jsxFileName, lineNumber: 81}}, contact.email)
                  )
                  , contact.phone && (
                    React.createElement('div', { className: "flex items-center gap-3 text-sm text-muted-foreground bg-muted/30 p-2 rounded-lg"       , __self: this, __source: {fileName: _jsxFileName, lineNumber: 84}}
                      , React.createElement(Phone, { className: "w-4 h-4 text-primary"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 85}} )
                      , React.createElement('span', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 86}}, contact.phone)
                    )
                  )
                )
              )
            ))
          )
        )
      )
    )
  );
}

const careContactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Enter a valid email"),
  phone: z.string().optional().or(z.literal("")),
});



function AddContactDialog({ onAdd, isPending }) {
  const form = useForm({
    resolver: zodResolver(careContactSchema),
    defaultValues: { name: "", email: "", phone: "" }
  });

  return (
    React.createElement(Dialog, {__self: this, __source: {fileName: _jsxFileName, lineNumber: 114}}
      , React.createElement(DialogTrigger, { asChild: true, __self: this, __source: {fileName: _jsxFileName, lineNumber: 115}}
        , React.createElement(Button, { variant: "outline", __self: this, __source: {fileName: _jsxFileName, lineNumber: 116}}
          , React.createElement(Plus, { className: "mr-2 h-4 w-4"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 117}} ), " Add Contact"
        )
      )
      , React.createElement(DialogContent, {__self: this, __source: {fileName: _jsxFileName, lineNumber: 120}}
        , React.createElement(DialogHeader, {__self: this, __source: {fileName: _jsxFileName, lineNumber: 121}}
          , React.createElement(DialogTitle, {__self: this, __source: {fileName: _jsxFileName, lineNumber: 122}}, "Add to Care Circle"   )
          , React.createElement(DialogDescription, {__self: this, __source: {fileName: _jsxFileName, lineNumber: 123}}, "Add someone you trust to receive alerts when you need help."          )
        )
        , React.createElement('form', {
          onSubmit: form.handleSubmit((data) =>
            onAdd({ ...data, phone: data.phone || undefined })
          ),
          className: "space-y-4 mt-4" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 125}}

          , React.createElement('div', { className: "space-y-2", __self: this, __source: {fileName: _jsxFileName, lineNumber: 131}}
            , React.createElement('label', { className: "text-sm font-medium" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 132}}, "Name")
            , React.createElement(Input, { ...form.register("name"), placeholder: "Jane Doe" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 133}} )
            , form.formState.errors.name && React.createElement('p', { className: "text-xs text-destructive" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 134}}, form.formState.errors.name.message)
          )
          , React.createElement('div', { className: "space-y-2", __self: this, __source: {fileName: _jsxFileName, lineNumber: 136}}
            , React.createElement('label', { className: "text-sm font-medium" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 137}}, "Email")
            , React.createElement(Input, { ...form.register("email"), placeholder: "jane@example.com", __self: this, __source: {fileName: _jsxFileName, lineNumber: 138}} )
            , form.formState.errors.email && React.createElement('p', { className: "text-xs text-destructive" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 139}}, form.formState.errors.email.message)
          )
          , React.createElement('div', { className: "space-y-2", __self: this, __source: {fileName: _jsxFileName, lineNumber: 141}}
            , React.createElement('label', { className: "text-sm font-medium" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 142}}, "Phone (Optional)" )
            , React.createElement(Input, { ...form.register("phone"), placeholder: "+1234567890", __self: this, __source: {fileName: _jsxFileName, lineNumber: 143}} )
          )
          , React.createElement(Button, { type: "submit", className: "w-full", disabled: isPending, __self: this, __source: {fileName: _jsxFileName, lineNumber: 145}}
            , isPending ? "Adding..." : "Add Contact"
          )
        )
      )
    )
  );
}



