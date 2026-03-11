import React, { useState } from "react";
import { motion } from "framer-motion";
import { students, courses } from "@/data/mockData";
import { ClipboardList, Send, BookOpen, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const AssignTasksPage = () => {
  const [selectedStudent, setSelectedStudent] = useState("");
  const [taskTitle, setTaskTitle] = useState("");
  const [taskType, setTaskType] = useState("");
  const [assignments, setAssignments] = useState<Array<{ student: string; task: string; type: string; date: string }>>([
    { student: "Ethan Brooks", task: "Complete Python Recursion Module", type: "course", date: "2025-09-14" },
    { student: "Logan Mitchell", task: "DSA Practice Problems Set 3", type: "assessment", date: "2025-09-13" },
    { student: "Noah Carter", task: "JavaScript Fundamentals Review", type: "course", date: "2025-09-14" },
    { student: "All Students", task: "React Component Quiz", type: "assessment", date: "2025-09-15" },
  ]);
  const { toast } = useToast();

  const assign = () => {
    if (!selectedStudent || !taskTitle || !taskType) return;
    setAssignments(prev => [
      { student: selectedStudent, task: taskTitle, type: taskType, date: new Date().toISOString().split("T")[0] },
      ...prev,
    ]);
    setTaskTitle("");
    toast({ title: "✅ Task Assigned", description: `"${taskTitle}" assigned to ${selectedStudent}. It will appear on their dashboard.` });
  };

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-heading font-bold text-foreground">Assign Tasks</h1>
        <p className="text-muted-foreground">Assign assessments or courses — they appear on students' dashboards</p>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="stat-card">
        <h2 className="text-lg font-heading font-semibold text-foreground mb-4">New Assignment</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          <Select onValueChange={setSelectedStudent}>
            <SelectTrigger><SelectValue placeholder="Select Student" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="All Students">All Students</SelectItem>
              {students.map(s => <SelectItem key={s.id} value={s.name}>{s.name}</SelectItem>)}
            </SelectContent>
          </Select>
          <Input value={taskTitle} onChange={(e) => setTaskTitle(e.target.value)} placeholder="Task title..." />
          <Select onValueChange={setTaskType}>
            <SelectTrigger><SelectValue placeholder="Type" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="course">Course</SelectItem>
              <SelectItem value="assessment">Assessment</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={assign} className="gradient-primary text-primary-foreground hover:shadow-lg hover:shadow-primary/25 transition-all">
            <Send className="w-4 h-4 mr-2" />Assign
          </Button>
        </div>
      </motion.div>

      <div className="stat-card">
        <h2 className="text-lg font-heading font-semibold text-foreground mb-4">Recent Assignments</h2>
        <div className="space-y-3">
          {assignments.map((a, i) => (
            <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}
              className="flex items-center justify-between p-3 rounded-lg bg-accent/30 border border-border/50 hover:bg-accent/50 transition-colors">
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${a.type === "course" ? "bg-info/10" : "bg-primary/10"}`}>
                  {a.type === "course" ? <BookOpen className="w-4 h-4 text-info" /> : <FileText className="w-4 h-4 text-primary" />}
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">{a.task}</p>
                  <p className="text-xs text-muted-foreground">{a.student} · {a.date}</p>
                </div>
              </div>
              <Badge variant="outline">{a.type}</Badge>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AssignTasksPage;
