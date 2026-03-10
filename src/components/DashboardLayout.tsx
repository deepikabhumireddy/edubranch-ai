import React, { ReactNode } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
  LayoutDashboard, BookOpen, FileText, Trophy, Calendar, MessageSquare, Bot, Bell, Users, BarChart3, ClipboardList, LogOut, GraduationCap, ChevronLeft, Menu
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const studentLinks = [
  { to: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/courses", icon: BookOpen, label: "My Courses" },
  { to: "/assessments", icon: FileText, label: "Assessments" },
  { to: "/leaderboard", icon: Trophy, label: "Leaderboard" },
  { to: "/calendar", icon: Calendar, label: "Calendar" },
  { to: "/doubts", icon: MessageSquare, label: "Doubts" },
  { to: "/ai-agent", icon: Bot, label: "AI HelpMate" },
];

const instructorLinks = [
  { to: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/students", icon: Users, label: "Students" },
  { to: "/drift-alerts", icon: BarChart3, label: "Drift Alerts" },
  { to: "/assign-tasks", icon: ClipboardList, label: "Assign Tasks" },
  { to: "/doubt-tickets", icon: MessageSquare, label: "Doubt Tickets" },
];

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const links = user?.role === "instructor" ? instructorLinks : studentLinks;

  const handleLogout = () => { logout(); navigate("/"); };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      <div className="p-4 flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl gradient-primary flex items-center justify-center flex-shrink-0">
          <GraduationCap className="w-5 h-5 text-primary-foreground" />
        </div>
        {!collapsed && <span className="text-lg font-heading font-bold text-sidebar-foreground">ConceptDrift</span>}
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1">
        {links.map((link) => {
          const active = location.pathname === link.to;
          return (
            <button
              key={link.to}
              onClick={() => { navigate(link.to); setMobileOpen(false); }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                active ? "bg-sidebar-primary text-sidebar-primary-foreground" : "text-sidebar-foreground hover:bg-sidebar-accent"
              }`}
            >
              <link.icon className="w-5 h-5 flex-shrink-0" />
              {!collapsed && <span>{link.label}</span>}
            </button>
          );
        })}
      </nav>

      <div className="p-3 border-t border-sidebar-border">
        <div className="flex items-center gap-3 px-3 py-2 mb-2">
          <div className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center text-xs font-bold text-primary-foreground flex-shrink-0">
            {user?.avatar}
          </div>
          {!collapsed && (
            <div className="min-w-0">
              <p className="text-sm font-medium text-sidebar-foreground truncate">{user?.name}</p>
              <p className="text-xs text-sidebar-foreground/60 capitalize">{user?.role}</p>
            </div>
          )}
        </div>
        <button onClick={handleLogout} className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-sidebar-foreground hover:bg-sidebar-accent transition-colors">
          <LogOut className="w-5 h-5 flex-shrink-0" />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Desktop Sidebar */}
      <aside className={`hidden md:flex flex-col bg-sidebar transition-all duration-300 ${collapsed ? "w-16" : "w-60"}`}>
        <SidebarContent />
        <button onClick={() => setCollapsed(!collapsed)} className="absolute top-4 right-0 translate-x-1/2 z-10 w-6 h-6 rounded-full bg-card border border-border flex items-center justify-center hover:bg-accent" style={{ left: collapsed ? "52px" : "228px" }}>
          <ChevronLeft className={`w-3 h-3 transition-transform ${collapsed ? "rotate-180" : ""}`} />
        </button>
      </aside>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-foreground/50" onClick={() => setMobileOpen(false)} />
          <aside className="absolute left-0 top-0 bottom-0 w-60 bg-sidebar">
            <SidebarContent />
          </aside>
        </div>
      )}

      {/* Main */}
      <main className="flex-1 overflow-y-auto">
        <div className="md:hidden flex items-center gap-3 p-4 border-b border-border bg-card">
          <button onClick={() => setMobileOpen(true)}><Menu className="w-6 h-6" /></button>
          <span className="font-heading font-bold text-foreground">ConceptDrift</span>
        </div>
        <div className="p-4 md:p-6 lg:p-8">{children}</div>
      </main>
    </div>
  );
};

export default DashboardLayout;
