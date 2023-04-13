import React, {memo} from 'react';
import {StyleSheet, View} from 'react-native';

import Typography from '../../../components/typography';

import {Arrow} from '../../../constant/icons';

import {flexStyles} from '../../../../styles';

type Props = {
  name: string;
  email: string;
  isArrowVisible?: boolean;
};

const EmployeeCard = ({name, email, isArrowVisible = true}: Props) => (
  <View style={[flexStyles.horizontal, styles.main]}>
    <View>
      <Typography type="header" style={styles.empName}>
        {name}
      </Typography>
      <Typography type="description" style={styles.empEmail}>
        {email}
      </Typography>
    </View>
    {isArrowVisible ? <Arrow style={styles.arrow} /> : <></>}
  </View>
);

const styles = StyleSheet.create({
  empName: {
    margin: 12,
    marginBottom: 6,
  },
  empEmail: {
    marginStart: 12,
    marginBottom: 12,
  },
  arrow: {
    marginEnd: 10,
  },
  main: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 5,
  },
});

export default memo(EmployeeCard);
