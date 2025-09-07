import { useCallback, useRef } from "react";

function useDebounce(callback, delay) {
    const timeoutRef = useRef();

    return useCallback((...args) => {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => callback(...args), delay);
    }, [callback, delay]);
}

export default useDebounce;