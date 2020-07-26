import {Component, Input, OnInit} from '@angular/core';
import {Node} from '../../lib/element';
import {NodePDFPageContent} from "../../lib/pdf";

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss']
})
export class TagsComponent implements OnInit {
  private _node: Node | undefined;
  public texts: string[] = [];

  constructor() {
  }

  ngOnInit(): void {
  }

  @Input()
  set node(n: Node) {
    if (n === undefined){
      return;
    }
    console.log(`setting node to ${n.data}`);
    this._node = n;
    this.texts = n.getHas(NodePDFPageContent.type).map((pcn) => pcn.data);
  }

  get node(): Node | undefined {
    return this._node;
  }
}
