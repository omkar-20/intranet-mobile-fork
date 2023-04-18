import React from 'react';
import {StyleSheet, View} from 'react-native';

import CardDetailsElement from './cardDetailsElement';
import ErrorMessage from '../../errorMessage';

import {detailItemType, detailsType} from '../../../types';
import {NO_DETAILS_FOUND} from '../../../constant/message';

type Props = {
  data: detailsType;
};

const DetailsView = ({data}: Props) => {
  return (
    <View style={styles.detailsContainer}>
      {!data || (Array.isArray(data) && data.length === 0) ? (
        <ErrorMessage message={NO_DETAILS_FOUND} />
      ) : Array.isArray(data) && data.length && typeof data === 'object' ? (
        data.map((detail, index) => (
          <CardDetailsElement
            key={index}
            data={detail}
            style={index === data.length - 1 ? styles.elementStyle : {}}
          />
        ))
      ) : (
        <CardDetailsElement
          data={data as detailItemType}
          style={styles.elementStyle}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  detailsContainer: {
    flexDirection: 'column',
    flex: 1,
  },
  elementStyle: {
    borderBottomWidth: 0,
    marginBottom: 0,
  },
});

export default DetailsView;
