import {getDocument} from "pdfjs-dist"
import {PDFPageProxy} from "pdfjs-dist/display/api";
import {Node, StorageNodes} from "./element";
import {NodeFile} from "./file";

export class NodePDF extends Node {
  static type = "NodePDF";

  static async fetch(fpath: string, file: string): Promise<NodePDF> {
    const fn = await NodeFile.fetch(fpath, file);
    const n = StorageNodes.add(new NodePDF(undefined, "", fn));
    return Promise.resolve(n);
  }

  constructor(id = StorageNodes.randID(), public data: string, public file: NodeFile) {
    super(NodePDF.type, id, data, [file.id]);
  }

  async read(eachPage?: (newpage: NodePDFPage) => (void | Promise<void>)): Promise<void> {
    const pdf = await getDocument("file://" + this.file.fullpath()).promise;
    // for (let p = 1; p <= 3; p++) {
    for (let p = 1; p <= pdf.numPages; p++) {
      const page = await NodePDFPage.fetch(await pdf.getPage(p));
      if (eachPage) {
        await eachPage(page)
      }
      this.has.push(page.id);
      // Let the UI draw the new page
      await new Promise(resolve => setTimeout(() => {
        resolve()
      }, 1));
    }
  }
}

export class NodePDFPage extends Node {
  static type = "NodePDFPage";

  static async fetch(page: PDFPageProxy): Promise<NodePDFPage> {
    const pageText = await page.getTextContent();
    const n = new NodePDFPage(undefined, page.pageNumber);
    pageText.items.forEach((item) => {
      n.has.push(NodePDFPageContent.fetch(item.str).id)
    });
    const img = await NodePDFPageImage.fetch(page);
    n.has.push(img.id);
    return StorageNodes.add(n);
  }

  constructor(id = StorageNodes.randID(), pageNumber: number) {
    super(NodePDFPage.type, id, pageNumber.toString());
  }

  pNumber(): number {
    return parseInt(this.data);
  }

  content(): string[] {
    return this.getHas(NodePDFPageContent.type).map((n) => n.data);
  }

  imageURL(): string {
    return this.getHas(NodePDFPageImage.type)[0].data;
  }
}

export class NodePDFPageImage extends Node {
  static type = "NodePDFPageImage";

  static async fetch(page: PDFPageProxy, scale = 0.25): Promise<NodePDFPageImage> {

    const canvas = window.document.createElement("canvas");
    // const canvas = window.document.getElementById("canvas") as HTMLCanvasElement;
    canvas.height = 200;
    canvas.width = 143;

    await page.render({
      canvasContext: canvas.getContext('2d'),
      viewport: page.getViewport({scale: scale})
    }).promise;

    return StorageNodes.add(new NodePDFPageImage(undefined, canvas.toDataURL()));
  }

  constructor(id = StorageNodes.randID(), dataURL: string) {
    super(NodePDFPageImage.type, id, dataURL);
  }
}

export class NodePDFPageContent extends Node {
  static type = "NodePDFPageContent";

  static fetch(content: string): NodePDFPageContent {
    return StorageNodes.add(new NodePDFPageContent(undefined, content));
  }

  constructor(id = StorageNodes.randID(), content: string) {
    super(NodePDFPageContent.type, id, content);
  }
}
