import React from 'react';

import Typography from './typography';

import {getErrorMessage} from '../utils/userProfile/errorHandler';

const ErrorMessage = ({data}: {data: string}) => {
  return <Typography type="label">{getErrorMessage(data)}</Typography>;
};

export default ErrorMessage;
