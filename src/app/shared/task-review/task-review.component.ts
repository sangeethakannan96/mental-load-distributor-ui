import {
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';

import { ReviewMode } from '../../models/review-mode';
import { BulkTaskAction } from '../../models/bulk-task-action';
import { BulkTaskActionRequest } from '../../models/bulktaskactionrequest';
import { TaskService } from '../../services/task.service';
import { MatDialog } from '@angular/material/dialog';
import { ReassignDialogComponent } from '../reassign-dialog/reassign-dialog.component';
import { PostponeDialogComponent } from '../postpone-dialog/postpone-dialog.component';

@Component({
  selector: 'app-task-review',
  templateUrl: './task-review.component.html',
  styleUrls: ['./task-review.component.css']
})
export class TaskReviewComponent {

  ReviewMode = ReviewMode;

  BulkTaskAction = BulkTaskAction

  @Input()
  title = '';

  @Input()
  tasks: any[] = [];

  @Input()
  mode = ReviewMode.Home;

  @Input()
familyMembers: any[] = [];

@Output()
taskcompleted = new EventEmitter<string>();

  @Output()
taskChanged = new EventEmitter<void>();

selectedTaskIds = new Set<string>();

allSelected = false;

constructor(private taskService: TaskService,
  private dialog: MatDialog
) {}

isSelected(taskId: string): boolean {

  return this.selectedTaskIds.has(taskId);

}

toggleSelection(taskId: string): void {

  if (this.selectedTaskIds.has(taskId)) {

    this.selectedTaskIds.delete(taskId);

  } else {

    this.selectedTaskIds.add(taskId);

  }

  this.updateSelectAll();

}

toggleSelectAll(): void {

  if (this.allSelected) {

    this.tasks.forEach(task =>
      this.selectedTaskIds.add(task.id));

  } else {

    this.selectedTaskIds.clear();

  }

}

updateSelectAll(): void {

  this.allSelected =
    this.tasks.length > 0 &&
    this.tasks.every(task =>
      this.selectedTaskIds.has(task.id));

}

handleBulkAction(action: BulkTaskAction): void {

  if (this.selectedTaskIds.size === 0) {
    return;
  }

  const selectedIds = Array.from(this.selectedTaskIds);

  const request: BulkTaskActionRequest = {
    taskIds: selectedIds,
    action: action
  };

  this.taskService.bulkAction(request).subscribe({
    next: () => {

      // Remove affected tasks from the review list
      this.tasks = this.tasks.filter(
        task => !this.selectedTaskIds.has(task.id)
      );

      // Clear selection
      this.selectedTaskIds.clear();

      this.allSelected = false;
    },

    error: err => {
      console.error('Bulk action failed', err);
    }
  });
}

openReassign(): void {

  if (this.selectedTaskIds.size === 0) {
    return;
  }

  if (this.familyMembers.length === 0) {
    console.warn('No family members available for reassignment.');
    return;
  }

  const selectedIds = Array.from(this.selectedTaskIds);

  const dialogRef = this.dialog.open(
    ReassignDialogComponent,
    {
      width: '400px',
      data: {
        members: this.familyMembers
      }
    }
  );

  dialogRef.afterClosed().subscribe(
    (assignedToId: string | undefined) => {

      if (!assignedToId) {
        return;
      }

      const request: BulkTaskActionRequest = {
        taskIds: selectedIds,
        action: BulkTaskAction.Reassign,
        assignedToId: assignedToId
      };

      

      this.taskService.bulkAction(request).subscribe({

        next: () => {

          const assignedMember =
  this.familyMembers.find(
    member => member.id === assignedToId
  );

          // Update assigned user locally
          this.tasks = this.tasks.map(task => {

            if (selectedIds.includes(task.id)) {
              return {
                ...task,
                assignedToId: assignedToId,
                assignedTo: assignedMember
              };
            }

            return task;
          });

          this.selectedTaskIds.clear();
          this.allSelected = false;

        },

        error: err => {
          console.error(
            'Bulk reassign failed',
            err
          );
        }

      });
    }
  );
}

openPostpone(): void {

  if (this.selectedTaskIds.size === 0) {
    return;
  }

  const selectedIds = Array.from(this.selectedTaskIds);

  const dialogRef = this.dialog.open(
    PostponeDialogComponent,
    {
      width: '400px'
    }
  );

  dialogRef.afterClosed().subscribe(
    (dueDate: Date | undefined) => {

      if (!dueDate) {
        return;
      }

      const request: BulkTaskActionRequest = {
  taskIds: selectedIds,
  action: BulkTaskAction.Postpone,
  dueDate: new Date(
    dueDate.getFullYear(),
    dueDate.getMonth(),
    dueDate.getDate(),
    12,
    0,
    0
  )
};

      this.taskService.bulkAction(request).subscribe({

        next: () => {

          // These tasks were being shown because they
          // were overdue. After postponing them, remove
          // them from the current review list.
          this.tasks = this.tasks.filter(
            task => !selectedIds.includes(task.id)
          );

          this.selectedTaskIds.clear();
          this.allSelected = false;
          this.taskChanged.emit();
        },

        error: err => {
          console.error(
            'Bulk postpone failed:',
            err
          );
        }

      });
    }
  );
}
}
