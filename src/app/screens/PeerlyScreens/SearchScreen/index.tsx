import React, {useEffect, useMemo, useRef, useState} from 'react';
import {StyleSheet, View, TextInput} from 'react-native';
import {useGetSearchAppreciationList} from './search.hooks';
import {useDebounce} from '../utils';
import GivenAndReceivedAppriciation from '../components/GivenAndReceivedAppreciation';
import Search from '../components/Search';
import colors from '../constants/colors';

const SearchScreen = () => {
  const searchInputRef = useRef<TextInput>(null);
  const [searchName, setSearchName] = useState('');
  const debounceValue = useDebounce(searchName, 500);

  const {data: appreciationList} = useGetSearchAppreciationList({
    name: debounceValue,
  });

  useEffect(() => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [searchInputRef]);

  const handleSearch = (value: string) => {
    if (value.length) {
      setSearchName(value);
    } else {
      setSearchName('');
    }
  };

  const getSearchName = useMemo(() => {
    if (debounceValue) {
      return debounceValue.trim().toLowerCase();
    }
    return '';
  }, [debounceValue]);

  const receivedAppriciationList = appreciationList.filter(item => {
    const fname = (item?.receiver_first_name || '').toLowerCase();
    const lname = (item?.receiver_last_name || '').toLowerCase();
    const receiverName = `${fname} ${lname}`;
    return receiverName.includes(getSearchName);
  });

  const expressedAppriciationList = appreciationList.filter(item => {
    const fname = (item?.sender_first_name || '').toLowerCase();
    const lname = (item?.sender_last_name || '').toLowerCase();
    const senderName = `${fname} ${lname}`;
    return senderName.includes(getSearchName);
  });

  return (
    <View style={styles.container}>
      <Search
        autoFocus={true}
        onChange={handleSearch}
        value={searchName}
        placeholder={'Search Co-Worker'}
      />
      <View style={styles.flatListWrapper}>
        <GivenAndReceivedAppriciation
          appreciationList={appreciationList}
          receivedList={receivedAppriciationList}
          expressedList={expressedAppriciationList}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },
  flatListWrapper: {
    flex: 1,
  },
  searchInput: {
    backgroundColor: colors.WHITE,
    padding: 10,
    margin: 10,
    borderRadius: 10,
  },
});

export default SearchScreen;
