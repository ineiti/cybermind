import { Component, OnInit } from '@angular/core';
import * as path from "path";
import {homedir} from "os";
import * as fs from "fs";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  dir: string;
  files: string[] = ["one", "two"];
  scanDir: string;
  chosenFile: string;

  constructor() { }

  async ngOnInit() {
    // TODO: Ask for directory
    // TODO: Have multiple lists
    // TODO: Save and load from config
    this.scanDir = path.join(homedir(), "Documents", "PDFs");
    await this.updateDir(this.scanDir);
    if (this.files.length > 0) {
      this.chosenFile = path.join(this.scanDir, this.files[0]);
    }
  }

  async updateDir(path: string){
    this.dir = path;
    return new Promise((resolve) => {
      fs.readdir(path, null, (err, files) => {
        if (err){
          throw new Error("something went wrong:" + err.toString());
        }
        this.files = files.filter((name) => !name.startsWith("."));
        resolve();
      })
    });
  }

}
