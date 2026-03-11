import React, { useState } from "react";
import { motion } from "framer-motion";
import { students, studentDriftData, courses } from "@/data/mockData";
import { TrendingUp, TrendingDown, Minus, Eye, ToggleLeft, ToggleRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import DriftCharts from "@/components/DriftCharts";
import { useToast } from "@/hooks/use-toast";

const StudentsPage = () => {
  const [selectedStudent, setSelectedStudent] = useState<number | null>(null);
  const [courseStates, setCourseStates] = useState<Record<number, boolean>>(
    Object.fromEntries(courses.map(c => [c.id, c.enabled]))
  );
  const [showCourseManager, setShowCourseManager] = useState<number | null>(null);
  const { toast } = useToast();

  const selectedStudentData = selectedStudent ? students.find(s => s.id === selectedStudent) : null;
  const selectedDriftData = selectedStudent ? studentDriftData[selectedStudent] : null;

  const toggleCourse = (courseId: number) => {
    setCourseStates(prev => {
      const newState = { ...prev, [courseId]: !prev[courseId] };
      toast({
        title: newState[courseId] ? "Course Enabled" : "Course Disabled",
        description: `${courses.find(c => c.id === courseId)?.title} has been ${newState[courseId] ? "enabled" : "disabled"} for the student.`,
      });
      return newState;
    });
  };

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-heading font-bold text-foreground">Students</h1>
        <p className="text-muted-foreground">Monitor individual student performance and manage courses</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {students.map((s, i) => (
          <motion.div key={s.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="stat-card hover-lift">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full gradient-primary flex items-center justify-center text-lg font-bold text-primary-foreground">{s.avatar}</div>
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
              <Button variant="default" size="sm" onClick={() => setSelectedStudent(s.id)} className="gradient-primary text-primary-foreground">
                <Eye className="w-4 h-4 mr-1" /> See More
              </Button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Student Detail Modal */}
      <Dialog open={selectedStudent !== null} onOpenChange={() => setSelectedStudent(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3">
              {selectedStudentData && (
                <>
                  <div className="w-12 h-12 rounded-full gradient-primary flex items-center justify-center text-lg font-bold text-primary-foreground">
                    {selectedStudentData.avatar}
                  </div>
                  <div>
                    <span className="text-xl">{selectedStudentData.name}</span>
                    <p className="text-sm font-normal text-muted-foreground">
                      Avg Score: {selectedStudentData.avgScore} · {selectedStudentData.courses} courses ·
                      Drift: {selectedStudentData.drift > 0 ? "+" : ""}{selectedStudentData.drift}%
                    </p>
                  </div>
                </>
              )}
            </DialogTitle>
          </DialogHeader>

          {selectedDriftData && <DriftCharts data={selectedDriftData} />}

          {/* Course Management */}
          <div className="mt-4">
            <h3 className="text-sm font-heading font-semibold text-foreground mb-3">Course Access Management</h3>
            <div className="space-y-2">
              {courses.map(c => (
                <div key={c.id} className="flex items-center justify-between p-3 rounded-lg bg-accent/30 border border-border/50">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: c.color }} />
                    <span className="text-sm text-foreground">{c.title}</span>
                  </div>
                  <Switch checked={courseStates[c.id]} onCheckedChange={() => toggleCourse(c.id)} />
                </div>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default StudentsPage;
