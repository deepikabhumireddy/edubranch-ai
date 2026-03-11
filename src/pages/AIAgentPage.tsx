import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Bot, Send, User, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ReactMarkdown from "react-markdown";

type Msg = { role: "user" | "assistant"; content: string };

const aiResponses: Record<string, string> = {
  default: "That's a great question! Let me help you with that. Could you provide more details about what specific concept you're struggling with?",
  python: `**Python** is a versatile programming language. Here are the key concepts:

- **Variables & Data Types**: \`int\`, \`float\`, \`str\`, \`bool\`, \`list\`, \`dict\`, \`tuple\`
- **Control Flow**: \`if/elif/else\`, \`for\` loops, \`while\` loops
- **Functions**: Define with \`def\`, support default args, *args, **kwargs
- **OOP**: Classes, inheritance, encapsulation, polymorphism
- **Error Handling**: \`try/except/finally\` blocks

Would you like me to dive deeper into any of these?`,
  javascript: `**JavaScript** is essential for web development. Key topics:

1. **DOM Manipulation** - \`document.querySelector()\`, event listeners
2. **Async Programming** - Promises, \`async/await\`, callbacks
3. **ES6+ Features** - Arrow functions, destructuring, spread operator, template literals
4. **Closures & Scope** - Lexical scoping, closures for data privacy
5. **Modern Frameworks** - React, Vue, Angular

*Pro tip*: Master \`Array.map()\`, \`filter()\`, and \`reduce()\` — they're used everywhere!`,
  recursion: `## Recursion Explained

Recursion is when a **function calls itself** to solve smaller instances of the same problem.

### Key Components:
1. **Base Case** — The stopping condition
2. **Recursive Case** — The function calling itself with a simpler input

### Example: Factorial
\`\`\`python
def factorial(n):
    if n == 0:  # Base case
        return 1
    return n * factorial(n - 1)  # Recursive case
\`\`\`

### Common Pitfall:
> Missing base case → **infinite recursion** → stack overflow!

*Your drift analysis shows this is a concept you're improving on. Keep practicing!*`,
  algorithm: `## Algorithms & Big O Notation

### Time Complexity Hierarchy:
| Notation | Name | Example |
|----------|------|---------|
| O(1) | Constant | Array access |
| O(log n) | Logarithmic | Binary search |
| O(n) | Linear | Linear search |
| O(n log n) | Linearithmic | Merge sort |
| O(n²) | Quadratic | Bubble sort |

### Key Algorithms to Know:
- **Sorting**: Merge Sort (O(n log n)), Quick Sort
- **Searching**: Binary Search (O(log n))
- **Graph**: BFS, DFS, Dijkstra's

*Based on your performance data, focus on sorting algorithms — your quiz scores show room for improvement there.*`,
  css: `## CSS Mastery Guide

### Layout Systems:
- **Flexbox** — 1D layout (rows OR columns)
- **Grid** — 2D layout (rows AND columns)

### Responsive Design:
\`\`\`css
@media (max-width: 768px) {
  .container { flex-direction: column; }
}
\`\`\`

### Modern CSS Features:
- CSS Variables: \`--primary: #6366f1\`
- Container Queries
- \`:has()\` selector
- Subgrid

*Your recent CSS quiz score was strong — you're on track!*`,
  drift: `## Understanding Concept Drift 📊

Based on your learning data:
- **Drift Score**: Measures how your problem-solving patterns change over time
- **Lower is better** — it means consistent, conceptual understanding
- **High drift** suggests shifting to guessing or pattern-matching

### Your Insights:
- Your accuracy has been trending in the right direction
- Focus areas: Practice problems that test deep understanding, not just recognition
- Recommended: Spend 15 min daily on spaced repetition

*Keep up the momentum! Your weekly trend shows improvement.*`,
  ml: `## Machine Learning Basics

### Core Concepts:
1. **Supervised Learning** — Labeled data (classification, regression)
2. **Unsupervised Learning** — No labels (clustering, dimensionality reduction)
3. **Overfitting** — Model memorizes training data; use cross-validation
4. **Feature Engineering** — Selecting/creating relevant input features

### Key Algorithms:
- Linear Regression, Logistic Regression
- Decision Trees, Random Forest
- K-Means Clustering
- Neural Networks

*This aligns with your ML Basics course — you're 15% through. Keep going!*`,
  react: `## React & TypeScript

### Core Patterns:
- **Components** — Functional with hooks
- **State Management** — \`useState\`, \`useReducer\`, Context API
- **Side Effects** — \`useEffect\` for data fetching, subscriptions
- **Performance** — \`useMemo\`, \`useCallback\`, React.memo

### TypeScript Benefits:
\`\`\`tsx
interface Props {
  title: string;
  onComplete: (score: number) => void;
}
const Quiz: React.FC<Props> = ({ title, onComplete }) => { ... }
\`\`\`

*Your React course is 55% complete — great progress!*`,
};

