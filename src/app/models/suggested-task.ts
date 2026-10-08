export interface SuggestedTask {
  title: string;
  description: string;
  category: string;
  recurrence: string;
  startDate: string | null;
  suggestedAssigneeRole: string;
  emotionalLoad: number;
  estimatedMinutes: number;
  priority: number;
  selected?: boolean;
}