import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-postpone-dialog',
  templateUrl: './postpone-dialog.component.html'
})
export class PostponeDialogComponent {

  dueDate: Date | null = null;

  constructor(
    private dialogRef: MatDialogRef<PostponeDialogComponent>
  ) {}

  cancel(): void {
    this.dialogRef.close();
  }

  postpone(): void {
    if (!this.dueDate) {
      return;
    }

    this.dialogRef.close(this.dueDate);
  }
}