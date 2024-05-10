if (typeof window !== 'undefined') {
  function createStop(
    originFn,
    { name  }
  ) {
    return function (...args) {
      console.log('name be trigger: ', name);
      console.log('args:', ...args);
      return 
    }
  }
  
  if (typeof history !== 'undefined') {
    if (typeof history.go === 'function') {
      const originHistoryGo = history.go;
      history.go = createStop(originHistoryGo, { name: 'history.go' })
    }
    if (typeof history.pushState === 'function') {
      const originPushState = history.pushState;
      history.pushState = createStop(originPushState,{ name: 'history.pushState' });
    }
  }

  if(typeof location !== 'undefined') {
    if (typeof location.href === 'string') {
      // unknow how to hook it
    }
  }
}