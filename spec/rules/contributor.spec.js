require("../spec-helper");
const { expect } = require("chai");
const { setup, teardown } = require("../helpers");

const data = {
  "contributors/enabledContributor": {
    enabled: true,
    email: "contributor@wandertext.space"
  },
  "contributors/disabledContributor": {
    enabled: false,
    email: "disabled@wandertext.space"
  }
};

describe("An authenticated contributor", function() {
  let db;

  before(async function() {
    db = await setup(
      {
        uid: "someContributorId",
        email: "contributor@wandertext.space"
      },
      data
    );
  });

  after(async function() {
    await teardown();
  });

  it("can read the contributors collection", async function() {
    const contributorsRef = db.collection("contributors");
    return expect(contributorsRef.get()).to.eventually.be.fulfilled;
  });

  it("can write to entries, places, and flags collections", async function() {
    for (const collection of ["flags", "entries", "places"]) {
      const ref = db.collection(collection);
      await expect(ref.add({ data: "some data" })).to.eventually.be.fulfilled;
    }
  });
});
