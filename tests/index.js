
var rule = require("../lib/index").rules["tsdoc-comments"];
var RuleTester = require("eslint").RuleTester;

var ruleTester = new RuleTester();
ruleTester.run("tsdoc-comments", rule, {
    valid: ["/**\nA great function!\n */\nfunction foobar() {}\n"],
    invalid: [{
        code: "/**\n * This `is wrong\n */\nfunction foobar() {}\n",
        errors: [{
            messageId: "tsdoc-code-span-missing-delimiter"
        }]   
    }]
});
