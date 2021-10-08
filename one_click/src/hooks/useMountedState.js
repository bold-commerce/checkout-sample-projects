import {useEffect, useRef, useCallback} from 'react';

// returns a function that when called will return true if the component is mounted
// used to prevent memory leaks when trying to update state in an unmounted component
// https://www.benmvp.com/blog/handling-async-react-component-effects-after-unmount/
const useMountedState = () => {
  const mountedRef = useRef(false);

  useEffect(() => {
    mountedRef.current = true;
    return (() => {
      mountedRef.current = false;
    })
  }, []);
  
  return useCallback(() => mountedRef.current, []);
}

export default useMountedState;