import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import LoginPage from "@/pages/LoginPage";
import StudentDashboard from "@/pages/StudentDashboard";
import InstructorDashboard from "@/pages/InstructorDashboard";
import CoursesPage from "@/pages/CoursesPage";
import AssessmentsPage from "@/pages/AssessmentsPage";
import LeaderboardPage from "@/pages/LeaderboardPage";
import CalendarPage from "@/pages/CalendarPage";
import DoubtsPage from "@/pages/DoubtsPage";
import AIAgentPage from "@/pages/AIAgentPage";
import StudentChatPage from "@/pages/StudentChatPage";
import StudentsPage from "@/pages/StudentsPage";
import DriftAlertsPage from "@/pages/DriftAlertsPage";
import AssignTasksPage from "@/pages/AssignTasksPage";
import DoubtTicketsPage from "@/pages/DoubtTicketsPage";
import DashboardLayout from "@/components/DashboardLayout";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const ProtectedRoute = ({ children, role }: { children: React.ReactNode; role?: string }) => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/" replace />;
  if (role && user.role !== role) return <Navigate to="/dashboard" replace />;
  return <DashboardLayout>{children}</DashboardLayout>;
};

const DashboardRouter = () => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/" replace />;
  return user.role === "instructor" ? <ProtectedRoute><InstructorDashboard /></ProtectedRoute> : <ProtectedRoute><StudentDashboard /></ProtectedRoute>;
};

const AppRoutes = () => {
  const { user } = useAuth();
  return (
    <Routes>
      <Route path="/" element={user ? <Navigate to="/dashboard" replace /> : <LoginPage />} />
      <Route path="/dashboard" element={<DashboardRouter />} />
      {/* Student Routes */}
      <Route path="/courses" element={<ProtectedRoute role="student"><CoursesPage /></ProtectedRoute>} />
      <Route path="/assessments" element={<ProtectedRoute role="student"><AssessmentsPage /></ProtectedRoute>} />
      <Route path="/leaderboard" element={<ProtectedRoute role="student"><LeaderboardPage /></ProtectedRoute>} />
      <Route path="/calendar" element={<ProtectedRoute role="student"><CalendarPage /></ProtectedRoute>} />
      <Route path="/doubts" element={<ProtectedRoute role="student"><DoubtsPage /></ProtectedRoute>} />
      <Route path="/chat" element={<ProtectedRoute role="student"><StudentChatPage /></ProtectedRoute>} />
      <Route path="/ai-agent" element={<ProtectedRoute role="student"><AIAgentPage /></ProtectedRoute>} />
      {/* Instructor Routes */}
      <Route path="/students" element={<ProtectedRoute role="instructor"><StudentsPage /></ProtectedRoute>} />
      <Route path="/drift-alerts" element={<ProtectedRoute role="instructor"><DriftAlertsPage /></ProtectedRoute>} />
      <Route path="/assign-tasks" element={<ProtectedRoute role="instructor"><AssignTasksPage /></ProtectedRoute>} />
      <Route path="/doubt-tickets" element={<ProtectedRoute role="instructor"><DoubtTicketsPage /></ProtectedRoute>} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
