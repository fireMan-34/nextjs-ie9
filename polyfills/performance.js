if (typeof window !== 'undefined') {
  if (typeof performance !== 'undefined' && typeof performance.now !== 'function') {
    performance.now = function () {
      var now = Date.now();
      return performance.timing.navigationStart ? now - performance.timing.navigationStart : now;
    }
  }
}