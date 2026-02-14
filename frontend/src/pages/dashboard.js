import React from "react";
import { Layout } from "@/components/layout";
import { useAuth } from "@/hooks/use-auth";
import { useMoods } from "@/hooks/use-moods";
import { useDashboard } from "@/hooks/use-dashboard";
import { useJournal } from "@/hooks/use-journal";
import { StatsCard } from "@/components/stats-card";
import { RiskBadge } from "@/components/risk-badge";
import { MoodChart } from "@/components/mood-chart";
import { Flame, SmilePlus, BookOpen, ExternalLink, Loader2 } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { motion } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const _jsxFileName = "src\\pages\\dashboard.tsx";
export default function Dashboard() {
  const { user } = useAuth();
  const { moods } = useMoods();
  const { stats, isLoading } = useDashboard();
  const { entries } = useJournal();

  const recentEntries = entries.slice(0, 2);

  if (isLoading || !user || !stats) {
    return (
      React.createElement(Layout, {__self: this, __source: {fileName: _jsxFileName, lineNumber: 28}}
        , React.createElement('div', { className: "h-full flex items-center justify-center"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 29}}
          , React.createElement(Loader2, { className: "h-10 w-10 animate-spin text-primary"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 30}} )
        )
      )
    );
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    React.createElement(Layout, {__self: this, __source: {fileName: _jsxFileName, lineNumber: 52}}
      , React.createElement(motion.div, { 
        variants: container,
        initial: "hidden",
        animate: "show",
        className: "space-y-8", __self: this, __source: {fileName: _jsxFileName, lineNumber: 53}}

        , React.createElement('div', { className: "flex flex-col md:flex-row md:items-center justify-between gap-4"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 59}}
          , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 60}}
            , React.createElement('h1', { className: "text-3xl font-display font-bold text-foreground"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 61}}, "Hello, "
               , user.username
            )
            , React.createElement('p', { className: "text-muted-foreground mt-1" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 64}}, "Here's how you're doing today."    )
          )
          , React.createElement('div', { className: "flex items-center gap-4"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 66}}
            , React.createElement(RiskBadge, { level: stats.riskLevel, __self: this, __source: {fileName: _jsxFileName, lineNumber: 67}} )
            , React.createElement(Link, { href: "/mood", __self: this, __source: {fileName: _jsxFileName, lineNumber: 68}}
              , React.createElement(Button, { className: "shadow-lg shadow-primary/20" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 69}}
                , React.createElement(SmilePlus, { className: "mr-2 h-4 w-4"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 70}} ), "Log Mood"

              )
            )
          )
        )

        /* High Risk Alert Dialog */
        , stats.riskLevel === "High" && (
          React.createElement('div', { className: "bg-destructive/10 border border-destructive/20 p-4 rounded-xl flex items-center justify-between"       , __self: this, __source: {fileName: _jsxFileName, lineNumber: 79}}
            , React.createElement('div', { className: "flex items-center gap-3"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 80}}
              , React.createElement('div', { className: "p-2 bg-destructive/20 rounded-full text-destructive"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 81}}
                , React.createElement(Flame, { size: 20, __self: this, __source: {fileName: _jsxFileName, lineNumber: 82}} )
              )
              , React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 84}}
                , React.createElement('h3', { className: "font-bold text-destructive" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 85}}, "High Risk Detected"  )
                , React.createElement('p', { className: "text-sm text-destructive/80" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 86}}, "We noticed you're having a tough time."      )
              )
            )
            , React.createElement(Dialog, {__self: this, __source: {fileName: _jsxFileName, lineNumber: 89}}
              , React.createElement(DialogTrigger, { asChild: true, __self: this, __source: {fileName: _jsxFileName, lineNumber: 90}}
                , React.createElement(Button, { variant: "destructive", size: "sm", __self: this, __source: {fileName: _jsxFileName, lineNumber: 91}}, "Get Help" )
              )
              , React.createElement(DialogContent, {__self: this, __source: {fileName: _jsxFileName, lineNumber: 93}}
                , React.createElement(DialogHeader, {__self: this, __source: {fileName: _jsxFileName, lineNumber: 94}}
                  , React.createElement(DialogTitle, {__self: this, __source: {fileName: _jsxFileName, lineNumber: 95}}, "We're here for you"   )
                  , React.createElement(DialogDescription, {__self: this, __source: {fileName: _jsxFileName, lineNumber: 96}}, "Your recent mood patterns suggest you might need support. Consider reaching out to your Care Circle or a professional."

                  )
                )
                , React.createElement('div', { className: "flex flex-col gap-2 mt-4"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 100}}
                  , React.createElement(Link, { href: "/care-circle", __self: this, __source: {fileName: _jsxFileName, lineNumber: 101}}
                    , React.createElement(Button, { className: "w-full", variant: "outline", __self: this, __source: {fileName: _jsxFileName, lineNumber: 102}}, "Contact Care Circle"  )
                  )
                  , React.createElement(Link, { href: "/support", __self: this, __source: {fileName: _jsxFileName, lineNumber: 104}}
                    , React.createElement(Button, { className: "w-full", __self: this, __source: {fileName: _jsxFileName, lineNumber: 105}}, "Chat with Anonymous Support"   )
                  )
                )
              )
            )
          )
        )

        /* Stats Grid */
        , React.createElement('div', { className: "grid grid-cols-1 md:grid-cols-3 gap-6"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 114}}
          , React.createElement(motion.div, { variants: item, __self: this, __source: {fileName: _jsxFileName, lineNumber: 115}}
            , React.createElement(StatsCard, {
              title: "Current Streak" ,
              value: `${stats.currentStreak} Days`,
              icon: React.createElement(Flame, { size: 24, __self: this, __source: {fileName: _jsxFileName, lineNumber: 119}} ),
              color: "primary",
              trend: "Keep it up!"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 116}}
            )
          )
          , React.createElement(motion.div, { variants: item, __self: this, __source: {fileName: _jsxFileName, lineNumber: 124}}
            , React.createElement(StatsCard, {
              title: "Average Mood" ,
              value: stats.averageMood || "N/A",
              icon: React.createElement(SmilePlus, { size: 24, __self: this, __source: {fileName: _jsxFileName, lineNumber: 128}} ),
              color: "secondary",
              trend: "Past 7 days"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 125}}
            )
          )
          , React.createElement(motion.div, { variants: item, __self: this, __source: {fileName: _jsxFileName, lineNumber: 133}}
            , React.createElement(StatsCard, {
              title: "Total Entries" ,
              value: stats.totalEntries,
              icon: React.createElement(BookOpen, { size: 24, __self: this, __source: {fileName: _jsxFileName, lineNumber: 137}} ),
              color: "accent",
              trend: "Lifetime entries" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 134}}
            )
          )
        )

        /* Chart Section */
        , React.createElement(motion.div, { variants: item, className: "bg-card p-6 rounded-2xl shadow-sm border border-border"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 145}}
          , React.createElement('div', { className: "flex items-center justify-between mb-6"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 146}}
            , React.createElement('h2', { className: "text-lg font-bold" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 147}}, "Mood Trends" )
            , React.createElement('select', { className: "bg-muted px-3 py-1 rounded-lg text-sm outline-none border-none"      , __self: this, __source: {fileName: _jsxFileName, lineNumber: 148}}
              , React.createElement('option', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 149}}, "Last 10 Days"  )
            )
          )
          , React.createElement(MoodChart, { data: moods, __self: this, __source: {fileName: _jsxFileName, lineNumber: 152}} )
        )

        /* Recent Activity */
        , React.createElement(motion.div, { variants: item, __self: this, __source: {fileName: _jsxFileName, lineNumber: 156}}
          , React.createElement('div', { className: "flex items-center justify-between mb-4"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 157}}
            , React.createElement('h2', { className: "text-lg font-bold" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 158}}, "Recent Journaling" )
            , React.createElement(Link, { href: "/journal", __self: this, __source: {fileName: _jsxFileName, lineNumber: 159}}
              , React.createElement(Button, { variant: "ghost", size: "sm", className: "text-muted-foreground hover:text-primary" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 160}}, "View All "
                  , React.createElement(ExternalLink, { className: "ml-2 h-3 w-3"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 161}} )
              )
            )
          )
          , React.createElement('div', { className: "grid gap-4 md:grid-cols-2 lg:grid-cols-3"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 165}}
             /* Recent journal entries */
             , recentEntries.map((entry) =>
               React.createElement('div', { 
                 key: entry._id,
                 className: "bg-card p-4 rounded-xl border border-border/50 hover:border-border transition-colors group cursor-pointer"        , __self: this, __source: {fileName: _jsxFileName, lineNumber: 167}}
                 , React.createElement('p', { className: "text-muted-foreground text-sm mb-2"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 168}}
                   , formatDistanceToNow(new Date(entry.createdAt), { addSuffix: true })
                 )
                 , React.createElement('p', { className: "font-medium line-clamp-2 text-foreground group-hover:text-primary transition-colors"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 169}}
                   , entry.content
                 )
               )
             )
             , React.createElement(Link, { href: "/journal", __self: this, __source: {fileName: _jsxFileName, lineNumber: 179}}
                , React.createElement('div', { className: "bg-muted/30 border border-dashed border-border p-4 rounded-xl flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-colors cursor-pointer h-full"              , __self: this, __source: {fileName: _jsxFileName, lineNumber: 180}}, "+ Write new entry"

                )
             )
          )
        )
      )
    )
  );
}



