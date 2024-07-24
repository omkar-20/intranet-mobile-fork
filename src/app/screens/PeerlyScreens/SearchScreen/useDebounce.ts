import {useState, useEffect} from 'react';

const useDebounce = (value: string, delay: number) => {
  const [debounceValue, setDebounce] = useState<string>('');
  useEffect(() => {
    const timeOut = setTimeout(() => {
      setDebounce(value);
    }, delay);

    return () => {
      clearTimeout(timeOut);
    };
  }, [delay, value]);

  return debounceValue;
};
export default useDebounce;
