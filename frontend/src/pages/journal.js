import React from "react";
import { Layout } from "@/components/layout";
import { useJournal } from "@/hooks/use-journal";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, PenLine } from "lucide-react";
import { motion } from "framer-motion";

const _jsxFileName = "src\\pages\\journal.tsx";
export default function JournalPage() {
  const { entries, createEntryMutation, isLoading } = useJournal();
  
  const entrySchema = z.object({
    content: z.string().min(1, "Write a few words before saving"),
  });

  const form = useForm({
    resolver: zodResolver(entrySchema),
    defaultValues: { content: "" }
  });

  const onSubmit = (data) => {
    createEntryMutation.mutate(data, {
      onSuccess: () => form.reset()
    });
  };

  if (isLoading) {
    return (
      React.createElement(Layout, {__self: this, __source: {fileName: _jsxFileName, lineNumber: 33}}
        , React.createElement('div', { className: "flex justify-center py-20"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 34}}, React.createElement(Loader2, { className: "animate-spin", __self: this, __source: {fileName: _jsxFileName, lineNumber: 34}} ))
      )
    );
  }

  return (
    React.createElement(Layout, {__self: this, __source: {fileName: _jsxFileName, lineNumber: 40}}
      , React.createElement('div', { className: "grid md:grid-cols-2 gap-8 h-[calc(100vh-8rem)]"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 41}}
        /* Write Section */
        , React.createElement('div', { className: "flex flex-col gap-6"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 43}}
          , React.createElement('div', { className: "space-y-1", __self: this, __source: {fileName: _jsxFileName, lineNumber: 44}}
            , React.createElement('h1', { className: "text-3xl font-display font-bold"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 45}}, "Journal")
            , React.createElement('p', { className: "text-muted-foreground", __self: this, __source: {fileName: _jsxFileName, lineNumber: 46}}, "Express your thoughts freely."   )
          )

          , React.createElement(Card, { className: "flex-1 flex flex-col shadow-lg border-border/60"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 49}}
            , React.createElement(CardHeader, {__self: this, __source: {fileName: _jsxFileName, lineNumber: 50}}
              , React.createElement(CardTitle, { className: "flex items-center gap-2 text-lg"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 51}}
                , React.createElement(PenLine, { className: "w-5 h-5 text-primary"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 52}} ), "New Entry"

              )
            )
            , React.createElement(CardContent, { className: "flex-1 flex flex-col gap-4"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 56}}
              , React.createElement('form', { onSubmit: form.handleSubmit(onSubmit), className: "flex-1 flex flex-col gap-4"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 57}}
                , React.createElement(Textarea, { 
                  placeholder: "What's on your mind today?"    , 
                  className: "flex-1 resize-none bg-muted/20 border-border focus:border-primary/50 text-lg leading-relaxed p-4"       ,
                  ...form.register("content"), __self: this, __source: {fileName: _jsxFileName, lineNumber: 58}}
                )
                , React.createElement('div', { className: "flex justify-end" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 63}}
                  , React.createElement(Button, { type: "submit", disabled: createEntryMutation.isPending || !form.formState.isDirty, __self: this, __source: {fileName: _jsxFileName, lineNumber: 64}}
                    , createEntryMutation.isPending ? "Saving..." : "Save Entry"
                  )
                )
              )
            )
          )
        )

        /* List Section */
        , React.createElement('div', { className: "bg-muted/30 rounded-2xl p-6 overflow-y-auto space-y-4"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 74}}
          , React.createElement('h2', { className: "font-display font-bold text-xl mb-4 text-foreground/80"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 75}}, "Past Entries" )
          , entries.length === 0 ? (
            React.createElement('div', { className: "text-center py-20 text-muted-foreground"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 77}}
              , React.createElement('p', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 78}}, "No entries yet. Write your first one!"      )
            )
          ) : (
            entries.map((entry, i) => (
              React.createElement(motion.div, { 
                key: entry._id,
                initial: { opacity: 0, y: 10 },
                animate: { opacity: 1, y: 0 },
                transition: { delay: i * 0.05 }, __self: this, __source: {fileName: _jsxFileName, lineNumber: 82}}

                , React.createElement(Card, { className: "hover:shadow-md transition-shadow border-border/50"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 88}}
                  , React.createElement(CardContent, { className: "p-4 space-y-2" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 89}}
                    , React.createElement('div', { className: "text-xs text-muted-foreground font-medium"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 90}}
                      , format(new Date(entry.createdAt), "MMMM do, yyyy 'at' h:mm a")
                    )
                    , React.createElement('p', { className: "text-foreground/90 leading-relaxed whitespace-pre-wrap"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 93}}
                      , entry.content
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



