import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  familyExpanded = false;
  tasksExpanded = false;

  toggleFamilyGroup(): void {
    this.familyExpanded = !this.familyExpanded;
  }

  toggleTasksGroup(): void {
    this.tasksExpanded = !this.tasksExpanded;
  }
}

