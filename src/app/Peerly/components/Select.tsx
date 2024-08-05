import React, {memo} from 'react';
import {StyleSheet, View, ViewStyle} from 'react-native';
import RNPickerSelect, {
  PickerSelectProps,
  PickerStyle,
} from 'react-native-picker-select';

import Typography from '../../components/typography';

import colors from '../../constant/colors';

type Props = PickerSelectProps & {
  containerStyle?: ViewStyle;
  error?: string;
  textStyle?: PickerStyle;
  placeholder: string;
};

const Select = ({
  containerStyle,
  value,
  error,
  textStyle,
  placeholder,
  ...props
}: Props) => {
  return (
    <>
      <View
        style={[styles.container, error ? styles.error : {}, containerStyle]}>
        <RNPickerSelect
          value={value ? value : null}
          style={{...textStyle}}
          placeholder={{
            label: placeholder,
          }}
          {...props}
        />
      </View>
      {error && (
        <Typography style={styles.errorText} type="description">
          {error}
        </Typography>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 40,
    justifyContent: 'center',
    width: '100%',
    borderColor: '#A0A0A0',
    borderWidth: 1,
    color: colors.SECONDARY,
    borderRadius: 4,
  },
  errorText: {
    color: colors.ERROR_RED,
    paddingTop: 5,
  },
  error: {
    borderBottomColor: colors.ERROR_RED,
  },
});

export default memo(Select);
