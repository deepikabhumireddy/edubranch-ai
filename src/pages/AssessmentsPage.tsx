import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { assessments, quizQuestions } from "@/data/mockData";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, FileText, Code, Camera, AlertTriangle, CheckCircle, Trophy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const AssessmentsPage = () => {
  const [activeAssessment, setActiveAssessment] = useState<number | null>(null);
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [timeLeft, setTimeLeft] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [cameraActive, setCameraActive] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { toast } = useToast();

  // Tab switch detection
  useEffect(() => {
    if (activeAssessment === null) return;
    const handler = () => {
      toast({ title: "⚠️ Warning!", description: "Tab switching is not allowed during assessment!", variant: "destructive" });
    };
    document.addEventListener("visibilitychange", handler);
    return () => document.removeEventListener("visibilitychange", handler);
  }, [activeAssessment, toast]);

  // Timer
  useEffect(() => {
    if (activeAssessment === null || submitted) return;
    const interval = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) { clearInterval(interval); handleSubmit(); return 0; }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [activeAssessment, submitted]);

  // Camera
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) videoRef.current.srcObject = stream;
      setCameraActive(true);
    } catch {
      toast({ title: "Camera Required", description: "Please enable camera for proctored assessment.", variant: "destructive" });
    }
  };

  const stopCamera = () => {
    if (videoRef.current?.srcObject) {
      (videoRef.current.srcObject as MediaStream).getTracks().forEach((t) => t.stop());
      setCameraActive(false);
    }
  };

  const startAssessment = (id: number) => {
    const a = assessments.find((a) => a.id === id);
    if (!a || a.status === "completed") return;
    setActiveAssessment(id);
    setCurrentQ(0);
    setAnswers({});
    setTimeLeft(a.duration * 60);
    setSubmitted(false);
    setShowResult(false);
    startCamera();
  };

  const handleSubmit = useCallback(() => {
    setSubmitted(true);
    stopCamera();
    setShowResult(true);
    toast({ title: "🎉 Congratulations!", description: "Assessment submitted successfully!" });
  }, [toast]);

  const score = Object.entries(answers).reduce((acc, [qIdx, ans]) => acc + (quizQuestions[Number(qIdx)]?.correct === ans ? 1 : 0), 0);
  const totalQ = quizQuestions.length;
  const formatTime = (s: number) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, "0")}`;

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-heading font-bold text-foreground">Assessments</h1>
        <p className="text-muted-foreground">Complete quizzes and coding challenges</p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {assessments.map((a, i) => (
          <motion.div key={a.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="stat-card">
            <div className="flex items-center gap-2 mb-3">
              {a.type === "quiz" ? <FileText className="w-5 h-5 text-primary" /> : <Code className="w-5 h-5 text-info" />}
              <Badge variant={a.status === "completed" ? "default" : "outline"} className={a.status === "completed" ? "gradient-success text-success-foreground" : ""}>
                {a.status}
              </Badge>
            </div>
            <h3 className="font-heading font-semibold text-foreground mb-2">{a.title}</h3>
            <div className="flex gap-3 text-xs text-muted-foreground mb-3">
              <span>{a.questions} questions</span>
              <span>{a.duration} min</span>
            </div>
            {a.status === "completed" ? (
              <div className="bg-accent/50 rounded-lg p-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Score</span>
                  <span className="font-bold text-foreground">{a.score}/100</span>
                </div>
                <div className="flex justify-between text-sm mt-1">
                  <span className="text-muted-foreground">Time</span>
                  <span className="font-medium text-foreground">{a.timeTaken} min</span>
                </div>
              </div>
            ) : (
              <Button onClick={() => startAssessment(a.id)} className="w-full gradient-primary text-primary-foreground">Start Assessment</Button>
            )}
          </motion.div>
        ))}
      </div>

      {/* Assessment Dialog */}
      <Dialog open={activeAssessment !== null && !showResult} onOpenChange={() => { stopCamera(); setActiveAssessment(null); }}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              <span>Assessment in Progress</span>
              <div className="flex items-center gap-3">
                <span className={`flex items-center gap-1 text-sm font-mono ${timeLeft < 60 ? "text-destructive" : "text-foreground"}`}>
                  <Clock className="w-4 h-4" />{formatTime(timeLeft)}
                </span>
                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Camera className={`w-4 h-4 ${cameraActive ? "text-success" : "text-destructive"}`} />
                  {cameraActive ? "On" : "Off"}
                </span>
              </div>
            </DialogTitle>
          </DialogHeader>

          <video ref={videoRef} autoPlay muted className="w-24 h-18 rounded-lg absolute top-4 right-4 object-cover border border-border" />

          <div className="space-y-6 py-4">
            <div className="flex gap-1 mb-4">
              {quizQuestions.map((_, i) => (
                <div key={i} className={`h-1.5 flex-1 rounded-full ${i === currentQ ? "bg-primary" : answers[i] !== undefined ? "bg-success" : "bg-muted"}`} />
              ))}
            </div>

            <div>
              <p className="text-sm text-muted-foreground mb-2">Question {currentQ + 1} of {totalQ}</p>
              <h3 className="text-lg font-semibold text-foreground mb-4">{quizQuestions[currentQ]?.question}</h3>
              <div className="space-y-2">
                {quizQuestions[currentQ]?.options.map((opt, i) => (
                  <button key={i} onClick={() => setAnswers({ ...answers, [currentQ]: i })} className={`w-full text-left px-4 py-3 rounded-lg border transition-all ${answers[currentQ] === i ? "border-primary bg-accent" : "border-border hover:bg-muted"}`}>
                    <span className="text-sm">{opt}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setCurrentQ(Math.max(0, currentQ - 1))} disabled={currentQ === 0}>Previous</Button>
              {currentQ < totalQ - 1 ? (
                <Button onClick={() => setCurrentQ(currentQ + 1)} className="gradient-primary text-primary-foreground">Next</Button>
              ) : (
                <Button onClick={handleSubmit} className="gradient-success text-success-foreground">Submit</Button>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Result Dialog */}
      <Dialog open={showResult} onOpenChange={() => { setShowResult(false); setActiveAssessment(null); }}>
        <DialogContent className="max-w-md text-center">
          <div className="py-6 space-y-4">
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-20 h-20 rounded-full gradient-primary flex items-center justify-center mx-auto">
              <Trophy className="w-10 h-10 text-primary-foreground" />
            </motion.div>
            <h2 className="text-2xl font-heading font-bold text-foreground">🎉 Congratulations!</h2>
            <p className="text-muted-foreground">You've completed the assessment</p>
            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="stat-card">
                <div className="text-3xl font-heading font-bold text-primary">{score}/{totalQ}</div>
                <div className="text-sm text-muted-foreground">Correct</div>
              </div>
              <div className="stat-card">
                <div className="text-3xl font-heading font-bold text-foreground">{formatTime(assessments.find(a => a.id === activeAssessment)?.duration! * 60 - timeLeft)}</div>
                <div className="text-sm text-muted-foreground">Time Taken</div>
              </div>
            </div>
            <Button onClick={() => { setShowResult(false); setActiveAssessment(null); }} className="w-full gradient-primary text-primary-foreground mt-4">Back to Assessments</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AssessmentsPage;
