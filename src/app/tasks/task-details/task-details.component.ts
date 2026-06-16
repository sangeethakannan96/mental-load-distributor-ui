import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.css']
})
export class TaskDetailsComponent {

  task: any;

constructor(
  private route: ActivatedRoute,
  private taskService: TaskService
) {}

ngOnInit() {

  const id =
    this.route.snapshot.paramMap.get('id');

  if (id) {

    this.taskService
      .getTask(id)
      .subscribe(task => {

        this.task = task;
      });
  }
}


}
