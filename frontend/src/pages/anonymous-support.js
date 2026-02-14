import React from "react";
const _jsxFileName = "src\\pages\\anonymous-support.tsx";
 function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }import { Layout } from "@/components/layout";
import { useChat } from "@/hooks/use-chat";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { MessageCircleHeart, Send, Loader2, Shield, Heart } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

export default function AnonymousSupportPage() {
  const { activeSessionId, messages, isSearching, findMatch, cancelSearch, sendMessage, endSession } = useChat();
  const { user } = useAuth();
  const [inputValue, setInputValue] = useState("");
  const scrollRef = useRef(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = (e) => {
    _optionalChain([e, 'optionalAccess', _ => _.preventDefault, 'call', _2 => _2()]);
    if (!inputValue.trim()) return;
    sendMessage(inputValue);
    setInputValue("");
  };

  return (
    React.createElement(Layout, {__self: this, __source: {fileName: _jsxFileName, lineNumber: 32}}
      , React.createElement('div', { className: "h-[calc(100vh-8rem)] flex flex-col gap-6"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 33}}
        , React.createElement('div', { className: "space-y-1", __self: this, __source: {fileName: _jsxFileName, lineNumber: 34}}
          , React.createElement('h1', { className: "text-3xl font-display font-bold"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 35}}, "Anonymous Support" )
          , React.createElement('p', { className: "text-muted-foreground flex items-center gap-2"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 36}}
            , React.createElement(Shield, { className: "w-4 h-4" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 37}} ), " Private, secure peer support."
          )
        )

        , React.createElement(Card, { className: "flex-1 flex flex-col overflow-hidden shadow-xl border-border/60"     , __self: this, __source: {fileName: _jsxFileName, lineNumber: 41}}
          , !activeSessionId ? (
            React.createElement('div', { className: "flex-1 flex flex-col items-center justify-center p-8 text-center bg-muted/10"       , __self: this, __source: {fileName: _jsxFileName, lineNumber: 43}}
              , React.createElement('div', { className: "w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-6 text-primary relative"        , __self: this, __source: {fileName: _jsxFileName, lineNumber: 44}}
                , React.createElement(Shield, { size: 40, __self: this, __source: {fileName: _jsxFileName, lineNumber: 45}} )
                , React.createElement(Heart, { size: 16, className: "absolute fill-current", __self: this, __source: {fileName: _jsxFileName, lineNumber: 46}} )
              )
              , React.createElement('h2', { className: "text-2xl font-bold mb-2"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 47}}, "Need someone to talk to?"    )
              , React.createElement('p', { className: "text-muted-foreground max-w-md mb-8"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 48}}, "Connect anonymously with a supportive peer. No judgment, just listening."

              )
              , isSearching ? (
                React.createElement('div', { className: "space-y-4", __self: this, __source: {fileName: _jsxFileName, lineNumber: 52}}
                  , React.createElement(Button, { 
                    size: "lg", 
                    className: "text-lg px-8 h-12"  , 
                    disabled: true, __self: this, __source: {fileName: _jsxFileName, lineNumber: 53}}

                    , React.createElement(Loader2, { className: "mr-2 animate-spin" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 58}} ), " Finding Match..."
                  )
                  , React.createElement(Button, { 
                    variant: "outline", 
                    onClick: cancelSearch, __self: this, __source: {fileName: _jsxFileName, lineNumber: 60}}
, "Cancel Search"

                  )
                )
              ) : (
                React.createElement(Button, { 
                  size: "lg", 
                  className: "text-lg px-8 h-12"  , 
                  onClick: findMatch, __self: this, __source: {fileName: _jsxFileName, lineNumber: 68}}
, "Find a Partner"

                )
              )
            )
          ) : (
            React.createElement(React.Fragment, null
              /* Chat Header */
              , React.createElement('div', { className: "p-4 border-b border-border bg-card flex justify-between items-center"      , __self: this, __source: {fileName: _jsxFileName, lineNumber: 80}}
                , React.createElement('div', { className: "flex items-center gap-3"  , __self: this, __source: {fileName: _jsxFileName, lineNumber: 81}}
                  , React.createElement('div', { className: "w-3 h-3 rounded-full bg-green-500 animate-pulse"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 82}} )
                  , React.createElement('span', { className: "font-semibold", __self: this, __source: {fileName: _jsxFileName, lineNumber: 83}}, "Connected with Peer"  )
                )
                , React.createElement(Button, { 
                  variant: "ghost", 
                  size: "sm", 
                  className: "text-destructive hover:bg-destructive/10" ,
                  onClick: endSession, __self: this, __source: {fileName: _jsxFileName, lineNumber: 85}}
, "End Chat"

                )
              )

              /* Chat Messages */
              , React.createElement('div', { ref: scrollRef, className: "flex-1 overflow-y-auto p-4 space-y-4 bg-muted/20"    , __self: this, __source: {fileName: _jsxFileName, lineNumber: 96}}
                , messages.length === 0 && (
                  React.createElement('p', { className: "text-center text-muted-foreground text-sm mt-4"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 98}}, "Say hello to start the conversation."     )
                )
                , messages.map((msg) => {
                  const isMe = msg.senderId === _optionalChain([user, 'optionalAccess', _3 => _3._id]);
                  return (
                    React.createElement('div', { key: msg._id, className: cn("flex w-full", isMe ? "justify-end" : "justify-start"), __self: this, __source: {fileName: _jsxFileName, lineNumber: 103}}
                      , React.createElement('div', { className: cn(
                        "max-w-[80%] p-3 px-4 rounded-2xl text-sm leading-relaxed shadow-sm",
                        isMe 
                          ? "bg-primary text-primary-foreground rounded-tr-sm" 
                          : "bg-white dark:bg-card border border-border rounded-tl-sm"
                      ), __self: this, __source: {fileName: _jsxFileName, lineNumber: 104}}
                        , msg.content
                      )
                    )
                  );
                })
              )

              /* Input Area */
              , React.createElement('div', { className: "p-4 bg-card border-t border-border"   , __self: this, __source: {fileName: _jsxFileName, lineNumber: 118}}
                , React.createElement('form', { onSubmit: handleSend, className: "flex gap-2" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 119}}
                  , React.createElement(Input, { 
                    value: inputValue,
                    onChange: (e) => setInputValue(e.target.value),
                    placeholder: "Type a message..."  ,
                    className: "flex-1", __self: this, __source: {fileName: _jsxFileName, lineNumber: 120}}
                  )
                  , React.createElement(Button, { type: "submit", size: "icon", disabled: !inputValue.trim(), __self: this, __source: {fileName: _jsxFileName, lineNumber: 126}}
                    , React.createElement(Send, { className: "w-4 h-4" , __self: this, __source: {fileName: _jsxFileName, lineNumber: 127}} )
                  )
                )
              )
            )
          )
        )
      )
    )
  );
}



