import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {JobMainComponent} from './job-main/job-main.component';

const routes: Routes = [
  { path: 'jobs', component: JobMainComponent},
  { path: '', redirectTo: '/jobs', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
