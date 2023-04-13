import {createContext} from 'react';
import {Navigation} from '../navigation/types';

const StackNavigation = createContext<Navigation>({
  navigate: undefined,
});

export default StackNavigation;
