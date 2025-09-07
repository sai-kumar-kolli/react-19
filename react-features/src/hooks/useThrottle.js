import { useCallback, useRef } from "react";

function useThrottle(callback, limit) {
  const inThrottle = useRef(false);
  const timeoutRef = useRef(null);

  const throttledFn = useCallback((...args) => {
    if (!inThrottle.current) {
      callback(...args);
      inThrottle.current = true;
      timeoutRef.current = setTimeout(() => {
        inThrottle.current = false;
      }, limit);
    }
  }, [callback, limit]);

  return throttledFn;
}

export default useThrottle;