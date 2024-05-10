module.exports = function (babel) {
  const { types: t } = babel;

  return {
    visitor: {
      LogicalExpression(path) {
        if (
          path.node.operator === "&&" &&
          path.node.left.type === "Identifier" &&
          path.node.left.name === "T" &&
          path.node.right.type === "AssignmentExpression" &&
          path.node.right.operator === "=" &&
          path.node.right.left.type === "Identifier" &&
          path.node.right.left.name === "C" &&
          path.node.right.right.type === "ConditionalExpression"
        ) {
          path.node.left = path.replaceWithSourceString('T&&T.type');
        }
      }
    }
  }
};