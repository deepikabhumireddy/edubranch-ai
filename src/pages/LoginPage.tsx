import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { BookOpen, GraduationCap, Eye, EyeOff, Brain, Sparkles, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const success = login(username, password);
    if (success) {
      toast({ title: "Welcome back! 🎉", description: "Successfully logged in." });
      navigate("/dashboard");
    } else {
      toast({ title: "Login Failed", description: "Invalid credentials. Try Student/12345 or Instructor/abcd", variant: "destructive" });
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Panel */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="hidden lg:flex lg:w-1/2 gradient-dark items-center justify-center p-12 relative overflow-hidden"
      >
        <div className="absolute inset-0">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                width: `${40 + i * 50}px`, height: `${40 + i * 50}px`,
                top: `${5 + i * 12}%`, left: `${3 + i * 10}%`,
                background: i % 2 === 0 ? "hsl(250, 85%, 60%)" : "hsl(200, 85%, 55%)",
                opacity: 0.08 + i * 0.02,
              }}
              animate={{ y: [0, -20, 0], scale: [1, 1.05, 1] }}
              transition={{ duration: 4 + i, repeat: Infinity, ease: "easeInOut" }}
            />
          ))}
        </div>
        <div className="relative z-10 text-center max-w-md">
          <motion.div
            className="w-24 h-24 rounded-2xl gradient-primary flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-primary/30"
            animate={{ rotateY: [0, 360] }}
            transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
          >
            <Brain className="w-12 h-12 text-primary-foreground" />
          </motion.div>
          <h1 className="text-5xl font-heading font-bold text-primary-foreground mb-4">CognIQ</h1>
          <p className="text-lg text-primary-foreground/70">
            Intelligent concept drift detection for student learning behavior. Track, analyze, and optimize learning outcomes.
          </p>
          <div className="mt-10 grid grid-cols-3 gap-4">
            {[
              { label: "Courses", value: "50+", icon: BookOpen },
              { label: "Students", value: "1,200+", icon: TrendingUp },
              { label: "AI-Powered", value: "100%", icon: Sparkles },
            ].map((stat) => (
              <motion.div
                key={stat.label}
                className="bg-primary-foreground/10 rounded-xl p-4 backdrop-blur-sm border border-primary-foreground/10"
                whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.15)" }}
              >
                <stat.icon className="w-5 h-5 text-primary-foreground/60 mx-auto mb-2" />
                <div className="text-2xl font-heading font-bold text-primary-foreground">{stat.value}</div>
                <div className="text-sm text-primary-foreground/60">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Right Panel */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="flex-1 flex items-center justify-center p-8"
      >
        <div className="w-full max-w-md">
          <div className="lg:hidden flex items-center gap-3 mb-8 justify-center">
            <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
              <Brain className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-2xl font-heading font-bold text-foreground">CognIQ</span>
          </div>

          <h2 className="text-3xl font-heading font-bold text-foreground mb-2">Welcome back</h2>
          <p className="text-muted-foreground mb-8">Sign in to continue your learning journey</p>

          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input id="username" placeholder="Enter your username" value={username} onChange={(e) => setUsername(e.target.value)} className="h-12" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input id="password" type={showPassword ? "text" : "password"} placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} className="h-12 pr-10" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            <Button type="submit" className="w-full h-12 gradient-primary text-primary-foreground font-semibold text-base hover:opacity-90 transition-all hover:shadow-lg hover:shadow-primary/25">
              Sign In
            </Button>
          </form>

          <div className="mt-8 p-4 rounded-xl bg-accent border border-border">
            <p className="text-sm font-semibold text-accent-foreground mb-2 flex items-center gap-2">
              <BookOpen className="w-4 h-4" /> Demo Credentials
            </p>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="space-y-1">
                <p className="text-muted-foreground">Student</p>
                <p className="font-mono text-foreground">Student / 12345</p>
              </div>
              <div className="space-y-1">
                <p className="text-muted-foreground">Instructor</p>
                <p className="font-mono text-foreground">Instructor / abcd</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
