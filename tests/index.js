
var rule = require("../lib/index").rules["syntax"];
var RuleTester = require("eslint").RuleTester;

var ruleTester = new RuleTester({
    env: {
        es6: true
    }
});
ruleTester.run("syntax", rule, {
    valid: [
        "/**\nA great function!\n */\nfunction foobar() {}\n",
        "/**\nA great class!\n */\nclass FooBar {}\n"
    ],
    invalid: [{
        code: "/**\n * This `is wrong\n */\nfunction foobar() {}\n",
        errors: [{
            messageId: "tsdoc-code-span-missing-delimiter"
        }]
    }, {
        code: "/**\n * This `is wrong\n */\nclass FooBar {}\n",
        errors: [{
            messageId: "tsdoc-code-span-missing-delimiter"
        }]
    }]
});
