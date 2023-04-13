import React from 'react';
import {View, StyleSheet} from 'react-native';

import CircleView from '../../views/circleView';
import ErrorMessage from '../../errorMessage';

import {socialDetailsType} from '../../../types';
import {NO_PROFILE_DATA} from '../../../constant/message';

type Props = {
  data: socialDetailsType;
};

const ProfileView = ({data}: Props) => {
  const dataArray = Object.entries(data);
  let count = 0;
  return (
    <View style={styles.profileContainer}>
      {dataArray.map(([name, uri], index) => {
        if (!uri) {
          if (count === dataArray.length - 1) {
            return <ErrorMessage key={index} message={NO_PROFILE_DATA} />;
          }
          count++;
        }
        return uri ? (
          <CircleView key={index} data={{name: name}} uri={uri} />
        ) : null;
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  profileContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flex: 1,
  },
});
export default ProfileView;
