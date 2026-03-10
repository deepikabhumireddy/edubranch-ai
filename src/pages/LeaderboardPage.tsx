import React from "react";
import { motion } from "framer-motion";
import { leaderboard } from "@/data/mockData";
import { Trophy, Medal, Award, BookOpen, Clock, GraduationCap } from "lucide-react";

const LeaderboardPage = () => (
  <div className="space-y-6">
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <h1 className="text-2xl font-heading font-bold text-foreground">Leaderboard</h1>
      <p className="text-muted-foreground">See how you rank among your peers</p>
    </motion.div>

    {/* Top 3 */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {leaderboard.slice(0, 3).map((p, i) => (
        <motion.div key={p.rank} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
          className={`stat-card text-center ${i === 0 ? "md:order-2 border-primary/30" : i === 1 ? "md:order-1" : "md:order-3"}`}
        >
          <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3 text-lg font-bold ${
            i === 0 ? "gradient-primary text-primary-foreground" : i === 1 ? "bg-muted text-muted-foreground" : "bg-accent text-accent-foreground"
          }`}>{p.avatar}</div>
          {i === 0 && <Trophy className="w-6 h-6 text-primary mx-auto mb-1" />}
          {i === 1 && <Medal className="w-6 h-6 text-muted-foreground mx-auto mb-1" />}
          {i === 2 && <Award className="w-6 h-6 text-accent-foreground mx-auto mb-1" />}
          <h3 className="font-heading font-bold text-foreground">{p.name}</h3>
          <p className="text-2xl font-heading font-bold text-primary mt-1">{p.score.toLocaleString()}</p>
          <div className="flex justify-center gap-4 mt-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1"><BookOpen className="w-3 h-3" />{p.courses}</span>
            <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{p.hours}h</span>
            <span className="flex items-center gap-1"><GraduationCap className="w-3 h-3" />{p.certs}</span>
          </div>
        </motion.div>
      ))}
    </div>

    {/* Full list */}
    <div className="stat-card">
      <div className="space-y-3">
        {leaderboard.map((p, i) => (
          <motion.div key={p.rank} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}
            className="flex items-center gap-4 p-3 rounded-lg hover:bg-accent/50 transition-colors"
          >
            <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
              p.rank <= 3 ? "gradient-primary text-primary-foreground" : "bg-muted text-muted-foreground"
            }`}>{p.rank}</span>
            <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center text-sm font-bold text-accent-foreground">{p.avatar}</div>
            <div className="flex-1">
              <p className="font-medium text-foreground">{p.name}</p>
              <p className="text-xs text-muted-foreground">{p.courses} courses · {p.hours}h · {p.certs} certs</p>
            </div>
            <span className="text-lg font-heading font-bold text-primary">{p.score.toLocaleString()}</span>
          </motion.div>
        ))}
      </div>
    </div>
  </div>
);

export default LeaderboardPage;
