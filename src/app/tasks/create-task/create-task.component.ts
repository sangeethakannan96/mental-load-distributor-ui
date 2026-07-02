
import { Component } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html'
})
export class CreateTaskComponent {

  task = {
    title: '',
    description: '',
    estimatedMinutes: 0,
    dueDate: '',
    priority: 1,
    tags : '',
    recurrence: 0
  };
  
  errorMessage = '';

  constructor(
  private taskService: TaskService,
  private notificationService:
    NotificationService
) {}


  createTask() {

  this.errorMessage = '';

  if (!this.task.title?.trim()) {

    this.errorMessage =
      'Title is required';

    return;
  }

  if (
    !this.task.estimatedMinutes ||
    this.task.estimatedMinutes <= 0
  ) {

    this.errorMessage =
      'Estimated minutes must be greater than 0';

    return;
  }

  if (
    this.task.dueDate <
  new Date()
    .toISOString()
    .split('T')[0]
  ) {

    this.errorMessage =
      'Due date cannot be in the past';

    return;
  }

  const payload = {

    title:
      this.task.title.trim(),

    description:
      this.task.description?.trim(),

    estimatedMinutes:
      this.task.estimatedMinutes,

    dueDate:
      this.task.dueDate,

    priority:
      this.task.priority,

    emotionalLoadEstimate:
      1,

    recurrence:
      this.task.recurrence,

    tags:
      this.task.tags
        .split(',')
        .map(t => t.trim())
        .filter(t => t)
  };

  this.taskService
    .createTask(payload)
    .subscribe({
      next: (response) => {

        this.notificationService
          .success(
            'Task created successfully'
          );

        this.resetForm();
      },

      error: () => {

        this.errorMessage =
          'Unable to create task';
      }
    });
}


private resetForm() {

  this.task = {
    title: '',
    description: '',
    estimatedMinutes: 0,
    dueDate: '',
    priority: 1,
    tags: '',
    recurrence: 0
  };
}
}
