import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import { motion } from "framer-motion";
import { BookOpen, Award, Clock, TrendingUp, CheckCircle } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts";
import { courses, weeklyPerformance, monthlyPerformance, tasks, scheduleEvents, leaderboard } from "@/data/mockData";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const anim = (i: number) => ({ initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: i * 0.08 } });

const pieData = [
  { name: "Design", value: 47, color: "hsl(217, 91%, 60%)" },
  { name: "Marketing", value: 45, color: "hsl(142, 71%, 45%)" },
  { name: "Development", value: 5, color: "hsl(24, 95%, 53%)" },
  { name: "Finance", value: 3, color: "hsl(280, 65%, 60%)" },
];

const StudentDashboard = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div {...anim(0)} className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-heading font-bold text-foreground">Welcome back, {user?.name?.split(" ")[0]} 👋</h1>
          <p className="text-muted-foreground">Stay focused, keep learning!</p>
        </div>
        <div className="flex gap-4 flex-wrap">
          {[
            { label: "Total Courses", value: "12", icon: BookOpen },
            { label: "Completion", value: "92%", icon: CheckCircle },
            { label: "Study Time", value: "160h", icon: Clock },
            { label: "Avg Score", value: "85", icon: TrendingUp },
            { label: "Certificates", value: "18", icon: Award },
          ].map((s) => (
            <div key={s.label} className="stat-card text-center min-w-[100px]">
              <div className="text-2xl font-heading font-bold text-foreground">{s.value}</div>
              <div className="text-xs text-muted-foreground">{s.label}</div>
            </div>
          ))}
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Courses */}
        <motion.div {...anim(1)} className="lg:col-span-2 stat-card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-heading font-semibold text-foreground">My Courses</h2>
            <span className="text-sm text-primary cursor-pointer hover:underline">See all</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {courses.slice(0, 3).map((c) => (
              <div key={c.id} className="rounded-xl p-4 border border-border bg-accent/30 hover:shadow-md transition-shadow">
                <Badge className="mb-3 text-xs" style={{ backgroundColor: c.color + "20", color: c.color }}>{c.category}</Badge>
                <h3 className="font-semibold text-foreground text-sm mb-2">{c.title}</h3>
                <Progress value={c.progress} className="h-1.5 mb-2" />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>{c.lessons} lessons</span>
                  <span>⭐ {c.rating}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Schedule */}
        <motion.div {...anim(2)} className="stat-card">
          <h2 className="text-lg font-heading font-semibold text-foreground mb-4">Today's Schedule</h2>
          <div className="space-y-3">
            {scheduleEvents.map((e, i) => (
              <div key={i} className="rounded-lg p-3 border-l-4" style={{ borderColor: e.color, backgroundColor: e.color + "10" }}>
                <p className="text-xs font-medium text-muted-foreground">{e.time}</p>
                <p className="text-sm font-medium text-foreground mt-1">{e.title}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Performance Chart */}
        <motion.div {...anim(3)} className="lg:col-span-1 stat-card">
          <h2 className="text-lg font-heading font-semibold text-foreground mb-4">Weekly Performance</h2>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={weeklyPerformance}>
              <XAxis dataKey="day" tick={{ fontSize: 12, fill: "hsl(220, 10%, 46%)" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: "hsl(220, 10%, 46%)" }} axisLine={false} tickLine={false} />
              <Tooltip />
              <Bar dataKey="score" fill="hsl(24, 95%, 53%)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Tasks */}
        <motion.div {...anim(4)} className="stat-card">
          <h2 className="text-lg font-heading font-semibold text-foreground mb-4">Tasks</h2>
          <div className="space-y-3">
            {tasks.map((t) => (
              <div key={t.id} className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${t.type === "assessment" ? "bg-accent" : "bg-muted"}`}>
                    {t.type === "assessment" ? <FileText className="w-4 h-4 text-accent-foreground" /> : <BookOpen className="w-4 h-4 text-muted-foreground" />}
                  </div>
                  <span className="text-sm text-foreground truncate">{t.title}</span>
                </div>
                <Badge variant="outline" className="text-xs flex-shrink-0">+{t.reward}</Badge>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Leaderboard */}
        <motion.div {...anim(5)} className="stat-card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-heading font-semibold text-foreground">Leaderboard</h2>
            <span className="text-sm text-primary cursor-pointer hover:underline">See all</span>
          </div>
          <div className="space-y-3">
            {leaderboard.slice(0, 4).map((p) => (
              <div key={p.rank} className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                  p.rank === 1 ? "gradient-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                }`}>{p.avatar}</div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{p.name}</p>
                  <p className="text-xs text-muted-foreground">{p.courses} courses · {p.hours}h</p>
                </div>
                <span className="text-sm font-heading font-bold text-primary">{p.score.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Activity */}
      <motion.div {...anim(6)} className="stat-card">
        <h2 className="text-lg font-heading font-semibold text-foreground mb-4">Monthly Performance</h2>
        <ResponsiveContainer width="100%" height={220}>
          <LineChart data={monthlyPerformance}>
            <XAxis dataKey="week" tick={{ fontSize: 12, fill: "hsl(220, 10%, 46%)" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 12, fill: "hsl(220, 10%, 46%)" }} axisLine={false} tickLine={false} />
            <Tooltip />
            <Line type="monotone" dataKey="score" stroke="hsl(24, 95%, 53%)" strokeWidth={2} dot={{ fill: "hsl(24, 95%, 53%)", r: 4 }} />
            <Line type="monotone" dataKey="completion" stroke="hsl(142, 71%, 45%)" strokeWidth={2} dot={{ fill: "hsl(142, 71%, 45%)", r: 4 }} />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>
    </div>
  );
};

const FileText = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M10 9H8"/><path d="M16 13H8"/><path d="M16 17H8"/></svg>
);

export default StudentDashboard;
