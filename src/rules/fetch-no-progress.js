/**
 * @fileoverview Custom ESLint rule to check for PropertyAccessExpression in JSX elements
 * only when the component has a call to fetch and Progress is used.
 */

module.exports = {
        meta: {
                docs: {
                        description: 'Check for PropertyAccessExpression in JSX elements only when the component has a call to fetch and Progress is used.',
                        category: 'Best Practices',
                        recommended: true,
                },
                fixable: null, // or 'code' or 'whitespace'
        },

        create: function (context) {
                let hasFetch = false;
                let jsxElementsWithProgress = [];

                function checkForPropertyAccess(node) {
                        if (node.type === 'JSXElement') {
                                if (["ActivityIndicator", "ProgressBarAndroid", "ProgressViewIOS"].includes(node.openingElement.name.name) || (node.openingElement.name.type == 'JSXMemberExpression' && node.openingElement.name.object.name == 'Progress')) {
                                        jsxElementsWithProgress.push(node);
                                }
                                node.children.forEach(childNode => {
                                        checkForPropertyAccess(childNode);
                                });
                        }
                }

                return {
                        CallExpression: function (node) {
                                if (node.callee.name === 'fetch') {
                                        hasFetch = true;
                                }
                        },
                        JSXElement: function (node) {
                                checkForPropertyAccess(node);
                        },
                        'Program:exit': function (programNode) {
                                if (hasFetch && jsxElementsWithProgress.length === 0) {
                                        context.report({
                                                node: programNode,
                                                message: 'Avoid calling fetch without using Progress in the JSX elements.',
                                        });
                                }
                        },
                };
        },
};
