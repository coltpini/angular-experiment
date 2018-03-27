import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent }   from './layouts/dashboard/dashboard.component';
import { FliesComponent }      from './layouts/flies/flies.component';
import { FlyDetailComponent }  from './components/fly-detail/fly-detail.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'detail/:id', component: FlyDetailComponent },
  { path: 'flies', component: FliesComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
