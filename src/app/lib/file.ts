import * as path from "path";
import {Node, StorageNodes} from "./element";

export class NodeFilePath extends Node {
  static type = "NodeFilePath";

  static fetch(path: string): NodeFilePath {
    return StorageNodes.add(new NodeFilePath(undefined, path));
  }

  constructor(id = StorageNodes.randID(), path: string){
    super(NodeFilePath.type, id, path);
  }
}

export class NodeFile extends Node {
  static type = "NodeFile";

  static fetch(path: string, file: string): Promise<NodeFile> {
    const fp = NodeFilePath.fetch(path);
    const n = StorageNodes.add(new NodeFile(this.type, file, fp));
    return Promise.resolve(n);
  }

  constructor(id = StorageNodes.randID(), file: string, path: NodeFilePath){
    super(NodeFile.type, id, file, [path.id]);
  }

  fpath(): string {
    return this.getHas(NodeFilePath.type)[0].data;
  }

  fullpath(): string {
    return path.join(this.fpath(), this.data);
  }
}
