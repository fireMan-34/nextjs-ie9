import React from "react";

function logErrorToyService(error, stack) {
  console.log('捕获到异常信息: ', error);
  console.log('错误堆栈: ', stack);
}


class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    logErrorToyService(error, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback ??  <div>程序好像发生了什么</div>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;