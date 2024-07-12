import React from 'react';
import {
  View,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Text,
  TextInput,
  Image,
  useWindowDimensions,
  FlatList,
} from 'react-native';

import colors from '../../constant/colors';
import AppreciationCard from './components/AppreciationCard';
import {SceneMap, TabBar, TabView} from 'react-native-tab-view';
import fonts from '../../constant/fonts';
import FloatingGiveAppriciationButton from '../../components/button/floatingGiveAppriciationButton';
import LeaderBoardCard from './components/LeaderBoardCard';

const PeerlyScreen = () => {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'top10', title: 'Top 10'},
    {key: 'activeUser', title: 'Active user'},
  ]);

  const FirstRoute = () => (
    <View style={{flex: 1, backgroundColor: '#F4F6FF'}}>
      <FlatList
        data={[]}
        renderItem={({item}) => <LeaderBoardCard />}
        keyExtractor={item => item.id}
        horizontal={true}
      />
    </View>
  );

  const SecondRoute = () => (
    <View style={{flex: 1, backgroundColor: '#F4F6FF', height: 20}}>
      <FlatList
        data={[]}
        renderItem={({item}) => (
          <View>
            <Text>{item.title}</Text>
          </View>
        )}
        keyExtractor={item => item.id}
        horizontal={true}
      />
    </View>
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

  return (
    <>
      <View style={styles.header}>
        <Text style={styles.title}>Peerly</Text>
        <View style={styles.userScore}>
          <Text style={styles.scoreText}>2000</Text>
          <Image
            source={require('../../../assets/images/profile.png')}
            style={styles.userAvatar}
          />
        </View>
      </View>

      <TextInput style={styles.searchInput} placeholder={'Search Co-Worker'} />

      <View style={{height: layout.height * 0.2}}>
        <TabView
          navigationState={{index, routes}}
          renderScene={renderScene}
          renderTabBar={renderTabBar}
          onIndexChange={setIndex}
          initialLayout={{width: layout.width}}
        />
      </View>

      <View style={{flex: 1, backgroundColor: colors.WHITE}}>
        <FlatList
          data={[]}
          renderItem={({item}) => <AppreciationCard />}
          keyExtractor={item => item.id}
          numColumns={2}
        />
      </View>

      <FloatingGiveAppriciationButton onPress={() => console.log('Here tap')} />
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
  searchInput: {
    backgroundColor: colors.LIGHT_GREY_BACKGROUND,
    padding: 10,
    margin: 10,
    borderRadius: 10,
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
});
export default PeerlyScreen;
