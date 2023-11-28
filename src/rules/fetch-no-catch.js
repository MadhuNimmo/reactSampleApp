/**
 * @fileoverview ESLint rule to check if there is a call to fetch without an associated catch
 */

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'Ensure there is an associated catch block when using fetch',
      category: 'Best Practices',
      recommended: true,
    },
    fixable: null, // or 'code' or 'whitespace'
    schema: [],
  },

  create: function (context) {
    return {
      CallExpression(node) {
        const isFetch = node.callee.type === 'Identifier' && node.callee.name === 'fetch';
        if (isFetch && !hasCatchBlock(context, node)) {
          context.report({
            node,
            message: 'Use of fetch without an associated catch block.',
          });
        }
      },
    };
  },
};

function hasCatchBlock(context, node) {
  const ancestors = context.getAncestors(node);
  for (const ancestor of ancestors) {
    if (
      (ancestor.type === 'MemberExpression' && ancestor.property.name === 'catch') ||
      (ancestor.type === 'CallExpression' && ancestor.callee.name === 'catch') ||
      ancestor.type === 'TryStatement'
    ) {
      console.log(ancestor)
      return true;
    }
  }
  return false;
}
