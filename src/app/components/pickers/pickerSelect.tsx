import React, {memo} from 'react';
import {Platform, View, ViewStyle} from 'react-native';

import RNPickerSelect, {Item, PickerStyle} from 'react-native-picker-select';

import Typography from '../typography';
import strings from '../../constant/strings';

import {styles} from '../typography';
import {FlexStyles, BorderStyles} from '../../../styles';

type Props = {
  style?: ViewStyle;
  textStyle?: PickerStyle;
  label: String;
  placeHolder: Item;
  state: String;
  onChange: (text: string) => void;
  itemsList: Item[];
};

const PickerSelect = ({
  label,
  placeHolder,
  state,
  onChange,
  itemsList,
  style,
  textStyle,
}: Props) => {
  const selectedStyle =
    Platform.OS === 'ios'
      ? {inputIOS: styles.header}
      : {
          inputAndroid: state.match(strings.NO_SELECT)
            ? styles.description
            : styles.header,
        };

  return (
    <View style={FlexStyles.horizontal}>
      <Typography type="header">{label}</Typography>
      <View style={[BorderStyles.thinBorder, style]}>
        <RNPickerSelect
          onValueChange={value => onChange(value)}
          items={itemsList}
          value={state}
          placeholder={placeHolder}
          style={{...textStyle, ...selectedStyle}}
        />
      </View>
    </View>
  );
};

export default memo(PickerSelect);
