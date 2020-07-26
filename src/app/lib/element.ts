export type NodeID = string;
export type NodeType = string;

export class Node {
  constructor(public nodeType: NodeType, public id: NodeID, public data: string, public has: NodeID[] = []) {
  }

  getHasID(nType: NodeID): NodeID[] {
    return this.has.filter((i) => StorageNodes.nodes.get(i).nodeType === nType);
  }

  getHas(nType: NodeID): Node[] {
    return this.getHasID(nType).map((id) => StorageNodes.nodes.get(id));
  }

  addHas(n: Node) {
    this.has.push(n.id);
  }
}

export class StorageNodes {
  static nodes: Map<NodeID, Node> = new Map<NodeID, Node>();

  static randID(): string {
    return Math.random().toString();
  }

  static add<T extends Node>(n: T): T {
    this.nodes.set(n.id, n);
    return n;
  }
}
