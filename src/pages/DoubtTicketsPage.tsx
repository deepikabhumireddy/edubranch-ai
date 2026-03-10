import React, { useState } from "react";
import { motion } from "framer-motion";
import { doubts } from "@/data/mockData";
import { MessageSquare, Send, CheckCircle, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

const DoubtTicketsPage = () => {
  const [localDoubts, setLocalDoubts] = useState(doubts);
  const [replyText, setReplyText] = useState<Record<number, string>>({});
  const { toast } = useToast();

  const resolve = (id: number) => {
    const answer = replyText[id];
    if (!answer?.trim()) return;
    setLocalDoubts(prev => prev.map(d => d.id === id ? { ...d, status: "resolved" as const, answer } : d));
    setReplyText(prev => ({ ...prev, [id]: "" }));
    toast({ title: "Doubt Resolved", description: "Solution posted successfully." });
  };

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-heading font-bold text-foreground">Doubt Tickets</h1>
        <p className="text-muted-foreground">View and resolve student doubts</p>
      </motion.div>

      <div className="space-y-4">
        {localDoubts.map((d, i) => (
          <motion.div key={d.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="stat-card">
            <div className="flex items-start justify-between gap-3 mb-3">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center flex-shrink-0 mt-0.5">
                  <MessageSquare className="w-4 h-4 text-accent-foreground" />
                </div>
                <div>
                  <p className="font-medium text-foreground">{d.question}</p>
                  <p className="text-xs text-muted-foreground mt-1">{d.student} · {d.course} · {d.date}</p>
                </div>
              </div>
              <Badge variant={d.status === "resolved" ? "default" : "outline"} className={d.status === "resolved" ? "gradient-success text-success-foreground" : ""}>
                {d.status === "resolved" ? <><CheckCircle className="w-3 h-3 mr-1" />Resolved</> : <><Clock className="w-3 h-3 mr-1" />Open</>}
              </Badge>
            </div>
            {d.status === "resolved" && d.answer && (
              <div className="ml-11 p-3 rounded-lg bg-accent/50 border-l-4 border-success">
                <p className="text-sm text-foreground">{d.answer}</p>
              </div>
            )}
            {d.status === "open" && (
              <div className="ml-11 flex gap-2 mt-3">
                <Input value={replyText[d.id] || ""} onChange={(e) => setReplyText({ ...replyText, [d.id]: e.target.value })}
                  placeholder="Type your solution..." className="flex-1" />
                <Button onClick={() => resolve(d.id)} size="sm" className="gradient-primary text-primary-foreground">
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default DoubtTicketsPage;
