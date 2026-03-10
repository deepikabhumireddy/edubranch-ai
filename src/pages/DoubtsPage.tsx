import React, { useState } from "react";
import { motion } from "framer-motion";
import { doubts } from "@/data/mockData";
import { MessageSquare, Send, CheckCircle, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

const DoubtsPage = () => {
  const [newDoubt, setNewDoubt] = useState("");
  const [localDoubts, setLocalDoubts] = useState(doubts);
  const { toast } = useToast();

  const handleSubmit = () => {
    if (!newDoubt.trim()) return;
    setLocalDoubts(prev => [
      { id: prev.length + 1, student: "Alex Johnson", question: newDoubt, course: "General", status: "open" as const, date: new Date().toISOString().split("T")[0] },
      ...prev,
    ]);
    setNewDoubt("");
    toast({ title: "Doubt Raised", description: "Your doubt ticket has been submitted to the instructor." });
  };

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-heading font-bold text-foreground">Doubts & Discussions</h1>
        <p className="text-muted-foreground">Raise doubts and interact with peers and instructors</p>
      </motion.div>

      <div className="stat-card">
        <div className="flex gap-3">
          <Input value={newDoubt} onChange={(e) => setNewDoubt(e.target.value)} placeholder="Type your doubt here..." className="flex-1"
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()} />
          <Button onClick={handleSubmit} className="gradient-primary text-primary-foreground"><Send className="w-4 h-4" /></Button>
        </div>
      </div>

      <div className="space-y-3">
        {localDoubts.map((d, i) => (
          <motion.div key={d.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }} className="stat-card">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center flex-shrink-0 mt-0.5">
                  <MessageSquare className="w-4 h-4 text-accent-foreground" />
                </div>
                <div>
                  <p className="font-medium text-foreground">{d.question}</p>
                  <p className="text-xs text-muted-foreground mt-1">{d.student} · {d.course} · {d.date}</p>
                  {d.status === "resolved" && d.answer && (
                    <div className="mt-3 p-3 rounded-lg bg-accent/50 border-l-4 border-success">
                      <p className="text-sm text-foreground">{d.answer}</p>
                    </div>
                  )}
                </div>
              </div>
              <Badge variant={d.status === "resolved" ? "default" : "outline"} className={d.status === "resolved" ? "gradient-success text-success-foreground" : ""}>
                {d.status === "resolved" ? <><CheckCircle className="w-3 h-3 mr-1" />Resolved</> : <><Clock className="w-3 h-3 mr-1" />Open</>}
              </Badge>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default DoubtsPage;
