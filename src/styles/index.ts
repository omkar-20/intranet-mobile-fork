import {StyleSheet} from 'react-native';
import colors from '../app/constant/colors';

import fonts from '../app/constant/fonts';

const TextStyles = StyleSheet.create({
  headerValueText: {
    color: colors.SECONDARY,
    fontSize: 10,
    fontFamily: fonts.OVERPASS,
    textAlign: 'center',
  },
  headerPropertyText: {
    color: colors.SECONDARY_TEXT,
    fontSize: 10,
    fontFamily: fonts.OVERPASS,
    textAlign: 'center',
  },
  sectionHeadText: {
    color: colors.SECONDARY,
    fontSize: 14,
    fontFamily: fonts.ARIAL,
    textAlign: 'left',
  },
  sectionSubheadText: {
    color: colors.SECONDARY,
    fontSize: 12,
    fontFamily: fonts.ARIAL,
    textAlign: 'left',
    marginBottom: 9,
    marginTop: 24,
  },
  placeholderText: {
    color: colors.PLACEHOLDER_TEXT,
    fontSize: 14,
    fontFamily: fonts.OVERPASS,
    textAlign: 'left',
  },
  sectionDescText: {
    color: colors.SECONDARY_TEXT,
    fontSize: 12,
    fontFamily: fonts.OVERPASS,
    textAlign: 'left',
    marginVertical: 11,
  },
  noFillButtonText: {
    fontFamily: fonts.POPPINS,
    fontSize: 14,
    textAlign: 'center',
    textTransform: 'capitalize',
    color: colors.PRIMARY,
    marginVertical: 9,
  },
  fillButtonText: {
    fontFamily: fonts.POPPINS,
    fontSize: 14,
    textAlign: 'center',
    textTransform: 'capitalize',
    color: colors.WHITE,
    marginVertical: 9,
  },
});

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

export {TextStyles, FlexStyles, BorderStyles};
