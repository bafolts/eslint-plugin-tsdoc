
var TSDocParser = require("@microsoft/tsdoc/lib/index").TSDocParser;
var allTsdocMessageIds = require("@microsoft/tsdoc/lib/parser/TSDocMessageId").allTsdocMessageIds;

var messageIds = {};

allTsdocMessageIds.forEach(function (messageId) {
    messageIds[messageId] = messageId + ": {{ unformattedText }}";
});

module.exports = {
    rules: {
        "tsdoc-comments": {
            meta: {
                messages: messageIds
            },
            create: function(context) {
                var tsDocParser = new TSDocParser();
                var sourceCode = context.getSourceCode();
                return {
                    FunctionDeclaration: function (node) {
                        var commentBlocks = sourceCode.getCommentsBefore(node).filter(function (comment) {
                            return comment.type === "Block";
                        });
                        if (commentBlocks.length > 0) {
                            var commentBlock = commentBlocks[0];
                            var commentString = "/*" + commentBlock.value + "*/";
                            var results = tsDocParser.parseString(commentString).log;
                            if (results._messages.length > 0) {
                                results._messages.forEach(function (message) {
                                    context.report({
                                        node: node,
                                        messageId: message.messageId,
                                        data: message
                                    });
                                });
                            }
                        }
                    }
                };
            }
        }
    }
};
