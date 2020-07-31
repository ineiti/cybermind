import {nSQL} from "@nano-sql/core";
import {SQLite} from "@nano-sql/adapter-sqlite";


export type NodeID = string;
export type NodeType = string;

/**
 * A node represents the basic data type in the system. Every node has exactly one type and some data. A node has
 * zero or more links to other nodes.
 */
export class DNode {
  constructor(public readonly nodeType: NodeType, public readonly id: NodeID, private _data: string, private _has: NodeID[] = []) {
    this.store();
  }

  private store() {
    StorageNodes.add(this);
  }

  get has(): NodeID[] {
    return this._has.map((h) => h);
  }

  set has(ids: NodeID[]) {
    this._has = ids.map((h) => h);
    this.store();
  }

  get data(): string {
    return this._data;
  }

  set data(d: string) {
    this._data = d;
    this.store();
  }

  getHasID(nType: NodeID): NodeID[] {
    return this.has.filter((i) => StorageNodes.nodes.get(i).nodeType === nType);
  }

  getHas(nType: NodeID): DNode[] {
    return this.getHasID(nType).map((id) => StorageNodes.nodes.get(id));
  }

  addHas(n: DNode) {
    this.has.push(n.id);
  }
}

export interface INodeConstructor {
  create(DNode): DNode;

  // create<T extends DNode>(DNode): T;
  type: string;
}

/**
 * StorageNodes holds all available nodes and lets you search for nodes.
 */
export class StorageNodes {
  static nodes: Map<NodeID, DNode> = new Map<NodeID, DNode>();
  static types: Map<NodeType, INodeConstructor> = new Map<NodeType, INodeConstructor>();
  static ds: any | undefined;
  static dbPath = "~/.cybermind.db";

  static randID(): string {
    return Math.random().toString();
  }

  static add<T extends DNode>(n: T): T {
    this.nodes.set(n.id, n);
    return n;
  }

  static addID<T extends INodeConstructor>(n: T) {
    this.types.set(n.type, n);
  }

  static getDS() {
    if (this.ds === undefined) {
      this.ds = nSQL().createDatabase({
        id: 'cybermind_nodes',
        mode: new SQLite(this.dbPath),
        tables: [{
          name: "nodes",
          model: {
            "id:string": {pk: true},
            "type:string": {},
            "data:string": {},
            "has:string[]": {}
          }
        }]
      })
    }
    return this.ds;
  }

  static async findByID<T extends DNode>(t: NodeType, next: (n: T) => boolean): Promise<T[]> {
    if (this.types.get(t) === undefined) {
      throw new Error("don't know this type of node");
    }

    await this.getDS().find("");
    return undefined;
  }
}
