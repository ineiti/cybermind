import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import {NewNodesComponent} from "./new-nodes.component";
import {NewNodesRoutingModule} from "./new-nodes-routing.module";

@NgModule({
  declarations: [NewNodesComponent],
  imports: [CommonModule, SharedModule, NewNodesRoutingModule]
})
export class HomeModule {}
