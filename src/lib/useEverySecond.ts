import { useEffect, useRef } from 'react';

type Action = () => void;

export default (callback: Action) => {
  const ref = useRef<Action>();
  useEffect(() => {
    ref.current = callback;
    const id = setInterval(callback, 1000);
    return () => clearInterval(id);
  }, [callback]);
};
