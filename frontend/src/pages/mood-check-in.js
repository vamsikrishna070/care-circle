import React from "react";
import { Layout } from "@/components/layout";
import { useMoods } from "@/hooks/use-moods";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { useLocation } from "wouter";
import { Loader2, Smile, Frown, Meh, Angry, Zap, Heart, CloudRain, Sun } from "lucide-react";
import { motion } from "framer-motion";

const _jsxFileName = "src\\pages\\mood-check-in.tsx";
const MOODS = [
  { label: "Happy", score: 8, icon: Smile, color: "bg-green-100 text-green-600 border-green-200" },
  { label: "Excited", score: 9, icon: Zap, color: "bg-yellow-100 text-yellow-600 border-yellow-200" },
  { label: "Grateful", score: 10, icon: Heart, color: "bg-pink-100 text-pink-600 border-pink-200" },
  { label: "Calm", score: 7, icon: Sun, color: "bg-blue-100 text-blue-600 border-blue-200" },
  { label: "Neutral", score: 5, icon: Meh, color: "bg-gray-100 text-gray-600 border-gray-200" },
  { label: "Tired", score: 4, icon: CloudRain, color: "bg-indigo-100 text-indigo-600 border-indigo-200" },
  { label: "Sad", score: 3, icon: Frown, color: "bg-blue-100 text-blue-800 border-blue-300" },
  { label: "Anxious", score: 2, icon:  CloudRain, color: "bg-purple-100 text-purple-600 border-purple-200" }, // Using CloudRain as proxy for anxious cloud
  { label: "Frustrated", score: 2, icon: Angry, color: "bg-red-100 text-red-600 border-red-200" },
];

export default function MoodCheckIn() {
  const { createMoodMutation } = useMoods();
  const [selectedMood, setSelectedMood] = useState(null);
  const [, setLocation] = useLocation();

  const handleSubmit = () => {
    if (!selectedMood) return;
    const moodObj = MOODS.find(m => m.label === selectedMood);
    if (!moodObj) return;

    createMoodMutation.mutate(
      { mood: moodObj.label, score: moodObj.score },
      {
        onSuccess: () => setLocation("/")
      }
    );
  };

  return (
    React.createElement(Layout, {__self: this, __source: {fileName: _jsxFileName, lineNumber: 41}}
      , React.createElement('div', { className: "max-w-3xl mx-auto text-center space-y-8 py-10"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 42}}
        , React.createElement('div', { className: "space-y-2", __self: this, __source: {fileName: _jsxFileName, lineNumber: 43}}
          , React.createElement('h1', { className: "text-3xl font-display font-bold"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 44}}, "How are you feeling?"   )
          , React.createElement('p', { className: "text-muted-foreground", __self: this, __source: {fileName: _jsxFileName, lineNumber: 45}}, "Select the option that best describes your current state."        )
        )

        , React.createElement('div', { className: "grid grid-cols-2 md:grid-cols-3 gap-4"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 48}}
          , MOODS.map((mood) => {
            const Icon = mood.icon;
            const isSelected = selectedMood === mood.label;
            
            return (
              React.createElement(motion.button, {
                key: mood.label,
                whileHover: { scale: 1.02 },
                whileTap: { scale: 0.98 },
                onClick: () => setSelectedMood(mood.label),
                className: cn(
                  "p-6 rounded-2xl border-2 transition-all duration-200 flex flex-col items-center gap-4",
                  isSelected 
                    ? `border-primary ring-2 ring-primary/20 ${mood.color}` 
                    : "bg-card border-border hover:border-primary/50 text-muted-foreground hover:text-foreground"
                ), __self: this, __source: {fileName: _jsxFileName, lineNumber: 54}}

                , React.createElement('div', { className: cn(
                  "p-4 rounded-full bg-white/50 backdrop-blur-sm",
                  isSelected ? "text-current" : "text-muted-foreground"
                ), __self: this, __source: {fileName: _jsxFileName, lineNumber: 66}}
                  , React.createElement(Icon, { size: 32, __self: this, __source: {fileName: _jsxFileName, lineNumber: 70}} )
                )
                , React.createElement('span', { className: "font-semibold text-lg" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 72}}, mood.label)
              )
            );
          })
        )

        , React.createElement(Button, { 
          size: "lg", 
          className: "w-full max-w-xs text-lg font-semibold shadow-xl shadow-primary/20"     ,
          disabled: !selectedMood || createMoodMutation.isPending,
          onClick: handleSubmit, __self: this, __source: {fileName: _jsxFileName, lineNumber: 78}}

          , createMoodMutation.isPending ? (
            React.createElement(React.Fragment, null, React.createElement(Loader2, { className: "mr-2 h-5 w-5 animate-spin"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 85}} ), " Saving..." )
          ) : (
            "Check In"
          )
        )
      )
    )
  );
}



