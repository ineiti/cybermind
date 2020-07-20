import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import {NewNodesComponent} from "./new-nodes.component";

const routes: Routes = [
  {
    path: 'new-nodes',
    component: NewNodesComponent
  }
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class NewNodesRoutingModule {}
