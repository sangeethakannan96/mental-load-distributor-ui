import {
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';

import { ReviewMode } from '../../models/review-mode';

@Component({
  selector: 'app-task-review',
  templateUrl: './task-review.component.html',
  styleUrls: ['./task-review.component.css']
})
export class TaskReviewComponent {

  ReviewMode = ReviewMode;

  @Input()
  title = '';

  @Input()
  tasks: any[] = [];

  @Input()
  mode = ReviewMode.Home;


  @Output()
  taskcompleted =
    new EventEmitter<string>();

selectedTaskIds = new Set<string>();

allSelected = false;

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

}