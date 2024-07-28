import React, {useState} from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {BadgeMetaData} from './types';
import {
  PlatinumIcon,
  GoldIcon,
  SilverIcon,
  BronzeIcon,
  InfoIcon,
  StarIcon,
  ProfileIcon,
} from '../constants/icons';
import {dateFormat} from '../utils';
import {CircularProgressBase} from 'react-native-circular-progress-indicator';
import {useGetAppreciationList} from '../HomeScreen/home.hooks';
import RewardInfoModal from '../components/RewardInfoModal';
import {useGetProfileDetails} from './profile.hooks';
import GivenAndReceivedAppriciation from '../components/GivenAndReceivedAppreciation';
import {useRoute} from '@react-navigation/native';
import {ProfileScreenRouteProp} from '../navigation/types';

const paginationData = {
  page: 1,
  page_size: 500,
  self: true,
};
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

const ProfileDetailScreen = () => {
  const route = useRoute<ProfileScreenRouteProp>();
  const {userId} = route.params;
  const [isModalVisible, setModalVisible] = useState(false);

  const {data: profileDetails} = useGetProfileDetails(userId);

  const userName = `${profileDetails?.first_name} ${profileDetails?.last_name}`;
  const badge = profileDetails?.badge.toLowerCase() || false;
  const BadgeIcon = badge ? badgeData[badge]?.icon : '';

  const {data: appreciationList} = useGetAppreciationList(paginationData);

  const userNameLowerCase = `${(
    profileDetails?.first_name || ''
  ).toLowerCase()} ${(profileDetails?.last_name || '').toLowerCase()}`;

  const receivedAppriciationList = appreciationList.filter(item => {
    const fname = (item?.receiver_first_name || '').toLowerCase();
    const lname = (item?.receiver_last_name || '').toLowerCase();
    const receiverName = `${fname} ${lname}`;
    return receiverName.includes(userNameLowerCase);
  });

  const expressedAppriciationList = appreciationList.filter(item => {
    const fname = (item?.sender_first_name || '').toLowerCase();
    const lname = (item?.sender_last_name || '').toLowerCase();
    const receiverName = `${fname} ${lname}`;
    return receiverName.includes(userNameLowerCase);
  });

  const openModal = () => {
    setModalVisible(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.profileDetailsBox}>
        <Image
          style={styles.profileImage}
          source={
            profileDetails?.profile_image_url
              ? {uri: profileDetails.profile_image_url}
              : ProfileIcon
          }
        />
        <View>
          <Text style={[styles.name, styles.bold]}>{userName}</Text>
          <Text>{profileDetails?.designation}</Text>
          <Text>{badge ? badgeData[badge.toLowerCase()]?.member : null}</Text>
        </View>
        <View>
          {badge ? <BadgeIcon /> : null}
          <Text style={[styles.name, styles.bold]}>
            {profileDetails?.total_points}
          </Text>
          <Text style={[styles.name, styles.bold]}>Reward Points</Text>
        </View>
      </View>
      <View style={styles.rewardDetailsBox}>
        <View>
          <Text style={[styles.name, styles.bold]}>
            Reward Balance{' '}
            <TouchableOpacity onPress={openModal}>
              <InfoIcon width={16} height={16} />
            </TouchableOpacity>
          </Text>
          <Text>
            {profileDetails?.refil_date
              ? `Refill on ${dateFormat(
                  profileDetails?.refil_date,
                  'MMMM YYYY',
                )}`
              : null}
          </Text>
        </View>
        <View style={styles.progressBar}>
          <CircularProgressBase
            clockwise={false}
            value={profileDetails?.reward_quota_balance || 0}
            radius={30}
            maxValue={profileDetails?.total_reward_quota || 0}
            activeStrokeColor={'#F3A552'}
            inActiveStrokeColor={'#F5F8FF'}>
            <View>
              <StarIcon width={25} height={25} />
            </View>
          </CircularProgressBase>
        </View>
      </View>

      <View style={styles.appreciationList}>
        <GivenAndReceivedAppriciation
          self={true}
          appreciationList={appreciationList}
          receivedList={receivedAppriciationList}
          expressedList={expressedAppriciationList}
        />
      </View>
      <RewardInfoModal
        visible={isModalVisible}
        closeModal={() => setModalVisible(false)}
      />
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
  appreciationList: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
});
export default ProfileDetailScreen;
