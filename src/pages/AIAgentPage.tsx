import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Bot, Send, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Msg = { role: "user" | "assistant"; content: string };

const aiResponses: Record<string, string> = {
  default: "That's a great question! Let me help you with that. Could you provide more details about what specific concept you're struggling with?",
  python: "Python is a versatile programming language. Key concepts include variables, data types (int, float, str, bool), control flow (if/else, loops), functions, and object-oriented programming. Would you like me to explain any of these in detail?",
  javascript: "JavaScript is essential for web development. Important topics include DOM manipulation, event handling, async/await, promises, and ES6+ features like arrow functions and destructuring.",
  recursion: "Recursion is when a function calls itself to solve smaller instances of the same problem. Every recursive function needs a base case (stopping condition) and a recursive case. Example: factorial(n) = n * factorial(n-1), base case: factorial(0) = 1.",
  algorithm: "Algorithms are step-by-step procedures for solving problems. Key categories include sorting (bubble, merge, quick), searching (linear, binary), and graph algorithms (BFS, DFS). Time complexity is measured using Big O notation.",
  css: "CSS (Cascading Style Sheets) controls the visual presentation of web pages. Key concepts include the box model, flexbox, grid, responsive design with media queries, and CSS variables for theming.",
};

const getResponse = (msg: string): string => {
  const lower = msg.toLowerCase();
  if (lower.includes("python")) return aiResponses.python;
  if (lower.includes("javascript") || lower.includes("js")) return aiResponses.javascript;
  if (lower.includes("recursion") || lower.includes("recursive")) return aiResponses.recursion;
  if (lower.includes("algorithm") || lower.includes("big o")) return aiResponses.algorithm;
  if (lower.includes("css") || lower.includes("style")) return aiResponses.css;
  return aiResponses.default;
};

const AIAgentPage = () => {
  const [messages, setMessages] = useState<Msg[]>([
    { role: "assistant", content: "Hi! I'm your AI HelpMate 🤖 Ask me anything about your courses, concepts, or assignments!" },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  const send = () => {
    if (!input.trim()) return;
    const userMsg: Msg = { role: "user", content: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      setMessages((prev) => [...prev, { role: "assistant", content: getResponse(input) }]);
      setTyping(false);
    }, 800 + Math.random() * 700);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-120px)]">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-heading font-bold text-foreground">AI HelpMate</h1>
        <p className="text-muted-foreground mb-4">Your personal learning assistant</p>
      </motion.div>

      <div className="flex-1 overflow-y-auto space-y-4 mb-4 pr-2">
        {messages.map((m, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={`flex gap-3 ${m.role === "user" ? "justify-end" : ""}`}>
            {m.role === "assistant" && (
              <div className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center flex-shrink-0">
                <Bot className="w-4 h-4 text-primary-foreground" />
              </div>
            )}
            <div className={`max-w-[70%] rounded-2xl px-4 py-3 text-sm ${
              m.role === "user" ? "bg-primary text-primary-foreground rounded-br-md" : "bg-card border border-border text-foreground rounded-bl-md"
            }`}>
              {m.content}
            </div>
            {m.role === "user" && (
              <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                <User className="w-4 h-4 text-muted-foreground" />
              </div>
            )}
          </motion.div>
        ))}
        {typing && (
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center flex-shrink-0">
              <Bot className="w-4 h-4 text-primary-foreground" />
            </div>
            <div className="bg-card border border-border rounded-2xl rounded-bl-md px-4 py-3">
              <div className="flex gap-1">
                {[0, 1, 2].map(i => <div key={i} className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />)}
              </div>
            </div>
          </div>
        )}
        <div ref={endRef} />
      </div>

      <div className="flex gap-3">
        <Input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask me anything..." className="flex-1"
          onKeyDown={(e) => e.key === "Enter" && send()} />
        <Button onClick={send} className="gradient-primary text-primary-foreground"><Send className="w-4 h-4" /></Button>
      </div>
    </div>
  );
};

export default AIAgentPage;
