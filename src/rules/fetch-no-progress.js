/**
 * @fileoverview ESLint rule to check if a React component with fetch includes Progress.Bar in JSX
 */

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
        meta: {
                type: 'suggestion',
                docs: {
                        description: 'Ensure a React component with fetch includes Progress.Bar in JSX',
                        category: 'Best Practices',
                        recommended: true,
                },
                fixable: null,
                schema: [],
        },

        create: function (context) {
                let hasFetchCall = false;
                let includesProgressBar = false;

                return {
                        CallExpression(node) {
                                const isFetch = node.callee.type === 'Identifier' && node.callee.name === 'fetch';
                                if (isFetch) {
                                        hasFetchCall = true;
                                }
                        },

                        JSXElement(node) {
                                if (hasFetchCall) {
                                        //const isProgressBar = node.openingElement.name.name === 'Progress' && node.openingElement.name.property.name === 'Bar';
                                        if (node.children.some(child => includesProgressBarFun(child))) {
                                                includesProgressBar = true; // Reset after finding Progress.Bar
                                        }
                                }
                        },

                        'Program:exit': function () {
                                if (hasFetchCall && !includesProgressBar) {
                                        context.report({
                                                node: context.getSourceCode().ast,
                                                message: 'Component with fetch should include Progress.Bar in JSX.',
                                        });
                                }
                        },
                };
        },
};

function includesProgressBarFun(node) {
        if (node.type === 'JSXElement') {
                const openingElementName = node.openingElement.name;
                const isProgressBar =
                        (openingElementName &&
                                ((openingElementName.type === 'JSXIdentifier' &&
                                        openingElementName.name === 'Progress') ||
                                        (openingElementName.type === 'JSXMemberExpression' &&
                                                openingElementName.object.name === 'Progress')));
                if (isProgressBar) {
                        return true;
                }

                return node.children.some(child => includesProgressBarFun(child));
        }

        return false;
}
