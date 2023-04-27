import React from 'react';
import {StyleSheet, ViewStyle, View, TextStyle} from 'react-native';

import Typography from '../../typography';

import colors from '../../../constant/colors';

type Props = {
  containerStyle?: ViewStyle;
  labels: string[];
  textColor?: TextStyle;
};
const AssetLabel = ({containerStyle, labels, textColor}: Props) => {
  return (
    <View style={{...styles.assetContainer, ...containerStyle}}>
      {labels.map((label, index) => {
        let value = 55 / (labels.length - 2);

        if (index === 0) {
          value = 25;
        }
        if (index === labels.length - 1) {
          value = 20;
        }
        const customStyle: TextStyle = {
          color: colors.LABEL_COLOR_SECONDARY,
          ...textColor,
          flexBasis: `${value}%`,
          textAlign: index !== 0 ? 'center' : 'left',
        };

        return (
          <Typography style={customStyle} key={index}>
            {label}
          </Typography>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  assetContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    flex: 1,
  },
});

export default AssetLabel;
