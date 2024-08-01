import React, {useCallback} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  Image,
  useWindowDimensions,
  FlatList,
  Pressable,
} from 'react-native';

import colors from '../constants/colors';
import AppreciationCard from '../components/AppreciationCard';
import {SceneMap, TabBar, TabView} from 'react-native-tab-view';
import fonts from '../../../constant/fonts';
import FloatingGiveAppreciationButton from '../../../components/button/floatingGiveAppreciationButton';
import LeaderBoardCard from '../components/LeaderBoardCard';
import {
  useGetAppreciationList,
  useGetActiveUsersList,
  useGetTopUsersList,
} from './home.hooks';
import {useGetProfileDetails} from '../ProfileDetailScreen/profile.hooks';
import {
  APPRECIATION,
  APPRECIATION_DETAILS,
  APPRECIATION_SEARCH,
  PROFILE_DETAILS,
} from '../constants/screenNames';
import {useNavigation} from '@react-navigation/native';
import {HomeScreenNavigationProp} from '../navigation/types';
import {ProfileIcon, StarIcon} from '../constants/icons';
import Search from '../components/Search';

const paginationData = {
  page: 1,
  page_size: 500,
  sort_order: 'DESC',
};

const HomeScreen = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const layout = useWindowDimensions();
  const {data: profileDetails} = useGetProfileDetails();

  const {data: appreciationList, metadata: appreciationListMeta} =
    useGetAppreciationList(paginationData);

  const {data: activeUsersList} = useGetActiveUsersList();

  const {data: topUsersList} = useGetTopUsersList();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'top10', title: 'Top 10'},
    {key: 'activeUser', title: 'Active user'},
  ]);

  const FirstRoute = useCallback(
    () => (
      <View style={styles.activeAndTopTenTab}>
        <FlatList
          data={activeUsersList}
          renderItem={({item}) => <LeaderBoardCard userDetail={item} />}
          keyExtractor={item => String(item.id)}
          horizontal={true}
        />
      </View>
    ),
    [activeUsersList],
  );

  const SecondRoute = useCallback(
    () => (
      <View style={styles.activeAndTopTenTab}>
        <FlatList
          data={topUsersList}
          renderItem={({item}) => <LeaderBoardCard userDetail={item} />}
          keyExtractor={item => String(item.id)}
          horizontal={true}
        />
      </View>
    ),
    [topUsersList],
  );

  const renderScene = SceneMap({
    top10: FirstRoute,
    activeUser: SecondRoute,
  });

  const renderTabBar = (props: any) => (
    <TabBar
      {...props}
      labelStyle={styles.labelStyle}
      scrollEnabled={true}
      inactiveColor={colors.SECONDARY}
      activeColor={colors.PRIMARY}
      indicatorStyle={styles.indicatorStyle}
      style={[
        styles.tabBarContainer,
        props.navigationState.index === 0 || 1
          ? styles.noBorder
          : styles.withBorder,
      ]}
      tabStyle={styles.tabStyle}
      contentContainerStyle={styles.contentContainer}
    />
  );

  const handleAppreciationCardClick = (id: number) => {
    navigation.navigate(APPRECIATION_DETAILS, {
      cardId: id,
      appriciationList: appreciationList,
    });
  };

  const handleSearchPress = () => {
    navigation.navigate(APPRECIATION_SEARCH);
  };

  return (
    <View style={styles.container}>
      <View>
        <View style={styles.header}>
          <Text style={styles.title}>Peerly</Text>
          <Pressable
            onPress={() =>
              navigation.navigate(PROFILE_DETAILS, {
                userId: profileDetails?.employee_id,
              })
            }>
            <View style={styles.userScoreBox}>
              <StarIcon width={18} height={18} />
              <Text>
                {profileDetails?.total_points && (
                  <Text style={styles.scoreText}>
                    {profileDetails.total_points}
                  </Text>
                )}
              </Text>
              <Image
                source={
                  profileDetails?.profile_image_url
                    ? {uri: profileDetails.profile_image_url}
                    : ProfileIcon
                }
                style={styles.userAvatar}
              />
            </View>
          </Pressable>
        </View>
      </View>
      <Pressable onPressIn={handleSearchPress}>
        <Search placeholder="Search Co-Worker" editable={false} />
      </Pressable>
      <View style={{height: layout.height * 0.25}}>
        <TabView
          navigationState={{index, routes}}
          renderScene={renderScene}
          renderTabBar={renderTabBar}
          onIndexChange={setIndex}
          initialLayout={{width: layout.width}}
        />
      </View>

      <View style={styles.appreciationListWrapper}>
        <Text>Total: {appreciationListMeta?.total_records} Appreciations</Text>
        <FlatList
          data={appreciationList || []}
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

      <FloatingGiveAppreciationButton
        onPress={() => navigation.navigate(APPRECIATION)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.BLACK,
  },
  userScoreBox: {
    height: 39,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 7,
    backgroundColor: 'pink',
    borderRadius: 50,
    borderColor: colors.PRIMARY,
    borderWidth: 2,
  },
  scoreText: {
    fontSize: 14,
    marginRight: 5,
    color: colors.WHITE,
  },
  userAvatar: {
    width: 35,
    height: 35,
    borderRadius: 15,
    paddingBottom: 18,
  },
  activeAndTopTenTab: {
    flex: 1,
    backgroundColor: colors.LIGHT_PASTEL_BLUE,
  },
  labelStyle: {
    color: colors.LABEL_COLOR_SECONDARY,
    textAlign: 'left',
    fontSize: 16,
    fontFamily: fonts.ARIAL,
    textTransform: 'none',
  },
  indicatorStyle: {backgroundColor: colors.PRIMARY},
  tabBarContainer: {
    backgroundColor: colors.LIGHT_PASTEL_BLUE,
    elevation: 0,
    shadowOpacity: 0,
  },
  noBorder: {
    borderBottomWidth: 0,
  },
  withBorder: {
    borderBottomWidth: 1,
    borderBottomColor: colors.PRIMARY,
  },
  tabStyle: {
    alignItems: 'flex-start',
    width: 'auto',
    paddingLeft: 20,
    paddingRight: 20,
  },
  contentContainer: {
    paddingLeft: 10,
  },
  appreciationListWrapper: {flex: 1, backgroundColor: colors.WHITE},
});
export default HomeScreen;
