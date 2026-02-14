import React from "react";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { format } from "date-fns";








const _jsxFileName = "src\\components\\mood-chart.tsx";
export function MoodChart({ data }) {
  // Sort by date ascending
  const sortedData = [...data]
    .filter((log) => log.createdAt)
    .sort((a, b) => 
      new Date(a.createdAt ).getTime() - new Date(b.createdAt ).getTime()
    )
    .slice(-10); // Last 10 entries

  const chartData = sortedData.map(log => ({
    date: format(new Date(log.createdAt ), 'MMM d'),
    score: log.score, // 1-10 scale usually
    mood: log.mood
  }));

  if (data.length === 0) {
    return (
      React.createElement('div', { className: "h-64 flex items-center justify-center text-muted-foreground bg-muted/20 rounded-xl border border-dashed border-border"         , __self: this, __source: {fileName: _jsxFileName, lineNumber: 28}}, "No mood data available yet."

      )
    );
  }

  return (
    React.createElement('div', { className: "h-72 w-full" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 35}}
      , React.createElement(ResponsiveContainer, { width: "100%", height: "100%", __self: this, __source: {fileName: _jsxFileName, lineNumber: 36}}
        , React.createElement(LineChart, { data: chartData, margin: { top: 5, right: 20, bottom: 5, left: 0 }, __self: this, __source: {fileName: _jsxFileName, lineNumber: 37}}
          , React.createElement(CartesianGrid, { strokeDasharray: "3 3" , vertical: false, stroke: "hsl(var(--border))", __self: this, __source: {fileName: _jsxFileName, lineNumber: 38}} )
          , React.createElement(XAxis, { 
            dataKey: "date", 
            stroke: "hsl(var(--muted-foreground))", 
            fontSize: 12, 
            tickLine: false, 
            axisLine: false, __self: this, __source: {fileName: _jsxFileName, lineNumber: 39}}
          )
          , React.createElement(YAxis, { 
            stroke: "hsl(var(--muted-foreground))", 
            fontSize: 12, 
            tickLine: false, 
            axisLine: false, 
            domain: [0, 10], __self: this, __source: {fileName: _jsxFileName, lineNumber: 46}}
          )
          , React.createElement(Tooltip, { 
            contentStyle: { 
              backgroundColor: 'hsl(var(--card))', 
              borderColor: 'hsl(var(--border))', 
              borderRadius: '8px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)' 
            },
            itemStyle: { color: 'hsl(var(--primary))' }, __self: this, __source: {fileName: _jsxFileName, lineNumber: 53}}
          )
          , React.createElement(Line, { 
            type: "monotone", 
            dataKey: "score", 
            stroke: "hsl(var(--primary))", 
            strokeWidth: 3, 
            dot: { r: 4, fill: 'hsl(var(--primary))', strokeWidth: 0 },
            activeDot: { r: 6 }, __self: this, __source: {fileName: _jsxFileName, lineNumber: 62}}
          )
        )
      )
    )
  );
}



