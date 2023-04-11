import React from 'react';
import {StyleSheet, View} from 'react-native';

import CardDetailsElement from './cardDetailsElement';

import {detailItemType, detailsType} from '../../../types';

type Props = {
  data: detailsType;
};

const DetailsView = ({data}: Props) => {
  return (
    <View style={styles.detailsContainer}>
      {Array.isArray(data) && data.length && typeof data === 'object' ? (
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
    justifyContent: 'space-around',
    flex: 1,
  },
  elementStyle: {
    borderBottomWidth: 0,
    marginBottom: 0,
  },
});

export default DetailsView;
