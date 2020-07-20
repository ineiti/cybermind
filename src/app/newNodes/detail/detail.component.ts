import {Component, Input, OnInit} from '@angular/core';

import {getDocument, GlobalWorkerOptions, PDFDocumentProxy, PDFPageProxy} from "pdfjs-dist";
// import {getDocument, GlobalWorkerOptions, PDFDocumentProxy, PDFPageProxy} from "pdfjs-dist";
import pdfjsWorker from "pdfjs-dist/build/pdf.worker.entry";
GlobalWorkerOptions.workerSrc = pdfjsWorker;

// From https://github.com/mozilla/pdf.js/issues/10478
// import pdfjs from "pdfjs-dist/build/pdf";
// import pdfjsWorker from "pdfjs-dist/build/pdf.worker.entry";
//
// console.log(pdfjs);
// console.log(pdfjs.GlobalWorkerOptions);
//
// pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker;

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  private _file: string;
  page: PDFPageProxy;
  pdf: PDFDocumentProxy;
  // page: pdfjs.PDFPageProxy;
  // pdf: pdfjs.PDFDocumentProxy;
  pdfText: string[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  async updateFile(): Promise<void>{
    if (this.file) {
      const doc = getDocument("file://" + this.file);
      // const doc = pdfjs.getDocument("file://" + this.file) as any;
      this.pdf = await doc.promise;
      for (let p = 1; p <= 2; p++) {
        console.log(`getting page: ${p}`);
        this.page = await this.pdf.getPage(p);
        const pageText = await this.page.getTextContent();
        this.pdfText[p] = pageText.items.map((i) => i.str).join(" ");
      }
      const scale = 0.25;
      const page = await this.pdf.getPage(1);
      const viewport = page.getViewport({ scale: scale, });

      const canvas = document.getElementById('pageRender') as HTMLCanvasElement;
      const context = canvas.getContext('2d');
      canvas.height = 200;
      canvas.width = 143;

      const renderContext = {
        canvasContext: context,
        viewport: viewport
      };
      page.render(renderContext);
    }
  }

  get file(): string{
    return this._file;
  }

  @Input()
  set file(f: string){
    this._file = f;
    this.updateFile();
  }

}
