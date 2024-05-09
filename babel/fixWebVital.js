module.exports = function (babel) {
  const {} = babel;

  return {
    visitor: {
      LogicalExpression(path) {
        if (
          path.node.operator === '&&'
      &&  path.node.left.type === "Identifier"
      &&  path.node.left.name === "T"
      &&  path.node.right.type === "AssignmentExpression"
      &&  path.node.
    ) {

        }
      }
    }
  }
};