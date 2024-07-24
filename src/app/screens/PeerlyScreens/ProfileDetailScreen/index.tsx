import React, {useState} from 'react';
import {
  Button,
  FlatList,
  Image,
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
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
import AppreciationCard from '../Components/AppreciationCard';
import {SceneMap, TabBar, TabView} from 'react-native-tab-view';
import colors from '../../../constant/colors';
import fonts from '../../../constant/fonts';
import {APPRECIATION_DETAILS} from '../../../constant/screenNames';
import {AppreciationDetails} from '../../../services/PeerlyServices/home/types';
import RewardInfoModal from '../Components/RewardInfoModal';

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

const ProfileDetailScreen = ({route, navigation}: any) => {
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [isModalVisible, setModalVisible] = useState(false);

  const {details} = route.params;

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

  const {data: appreciationList} = useGetAppreciationList(paginationData);

  const getCurrentAppriciationDetails = (currentId: number) => {
    const currentAppreciation = appreciationList.filter(
      (item: AppreciationDetails) => item.id === currentId,
    );
    return currentAppreciation || [];
  };

  const handleAppreciationCardClick = (id: number) => {
    navigation.navigate(APPRECIATION_DETAILS, {
      cardId: id,
      appriciationList: getCurrentAppriciationDetails(id),
      self: true,
    });
  };

  const receivedAppriciationList = appreciationList.filter(
    item =>
      item.receiver_first_name === first_name &&
      item.receiver_last_name === last_name,
  );

  const expressedAppriciationList = appreciationList.filter(
    item =>
      item.sender_first_name === first_name &&
      item.sender_last_name === last_name,
  );

  const [routes] = React.useState([
    {key: 'received', title: 'Received'},
    {key: 'expressed', title: 'Expressed'},
  ]);

  const FirstRoute = () => (
    <View style={{backgroundColor: '#F4F6FF'}}>
      <FlatList
        data={receivedAppriciationList || []}
        renderItem={({item}) => (
          <AppreciationCard
            appreciationDetails={item}
            onPress={handleAppreciationCardClick}
          />
        )}
        keyExtractor={item => String(item.id)}
        numColumns={2}
      />
    </View>
  );

  const SecondRoute = () => (
    <View style={{backgroundColor: '#F4F6FF'}}>
      <FlatList
        data={expressedAppriciationList || []}
        renderItem={({item}) => (
          <AppreciationCard
            appreciationDetails={item}
            onPress={handleAppreciationCardClick}
          />
        )}
        keyExtractor={item => String(item.id)}
        numColumns={2}
      />
    </View>
  );

  const renderScene = SceneMap({
    received: FirstRoute,
    expressed: SecondRoute,
  });

  const renderTabBar = (props: any) => (
    <TabBar
      {...props}
      labelStyle={styles.labelStyle}
      scrollEnabled={true}
      inactiveColor={colors.SECONDARY}
      activeColor={colors.PRIMARY}
      indicatorStyle={styles.indicatorStyle}
      style={styles.tabBarContainer}
    />
  );

  const openModal = () => {
    setModalVisible(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.profileDetailsBox}>
        <Image
          style={styles.profileImage}
          source={profile_image_url ? {uri: profile_image_url} : ProfileIcon}
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
            Reward Balance{' '}
            <TouchableOpacity onPress={openModal}>
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
            activeStrokeColor={'#F3A552'}
            inActiveStrokeColor={'#F5F8FF'}>
            <View>
              <StarIcon width={25} height={25} />
            </View>
          </CircularProgressBase>
        </View>
      </View>
      <View style={styles.appreciationList}>
        <TabView
          navigationState={{index, routes}}
          renderScene={renderScene}
          renderTabBar={renderTabBar}
          onIndexChange={setIndex}
          initialLayout={{width: layout.width}}
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
  labelStyle: {
    color: colors.LABEL_COLOR_SECONDARY,
    textAlign: 'left',
    fontSize: 14,
    fontFamily: fonts.ARIAL,
    textTransform: 'none',
  },
  indicatorStyle: {backgroundColor: colors.PRIMARY},
  tabBarContainer: {
    height: 50,
    width: '100%',
    backgroundColor: '#F4F6FF',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.PRIMARY,
  },
});
export default ProfileDetailScreen;
