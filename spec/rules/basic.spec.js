require("../spec-helper");
const { expect } = require("chai");
const { setup, teardown } = require("../helpers");

describe("Someone off the street", function() {
  let db;
  let ref;

  before(async function() {
    db = await setup();
    ref = db.collection("some-nonexistent-collection");
  });

  after(async function() {
    await teardown();
  });

  it("cannot access an arbitrary collection", async function() {
    return expect(ref.get()).to.eventually.be.denied;
  });
});
