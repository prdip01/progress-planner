export const DEFAULT_TEMPLATE = [
  {
    id: 1,
    title: "Stage 1: English (Morning)",
    time: "06:00 AM - 08:15 AM",
    color: "bg-blue-50/50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300",
    tasks: [
      { id: "e1", title: "Grammar – 45 min", completed: false },
      { id: "e2", title: "Vocabulary – 45 min", completed: false },
      { id: "e3", title: "Newspaper Reading – 45 min", completed: false }
    ]
  },
  {
    id: 2,
    title: "Stage 2: Mathematics",
    time: "09:00 AM - 11:30 AM",
    color: "bg-indigo-50/50 text-indigo-700 dark:bg-indigo-900/20 dark:text-indigo-300",
    tasks: [
      { id: "m1", title: "1 Lecture (Advanced / Arithmetic)", completed: false },
      { id: "m2", title: "Math Practice / Super Calcio", completed: false }
    ]
  },
  {
    id: 3,
    title: "Stage 3: Reasoning",
    time: "12:30 PM - 02:30 PM",
    color: "bg-purple-50/50 text-purple-700 dark:bg-purple-900/20 dark:text-purple-300",
    tasks: [
      { id: "r1", title: "1 Lecture", completed: false },
      { id: "r2", title: "Solve DPP", completed: false },
      { id: "r3", title: "Write notes in notebook", completed: false }
    ]
  },
  {
    id: 4,
    title: "Stage 4: General Awareness",
    time: "03:00 PM - 05:00 PM",
    color: "bg-emerald-50/50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-300",
    tasks: [
      { id: "g1", title: "Current Affairs – 10 min", completed: false },
      { id: "g2", title: "Static GK – 10-20 min", completed: false },
      { id: "g3", title: "Geography – 30 min", completed: false },
      { id: "g4", title: "Polity – 30 min", completed: false }
    ]
  }
];

export const JEE_MAINS_TEMPLATE = [
  {
    id: 1,
    title: "Stage 1: Morning Practice Session",
    time: "08:00 AM - 11:00 AM",
    color: "bg-blue-50/50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300",
    tasks: [
      { id: "jee_dpp1", title: "DPP 1", completed: false },
      { id: "jee_dpp2", title: "DPP 2", completed: false }
    ]
  },
  {
    id: 2,
    title: "Stage 2: Subject 1 & 2",
    time: "11:30 AM - 02:30 PM",
    color: "bg-emerald-50/50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-300",
    tasks: [
      { id: "jee_sub_phy", title: "Physics", completed: false },
      { id: "jee_sub_chem", title: "Chemistry", completed: false }
    ]
  },
  {
    id: 3,
    title: "Stage 3: Subject 3",
    time: "03:30 PM - 05:30 PM",
    color: "bg-purple-50/50 text-purple-700 dark:bg-purple-900/20 dark:text-purple-300",
    tasks: [
      { id: "jee_sub_math", title: "Math", completed: false }
    ]
  }
];

export const STAGE_COLORS = [
  "bg-blue-50/50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300",
  "bg-indigo-50/50 text-indigo-700 dark:bg-indigo-900/20 dark:text-indigo-300",
  "bg-purple-50/50 text-purple-700 dark:bg-purple-900/20 dark:text-purple-300",
  "bg-emerald-50/50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-300",
  "bg-amber-50/50 text-amber-700 dark:bg-amber-900/20 dark:text-amber-300",
  "bg-rose-50/50 text-rose-700 dark:bg-rose-900/20 dark:text-rose-300",
];
