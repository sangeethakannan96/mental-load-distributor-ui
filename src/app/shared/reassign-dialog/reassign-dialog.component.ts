import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

export interface ReassignDialogData {
  members: any[];
}

@Component({
  selector: 'app-reassign-dialog',
  templateUrl: './reassign-dialog.component.html'
})
export class ReassignDialogComponent {

  selectedUserId: string | null = null;

  constructor(
    private dialogRef: MatDialogRef<ReassignDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ReassignDialogData
  ) {}

  cancel(): void {
    this.dialogRef.close();
  }

  reassign(): void {

    if (!this.selectedUserId) {
      return;
    }

    this.dialogRef.close(this.selectedUserId);
  }
}