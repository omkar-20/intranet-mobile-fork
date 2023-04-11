import strings from '../../constant/strings';

const dataFormatter = (
  data: string | string[] | boolean | null | undefined,
) => {
  if (data === '' || data === null || data === undefined) {
    return '-';
  } else if (typeof data === 'boolean') {
    return data ? strings.YES : strings.NO;
  } else if (Array.isArray(data)) {
    return data.toString();
  } else {
    return data;
  }
};

export default dataFormatter;
