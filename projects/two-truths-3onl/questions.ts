import type { QuestionSet, Topic } from "./types";

export const QUESTIONS: QuestionSet[] = [
  // React (5)
  {
    id: "react-1",
    topic: "react",
    statements: [
      "The virtual DOM is a lightweight JavaScript object tree, not a real DOM copy.",
      "React keys help reconcile list items when order or membership changes.",
      "You must use class components to hold local state in modern React.",
    ],
    lieIndex: 2,
    explanation:
      "Hooks (useState, useReducer) let function components hold state — class components are optional legacy.",
  },
  {
    id: "react-2",
    topic: "react",
    statements: [
      "useState updates are batched and may not reflect immediately after calling setState.",
      "Strict Mode intentionally double-invokes effects in development to surface bugs.",
      "JSX is a required syntax — React cannot be used without it.",
    ],
    lieIndex: 2,
    explanation:
      "JSX is syntactic sugar. You can use React.createElement() directly — JSX just compiles to that.",
  },
  {
    id: "react-3",
    topic: "react",
    statements: [
      "React Fiber enables incremental rendering and interruptible work.",
      "Props are read-only — child components should never mutate them.",
      "React.memo prevents a component from ever re-rendering again.",
    ],
    lieIndex: 2,
    explanation:
      "React.memo skips re-renders only when props are shallow-equal — new object references still trigger updates.",
  },
  {
    id: "react-4",
    topic: "react",
    statements: [
      "Fragments let you group children without adding an extra DOM node.",
      "useEffect runs after paint by default, not before the browser paints.",
      "Every React hook can be called inside loops and conditionals freely.",
    ],
    lieIndex: 2,
    explanation:
      "Hooks must be called at the top level in the same order every render — no loops, conditions, or nested functions.",
  },
  {
    id: "react-5",
    topic: "react",
    statements: [
      "Server Components run on the server and can fetch data without shipping logic to the client.",
      "useRef persists a mutable value across renders without causing re-renders.",
      "Context replaces the need for any prop drilling in every situation.",
    ],
    lieIndex: 2,
    explanation:
      "Context is great for global-ish data, but overusing it hurts performance and clarity — props still have their place.",
  },

  // Git (4)
  {
    id: "git-1",
    topic: "git",
    statements: [
      "git commit snapshots only what is staged in the index.",
      "git pull typically runs fetch followed by merge (or rebase, if configured).",
      "git stash permanently deletes your uncommitted changes.",
    ],
    lieIndex: 2,
    explanation:
      "git stash saves changes to a stack you can pop or apply later — nothing is permanently deleted.",
  },
  {
    id: "git-2",
    topic: "git",
    statements: [
      "A detached HEAD means HEAD points directly to a commit, not a branch tip.",
      "git rebase replays commits onto another base, rewriting history.",
      "git merge always creates a merge commit, even on fast-forward.",
    ],
    lieIndex: 2,
    explanation:
      "Fast-forward merges move the branch pointer forward with no merge commit when there is a linear history.",
  },
  {
    id: "git-3",
    topic: "git",
    statements: [
      "You can use Git entirely locally without any remote repository.",
      "git cherry-pick applies the changes from a single commit onto your current branch.",
      "git reset --hard is always impossible to recover from.",
    ],
    lieIndex: 2,
    explanation:
      "Reflog keeps a history of HEAD movements — recently reset commits can often be recovered with git reflog.",
  },
  {
    id: "git-4",
    topic: "git",
    statements: [
      "The .gitignore file prevents untracked files from appearing in git status.",
      "A merge conflict means Git couldn't auto-combine changes in the same region.",
      "git clone only works if you already have a local repository initialized.",
    ],
    lieIndex: 2,
    explanation:
      "git clone creates a fresh local copy from a remote URL — no prior local repo is required.",
  },

  // CSS (4)
  {
    id: "css-1",
    topic: "css",
    statements: [
      "Vertical margin collapse can occur between adjacent block-level elements.",
      "z-index only applies to elements with position other than static.",
      "The em unit is relative to the font-size of the element itself (for font-size) or its parent (for other properties).",
    ],
    lieIndex: 1,
    explanation:
      "Flex and grid items, opacity, transforms, and other properties create stacking contexts where z-index works without position.",
  },
  {
    id: "css-2",
    topic: "css",
    statements: [
      "CSS Grid lets multiple items occupy the same grid cell and overlap.",
      "!important always beats inline styles regardless of specificity.",
      "rem is always relative to the root element's font-size.",
    ],
    lieIndex: 1,
    explanation:
      "Inline styles with !important can beat stylesheet !important rules — specificity and origin still matter.",
  },
  {
    id: "css-3",
    topic: "css",
    statements: [
      "Flexbox lays out items primarily along one axis at a time.",
      "With box-sizing: content-box, padding adds to the element's total width.",
      "CSS custom properties (variables) can only be declared on :root.",
    ],
    lieIndex: 2,
    explanation:
      "Custom properties can be declared on any selector — they cascade and inherit like other properties.",
  },
  {
    id: "css-4",
    topic: "css",
    statements: [
      "The :hover pseudo-class can apply to non-interactive elements like paragraphs.",
      "display: none removes an element from layout and accessibility trees entirely.",
      "Every CSS property inherits from its parent by default.",
    ],
    lieIndex: 2,
    explanation:
      "Most properties (width, margin, background, etc.) do not inherit — only a defined set like color and font-family do.",
  },
];

export function getQuestionsForTopic(topic: Topic): QuestionSet[] {
  return QUESTIONS.filter((q) => q.topic === topic);
}

export function pickRandomQuestion(topic: Topic, excludeId?: string): QuestionSet {
  const pool = getQuestionsForTopic(topic).filter((q) => q.id !== excludeId);
  const list = pool.length > 0 ? pool : getQuestionsForTopic(topic);
  return list[Math.floor(Math.random() * list.length)];
}
