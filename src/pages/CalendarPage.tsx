import React from "react";
import { motion } from "framer-motion";
import { activeDays, scheduleEvents } from "@/data/mockData";
import { ChevronLeft, ChevronRight } from "lucide-react";

const CalendarPage = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const monthName = now.toLocaleString("default", { month: "long", year: "numeric" });
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const days = Array.from({ length: firstDay }, () => null).concat(Array.from({ length: daysInMonth }, (_, i) => i + 1));

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-heading font-bold text-foreground">Calendar</h1>
        <p className="text-muted-foreground">Track your active learning days</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="lg:col-span-2 stat-card">
          <div className="flex items-center justify-between mb-6">
            <button className="p-2 rounded-lg hover:bg-accent"><ChevronLeft className="w-5 h-5 text-foreground" /></button>
            <h2 className="text-lg font-heading font-semibold text-foreground">{monthName}</h2>
            <button className="p-2 rounded-lg hover:bg-accent"><ChevronRight className="w-5 h-5 text-foreground" /></button>
          </div>
          <div className="grid grid-cols-7 gap-2 text-center mb-2">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
              <div key={d} className="text-xs font-medium text-muted-foreground py-2">{d}</div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-2">
            {days.map((day, i) => (
              <div key={i} className={`aspect-square flex items-center justify-center rounded-lg text-sm ${
                day === null ? "" :
                day === now.getDate() ? "gradient-primary text-primary-foreground font-bold" :
                activeDays.includes(day) ? "bg-accent text-accent-foreground font-medium" :
                "text-muted-foreground hover:bg-muted"
              }`}>
                {day}
              </div>
            ))}
          </div>
          <div className="flex gap-4 mt-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1"><div className="w-3 h-3 rounded gradient-primary" /> Today</span>
            <span className="flex items-center gap-1"><div className="w-3 h-3 rounded bg-accent" /> Active</span>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="stat-card">
          <h2 className="text-lg font-heading font-semibold text-foreground mb-4">Today's Events</h2>
          <div className="space-y-3">
            {scheduleEvents.map((e, i) => (
              <div key={i} className="rounded-lg p-3 border-l-4" style={{ borderColor: e.color, backgroundColor: e.color + "10" }}>
                <p className="text-xs font-medium text-muted-foreground">{e.time}</p>
                <p className="text-sm font-medium text-foreground mt-1">{e.title}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 p-4 rounded-xl bg-accent/50">
            <p className="text-sm font-medium text-foreground">Active Days This Month</p>
            <p className="text-3xl font-heading font-bold text-primary mt-1">{activeDays.length}</p>
            <p className="text-xs text-muted-foreground">out of {daysInMonth} days</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CalendarPage;
