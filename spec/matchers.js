const firebase = require("@firebase/testing");
const { expect } = require("chai");

module.exports.allowed = ({ Assertion }, utils) => {
  utils.addProperty(Assertion.prototype, "allowed", async function() {
    this.assert(
      expect(this).to.eventually.be.fulfilled,
      "expected #{this} to be allowed",
      "expected #{this} to not be allowed"
    );
  });
};

module.exports.denied = ({ Assertion }, utils) => {
  utils.addProperty(Assertion.prototype, "denied", async function() {
    this.assert(
      expect(this).to.eventually.be.rejectedWith(firebase.FirebaseError),
      "expected #{this} to be denied",
      "expected #{this} to not be denied"
    );
  });
};
