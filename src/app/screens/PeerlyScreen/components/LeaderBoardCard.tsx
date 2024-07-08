import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import colors from '../../../constant/colors';
import {StarIcon} from '../../../constant/icons';

const LeaderBoardCard = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../../../../assets/images/profile.png')}
        style={styles.profileImage}
      />
      <View style={styles.starContainer}>
        <StarIcon color={colors.SECONDARY} />
      </View>
      <Text style={styles.name}>Akshay Doiphode</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginHorizontal: 10,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: 'white',
    marginBottom: 5,
  },
  starContainer: {
    position: 'absolute',
    bottom: 20,
    right: 5,
    backgroundColor: '#4a3cff',
    borderRadius: 12,
    paddingHorizontal: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  starIcon: {
    width: 12,
    height: 12,
    marginRight: 3,
  },
  starText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
  },
  name: {
    fontSize: 14,
    marginTop: 5,
  },
});

export default LeaderBoardCard;
