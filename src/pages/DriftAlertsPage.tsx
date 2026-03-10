import React from "react";
import { motion } from "framer-motion";
import { students } from "@/data/mockData";
import { AlertTriangle, TrendingDown, TrendingUp, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const driftHistory = [
  { week: "W1", value: -1.2 }, { week: "W2", value: -3.5 },
  { week: "W3", value: -5.8 }, { week: "W4", value: -8.5 },
];

const DriftAlertsPage = () => {
  const declining = students.filter(s => s.trend === "down");
  const improving = students.filter(s => s.trend === "up");

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-heading font-bold text-foreground">Drift Alerts</h1>
        <p className="text-muted-foreground">Monitor concept drift in student learning behavior</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="stat-card border-destructive/20">
          <div className="flex items-center gap-2 mb-1">
            <TrendingDown className="w-5 h-5 text-destructive" />
            <h2 className="font-heading font-semibold text-foreground">Negative Drift</h2>
          </div>
          <p className="text-xs text-muted-foreground mb-3">Students showing declining performance</p>
          <div className="space-y-2">
            {declining.map(s => (
              <div key={s.id} className="flex items-center justify-between p-3 rounded-lg bg-destructive/5">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-destructive/10 flex items-center justify-center text-xs font-bold text-destructive">{s.avatar}</div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{s.name}</p>
                    <p className="text-xs text-muted-foreground">Score: {s.avgScore}</p>
                  </div>
                </div>
                <Badge variant="destructive" className="font-mono">{s.drift}%</Badge>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="stat-card border-success/20">
          <div className="flex items-center gap-2 mb-1">
            <TrendingUp className="w-5 h-5 text-success" />
            <h2 className="font-heading font-semibold text-foreground">Positive Drift</h2>
          </div>
          <p className="text-xs text-muted-foreground mb-3">Students showing improvement</p>
          <div className="space-y-2">
            {improving.map(s => (
              <div key={s.id} className="flex items-center justify-between p-3 rounded-lg bg-success/5">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-success/10 flex items-center justify-center text-xs font-bold text-success">{s.avatar}</div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{s.name}</p>
                    <p className="text-xs text-muted-foreground">Score: {s.avgScore}</p>
                  </div>
                </div>
                <Badge className="gradient-success text-success-foreground font-mono">+{s.drift}%</Badge>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="stat-card">
        <h2 className="text-lg font-heading font-semibold text-foreground mb-4">Drift Trend (Sample: Ethan Brooks)</h2>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={driftHistory}>
            <XAxis dataKey="week" tick={{ fontSize: 12, fill: "hsl(220, 10%, 46%)" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 12, fill: "hsl(220, 10%, 46%)" }} axisLine={false} tickLine={false} />
            <Tooltip />
            <Line type="monotone" dataKey="value" stroke="hsl(0, 84%, 60%)" strokeWidth={2} dot={{ fill: "hsl(0, 84%, 60%)", r: 4 }} />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>
    </div>
  );
};

export default DriftAlertsPage;
