import moment from 'moment';
import {useState, useEffect} from 'react';

const validateDate = (time: number): boolean => {
  if (typeof time !== 'number' || isNaN(time) || time <= 0) {
    return true;
  }
  return false;
};

export const timeFromNow = (time: number): string => {
  if (validateDate(time)) {
    return 'Invalid time';
  }
  return moment(time).fromNow();
};

export const dateFormat = (time: number, format: string): string => {
  if (validateDate(time)) {
    return 'Invalid Date';
  }
  const date = moment.unix(time);
  const formattedDate = date.format(format);
  return formattedDate;
};

export const useDebounce = (value: string, delay: number) => {
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
