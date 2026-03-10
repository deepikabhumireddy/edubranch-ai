import React from "react";
import { motion } from "framer-motion";
import { courses } from "@/data/mockData";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Clock, Star } from "lucide-react";

const anim = (i: number) => ({ initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: i * 0.05 } });

const CoursesPage = () => (
  <div className="space-y-6">
    <motion.div {...anim(0)}>
      <h1 className="text-2xl font-heading font-bold text-foreground">My Courses</h1>
      <p className="text-muted-foreground">{courses.length} courses enrolled</p>
    </motion.div>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {courses.map((c, i) => (
        <motion.div key={c.id} {...anim(i + 1)} className="stat-card group cursor-pointer hover:border-primary/30">
          <div className="h-24 rounded-lg mb-4 flex items-center justify-center" style={{ backgroundColor: c.color + "15" }}>
            <BookOpen className="w-10 h-10" style={{ color: c.color }} />
          </div>
          <Badge className="mb-2 text-xs" style={{ backgroundColor: c.color + "20", color: c.color }}>{c.category}</Badge>
          <h3 className="font-heading font-semibold text-foreground mb-1">{c.title}</h3>
          <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
            <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{c.duration}</span>
            <span className="flex items-center gap-1"><Star className="w-3 h-3" />{c.rating}</span>
          </div>
          <Progress value={c.progress} className="h-2 mb-1" />
          <p className="text-xs text-muted-foreground text-right">{c.progress}% complete</p>
        </motion.div>
      ))}
    </div>
  </div>
);

export default CoursesPage;
