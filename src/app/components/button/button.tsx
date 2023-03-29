/* eslint-disable react-native/no-inline-styles */
import React from 'react';

import {TouchableOpacity, Text} from 'react-native';

import colors from '../../constant/colors';

import {TextStyles} from '../../../styles';

type Props = {
  title: string;
  eventHandler: () => void;
  fill: boolean;
  color: string;
};

const Button = ({title, eventHandler, fill, color}: Props) => {
  return (
    <TouchableOpacity
      onPress={eventHandler}
      style={[
        {
          borderWidth: !fill ? 2 : 0,
          borderRadius: 4,
          backgroundColor: fill ? color : colors.WHITE,
          borderColor: color,
        },
      ]}>
      <Text
        style={fill ? TextStyles.fillButtonText : TextStyles.noFillButtonText}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;
