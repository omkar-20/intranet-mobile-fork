import React, {useCallback, useState} from 'react';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  View,
  useWindowDimensions,
} from 'react-native';

import AppreciationCard from '../Components/AppreciationCard';
import {SceneMap, TabBar, TabView} from 'react-native-tab-view';
import colors from '../../../constant/colors';
import fonts from '../../../constant/fonts';
import {APPRECIATION_DETAILS} from '../../../constant/screenNames';
import {AppreciationDetails} from '../../../services/PeerlyServices/home/types';

const GivenAndReceivedAppriciation = ({
  appreciationList,
  self,
  receivedList,
  expressedList,
  navigation,
}: any) => {
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);

  const getAppriciationDetails = useCallback(
    (currentId: number) => {
      return appreciationList.filter(
        (item: AppreciationDetails) => item.id === currentId,
      );
    },
    [appreciationList],
  );

  const handleAppreciationCardClick = useCallback(
    (id: number) => {
      navigation.navigate(APPRECIATION_DETAILS, {
        cardId: id,
        appriciationList: self ? getAppriciationDetails(id) : appreciationList,
        self,
      });
    },
    [appreciationList, getAppriciationDetails, navigation, self],
  );

  const [routes] = React.useState([
    {key: 'received', title: 'Received'},
    {key: 'expressed', title: 'Expressed'},
  ]);

  const FirstRoute = useCallback(
    () => (
      <View style={styles.flatListWrapper}>
        <FlatList
          data={receivedList || []}
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
    ),
    [receivedList, handleAppreciationCardClick],
  );

  const SecondRoute = useCallback(
    () => (
      <View style={styles.flatListWrapper}>
        <FlatList
          data={expressedList || []}
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
    ),
    [expressedList, handleAppreciationCardClick],
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

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.appreciationList}>
        <TabView
          navigationState={{index, routes}}
          renderScene={renderScene}
          renderTabBar={renderTabBar}
          onIndexChange={setIndex}
          initialLayout={{width: layout.width}}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    paddingTop: 20,
  },
  appreciationList: {
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
  flatListWrapper: {
    backgroundColor: 'white',
  },
});

export default GivenAndReceivedAppriciation;
