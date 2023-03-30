import {StyleSheet} from 'react-native';
import colors from '../app/constant/colors';

const FlexStyles = StyleSheet.create({
  horizontal: {
    width: '100%',
  },
});

const BorderStyles = StyleSheet.create({
  thinBorder: {
    borderColor: colors.BORDER,
    borderWidth: 1,
    borderRadius: 5,
  },
});

export {FlexStyles, BorderStyles};
