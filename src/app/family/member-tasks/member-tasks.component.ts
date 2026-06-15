import { Component, OnInit }
from '@angular/core';

import { ActivatedRoute }
from '@angular/router';

import { TaskService }
from 'src/app/services/task.service';

@Component({
  selector: 'app-member-tasks',
  templateUrl:
    './member-tasks.component.html'
})
export class MemberTasksComponent
implements OnInit {

  userId = '';

  assignedTasks: any[] = [];

  completedTasks: any[] = [];

  memberName = '';

  availabilityScore = 0;

  activeTaskCount = 0;

  completedTaskCount = 0;

  totalMinutesAssigned = 0;

  constructor(
    private route: ActivatedRoute,
    private taskService: TaskService
  ) {}

  ngOnInit(): void {

    this.userId =
      this.route.snapshot.paramMap.get(
        'userId'
      ) || '';

    this.loadTasks();
  }

  loadTasks() {

    this.taskService
      .getTasks()
      .subscribe((tasks: any[]) => {

        const userTasks =
          tasks.filter(t =>

            t.assignedTo &&
            t.assignedTo.id ===
              this.userId
          );

          if (userTasks.length > 0) {

  this.memberName =
    userTasks[0]
      .assignedTo.name;

  this.availabilityScore =
    userTasks[0]
      .assignedTo
      .availabilityScore;
}

        this.assignedTasks =
          userTasks.filter(
            t => !t.isCompleted
          );

        this.completedTasks =
          userTasks.filter(
            t => t.isCompleted
          );

          this.activeTaskCount =
  this.assignedTasks.length;

this.completedTaskCount =
  this.completedTasks.length;

this.totalMinutesAssigned =
  userTasks.reduce(
    (sum, task) =>
      sum +
      (task.estimatedMinutes || 0),
    0
  );
      });

      
  }

  completeTask(taskId: string) {

  this.taskService
    .completeTask(taskId)
    .subscribe(() => {

      this.loadTasks();
    });
}

deleteTask(taskId: string) {

  this.taskService
    .deleteTask(taskId)
    .subscribe(() => {

      this.loadTasks();
    });
}

}