import React from 'react';
import {View, StyleSheet} from 'react-native';

import CircleView from '../../views/circleView';
import ErrorMessage from '../../ErrorMessage';

import urlHandler from '../../../utils/userProfile/urlHandler';

import {socialDetailsType} from '../../../types';

const handlePress = (uri: string) => urlHandler(uri);

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
            return <ErrorMessage key={index} data="Social Details" />;
          }
          count++;
        }
        return uri ? (
          <CircleView
            key={index}
            data={{name: name}}
            uri={uri}
            handlePress={handlePress}
          />
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
