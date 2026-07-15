import { Component, OnInit } from '@angular/core';

import { NotificationService } from '../services/notification.service';
import { AiService } from '../services/ai.service';
import { ReflectionsService } from '../services/reflections.service';

@Component({
  selector: 'app-reflection',
  templateUrl: './reflections.component.html',
  styleUrls: ['./reflections.component.css']
})
export class ReflectionComponent implements OnInit {

  reflection = '';

  todayReflections: any[] = [];

isLoading = false;

  constructor(
    private notificationService: NotificationService,
    private aiService: AiService,
    private reflectionsService: ReflectionsService
  ) { }

 
ngOnInit(): void {

  console.log('Reflection component initialized');
  this.loadTodayReflection();

}

loadTodayReflection() {

  this.reflectionsService
    .getTodayReflection()
    .subscribe({

      next: (results) => {
        this.todayReflections = results;
      },

      error: () => {
        this.notificationService.error(
          'Failed to load today\'s reflections.'
        );
      }

    });
}




analyzeReflection() {

  if (!this.reflection.trim()) {
    this.notificationService.error(
      'Please enter your reflection.'
    );
    return;
  }

  this.isLoading = true;

  this.aiService
    .analyzeReflection(this.reflection)
    .subscribe({

      next: () => {

        this.isLoading = false;

        this.notificationService.success(
          'Your reflection has been captured.'
        );

        this.reflection = '';

        this.loadTodayReflection();
      },

      error: () => {

        this.isLoading = false;

        this.notificationService.error(
          'Failed to analyze your reflection.'
        );
      }

    });
}

get allActivities(): any[] {

  return this.todayReflections
    .flatMap(reflection => reflection.activities || []);

}

get totalActivities(): number {

  return this.allActivities.length;

}

get totalMinutes(): number {

  return this.allActivities
    .reduce(
      (total, activity) =>
        total + activity.estimatedMinutes,
      0
    );

}

get formattedTotalTime(): string {

  const hours = Math.floor(
    this.totalMinutes / 60
  );

  const minutes =
    this.totalMinutes % 60;

  if (hours === 0) {
    return `${minutes}m`;
  }

  if (minutes === 0) {
    return `${hours}h`;
  }

  return `${hours}h ${minutes}m`;

}

get totalMentalLoad(): number {

  return this.allActivities
    .reduce(
      (total, activity) =>
        total + activity.mentalLoadScore,
      0
    );

}

}