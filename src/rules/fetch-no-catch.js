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
      TryStatement(node) {
        // Check if there is a 'fetch' call inside the 'try' block
        const fetchCall = findFetchCall(node);
        if (fetchCall) {
          // Check if there is an associated 'catch' block
          const hasCatchBlock = node.handler !== null;
          if (!hasCatchBlock) {
            context.report({
              node,
              message: 'Use of fetch inside a try block without an associated catch block.',
            });
          }
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
      return true;
    }
  }
  return false;
}

function findFetchCall(node) {
  if (node.type === 'CallExpression' && node.callee.name === 'fetch') {
    return node;
  }

  for (const key in node) {
    if (node[key] && typeof node[key] === 'object') {
      const result = findFetchCall(node[key]);
      if (result) {
        return result;
      }
    }
  }

  return null;
}
