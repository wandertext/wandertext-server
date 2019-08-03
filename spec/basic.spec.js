require("./spec-helper");
const { expect } = require("chai");
const { setup, teardown } = require("./helpers");

describe("General Deny ALL database rules", function() {
  let db;
  let ref;

  before(async function() {
    db = await setup();
    ref = db.collection("some-nonexistent-collection");
  });

  after(async function() {
    await teardown();
  });

  it("fails when reading/writing an unauthorized collection", async function() {
    return expect(ref.get()).to.eventually.be.denied;
  });
});
