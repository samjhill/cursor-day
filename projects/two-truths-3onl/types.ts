export type Topic = "react" | "git" | "css";

export interface QuestionSet {
  id: string;
  topic: Topic;
  statements: [string, string, string];
  lieIndex: 0 | 1 | 2;
  explanation: string;
}

export type AnswerState = "idle" | "correct" | "wrong";

export const TOPICS: { id: Topic; label: string; emoji: string }[] = [
  { id: "react", label: "React", emoji: "⚛️" },
  { id: "git", label: "Git", emoji: "🌿" },
  { id: "css", label: "CSS", emoji: "🎨" },
];
