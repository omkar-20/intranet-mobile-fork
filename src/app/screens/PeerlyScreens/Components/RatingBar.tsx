import React from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import Slider from '@react-native-community/slider';
import {FlagIcon} from '../../../constant/icons';

interface RatingBarProps {
  onPressObjection: () => void;
  rewardedByPeople: number;
  reward: number;
  setReward: (rating: number) => void;
  disableSlider: boolean;
  isRewardAlreadyGiven: boolean;
  self?: boolean;
}

const RatingBar: React.FC<RatingBarProps> = ({
  onPressObjection,
  rewardedByPeople,
  reward,
  setReward,
  disableSlider,
  isRewardAlreadyGiven,
  self,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.ratingCountContainer}>
        <Text style={styles.label}>Rewards</Text>
        <Text style={styles.info}>
          Rewards given by {rewardedByPeople} people
        </Text>
      </View>
      {self ? null : (
        <>
          <Pressable onPress={onPressObjection}>
            <View style={styles.flagContainer}>
              <View style={styles.flagIcon}>
                <FlagIcon />
              </View>
            </View>
          </Pressable>

          <View style={styles.sliderContainer}>
            <Slider
              disabled={disableSlider || isRewardAlreadyGiven}
              style={styles.slider}
              minimumValue={0}
              maximumValue={5}
              step={1}
              value={reward}
              onValueChange={value => setReward(value)}
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
        </>
      )}
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
    margin: 2,
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
  flagContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  flagIcon: {
    backgroundColor: '#EE3E54',
    height: 25,
    width: 25,
    borderRadius: 5,
    padding: 5,
  },
  ratingCountContainer: {flexDirection: 'row'},
});

export default RatingBar;
