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

import colors from '../../../constant/colors';
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
import {ProfileIcon} from '../constants/icons';
import {useNavigation} from '@react-navigation/native';
import {HomeScreenNavigationProp} from '../navigation/types';

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
      <View style={{flex: 1, backgroundColor: '#F4F6FF'}}>
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
      <View style={{flex: 1, backgroundColor: '#F4F6FF', height: 20}}>
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
      style={styles.tabBarContainer}
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
    <>
      <Pressable
        onPress={() =>
          navigation.navigate(PROFILE_DETAILS, {
            userId: profileDetails?.employee_id,
          })
        }>
        <View style={styles.header}>
          <Text style={styles.title}>Peerly</Text>
          <View style={styles.userScore}>
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
        </View>
      </Pressable>
      <View>
        <TextInput
          onPressIn={handleSearchPress}
          style={styles.searchInput}
          value={''}
          placeholder={'Search Co-Worker'}
        />
      </View>
      <View style={{height: layout.height * 0.2}}>
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
    </>
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
    fontSize: 24,
    fontWeight: 'bold',
  },
  userScore: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  scoreText: {
    marginRight: 5,
  },
  userAvatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  activeTab: {
    fontWeight: 'bold',
    borderBottomWidth: 2,
    borderBottomColor: 'blue',
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
    backgroundColor: '#F4F6FF',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.PRIMARY,
  },
  searchInput: {
    backgroundColor: colors.LIGHT_GREY_BACKGROUND,
    padding: 10,
    margin: 10,
    borderRadius: 10,
  },
  appreciationListWrapper: {flex: 1, backgroundColor: colors.WHITE},
});
export default HomeScreen;
