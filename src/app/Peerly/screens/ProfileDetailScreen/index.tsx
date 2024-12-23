import React, {useMemo, useState} from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {InfoIcon, StarIcon} from '../../constants/icons';
import {dateFormat} from '../../utils';
import {CircularProgressBase} from 'react-native-circular-progress-indicator';
import {useGetAppreciationList} from '../HomeScreen/home.hooks';
import InfoModal from '../../components/InfoModal';
import {useGetProfileDetails} from './profileDetail.hooks';
import GivenAndReceivedAppriciation from '../../components/GivenAndReceivedAppreciation';
import {useRoute} from '@react-navigation/native';
import {ProfileScreenRouteProp} from '../../navigation/types';
import InitialAvatar from '../../components/InitialAvatar';
import colors from '../../constants/colors';
import message from '../../constants/message';
import ImageWithFallback from '../../components/imageWithFallback/ImageWithFallback';
import {paginationData, badgeData, initialProfileDetails} from './constants';

const ProfileDetailScreen = () => {
  const route = useRoute<ProfileScreenRouteProp>();
  const {userId} = route.params;
  const [isInfoModalVisible, setInfoModal] = useState(false);

  const {
    data: profileDetails,
    isLoading: isLoadingProfileDetail,
    isFetching: isFetchingProfileDetail,
  } = useGetProfileDetails(userId);
  const {
    data: appreciationList,
    isLoading: isLoadingAppreciations,
    isFetching: isFetchingAppreciations,
    isError: isErrorAppreciations,
  } = useGetAppreciationList(paginationData);

  const isDisableTabBtn = useMemo(() => {
    if (
      !appreciationList?.length ||
      isErrorAppreciations ||
      isLoadingAppreciations
    ) {
      return true;
    } else {
      return false;
    }
  }, [appreciationList?.length, isErrorAppreciations, isLoadingAppreciations]);

  if (isLoadingProfileDetail || isFetchingProfileDetail) {
    return (
      <SafeAreaView style={styles.pageLoader}>
        <ActivityIndicator size="large" />
      </SafeAreaView>
    );
  }

  const {
    first_name,
    last_name,
    badge,
    refil_date,
    profile_image_url,
    designation,
    total_points,
    reward_quota_balance,
    total_reward_quota,
  } = profileDetails || initialProfileDetails;

  const userName = `${first_name || ''} ${last_name || ''}`;
  const badgeType = badge.toLowerCase() || '';
  const member = badgeType ? (
    <Text>{badgeData[badgeType.toLowerCase()].member}</Text>
  ) : null;
  const userNameLowerCase = `${(first_name || '').toLowerCase()} ${(
    last_name || ''
  ).toLowerCase()}`;
  const rewardPointMargin = {marginTop: badgeType ? 30 : 0};

  const receivedAppriciationList = appreciationList.filter(item => {
    const fname = (item?.receiver_first_name || '').toLowerCase();
    const lname = (item?.receiver_last_name || '').toLowerCase();
    const receiverName = `${fname} ${lname}`;
    return receiverName.includes(userNameLowerCase);
  });

  const expressedAppriciationList = appreciationList.filter(item => {
    const fname = (item?.sender_first_name || '').toLowerCase();
    const lname = (item?.sender_last_name || '').toLowerCase();
    const senderName = `${fname} ${lname}`;
    return senderName.includes(userNameLowerCase);
  });

  const openModal = () => {
    setInfoModal(true);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.profileDetailsWrapper}>
          <View style={styles.profileDetailsBox}>
            <View style={styles.profileDetails}>
              {profile_image_url !== '' ? (
                <ImageWithFallback
                  imageUrl={profile_image_url}
                  initials={<InitialAvatar name={userName} size={60} />}
                  imageStyle={styles.profileImage}
                />
              ) : (
                <InitialAvatar name={userName} size={60} />
              )}
              <View style={styles.userNameWrapper}>
                <Text
                  style={[styles.name, styles.bold]}
                  ellipsizeMode="tail"
                  numberOfLines={1}>
                  {userName}
                </Text>
                {designation && (
                  <Text
                    style={styles.designation}
                    ellipsizeMode="tail"
                    numberOfLines={2}>
                    {designation}
                  </Text>
                )}
                {member}
              </View>
            </View>
            <View style={[styles.totalPoints, rewardPointMargin]}>
              <Text style={[styles.name, styles.bold]}>{total_points}</Text>
              <Text style={[styles.name, styles.bold, styles.fontSize]}>
                Appreciation
              </Text>
              <Text style={[styles.name, styles.bold, styles.fontSize]}>
                Points
              </Text>
            </View>
          </View>
          {badgeType && (
            <View style={styles.badgeWrapper}>
              {badgeData[badgeType]?.icon}
            </View>
          )}
        </View>
        <View style={styles.rewardDetailsBox}>
          <View>
            <Text style={[styles.name, styles.bold]}>
              Reward Balance{' '}
              <TouchableOpacity
                onPress={openModal}
                style={styles.infoIconWrapper}>
                <InfoIcon width={16} height={16} />
              </TouchableOpacity>
            </Text>
            <Text>Refill on {dateFormat(refil_date, 'MMMM YYYY')}</Text>
          </View>
          <View style={styles.progressBar}>
            <CircularProgressBase
              clockwise={false}
              value={reward_quota_balance}
              radius={30}
              maxValue={total_reward_quota}
              activeStrokeColor={colors.GOLD}
              inActiveStrokeColor={colors.WHITE}
              activeStrokeWidth={8}
              inActiveStrokeWidth={8}>
              <View>
                <StarIcon width={25} height={25} />
              </View>
            </CircularProgressBase>
          </View>
        </View>
        <View style={styles.appreciationList}>
          <GivenAndReceivedAppriciation
            appreciationList={appreciationList}
            receivedList={receivedAppriciationList}
            expressedList={expressedAppriciationList}
            isLoading={isLoadingAppreciations || isFetchingAppreciations}
            disableBtn={isDisableTabBtn}
            self={true}
          />
        </View>
        <InfoModal
          message={message.REWARD_BALANCE_INFO}
          visible={isInfoModalVisible}
          closeModal={() => setInfoModal(false)}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },
  container: {
    flex: 1,
    padding: 15,
  },
  pageLoader: {
    flex: 1,
    justifyContent: 'center',
  },
  profileDetailsWrapper: {
    marginTop: 5,
  },
  profileDetailsBox: {
    flexDirection: 'row',
    backgroundColor: colors.LIGHT_PASTEL_BLUE,
    padding: 15,
    borderRadius: 10,
  },
  profileDetails: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 32,
    borderWidth: 1,
    borderColor: colors.PRIMARY,
  },
  fontSize: {
    fontSize: 14,
  },
  designation: {
    color: colors.BLACK,
  },
  name: {
    lineHeight: 19,
    textAlign: 'left',
  },
  bold: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.BLACK,
  },
  userNameWrapper: {
    marginLeft: 15,
    maxWidth: 150,
  },
  badgeWrapper: {
    position: 'absolute',
    top: -20,
    right: 27,
  },
  totalPoints: {
    marginLeft: 0,
    alignItems: 'center',
    width: 90,
  },
  rewardDetailsBox: {
    flexDirection: 'row',
    width: '100%',
    backgroundColor: 'white',
    marginTop: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  progressBar: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 80,
    height: 80,
    backgroundColor: colors.LIGHT_PASTEL_BLUE,
    borderRadius: 10,
    marginLeft: 30,
  },
  appreciationList: {
    marginTop: 10,
    flex: 1,
    width: '100%',
    height: '100%',
  },
  infoIconWrapper: {
    paddingHorizontal: 5,
  },
});
export default ProfileDetailScreen;
