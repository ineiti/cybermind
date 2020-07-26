import {Component, Input, OnInit} from '@angular/core';

import {GlobalWorkerOptions} from "pdfjs-dist";
import pdfjsWorker from "pdfjs-dist/pdf.worker.entry";
import {NodePDF, NodePDFPage} from "../../lib/pdf";
import {Node} from "../../lib/element";
import * as path from "path";

GlobalWorkerOptions.workerSrc = pdfjsWorker;

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  private _file: string;
  pdf: NodePDF;
  pages: NodePDFPage[] = [];
  pdfText: string[] = [];
  scale = 0.25;
  active: Node;

  constructor() {
  }

  ngOnInit(): void {
  }

  async updateFile(): Promise<void> {
    if (this.file) {
      this.pdf = await NodePDF.fetch(path.dirname(this.file), path.basename(this.file));
      await this.pdf.read(async (np) => {
        if (np.pNumber() === 1){
          this.active = np;
        }
        this.pages.push(np);
        this.pdfText.push(np.content().join(" "));
        await new Promise(resolve => setTimeout(() => {
          resolve()
        }, 1));
        this.drawPage(np.pNumber(), np.imageURL());
      });
    }
  }

  drawPage(pNumber: number, imgURL: string): void {
    const canvas = document.getElementById(`pageRender${pNumber}`) as HTMLCanvasElement;
    canvas.height = 200;
    canvas.width = 143;

    const img = new window.Image();
    img.src = imgURL;
    img.onload = () => {
      canvas.getContext('2d').drawImage(img, 0, 0);
    }
  }

  get file(): string {
    return this._file;
  }

  @Input()
  set file(f: string) {
    this._file = f;
    this.updateFile();
  }

}
