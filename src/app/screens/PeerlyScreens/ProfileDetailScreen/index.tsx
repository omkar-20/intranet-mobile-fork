import React from 'react';
import {Image, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {BadgeMetaData} from './types';
import {
  PlatinumIcon,
  GoldIcon,
  SilverIcon,
  BronzeIcon,
  InfoIcon,
  StarIcon,
} from '../constants/icons';
import {dateFormat} from '../utils';
import {CircularProgressBase} from 'react-native-circular-progress-indicator';

const badgeData: BadgeMetaData = {
  bronze: {
    member: 'Bronze Member',
    icon: PlatinumIcon,
  },
  silver: {
    member: 'Silver Member',
    icon: GoldIcon,
  },
  gold: {
    member: 'Gold Member',
    icon: SilverIcon,
  },
  platinum: {
    member: 'Platinum Member',
    icon: BronzeIcon,
  },
};

const ProfileDetailScreen = ({route}: any) => {
  const {details} = route.params;
  console.log('DETAILS', details);
  const {
    first_name,
    last_name,
    profile_image_url,
    designation,
    badge,
    reward_quota_balance,
    refil_date,
    total_points,
    total_reward_quota,
  } = details;

  const name = `${first_name} ${last_name}`;
  const BadgeIcon = badgeData[badge.toLowerCase()]?.icon || GoldIcon;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.profileDetailsBox}>
        <Image
          style={styles.profileImage}
          source={
            profile_image_url
              ? {uri: profile_image_url}
              : require('../../../../assets/images/profile.png')
          }
        />
        <View>
          <Text style={[styles.name, styles.bold]}>{name}</Text>
          <Text>{designation}</Text>
          <Text>
            {badgeData[badge.toLowerCase()]?.member || badgeData.gold?.member}
          </Text>
        </View>
        <View>
          <BadgeIcon />
          <Text style={[styles.name, styles.bold]}>{total_points || 2000}</Text>
          <Text style={[styles.name, styles.bold]}>Reward Points</Text>
        </View>
      </View>
      <View style={styles.rewardDetailsBox}>
        <View>
          <Text style={[styles.name, styles.bold]}>
            Reward Balance <InfoIcon width={16} height={16} />
          </Text>
          <Text>Refill on {dateFormat(refil_date, 'MMMM YYYY')}</Text>
        </View>
        <View style={styles.progressBar}>
          <CircularProgressBase
            clockwise={false}
            value={reward_quota_balance}
            radius={30}
            maxValue={total_reward_quota}
            activeStrokeColor={'#F3A552'}
            inActiveStrokeColor={'#F5F8FF'}>
            <View>
              <StarIcon width={25} height={25} />
            </View>
          </CircularProgressBase>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
    paddingTop: 20,
  },
  profileDetailsBox: {
    flexDirection: 'row',
    width: '90%',
    height: 100,
    backgroundColor: '#F5F8FF',
    padding: 10,
    borderRadius: 10,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 50,
  },
  name: {
    lineHeight: 19,
    textAlign: 'left',
  },
  bold: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000000',
  },
  rewardDetailsBox: {
    flexDirection: 'row',
    width: '90%',
    height: 100,
    backgroundColor: 'white',
    marginTop: 40,
    borderRadius: 10,
    alignItems: 'center',
  },
  progressBar: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 80,
    height: 80,
    backgroundColor: '#F5F8FF',
    borderRadius: 10,
    marginLeft: 30,
  },
});
export default ProfileDetailScreen;
