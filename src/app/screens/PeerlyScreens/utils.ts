import moment from 'moment';

export const timeFromNow = (time: number): string => {
  // Validate timestamp
  if (typeof time !== 'number' || isNaN(time) || time <= 0) {
    return 'Invalid time';
  }

  return moment(time).fromNow();
};
