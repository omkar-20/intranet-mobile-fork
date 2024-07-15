import React, {useState} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import Slider from '@react-native-community/slider';
import {FlagIcon} from '../../../constant/icons';

const RatingBar = () => {
  const [rating, setRating] = useState(0);

  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row'}}>
        <Text style={styles.label}>Ratings</Text>
        <Text style={styles.info}>4 people rated</Text>
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <View
          style={{
            backgroundColor: '#EE3E54',
            height: 25,
            width: 25,
            borderRadius: 5,
            padding: 5,
          }}>
          <FlagIcon />
        </View>
      </View>

      <View style={styles.sliderContainer}>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={3}
          step={1}
          value={rating}
          onValueChange={value => setRating(value)}
          thumbImage={require('../../../../assets/images/starIcon.png')}
          minimumTrackTintColor="#FFD700"
          maximumTrackTintColor="#DDD"
        />
        <View style={styles.labelsContainer}>
          <Text style={styles.sliderLabel}>Good</Text>
          <Text style={styles.sliderLabel}>Nice</Text>
          <Text style={styles.sliderLabel}>Love</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  label: {
    margin: 2,
    fontSize: 16,
    fontWeight: 'bold',
  },
  info: {
    margin:2,
    color: '#888',
    marginBottom: 10,
  },
  sliderContainer: {
    alignItems: 'center',
  },
  slider: {
    width: '100%',
    height: 40,
  },
  labelsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 10,
  },
  sliderLabel: {
    fontSize: 14,
  },
});

export default RatingBar;