const getResponse = (msg: string): string => {
  const lower = msg.toLowerCase();
  if (lower.includes("python")) return aiResponses.python;
  if (lower.includes("javascript") || lower.includes("js")) return aiResponses.javascript;
  if (lower.includes("recursion") || lower.includes("recursive")) return aiResponses.recursion;
  if (lower.includes("algorithm") || lower.includes("big o") || lower.includes("sorting")) return aiResponses.algorithm;
  if (lower.includes("css") || lower.includes("style") || lower.includes("flexbox") || lower.includes("grid")) return aiResponses.css;
  if (lower.includes("drift") || lower.includes("performance") || lower.includes("score")) return aiResponses.drift;
  if (lower.includes("machine learning") || lower.includes("ml") || lower.includes("overfitting")) return aiResponses.ml;
  if (lower.includes("react") || lower.includes("typescript") || lower.includes("component")) return aiResponses.react;
  return aiResponses.default;
};

const AIAgentPage = () => {
  const [messages, setMessages] = useState<Msg[]>([
    { role: "assistant", content: "Hi! I'm your **AI HelpMate** 🤖✨\n\nI can help you with:\n- Course concepts (Python, JS, CSS, ML, React)\n- Your **drift analysis** and learning patterns\n- Algorithm explanations\n- Study recommendations\n\nWhat would you like to learn about?" },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  const send = () => {
    if (!input.trim()) return;
    const userMsg: Msg = { role: "user", content: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      setMessages((prev) => [...prev, { role: "assistant", content: getResponse(input) }]);
      setTyping(false);
    }, 600 + Math.random() * 800);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-120px)]">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-heading font-bold text-foreground flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-primary" /> AI HelpMate
        </h1>
        <p className="text-muted-foreground mb-4">Your personal learning assistant — analyzes your performance & clarifies concepts</p>
      </motion.div>

      <div className="flex-1 overflow-y-auto space-y-4 mb-4 pr-2">
        {messages.map((m, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={`flex gap-3 ${m.role === "user" ? "justify-end" : ""}`}>
            {m.role === "assistant" && (
              <div className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center flex-shrink-0 shadow-md shadow-primary/20">
                <Bot className="w-4 h-4 text-primary-foreground" />
              </div>
            )}
            <div className={`max-w-[75%] rounded-2xl px-4 py-3 text-sm ${
              m.role === "user" ? "gradient-primary text-primary-foreground rounded-br-md shadow-md shadow-primary/15" : "bg-card border border-border text-foreground rounded-bl-md"
            }`}>
              {m.role === "assistant" ? (
                <div className="prose prose-sm max-w-none [&>*]:text-foreground [&_strong]:text-foreground [&_code]:text-primary [&_code]:bg-accent/50 [&_code]:px-1 [&_code]:rounded [&_a]:text-primary [&_h2]:text-lg [&_h2]:font-heading [&_h3]:text-base [&_h3]:font-heading [&_table]:text-xs [&_th]:text-muted-foreground [&_em]:text-muted-foreground">
                  <ReactMarkdown>{m.content}</ReactMarkdown>
                </div>
              ) : m.content}
            </div>
            {m.role === "user" && (
              <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                <User className="w-4 h-4 text-muted-foreground" />
              </div>
            )}
          </motion.div>
        ))}
        {typing && (
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center flex-shrink-0 shadow-md shadow-primary/20">
              <Bot className="w-4 h-4 text-primary-foreground" />
            </div>
            <div className="bg-card border border-border rounded-2xl rounded-bl-md px-4 py-3">
              <div className="flex gap-1">
                {[0, 1, 2].map(i => <div key={i} className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />)}
              </div>
            </div>
          </div>
        )}
        <div ref={endRef} />
      </div>

      <div className="flex gap-3">
        <Input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask about concepts, your performance, or study tips..." className="flex-1"
          onKeyDown={(e) => e.key === "Enter" && send()} />
        <Button onClick={send} className="gradient-primary text-primary-foreground hover:shadow-lg hover:shadow-primary/25 transition-all">
          <Send className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default AIAgentPage;
