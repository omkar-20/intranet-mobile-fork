import React, {useState} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import colors from '../../../constant/colors';
import RatingBar from '../Components/RatingBar';
import ObjectionModal from '../Components/ObjectionModal';

const AppreciationDetailsScreen = ({route}) => {
  const [isObjectionModalVisible, setObjectionModalVisible] = useState(false);
  const {cardId, appriciationList} = route.params;
  const cardDetails = appriciationList.find(item => item.id === cardId);

  return (
    <View style={styles.container}>
      <View style={{alignItems: 'center'}}>
        <Image
          source={
            cardDetails?.receiver_image_url
              ? {uri: cardDetails.receiver_image_url}
              : require('../../../../assets/images/profile.png')
          }
          style={styles.avatar}
        />
      </View>
      <View style={{alignItems: 'center', position: 'absolute', right: 80}}>
        <Image
          source={
            cardDetails?.sender_image_url
              ? {uri: cardDetails.sender_image_url}
              : require('../../../../assets/images/profile.png')
          }
          style={[styles.smallAvatar]}
        />
      </View>
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <View style={styles.info}>
          <Text style={styles.name}>
            {`${cardDetails.receiver_first_name} ${cardDetails.receiver_last_name} `}
          </Text>
          <Text style={styles.title}>{cardDetails.receiver_designation}</Text>
        </View>

        <Text style={styles.tag}>{cardDetails.core_value_name}</Text>
        <Text style={styles.description}>
          {cardDetails.core_value_description}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            alignSelf: 'flex-start',
            marginLeft: 10,
          }}>
          <Text style={styles.authorByText}>Words by </Text>
          <Text
            style={
              styles.author
            }>{`${cardDetails.sender_first_name} ${cardDetails.sender_last_name}`}</Text>
        </View>

        <Text style={styles.loremText}>{cardDetails.description}</Text>
      </View>

      <RatingBar
        onPressObjection={() => setObjectionModalVisible(true)}
        totalPeopleRatings={cardDetails.total_rewards}
        myRating={cardDetails.given_reward_point}
      />
      <ObjectionModal
        visible={isObjectionModalVisible}
        onClose={() => setObjectionModalVisible(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
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
    fontWeight: 'bold',
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
    padding: 5,
    borderRadius: 10,
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
  },
  avatarContainer: {
    flexDirection: 'row',
    position: 'relative',
    justifyContent: 'center',
  },
});

export default AppreciationDetailsScreen;
