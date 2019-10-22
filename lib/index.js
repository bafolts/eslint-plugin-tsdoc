
var TSDocParser = require("@microsoft/tsdoc/lib/index").TSDocParser;
var TextRange = require("@microsoft/tsdoc/lib/parser/TextRange").TextRange;
var allTsdocMessageIds = require("@microsoft/tsdoc/lib/parser/TSDocMessageId").allTsdocMessageIds;

var messageIds = {};

allTsdocMessageIds.forEach(function (messageId) {
    messageIds[messageId] = messageId + ": {{ unformattedText }}";
});

module.exports = {
    rules: {
        "syntax": {
            meta: {
                messages: messageIds
            },
            create: function(context) {
                var tsDocParser = new TSDocParser();
                var sourceCode = context.getSourceCode();
                var commentBlockDeclarator = function (node) {
                    var commentToken = sourceCode.getJSDocComment(node);
                    if (commentToken !== null) {
                        var textRange = TextRange.fromString("/*" + commentToken.value + "*/");
                        var results = tsDocParser.parseRange(textRange).log;
                        if (results._messages.length > 0) {
                            results._messages.forEach(function (message) {
                                context.report({
                                    data: message,
                                    messageId: message.messageId,
                                    node: commentToken
                                });
                            });
                        }
                    }
                };
                return {
                    ClassDeclaration: commentBlockDeclarator,
                    FunctionDeclaration: commentBlockDeclarator
                };
            }
        }
    }
};
