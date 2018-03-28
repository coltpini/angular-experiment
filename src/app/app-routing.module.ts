import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ListComponent }   from './layouts/list/list.component';
import { FliesComponent }      from './layouts/flies/flies.component';
import { DetailComponent }  from './layouts/detail/detail.component';

const routes: Routes = [
  { path: '', redirectTo: '/list/all', pathMatch: 'full' },
  { path: 'list', redirectTo: '/list/all', pathMatch: 'full' },
  { path: 'list/:tag', component: ListComponent },
  { path: 'detail/:id', component: DetailComponent },
  { path: 'flies', component: FliesComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
