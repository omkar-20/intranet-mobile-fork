import {StyleSheet} from 'react-native';
import colors from '../app/constant/colors';

const flexStyles = StyleSheet.create({
  horizontal: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  vertical: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});

const borderStyles = StyleSheet.create({
  thinBorder: {
    borderColor: colors.BORDER,
    borderBottomWidth: 1,
  },
});

export {flexStyles, borderStyles};
