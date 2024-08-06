import React, {useMemo, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {useGetSearchAppreciationList} from './search.hooks';
import {useDebounce} from '../../utils';
import GivenAndReceivedAppriciation from '../../components/GivenAndReceivedAppreciation';
import Search from '../../components/Search';
import colors from '../../constants/colors';
import {AppreciationDetails} from '../../services/home/types';

const SearchScreen = () => {
  const [searchName, setSearchName] = useState('');
  const debounceValue = useDebounce(searchName, 500);

  const {
    data: appreciationList,
    isLoading,
    isFetching,
  } = useGetSearchAppreciationList({
    name: debounceValue,
  });

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

  const receivedAppriciationList = appreciationList.filter(
    (item: AppreciationDetails) => {
      const fname = (item?.receiver_first_name || '').toLowerCase();
      const lname = (item?.receiver_last_name || '').toLowerCase();
      const receiverName = `${fname} ${lname}`;
      return receiverName.includes(getSearchName);
    },
  );

  const expressedAppriciationList = appreciationList.filter(
    (item: AppreciationDetails) => {
      const fname = (item?.sender_first_name || '').toLowerCase();
      const lname = (item?.sender_last_name || '').toLowerCase();
      const senderName = `${fname} ${lname}`;
      return senderName.includes(getSearchName);
    },
  );

  return (
    <View style={styles.container}>
      <View>
        <Search
          autoFocus={true}
          onChange={handleSearch}
          value={searchName}
          placeholder={'Search Co-Worker'}
        />
      </View>
      <View style={styles.appreciationWrapper}>
        <GivenAndReceivedAppriciation
          appreciationList={appreciationList}
          receivedList={receivedAppriciationList}
          expressedList={expressedAppriciationList}
          isLoading={isLoading || isFetching}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    backgroundColor: colors.WHITE,
  },
  appreciationWrapper: {
    paddingHorizontal: 10,
    marginBottom: 50,
  },
});

export default SearchScreen;
