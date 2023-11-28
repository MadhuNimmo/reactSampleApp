module.exports = {
        meta: {
                type: "error",
                docs: {
                        description: "Dont call X",
                },
                fixable: "code",
                schema: [] // no options
        },
        create(context) {
                return {
                        CallExpression(node) {
                                if (node.callee.name === "X") {
                                        context.report({
                                                node: node,
                                                message: "Dont call X",
                                                fix: function (fixer) { return fixer.replaceText(node.callee, "Y") }
                                        })
                                }
                        }
                }
        }
}