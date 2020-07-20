import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {PageNotFoundComponent} from './shared/components';

import {HomeRoutingModule} from './home/home-routing.module';
import {DetailRoutingModule} from './detail/detail-routing.module';
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
    HomeRoutingModule,
    DetailRoutingModule,
    NewNodesRoutingModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
