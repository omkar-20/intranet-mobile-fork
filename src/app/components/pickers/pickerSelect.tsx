import React from 'react';

import RNPickerSelect, {Item} from 'react-native-picker-select';
import {Platform, Text, View} from 'react-native';

import strings from '../../constant/strings';

import {FlexStyles, TextStyles, BorderStyles} from '../../../styles';

type Props = {
  label: String;
  placeHolder: Item;
  state: String;
  setState: React.Dispatch<React.SetStateAction<String>>;
  itemsList: Item[];
};

const PickerSelect = ({
  label,
  placeHolder,
  state,
  setState,
  itemsList,
}: Props) => {
  return (
    <View style={FlexStyles.horizontal}>
      <Text style={TextStyles.sectionSubheadText}>{label}</Text>
      <View style={BorderStyles.thinBorder}>
        <RNPickerSelect
          onValueChange={value => setState(value)}
          items={itemsList}
          value={state}
          placeholder={placeHolder}
          style={
            Platform.OS === 'ios'
              ? {inputIOS: TextStyles.placeholderText}
              : {
                  inputAndroid: state.match(strings.NO_SELECT)
                    ? TextStyles.placeholderText
                    : TextStyles.sectionHeadText,
                }
          }
        />
      </View>
    </View>
  );
};

export default PickerSelect;
