import React, { useState } from "react";
import { motion } from "framer-motion";
import { students, studentDriftData } from "@/data/mockData";
import { AlertTriangle, TrendingDown, TrendingUp, Eye } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import DriftCharts from "@/components/DriftCharts";

const DriftAlertsPage = () => {
  const declining = students.filter(s => s.trend === "down");
  const improving = students.filter(s => s.trend === "up");
  const [selectedStudent, setSelectedStudent] = useState<number | null>(null);

  const selectedStudentData = selectedStudent ? students.find(s => s.id === selectedStudent) : null;
  const selectedDriftData = selectedStudent ? studentDriftData[selectedStudent] : null;

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
              <motion.div key={s.id} className="flex items-center justify-between p-3 rounded-lg bg-destructive/5 hover:bg-destructive/10 transition-colors cursor-pointer" onClick={() => setSelectedStudent(s.id)} whileHover={{ x: 4 }}>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-destructive/10 flex items-center justify-center text-xs font-bold text-destructive">{s.avatar}</div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{s.name}</p>
                    <p className="text-xs text-muted-foreground">Score: {s.avgScore}</p>
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

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="stat-card border-success/20">
          <div className="flex items-center gap-2 mb-1">
            <TrendingUp className="w-5 h-5 text-success" />
            <h2 className="font-heading font-semibold text-foreground">Positive Drift</h2>
          </div>
          <p className="text-xs text-muted-foreground mb-3">Students showing improvement</p>
          <div className="space-y-2">
            {improving.map(s => (
              <motion.div key={s.id} className="flex items-center justify-between p-3 rounded-lg bg-success/5 hover:bg-success/10 transition-colors cursor-pointer" onClick={() => setSelectedStudent(s.id)} whileHover={{ x: 4 }}>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-success/10 flex items-center justify-center text-xs font-bold text-success">{s.avatar}</div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{s.name}</p>
                    <p className="text-xs text-muted-foreground">Score: {s.avgScore}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className="gradient-success text-success-foreground font-mono">+{s.drift}%</Badge>
                  <Eye className="w-4 h-4 text-muted-foreground" />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Student Drift Detail Modal */}
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
                    <span>{selectedStudentData.name} - Drift Analysis</span>
                    <p className="text-sm font-normal text-muted-foreground">
                      Drift: {selectedStudentData.drift > 0 ? "+" : ""}{selectedStudentData.drift}% ·
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

export default DriftAlertsPage;
