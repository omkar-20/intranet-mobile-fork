import React from 'react';
import {StyleSheet, View} from 'react-native';

import Typography from '../../typography';

import dataFormatter from '../../../utils/userProfile/dataFormatter';

import {AssetType} from '../../../types';
import colors from '../../../constant/colors';

type Props = {
  asset: AssetType;
  count: number;
  key: number;
};
const AssetItem = ({asset, count}: Props) => {
  return (
    <View style={styles.assetContainer}>
      <Typography style={[styles.leftText, {flexBasis: '25%'}]} type="header">
        {dataFormatter(asset.name)}
      </Typography>

      <Typography
        style={[styles.text, {flexBasis: `${55 / (count - 2)}%`}]}
        type="header">
        {dataFormatter(asset.startDate)}
      </Typography>
      {count === 4 && (
        <Typography
          style={[styles.text, {flexBasis: `${55 / (count - 2)}%`}]}
          type="header">
          {dataFormatter(asset.endDate)}
        </Typography>
      )}
      <Typography style={[styles.text, {flexBasis: '20%'}]}>
        {dataFormatter(asset.isActive)}
      </Typography>
    </View>
  );
};

const styles = StyleSheet.create({
  leftText: {
    color: colors.TERNARY_TEXT_COLOR,
  },
  assetContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    flex: 1,
  },
  text: {
    color: colors.TERNARY_TEXT_COLOR,
    textAlign: 'center',
  },
});

export default AssetItem;
