export interface InsightsDto {
  overview: OverviewInsightsDto;
  tasks: TaskInsightsDto;
  family: MemberInsightsDto[];
  reflections: ReflectionInsightsDto;
  reflectionSummary: ReflectionSummaryDto;
}

export interface OverviewInsightsDto {
  tasksCompleted: number;
  activitiesCaptured: number;
  totalContributions: number;
  totalMinutes: number;
  mentalLoadScore: number;
  divisionOfWork: MemberContributionDto[];
  aiInsight: string;
}

export interface TaskInsightsDto {
  totalTasks: number;
  completedTasks: number;
  pendingTasks: number;
  cancelledTasks: number;
  overdueTasks: number;
}

export interface MemberInsightsDto {
  userId: string;
  userName: string;
  completedTasks: number;
  activitiesCaptured: number;
  totalContributions: number;
}

export interface ReflectionInsightsDto {
  showReflectionList: boolean;
  reflections: ReflectionDto[];
}

export interface ReflectionSummaryDto {
  totalReflections: number;
  totalActivitiesCaptured: number;
  totalEstimatedMinutes: number;
  mentalLoadScore: number;
  invisibleWorkPercentage: number;
  topCategories: ActivityCategorySummaryDto[];
  aiSummary: string;
}

export interface MemberContributionDto {
  userId: string;
  userName: string;
  completedTasks: number;
  activitiesCaptured: number;
  totalContributions: number;
}

export interface ActivityCategorySummaryDto {
  category: string;
  count: number;
  estimatedMinutes: number;
}

export interface ReflectionDto {
  id: string;
  reflectionDate: string;
  content: string;
  summary: string;
}