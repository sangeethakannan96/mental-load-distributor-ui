
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
    tags : "",
    recurrence: 0
  };
  

  constructor(
  private taskService: TaskService,
  private notificationService:
    NotificationService
) {}
  createTask() {

    const payload = {
      title: this.task.title,
      description: this.task.description,
      estimatedMinutes: this.task.estimatedMinutes,
      dueDate: this.task.dueDate,
      priority: this.task.priority,
      emotionalLoadEstimate: 1,
      recurrence: this.task.recurrence,
      tags: this.task.tags.split(',')
            .map(t => t.trim())
            .filter(t => t)
            };

    this.taskService
      .createTask(payload)
      .subscribe(response => {

        console.log('Task created', response);

        this.notificationService.success(
          'Task created successfully'
        );

        this.task = {

        title: '',

        description: '',

        estimatedMinutes: 0,

        dueDate: '',

        priority: 1,

        tags: '',

        recurrence: 0
      
      };
      });
  }
}
