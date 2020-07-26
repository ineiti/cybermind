import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {PageNotFoundComponent} from './shared/components';

import {NewNodesRoutingModule} from "./newNodes/new-nodes-routing.module";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'new-nodes',
    pathMatch: 'full'
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    NewNodesRoutingModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
