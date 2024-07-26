import React, {useState} from 'react';
import {StyleSheet, View, TextInput, FlatList} from 'react-native';
import colors from '../../../constant/colors';
import {useGetSearchAppreciationList} from './search.hooks';
import {SearchScreenProp} from './types';
import useDebounce from './useDebounce';
import AppreciationCard from '../Components/AppreciationCard';
import {APPRECIATION_DETAILS} from '../../../constant/screenNames';

const SearchScreen: React.FC<SearchScreenProp> = ({
  navigation,
  searchActive,
}) => {
  const [searchName, setSearchName] = useState('');
  const debounceValue = useDebounce(searchName, 1000);

  const {data: appreciationList} = useGetSearchAppreciationList({
    name: debounceValue,
  });

  const handleAppreciationCardClick = (id: number) => {
    navigation.navigate(APPRECIATION_DETAILS, {
      cardId: id,
      appriciationList: appreciationList,
    });
  };

  const handleSearch = (value: string) => {
    if (value.length) {
      setSearchName(value);
      searchActive(true);
    } else {
      searchActive(false);
      setSearchName('');
    }
  };
  return (
    <View>
      <TextInput
        style={styles.searchInput}
        placeholder={'Search Co-Worker'}
        onChangeText={handleSearch}
        value={searchName}
      />
      <View style={styles.flatListWrapper}>
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
    </View>
  );
};

const styles = StyleSheet.create({
  flatListWrapper: {},
  searchInput: {
    backgroundColor: colors.LIGHT_GREY_BACKGROUND,
    padding: 10,
    margin: 10,
    borderRadius: 10,
  },
});

export default SearchScreen;
