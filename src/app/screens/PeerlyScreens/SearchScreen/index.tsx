import React, {useEffect, useMemo, useRef, useState} from 'react';
import {StyleSheet, View, TextInput} from 'react-native';
import {useGetSearchAppreciationList} from './search.hooks';
import {useDebounce} from '../utils';
import GivenAndReceivedAppriciation from '../components/GivenAndReceivedAppreciation';

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
    const receiverName = `${fname} ${lname}`;
    return receiverName.includes(getSearchName);
  });

  return (
    <View style={styles.container}>
      <TextInput
        autoFocus={true}
        ref={searchInputRef}
        style={styles.searchInput}
        placeholder={'Search Co-Worker'}
        onChangeText={handleSearch}
        value={searchName}
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
  },
  flatListWrapper: {
    flex: 1,
  },
  searchInput: {
    backgroundColor: 'white',
    padding: 10,
    margin: 10,
    borderRadius: 10,
  },
});

export default SearchScreen;
