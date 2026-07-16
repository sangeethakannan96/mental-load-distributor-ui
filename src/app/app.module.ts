import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { LoginComponent } from './auth/login/login.component';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { CreateTaskComponent } from './tasks/create-task/create-task.component';
import { TaskListComponent } from './tasks/task-list/task-list.component';
import { TaskCardComponent } from './shared/task-card/task-card.component';
import { RegisterComponent } from './auth/register/register.component';
import { CreateFamilyComponent } from './family/create-family/create-family.component';
import { FamilyMembersComponent } from './family/family-members/family-members.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { MatToolbarModule } from '@angular/material/toolbar';

import { MatButtonModule }
from '@angular/material/button';

import { MatIconModule }
from '@angular/material/icon';

import { MatMenuModule } from '@angular/material/menu';

import { MatFormFieldModule }
from '@angular/material/form-field';

import { MatInputModule }
from '@angular/material/input';

import { MatSelectModule }
from '@angular/material/select';

import { MatCardModule }
from '@angular/material/card';

import { MatChipsModule } from '@angular/material/chips';

import { MatGridListModule } from '@angular/material/grid-list';

import { NgChartsModule } from 'ng2-charts';

import { MatSnackBarModule }
from '@angular/material/snack-bar';

import { MatDialogModule }
from '@angular/material/dialog';

import { MatCheckboxModule } from '@angular/material/checkbox';

import { ConfirmDialogComponent }
from './shared/confirm-dialog/confirm-dialog.component';
import { MemberTasksComponent } from './family/member-tasks/member-tasks.component';
import { ProfileComponent } from './profile/profile/profile.component';
import { TaskDetailsComponent } from './tasks/task-details/task-details.component';
import { HouseholdSetupComponent } from './family/household-setup/household-setup.component';
import { HouseholdProfileComponent } from './family/household-profile/household-profile.component';
import { ReviewSuggestionsComponent } from './ai/review-suggestions/review-suggestions.component';
import { HomeComponent } from './home/home.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { AiAssistantComponent } from './ai/ai-assistant/ai-assistant.component';
import { MatTabsModule } from '@angular/material/tabs';
import { ReflectionComponent } from './reflections/reflections.component';
import { InsightsComponent } from './insights/insights/insights.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LoginComponent,
    CreateTaskComponent,
    TaskListComponent,
    TaskCardComponent,
    RegisterComponent,
    CreateFamilyComponent,
    FamilyMembersComponent,
    NavbarComponent,
    ConfirmDialogComponent,
    MemberTasksComponent,
    ProfileComponent,
    TaskDetailsComponent,
    HouseholdSetupComponent,
    HouseholdProfileComponent,
    ReviewSuggestionsComponent,
    HomeComponent,
    SidebarComponent,
    AiAssistantComponent,
    ReflectionComponent,
    InsightsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    MatChipsModule,
    MatGridListModule,
    NgChartsModule,
    MatSnackBarModule,
    MatDialogModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSidenavModule,
    MatListModule,
    MatTabsModule
  ],

  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
