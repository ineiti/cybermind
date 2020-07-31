import {DNode, StorageNodes} from "../src/lib/element";
import {unlinkSync} from "fs";

describe('element-database', function () {
  beforeAll(() => {
    console.log("Setting db-path");
    StorageNodes.dbPath = "/tmp/cybermind.db";
  });

  beforeEach(function () {
    console.log("Deleting existing db");
    unlinkSync(StorageNodes.dbPath);
  });

  it('should save and load elements', async () => {
  });

  it('should be able to re-create an element', async () => {
    const td1 = new TestDoc(undefined, "td1");
    const td2 = new TestDoc(undefined, "td2");
  })

});

class TestDoc extends DNode {
  static type = "testDoc";

  static create(n: DNode): TestDoc {
    return new TestDoc();
  }

  constructor(id = StorageNodes.randID(), data = "") {
    super(TestDoc.type, id, data);
  }
}

StorageNodes.addID(TestDoc);
