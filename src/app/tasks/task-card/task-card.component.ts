import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NotificationService } from 'src/app/services/notification.service';
import { TaskService } from 'src/app/services/task.service';
import {
  MatDialog
}
from '@angular/material/dialog';

import {
  ConfirmDialogComponent
}
from '../../shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.css']
})
export class TaskCardComponent {

  @Input() task: any;

  @Input() familyUsers: any[] = [];

   @Output() complete =
    new EventEmitter<string>();

    @Output()delete =
  new EventEmitter<string>();

  @Output() updated =
  new EventEmitter<void>();

    suggestedUserName = '';
  suggestedUserId: any;
  selectedUserId = '';
  recommendationReasons: string[] = [];

  isEditing = false;
  editTask: any = {};

  constructor(private taskService: TaskService,
              private notificationService: NotificationService,
              private dialog: MatDialog) {}
  

 suggestAssignee() {

  this.taskService
    .suggestAssignee(this.task.id)
    .subscribe((response: any) => {

      console.log(response);

      console.log(
        'response.userName =',
        response.userName
      );

      this.suggestedUserName =
        response.userName;

      console.log(
        'after assignment =',
        this.suggestedUserName
      );

      this.suggestedUserId =
        response.userId;

      this.recommendationReasons =
        response.reasons || [];
    });
}

assignSuggestedUser() {

  this.taskService
    .assignTask(
      this.task.id,
      this.suggestedUserId
    )
    .subscribe(() => {

      this.task.assignedTo = {
        name: this.suggestedUserName
      };

      this.suggestedUserName = '';
      this.suggestedUserId = '';
    });
}

  assignSelectedUser() {

  if (!this.selectedUserId)
    return;

  this.taskService
    .assignTask(
      this.task.id,
      this.selectedUserId
    )
    .subscribe((response: any) => {

      this.task.assignedTo =
        response.assignedTo;

      this.selectedUserId = '';
    });
}

  onCompleteClick() {

    this.complete.emit(this.task.id);
  }

  isOverdue() {

  if (!this.task.dueDate)
    return false;

  if (this.task.isCompleted)
    return false;

  return new Date(this.task.dueDate)
    < new Date();
}

startEdit() {

  this.editTask = {

    title: this.task.title,

    description:
      this.task.description,

    estimatedMinutes:
      this.task.estimatedMinutes,

    dueDate:
      this.task.dueDate
        ? this.task.dueDate.substring(0,10)
        : '',

    priority:
      this.task.priority,

    recurrence:
      this.task.recurrence,

    assignedToId:
    this.task.assignedTo?.id,

    isCompleted:
      this.task.isCompleted,

      tags: this.task.tags.join(', ')
  };

  this.isEditing = true;
}

saveTask() {

  const payload = {

    ...this.editTask,

    tags: this.editTask.tags
      .split(',')
      .map((t: string) => t.trim())
      .filter((t: string) => t)
  };

  this.taskService
    .updateTask(
      this.task.id,
      payload
    )
    .subscribe(() => {

     

      this.notificationService.success(
        'Task updated successfully'
      );

      this.isEditing = false;

      this.updated.emit();
    });
}

cancelEdit() {

  this.isEditing = false;
}

onDeleteClick() {

  const dialogRef =
    this.dialog.open(
      ConfirmDialogComponent,
      {
        width: '400px',

        data: {

          title:
            'Delete Task',

          message:
            'Are you sure you want to delete this task?'
        }
      });

  dialogRef
    .afterClosed()
    .subscribe(result => {

      if (result) {

        this.delete.emit(
          this.task.id
        );
      }
    });
}

}
