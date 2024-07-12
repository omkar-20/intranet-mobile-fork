import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import colors from '../../../constant/colors';
import {WhiteStar} from '../../../constant/icons';

const LeaderBoardCard = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../../../../assets/images/profile.png')}
        style={styles.profileImage}
      />
      <View style={styles.starContainer}>
        <WhiteStar color={colors.SECONDARY} />
        <Text style={styles.leadText}>1.5k</Text>
      </View>
      
      <View style={styles.nameContainer}>
      <Text style={styles.firstName}>Akshay</Text>
      <Text style={styles.lastName}>Doiphode</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginHorizontal: 10,
    padding: 10
  },
  nameContainer :{
   marginTop:5
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
    bottom: 45,
    //right: 5,
    backgroundColor: '#FEB333',
    borderRadius: 12,
    paddingHorizontal: 5,
    flexDirection: 'row',
    alignItems: 'center',
    width: '95%',
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
  firstName: {
    fontSize: 14,
    textAlign: "center"
  },
  lastName: {
    fontSize: 14,
    marginTop: 1,
  },
  leadText: {
    fontSize: 14,
    marginTop: 1,
    marginLeft: 2,
    color: colors.WHITE
  },

  
});

export default LeaderBoardCard;
