import React, {SetStateAction} from 'react';
import {CheckVersionResponse} from 'react-native-check-version';

type ContextValue = [
  CheckVersionResponse | null,
  React.Dispatch<SetStateAction<CheckVersionResponse | null>>,
];

const defaultValue: ContextValue = [null, () => {}];

const VersionContext = React.createContext<ContextValue>(defaultValue);

export default VersionContext;
