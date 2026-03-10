import React from "react";
import { motion } from "framer-motion";
import { students } from "@/data/mockData";
import { TrendingUp, TrendingDown, Minus, Eye } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const StudentsPage = () => (
  <div className="space-y-6">
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <h1 className="text-2xl font-heading font-bold text-foreground">Students</h1>
      <p className="text-muted-foreground">Monitor individual student performance</p>
    </motion.div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {students.map((s, i) => (
        <motion.div key={s.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="stat-card">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center text-lg font-bold text-accent-foreground">{s.avatar}</div>
            <div>
              <h3 className="font-heading font-semibold text-foreground">{s.name}</h3>
              <p className="text-xs text-muted-foreground">{s.courses} courses enrolled</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="p-3 rounded-lg bg-accent/50">
              <p className="text-xs text-muted-foreground">Avg Score</p>
              <p className="text-xl font-heading font-bold text-foreground">{s.avgScore}</p>
            </div>
            <div className="p-3 rounded-lg bg-accent/50">
              <p className="text-xs text-muted-foreground">Drift</p>
              <p className={`text-xl font-heading font-bold ${s.drift > 0 ? "text-success" : s.drift < -5 ? "text-destructive" : "text-foreground"}`}>
                {s.drift > 0 ? "+" : ""}{s.drift}%
              </p>
            </div>
          </div>
          <div className="flex items-center justify-between">
            {s.trend === "up" && <Badge className="gradient-success text-success-foreground"><TrendingUp className="w-3 h-3 mr-1" />Improving</Badge>}
            {s.trend === "down" && <Badge variant="destructive"><TrendingDown className="w-3 h-3 mr-1" />Declining</Badge>}
            {s.trend === "stable" && <Badge variant="outline"><Minus className="w-3 h-3 mr-1" />Stable</Badge>}
            <Button variant="ghost" size="sm"><Eye className="w-4 h-4 mr-1" />Details</Button>
          </div>
        </motion.div>
      ))}
    </div>
  </div>
);

export default StudentsPage;
