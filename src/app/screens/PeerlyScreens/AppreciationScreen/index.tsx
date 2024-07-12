import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import colors from '../../../constant/colors';

const AppreciationScreen = () => {
  return (
    // <View style={styles.card}>
    <View style={styles.container}>
      <View style={{alignItems: 'center'}}>
        <Image
          source={require('../../../../assets/images/profile.png')}
          style={styles.avatar}
        />
      </View>
      <View style={{alignItems: 'center', position: 'absolute', right: 80}}>
        <Image
          source={require('../../../../assets/images/profile.png')}
          //style={[styles.avatar, styles.smallAvatar]}
          style={[styles.smallAvatar]}
        />
      </View>
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <View style={styles.info}>
          <Text style={styles.name}>Mangesh Pawar</Text>
          <Text style={styles.title}>Technical Lead</Text>
        </View>

        <Text style={styles.tag}>Technical Excellence</Text>
        <Text style={styles.description}>
          We are committed to delivering excellence in every product, service,
          and experience we provide, striving for continuous improvement.
        </Text>
        <View style={{flexDirection:"row", alignSelf:'flex-start' ,marginLeft:10}}>
          <Text style={styles.authorByText}>Words by </Text>
          <Text style={styles.author}>Manas Joshi</Text>
        </View>

        <Text style={styles.loremText}>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop.
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    //justifyContent: 'center',
    marginLeft: 30,
    marginRight: 30,
    marginTop: 80,
    marginBottom: 80,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  card: {
    flex: 1,
    backgroundColor: colors.LIGHT_GREY_BACKGROUND,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    width: '100%',
    padding: 20,
    marginRight: 30,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  info: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 14,
    color: 'gray',
    textAlign: 'center',
  },
  tag: {
    backgroundColor: '#F5E6D6',
    color: colors.SECONDARY,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginVertical: 10,
    textAlign: 'center',
  },
  description: {
    fontSize: 14,
    color: colors.SECONDARY,
    marginBottom: 10,
    backgroundColor: '#F5E6D6',
    margin: 10,
    padding: 5,
    borderRadius: 10,
  },
  author: {
    fontSize: 12,
    fontStyle: 'italic',
    color: colors.SECONDARY,
    marginBottom: 10,
    fontWeight:'bold'
  },
  authorByText: {
    fontSize: 12,
    fontStyle: 'italic',
    color: colors.SECONDARY,
    marginBottom: 10,
  },
  loremText: {
    fontSize: 14,
    color: colors.SECONDARY,
    marginBottom: 10,
    backgroundColor: colors.WHITE,
    marginLeft: 10,
    marginRight: 10,
    padding:5, borderRadius:10
  },
  rating: {
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonContainer: {
    flex: 1,
    marginHorizontal: 5,
  },
  button: {
    borderColor: '#f0ad4e',
  },

  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: colors.PRIMARY,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -40,
  },
  smallAvatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginTop: -20,
    borderColor: colors.WHITE,
    borderWidth: 2,
    //overflow: 'hidden',
    //position: 'absolute',
  },
  avatarContainer: {
    flexDirection: 'row',
    position: 'relative',
    justifyContent: 'center',
  },
});

export default AppreciationScreen;
