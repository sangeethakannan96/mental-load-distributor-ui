import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { FamilyService } from 'src/app/services/family.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html'
})
export class TaskListComponent implements OnInit {

  tasks: any[] = [];
  familyUsers: any[] = [];

  selectedFilter = 'all';
  selectedSort = '';
  searchText = '';

  constructor(private taskService: TaskService, 
    private familyService: FamilyService,
   private notificationService:
    NotificationService) {}

  ngOnInit(): void {


  this.loadTasks();

  this.familyService
  .getMyFamilyUsers()
  .subscribe((response: any) => {

    this.familyUsers = response;
    console.log(this.familyUsers, 'family users');
  });

  }

  get filteredTasks() {

  let filtered = this.tasks.filter(
    t => !t.isCompleted
  );

  if (this.searchText) {

  const search =
    this.searchText.toLowerCase();

  filtered = filtered.filter(t =>

    t.title
      ?.toLowerCase()
      .includes(search)

    ||

    t.description
      ?.toLowerCase()
      .includes(search)
  );
}
  switch (this.selectedFilter) {

    case 'overdue':

      filtered = filtered.filter(
        t =>
          !t.isCompleted &&
          t.dueDate &&
          new Date(t.dueDate) < new Date()
      );

      break;

    case 'today':

      filtered = filtered.filter(t => {

        if (!t.dueDate)
          return false;

        const due =
          new Date(t.dueDate);

        const today =
          new Date();

        return (
          due.getDate() ===
            today.getDate() &&
          due.getMonth() ===
            today.getMonth() &&
          due.getFullYear() ===
            today.getFullYear()
        );
      });

      break;

    case 'high':

      filtered = filtered.filter(
        t => t.priority === 2
      );

      break;

    case 'assigned':

      filtered = filtered.filter(
        t => t.assignedTo &&
        !t.isCompleted
      );

      break;

    case 'unassigned':

      filtered = filtered.filter(
        t => !t.assignedTo
      );

      break;
  }

  switch (this.selectedSort) {

    case 'dueDate':

      filtered.sort(
        (a, b) =>
          new Date(a.dueDate).getTime()
          -
          new Date(b.dueDate).getTime()
      );

      break;

    case 'priority':

      filtered.sort(
        (a, b) =>
          b.priority - a.priority
      );

      break;

    case 'minutes':

      filtered.sort(
        (a, b) =>
          b.estimatedMinutes
          -
          a.estimatedMinutes
      );

      break;

      default:

      // Default sort:
      // High Priority → Medium → Low
      // Then Earlier Due Date
      filtered = this.sortTasks(filtered);

      break;
  }
  

  return filtered;
}

  loadTasks() {

    this.taskService
      .getTasks()
      .subscribe((response: any) => {

        console.log(response);

        this.tasks = response;
      });
  }

  completeTask(taskId: string) {

  this.taskService
    .completeTask(taskId)
    .subscribe(() => {
      this.notificationService.success(
      'Task completed successfully'
      );
      this.loadTasks();
    });

}
  get unassignedTasks() {

 return this.sortTasks(
  this.tasks.filter(
    t => !t.assignedTo && !t.isCompleted
  )
);
}

get assignedTasks() {

  return this.sortTasks(
  this.tasks.filter(
    t => t.assignedTo && !t.isCompleted
  )
);
}

get completedTasks() {

  return this.tasks.filter(
    t => t.isCompleted
  );
}


sortTasks(tasks: any[]) {

  return tasks.sort((a, b) => {

    // High priority first
    if (a.priority !== b.priority) {

      return b.priority - a.priority;
    }

    // Earlier due dates first
    if (a.dueDate && b.dueDate) {

      return (
        new Date(a.dueDate).getTime()
        -
        new Date(b.dueDate).getTime()
      );
    }

    return 0;
  });
}

get historyTasks() {

  return this.tasks.filter(
    t => t.isCompleted
  );
}

deleteTask(taskId: string) {

  this.taskService
    .deleteTask(taskId)
    .subscribe(() => {
      this.notificationService.success(
  'Task deleted successfully'
);

      this.loadTasks();
    });
}



}