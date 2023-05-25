import React from 'react';
import {TextStyle} from 'react-native/Libraries/StyleSheet/StyleSheetTypes';
import Typography from '../typography';

type Props = {
  message: string;
  style?: TextStyle;
};
const ErrorMessage = ({message, style}: Props) => {
  return (
    <Typography type="label" style={style}>
      {message}
    </Typography>
  );
};

export default ErrorMessage;
