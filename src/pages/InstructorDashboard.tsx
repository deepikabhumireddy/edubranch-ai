import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { motion } from "framer-motion";
import { students, studentDriftData } from "@/data/mockData";
import { Users, TrendingUp, TrendingDown, Minus, AlertTriangle, Award, BarChart3, Eye, X } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from "recharts";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import DriftCharts from "@/components/DriftCharts";

const anim = (i: number) => ({ initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: i * 0.08 } });

const avgPerformance = [
  { subject: "Python", score: 82 }, { subject: "UI/UX", score: 75 },
  { subject: "JavaScript", score: 88 }, { subject: "DSA", score: 70 },
  { subject: "Web Design", score: 90 }, { subject: "ML", score: 78 },
];

const radarData = [
  { subject: "Quizzes", A: 85 }, { subject: "Coding", A: 78 },
  { subject: "Attendance", A: 92 }, { subject: "Assignments", A: 80 },
  { subject: "Projects", A: 70 }, { subject: "Participation", A: 88 },
];

const InstructorDashboard = () => {
  const { user } = useAuth();
  const declining = students.filter(s => s.trend === "down");
  const improving = students.filter(s => s.trend === "up");
  const [selectedStudent, setSelectedStudent] = useState<number | null>(null);

  const selectedStudentData = selectedStudent ? students.find(s => s.id === selectedStudent) : null;
  const selectedDriftData = selectedStudent ? studentDriftData[selectedStudent] : null;

  return (
    <div className="space-y-6">
      <motion.div {...anim(0)}>
        <h1 className="text-2xl md:text-3xl font-heading font-bold text-foreground">Instructor Dashboard</h1>
        <p className="text-muted-foreground">Welcome, {user?.name}. Monitor student performance and drift.</p>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total Students", value: students.length, icon: Users, cls: "gradient-primary" },
          { label: "Improving", value: improving.length, icon: TrendingUp, cls: "gradient-success" },
          { label: "Declining", value: declining.length, icon: TrendingDown, cls: "bg-destructive" },
          { label: "Avg Score", value: Math.round(students.reduce((a, s) => a + s.avgScore, 0) / students.length), icon: Award, cls: "gradient-info" },
        ].map((s, i) => (
          <motion.div {...anim(i + 1)} key={s.label} className="stat-card flex items-center gap-3 hover-lift">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${s.cls}`}>
              <s.icon className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <p className="text-2xl font-heading font-bold text-foreground">{s.value}</p>
              <p className="text-xs text-muted-foreground">{s.label}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Drift Alerts */}
      {declining.length > 0 && (
        <motion.div {...anim(5)} className="stat-card border-destructive/30">
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle className="w-5 h-5 text-destructive" />
            <h2 className="text-lg font-heading font-semibold text-foreground">Drift Alerts</h2>
          </div>
          <div className="space-y-2">
            {declining.map(s => (
              <motion.div key={s.id} className="flex items-center justify-between p-3 rounded-lg bg-destructive/5 border border-destructive/10 hover:bg-destructive/10 transition-colors cursor-pointer" onClick={() => setSelectedStudent(s.id)} whileHover={{ x: 4 }}>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-destructive/10 flex items-center justify-center text-xs font-bold text-destructive">{s.avatar}</div>
                  <div>
                    <p className="font-medium text-foreground">{s.name}</p>
                    <p className="text-xs text-muted-foreground">Avg Score: {s.avgScore}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="destructive" className="font-mono">{s.drift}%</Badge>
                  <Eye className="w-4 h-4 text-muted-foreground" />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div {...anim(6)} className="stat-card">
          <h2 className="text-lg font-heading font-semibold text-foreground mb-4">Avg Performance by Subject</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={avgPerformance}>
              <XAxis dataKey="subject" tick={{ fontSize: 12, fill: "hsl(225, 10%, 46%)" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: "hsl(225, 10%, 46%)" }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: "8px", border: "1px solid hsl(225, 15%, 90%)" }} />
              <Bar dataKey="score" fill="hsl(250, 85%, 60%)" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div {...anim(7)} className="stat-card">
          <h2 className="text-lg font-heading font-semibold text-foreground mb-4">Class Performance Overview</h2>
          <ResponsiveContainer width="100%" height={250}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="hsl(225, 13%, 91%)" />
              <PolarAngleAxis dataKey="subject" tick={{ fontSize: 11, fill: "hsl(225, 10%, 46%)" }} />
              <PolarRadiusAxis tick={false} axisLine={false} />
              <Radar dataKey="A" stroke="hsl(250, 85%, 60%)" fill="hsl(250, 85%, 60%)" fillOpacity={0.3} />
            </RadarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* All Students */}
      <motion.div {...anim(8)} className="stat-card">
        <h2 className="text-lg font-heading font-semibold text-foreground mb-4">All Students</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-2 text-muted-foreground font-medium">Student</th>
                <th className="text-left py-3 px-2 text-muted-foreground font-medium">Avg Score</th>
                <th className="text-left py-3 px-2 text-muted-foreground font-medium">Courses</th>
                <th className="text-left py-3 px-2 text-muted-foreground font-medium">Drift</th>
                <th className="text-left py-3 px-2 text-muted-foreground font-medium">Trend</th>
                <th className="text-left py-3 px-2 text-muted-foreground font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.map(s => (
                <tr key={s.id} className="border-b border-border/50 hover:bg-accent/30 transition-colors">
                  <td className="py-3 px-2 flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-accent flex items-center justify-center text-xs font-bold text-accent-foreground">{s.avatar}</div>
                    {s.name}
                  </td>
                  <td className="py-3 px-2 font-medium">{s.avgScore}</td>
                  <td className="py-3 px-2">{s.courses}</td>
                  <td className="py-3 px-2 font-mono">{s.drift > 0 ? "+" : ""}{s.drift}%</td>
                  <td className="py-3 px-2">
                    {s.trend === "up" && <Badge className="gradient-success text-success-foreground"><TrendingUp className="w-3 h-3 mr-1" />Up</Badge>}
                    {s.trend === "down" && <Badge variant="destructive"><TrendingDown className="w-3 h-3 mr-1" />Down</Badge>}
                    {s.trend === "stable" && <Badge variant="outline"><Minus className="w-3 h-3 mr-1" />Stable</Badge>}
                  </td>
                  <td className="py-3 px-2">
                    <Button variant="ghost" size="sm" onClick={() => setSelectedStudent(s.id)} className="text-primary hover:text-primary">
                      <Eye className="w-4 h-4 mr-1" /> See More
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Student Detail Modal */}
      <Dialog open={selectedStudent !== null} onOpenChange={() => setSelectedStudent(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3">
              {selectedStudentData && (
                <>
                  <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center text-sm font-bold text-primary-foreground">
                    {selectedStudentData.avatar}
                  </div>
                  <div>
                    <span>{selectedStudentData.name}</span>
                    <p className="text-sm font-normal text-muted-foreground">
                      Avg Score: {selectedStudentData.avgScore} · Drift: {selectedStudentData.drift > 0 ? "+" : ""}{selectedStudentData.drift}% ·
                      {selectedStudentData.trend === "up" ? " 📈 Improving" : selectedStudentData.trend === "down" ? " 📉 Declining" : " ➡️ Stable"}
                    </p>
                  </div>
                </>
              )}
            </DialogTitle>
          </DialogHeader>
          {selectedDriftData && <DriftCharts data={selectedDriftData} />}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default InstructorDashboard;
