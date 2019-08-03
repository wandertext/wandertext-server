require("../spec-helper");
const { expect } = require("chai");
const { setup, teardown } = require("../helpers");

describe("An unauthenticated API user", function() {
  const collections = ["contributors", "flags", "entries", "places", "texts"];
  let db;

  before(async function() {
    db = await setup();
  });

  after(async function() {
    await teardown();
  });

  it("cannot read the flags collection", async function() {
    const flagsRef = db.collection("flags");
    return expect(flagsRef.get()).to.eventually.be.denied;
  });

  it("cannot read the contributors collection", async function() {
    const contributorsRef = db.collection("contributors");
    return expect(contributorsRef.get()).to.eventually.be.denied;
  });

  it("can read the entries, places, and flags collections", async function() {
    for (const collection of collections.slice(2)) {
      const ref = db.collection(collection);
      await expect(ref.get()).to.eventually.be.fulfilled;
    }
  });
});
