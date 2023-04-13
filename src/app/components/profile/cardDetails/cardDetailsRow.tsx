import React, {memo} from 'react';
import {StyleSheet, View} from 'react-native';

import Typography from '../../typography';

import labelFormatter from '../../../utils/userProfile/labelFormatter';
import dataFormatter from '../../../utils/userProfile/dataFormatter';

type Props = {
  label: string;
  data: string | string[];
};

const CardDetailsRow = ({label, data}: Props) => {
  const formattedData: string = dataFormatter(data);

  return (
    <View style={styles.detailsData}>
      <Typography style={styles.labelFlex} type="label">
        {labelFormatter(label)}
      </Typography>
      <Typography style={[styles.contentStyle]} type="header">
        {formattedData}
      </Typography>
    </View>
  );
};

const styles = StyleSheet.create({
  detailsData: {
    flexDirection: 'row',
    flex: 1,
    paddingBottom: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  labelFlex: {
    textTransform: 'capitalize',
    paddingRight: 20,
  },
  contentStyle: {
    lineHeight: 20,
    flex: 1,
    flexWrap: 'wrap',
    textAlign: 'right',
  },
});
export default memo(CardDetailsRow);
