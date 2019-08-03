const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");
const { allowed, denied } = require("./matchers");

chai.use(chaiAsPromised);

chai.use(allowed);
chai.use(denied);
