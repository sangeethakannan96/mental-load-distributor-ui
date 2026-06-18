import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './pages/login/login.component';
import { CreateTaskComponent } from './pages/create-task/create-task.component';
import { TaskListComponent } from './pages/task-list/task-list.component';
import { RegisterComponent } from './auth/register/register.component';
import { CreateFamilyComponent } from './family/create-family/create-family.component';
import { FamilyMembersComponent } from './family/family-members/family-members.component';
import { AuthGuard }
from './guards/auth.guard';
import { HomeRedirectGuard } from './guards/home-redirect.guard';
import { MemberTasksComponent } from './family/member-tasks/member-tasks.component';
import { ProfileComponent } from './profile/profile/profile.component';
import { TaskDetailsComponent } from './tasks/task-details/task-details.component';
import { HouseholdSetupComponent } from './pages/household/household-setup/household-setup.component';
import { HouseholdProfileComponent } from './pages/household/household-profile/household-profile.component';

const routes: Routes = [
 { path: '', canActivate: [HomeRedirectGuard], component: LoginComponent},
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'create-task', component: CreateTaskComponent, canActivate: [AuthGuard] },
  { path: 'tasks', component: TaskListComponent, canActivate: [AuthGuard] },
  {path: 'register',component: RegisterComponent},
  {path: 'create-family',component: CreateFamilyComponent, canActivate: [AuthGuard]},
  {path: 'family', component: FamilyMembersComponent, canActivate: [AuthGuard]},
  {path: 'member-tasks/:userId', component: MemberTasksComponent, canActivate: [AuthGuard]},
  {path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
  {path: 'tasks/:id',component: TaskDetailsComponent, canActivate: [AuthGuard]},
  {path: 'household-setup',component: HouseholdSetupComponent, canActivate: [AuthGuard]},
  {path: 'household-profile',component: HouseholdProfileComponent, canActivate: [AuthGuard]}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
