import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Area, AreaChart } from "recharts";

interface DriftData {
  week: string;
  driftScore: number;
  accuracy: number;
  guessing: number;
}

interface DriftChartsProps {
  data: DriftData[];
  solveMethods?: { conceptual: number; pattern: number; guessing: number };
  compact?: boolean;
}

const SOLVE_COLORS = ["hsl(152, 69%, 45%)", "hsl(38, 92%, 50%)", "hsl(0, 84%, 60%)"];

const DriftCharts: React.FC<DriftChartsProps> = ({ data, solveMethods, compact = false }) => {
  const height = compact ? 180 : 220;

  const lastEntry = data[data.length - 1];
  const methods = solveMethods || {
    conceptual: Math.round(100 - lastEntry.guessing - 15),
    pattern: 15,
    guessing: lastEntry.guessing,
  };

  const pieData = [
    { name: "Conceptual", value: methods.conceptual },
    { name: "Pattern", value: methods.pattern },
    { name: "Guessing", value: methods.guessing },
  ];

  return (
    <div className="space-y-6">
      <div className={`grid ${compact ? "grid-cols-1 lg:grid-cols-2" : "grid-cols-1 lg:grid-cols-3"} gap-4`}>
        {/* Drift Score Trend */}
        <div className={`stat-card ${compact ? "" : "lg:col-span-2"}`}>
          <h3 className="text-sm font-heading font-semibold text-foreground mb-1">Drift Score Trend</h3>
          <p className="text-xs text-muted-foreground mb-3">Weekly drift score progression</p>
          <ResponsiveContainer width="100%" height={height}>
            <AreaChart data={data}>
              <defs>
                <linearGradient id="driftGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(0, 84%, 60%)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(0, 84%, 60%)" stopOpacity={0.02} />
                </linearGradient>
              </defs>
              <XAxis dataKey="week" tick={{ fontSize: 11, fill: "hsl(225, 10%, 46%)" }} axisLine={false} tickLine={false} />
              <YAxis domain={[0, 1]} tick={{ fontSize: 11, fill: "hsl(225, 10%, 46%)" }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{ background: "hsl(0, 0%, 100%)", border: "1px solid hsl(225, 15%, 90%)", borderRadius: "8px", fontSize: "12px" }}
              />
              <Area type="monotone" dataKey="driftScore" stroke="hsl(0, 84%, 60%)" fill="url(#driftGradient)" strokeWidth={2} dot={{ fill: "hsl(0, 84%, 60%)", r: 3, strokeWidth: 0 }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Solve Methods Donut */}
        <div className="stat-card">
          <h3 className="text-sm font-heading font-semibold text-foreground mb-1">Solve Methods</h3>
          <p className="text-xs text-muted-foreground mb-3">Problem-solving approach breakdown</p>
          <ResponsiveContainer width="100%" height={height - 30}>
            <PieChart>
              <Pie data={pieData} cx="50%" cy="50%" innerRadius={compact ? 35 : 50} outerRadius={compact ? 60 : 75} dataKey="value" strokeWidth={0}>
                {pieData.map((_, i) => (
                  <Cell key={i} fill={SOLVE_COLORS[i]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex justify-center gap-4 text-xs">
            {pieData.map((entry, i) => (
              <span key={entry.name} className="flex items-center gap-1">
                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: SOLVE_COLORS[i] }} />
                {entry.name}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Accuracy vs Guessing */}
      <div className="stat-card">
        <h3 className="text-sm font-heading font-semibold text-foreground mb-1">Accuracy vs Guessing Rate</h3>
        <p className="text-xs text-muted-foreground mb-3">Weekly comparison of accuracy and guessing behavior</p>
        <ResponsiveContainer width="100%" height={height}>
          <LineChart data={data}>
            <XAxis dataKey="week" tick={{ fontSize: 11, fill: "hsl(225, 10%, 46%)" }} axisLine={false} tickLine={false} />
            <YAxis domain={[0, 100]} tick={{ fontSize: 11, fill: "hsl(225, 10%, 46%)" }} axisLine={false} tickLine={false} />
            <Tooltip
              contentStyle={{ background: "hsl(0, 0%, 100%)", border: "1px solid hsl(225, 15%, 90%)", borderRadius: "8px", fontSize: "12px" }}
            />
            <Line type="monotone" dataKey="accuracy" stroke="hsl(152, 69%, 45%)" strokeWidth={2} dot={{ fill: "hsl(152, 69%, 45%)", r: 3, strokeWidth: 0 }} name="Accuracy" />
            <Line type="monotone" dataKey="guessing" stroke="hsl(0, 84%, 60%)" strokeWidth={2} dot={{ fill: "hsl(0, 84%, 60%)", r: 3, strokeWidth: 0 }} name="Guessing" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DriftCharts;
