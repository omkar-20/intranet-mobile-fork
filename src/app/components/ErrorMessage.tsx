import React from 'react';
import {TextStyle} from 'react-native/Libraries/StyleSheet/StyleSheetTypes';
import Typography from './typography';

import {getErrorMessage} from '../utils/userProfile/errorHandler';

type Props = {
  data: string;
  style?: TextStyle;
};
const ErrorMessage = ({data, style}: Props) => {
  return (
    <Typography type="label" style={style}>
      {getErrorMessage(data)}
    </Typography>
  );
};

export default ErrorMessage;
