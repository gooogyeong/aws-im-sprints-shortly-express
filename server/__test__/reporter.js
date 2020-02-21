const mocha = require("mocha");
const fs = require("fs");

module.exports = MyReporter;

function MyReporter(runner) {
  mocha.reporters.Base.call(this, runner);
  let passed = 0;
  let failed = 0;

  runner.on("pass", function() {
    passed++;
  });

  runner.on("fail", function() {
    failed++;
  });

  runner.on("end", function() {
    const results = {
      passed,
      failed
    };
    fs.writeFileSync("results.json", JSON.stringify(results));
  });
}
