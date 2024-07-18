import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import colors from '../../../constant/colors';
import {BlackStar} from '../../../constant/icons';
import {AppreciationDetails} from '../../../services/PeerlyServices/home/types';

type Props = {
  onPress?: (id: number) => void;
  appreciationDetails: AppreciationDetails;
};

const AppreciationCard = ({onPress, appreciationDetails}: Props) => {
  return (
    <View style={styles.card}>
      <TouchableOpacity onPress={() => onPress(appreciationDetails.id)}>
        <View style={styles.header}>
          <View style={styles.avatarContainer}>
            <Image
              source={
                appreciationDetails.receiver_image_url
                  ? {uri: appreciationDetails.receiver_image_url}
                  : require('../../../../assets/images/profile.png')
              }
              style={styles.avatar}
            />
            <Image
              source={
                appreciationDetails?.sender_image_url
                  ? {uri: appreciationDetails.sender_image_url}
                  : require('../../../../assets/images/profile.png')
              }
              //style={[styles.avatar, styles.smallAvatar]}
              style={[styles.smallAvatar]}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <BlackStar color={colors.SECONDARY} />
            <Text style={styles.starCount}>
              {appreciationDetails.total_reward_points}
            </Text>
          </View>
        </View>
        <View style={styles.content}>
          <Text style={styles.name}>
            {`${appreciationDetails.receiver_first_name} ${appreciationDetails.receiver_last_name}`}
          </Text>
          <Text style={styles.role}>
            {appreciationDetails.receiver_designation}
          </Text>
          <Text style={styles.appreciation}>
            Appreciated by{' '}
            {`${appreciationDetails.sender_first_name} ${appreciationDetails.sender_last_name}`}
          </Text>
          <Text style={styles.days}>10 Days ago</Text>
        </View>
        <View style={styles.footer}>
          <View style={{padding: 5}}>
            <Text style={styles.coreValue}>Core Value</Text>
            <Text style={styles.value}>
              {appreciationDetails.core_value_name}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.LIGHT_GREY_BACKGROUND,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    marginTop: 40,
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10,
    width: '45%',
  },
  header: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 10,
  },
  avatarContainer: {
    flexDirection: 'row',
    position: 'relative',
  },
  avatar: {
    width: 65,
    height: 65,
    borderRadius: 33,
    borderWidth: 2,
    borderColor: colors.PRIMARY,
    marginRight: -10,
    marginTop: -40,
  },
  smallAvatar: {
    width: 45,
    height: 45,
    borderRadius: 23,
    marginTop: -20,
    borderColor: colors.WHITE,
    borderWidth: 2,
    overflow: 'hidden',
    position: 'absolute',
    left: 45,
  },
  icon: {
    marginLeft: 'auto',
  },
  starCount: {
    marginLeft: 5,
    fontSize: 18,
    fontWeight: 'bold',
  },
  content: {
    marginTop: 10,
    padding: 5,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  role: {
    fontSize: 14,
    color: '#555',
  },
  appreciation: {
    fontSize: 14,
    marginTop: 5,
  },
  days: {
    fontSize: 12,
    color: '#888',
  },
  footer: {
    paddingTop: 5,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    backgroundColor: '#F5E6D6',
  },
  coreValue: {
    fontSize: 12,
    color: '#888',
  },
  value: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 5,
  },
});

export default AppreciationCard;
