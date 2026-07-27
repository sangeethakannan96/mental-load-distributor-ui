export interface DashboardDto {
  summary: DashboardSummaryDto;
  familyProgress: MemberTodayDto[];
  recentCompletedTasks: RecentCompletedTaskDto[];
}

export interface DashboardSummaryDto {
  totalTasks: number;
  pendingTasks: number;
  completedTasks: number;
  unassignedTasks: number;
}

export interface MemberTodayDto {
  userId: string;
  userName: string;
  completedTasks: number;
  pendingTasks: number;
}

export interface RecentCompletedTaskDto {
  taskId: string;
  title: string;
  completedBy: string;
  completedAt: string;
  priority: number;
}