import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import { motion } from "framer-motion";
import { BookOpen, Award, Clock, TrendingUp, CheckCircle, FileText, Sparkles } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";
import { courses, weeklyPerformance, monthlyPerformance, tasks, scheduleEvents, leaderboard, studentDriftData } from "@/data/mockData";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import DriftCharts from "@/components/DriftCharts";

const anim = (i: number) => ({ initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: i * 0.08 } });

const StudentDashboard = () => {
  const { user } = useAuth();
  // Use student 1 (Alex Johnson) drift data for the logged-in student
  const myDriftData = studentDriftData[1];

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div {...anim(0)} className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-heading font-bold text-foreground">Welcome back, {user?.name?.split(" ")[0]} 👋</h1>
          <p className="text-muted-foreground">Stay focused, keep learning!</p>
        </div>
        <div className="flex gap-3 flex-wrap">
          {[
            { label: "Total Courses", value: "12", icon: BookOpen, gradient: "gradient-primary" },
            { label: "Completion", value: "92%", icon: CheckCircle, gradient: "gradient-success" },
            { label: "Study Time", value: "160h", icon: Clock, gradient: "gradient-info" },
            { label: "Avg Score", value: "85", icon: TrendingUp, gradient: "gradient-warm" },
            { label: "Certificates", value: "18", icon: Award, gradient: "gradient-accent" },
          ].map((s) => (
            <motion.div key={s.label} className="stat-card text-center min-w-[100px] hover-lift" whileHover={{ scale: 1.05 }}>
              <div className={`w-8 h-8 rounded-lg ${s.gradient} flex items-center justify-center mx-auto mb-2`}>
                <s.icon className="w-4 h-4 text-primary-foreground" />
              </div>
              <div className="text-2xl font-heading font-bold text-foreground">{s.value}</div>
              <div className="text-xs text-muted-foreground">{s.label}</div>
            </motion.div>
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
            {courses.filter(c => c.enabled).slice(0, 3).map((c) => (
              <motion.div key={c.id} className="rounded-xl p-4 border border-border bg-accent/30 hover:shadow-lg transition-all duration-300 cursor-pointer group" whileHover={{ y: -4 }}>
                <div className="flex items-center gap-2 mb-3">
                  <Badge className="text-xs" style={{ backgroundColor: c.color + "20", color: c.color }}>{c.category}</Badge>
                  {c.live && <Badge className="text-xs gradient-warm text-primary-foreground animate-pulse">🔴 LIVE</Badge>}
                </div>
                <h3 className="font-semibold text-foreground text-sm mb-2 group-hover:text-primary transition-colors">{c.title}</h3>
                <Progress value={c.progress} className="h-1.5 mb-2" />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>{c.lessons} lessons</span>
                  <span>⭐ {c.rating}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Schedule */}
        <motion.div {...anim(2)} className="stat-card">
          <h2 className="text-lg font-heading font-semibold text-foreground mb-4">Today's Schedule</h2>
          <div className="space-y-3">
            {scheduleEvents.map((e, i) => (
              <motion.div key={i} className="rounded-lg p-3 border-l-4 hover:shadow-md transition-all" style={{ borderColor: e.color, backgroundColor: e.color + "10" }} whileHover={{ x: 4 }}>
                <p className="text-xs font-medium text-muted-foreground">{e.time}</p>
                <p className="text-sm font-medium text-foreground mt-1">{e.title}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Drift Charts */}
      <motion.div {...anim(3)}>
        <h2 className="text-lg font-heading font-semibold text-foreground mb-4 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-primary" />
          My Learning Drift Analysis
        </h2>
        <DriftCharts data={myDriftData} compact />
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Performance Chart */}
        <motion.div {...anim(4)} className="lg:col-span-1 stat-card">
          <h2 className="text-lg font-heading font-semibold text-foreground mb-4">Weekly Performance</h2>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={weeklyPerformance}>
              <XAxis dataKey="day" tick={{ fontSize: 12, fill: "hsl(225, 10%, 46%)" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: "hsl(225, 10%, 46%)" }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: "8px", border: "1px solid hsl(225, 15%, 90%)" }} />
              <Bar dataKey="score" fill="hsl(250, 85%, 60%)" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Tasks */}
        <motion.div {...anim(5)} className="stat-card">
          <h2 className="text-lg font-heading font-semibold text-foreground mb-4">Tasks</h2>
          <div className="space-y-3">
            {tasks.slice(0, 4).map((t) => (
              <motion.div key={t.id} className="flex items-center justify-between gap-3 p-2 rounded-lg hover:bg-accent/50 transition-colors" whileHover={{ x: 4 }}>
                <div className="flex items-center gap-3 min-w-0">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${t.type === "assessment" ? "bg-accent" : "bg-muted"}`}>
                    {t.type === "assessment" ? <FileText className="w-4 h-4 text-accent-foreground" /> : <BookOpen className="w-4 h-4 text-muted-foreground" />}
                  </div>
                  <span className="text-sm text-foreground truncate">{t.title}</span>
                </div>
                <Badge variant="outline" className="text-xs flex-shrink-0">+{t.reward}</Badge>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Leaderboard */}
        <motion.div {...anim(6)} className="stat-card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-heading font-semibold text-foreground">Leaderboard</h2>
            <span className="text-sm text-primary cursor-pointer hover:underline">See all</span>
          </div>
          <div className="space-y-3">
            {leaderboard.slice(0, 5).map((p) => (
              <motion.div key={p.rank} className="flex items-center gap-3 p-1 rounded-lg hover:bg-accent/30 transition-colors" whileHover={{ x: 4 }}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                  p.rank === 1 ? "gradient-primary text-primary-foreground" : p.rank === 2 ? "gradient-info text-primary-foreground" : p.rank === 3 ? "gradient-warm text-primary-foreground" : "bg-muted text-muted-foreground"
                }`}>{p.avatar}</div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{p.name}</p>
                  <p className="text-xs text-muted-foreground">{p.courses} courses</p>
                </div>
                <span className="text-sm font-heading font-bold text-primary">{p.score.toLocaleString()}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Monthly Performance */}
      <motion.div {...anim(7)} className="stat-card">
        <h2 className="text-lg font-heading font-semibold text-foreground mb-4">Monthly Performance</h2>
        <ResponsiveContainer width="100%" height={220}>
          <LineChart data={monthlyPerformance}>
            <XAxis dataKey="week" tick={{ fontSize: 12, fill: "hsl(225, 10%, 46%)" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 12, fill: "hsl(225, 10%, 46%)" }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ borderRadius: "8px", border: "1px solid hsl(225, 15%, 90%)" }} />
            <Line type="monotone" dataKey="score" stroke="hsl(250, 85%, 60%)" strokeWidth={2} dot={{ fill: "hsl(250, 85%, 60%)", r: 4 }} />
            <Line type="monotone" dataKey="completion" stroke="hsl(152, 69%, 45%)" strokeWidth={2} dot={{ fill: "hsl(152, 69%, 45%)", r: 4 }} />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>
    </div>
  );
};

export default StudentDashboard;
