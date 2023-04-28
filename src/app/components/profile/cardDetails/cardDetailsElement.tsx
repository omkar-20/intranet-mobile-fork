import React from 'react';
import {StyleSheet, View, ViewStyle} from 'react-native';

import CardDetailsRow from './cardDetailsRow';

import colors from '../../../constant/colors';
import {detailItemType} from '../../../types';

type Props = {
  data: detailItemType;
  style?: ViewStyle;
};
const CardDetailsElement = ({data, style}: Props) => {
  const dataArray = Object.entries(data);
  return (
    <View style={[styles.elementStyle, style]}>
      {dataArray.map(
        ([key, content], index: number) =>
          key !== 'typeOfAddress' &&
          key !== 'description' && (
            <CardDetailsRow key={index} label={key} data={content} />
          ),
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  elementStyle: {
    borderBottomWidth: 1,
    borderBottomColor: colors.BORDER,
    flex: 1,
    marginBottom: 20,
  },
});
export default CardDetailsElement;
