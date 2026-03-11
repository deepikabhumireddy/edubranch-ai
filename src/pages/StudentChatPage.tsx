import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Send, MessagesSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { chatMessages } from "@/data/mockData";

interface ChatMsg {
  id: number;
  sender: string;
  avatar: string;
  message: string;
  time: string;
  isMe?: boolean;
}

const StudentChatPage = () => {
  const [messages, setMessages] = useState<ChatMsg[]>(chatMessages.map(m => ({ ...m, isMe: m.sender === "Alex Johnson" })));
  const [input, setInput] = useState("");
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  const send = () => {
    if (!input.trim()) return;
    const now = new Date();
    const time = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    setMessages(prev => [...prev, { id: prev.length + 1, sender: "Alex Johnson", avatar: "AJ", message: input, time, isMe: true }]);
    setInput("");

    // Simulate a reply from another student
    setTimeout(() => {
      const replies = [
        { sender: "Sophia Davis", avatar: "SD", message: "Great point! I think the same approach works here." },
        { sender: "Michael Turner", avatar: "MT", message: "Try checking the documentation for that, it helped me a lot!" },
        { sender: "Olivia Bennett", avatar: "OB", message: "I had the same question. Let me share my notes." },
        { sender: "Emma Wilson", avatar: "EW", message: "That's interesting! We should discuss this more in study group." },
      ];
      const reply = replies[Math.floor(Math.random() * replies.length)];
      const replyTime = new Date();
      setMessages(prev => [...prev, {
        id: prev.length + 1,
        sender: reply.sender,
        avatar: reply.avatar,
        message: reply.message,
        time: replyTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      }]);
    }, 1000 + Math.random() * 1500);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-120px)]">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-heading font-bold text-foreground flex items-center gap-2">
          <MessagesSquare className="w-6 h-6 text-primary" /> Student Chat
        </h1>
        <p className="text-muted-foreground mb-4">Interact with other students, discuss concepts, and help each other</p>
      </motion.div>

      <div className="flex-1 overflow-y-auto space-y-3 mb-4 pr-2 stat-card">
        {messages.map((m) => (
          <motion.div key={m.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={`flex gap-3 ${m.isMe ? "justify-end" : ""}`}>
            {!m.isMe && (
              <div className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center flex-shrink-0 text-xs font-bold text-primary-foreground">
                {m.avatar}
              </div>
            )}
            <div className={`max-w-[70%] ${m.isMe ? "text-right" : ""}`}>
              {!m.isMe && <p className="text-xs font-medium text-primary mb-1">{m.sender}</p>}
              <div className={`rounded-2xl px-4 py-3 text-sm ${
                m.isMe ? "gradient-primary text-primary-foreground rounded-br-md" : "bg-accent border border-border text-foreground rounded-bl-md"
              }`}>
                {m.message}
              </div>
              <p className="text-xs text-muted-foreground mt-1">{m.time}</p>
            </div>
            {m.isMe && (
              <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center flex-shrink-0 text-xs font-bold text-muted-foreground">
                AJ
              </div>
            )}
          </motion.div>
        ))}
        <div ref={endRef} />
      </div>

      <div className="flex gap-3">
        <Input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Message your classmates..." className="flex-1"
          onKeyDown={(e) => e.key === "Enter" && send()} />
        <Button onClick={send} className="gradient-primary text-primary-foreground hover:shadow-lg hover:shadow-primary/25 transition-all">
          <Send className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default StudentChatPage;
