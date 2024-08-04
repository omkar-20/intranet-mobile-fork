import React, {memo} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import colors from '../constants/colors';

const colorsArray = [
  '#FF5733', // Red
  '#33FF57', // Green
  '#FF33A8', // Pink
  '#33FFF6', // Cyan
  '#FF8C33', // Orange
  '#A833FF', // Purple
  '#FFC733', // Yellow
];

// Function to get random color from array
let previousColorIndex = -1;
const getRandomColor = () => {
  let randomIndex;
  // Ensure a different color is selected than the previous one
  do {
    randomIndex = Math.floor(Math.random() * colorsArray.length);
  } while (randomIndex === previousColorIndex);

  previousColorIndex = randomIndex;
  return colorsArray[randomIndex];
};

// Function to get initials from name
const getInitials = (name: string) => {
  const initials = name
    .split(' ')
    .map(word => word[0])
    .join('');
  return initials.toUpperCase();
};

interface InitialsAvatarProps {
  name: string;
  size: number;
  borderColor?: string;
}
const InitialsAvatar = ({
  name,
  size = 50,
  borderColor,
}: InitialsAvatarProps) => {
  const initials = getInitials(name);
  const backgroundColor = getRandomColor();
  const customStyle = {
    backgroundColor,
    width: size,
    height: size,
    borderRadius: size / 2,
    borderColor: borderColor || backgroundColor,
    borderWidth: 2,
  };
  return (
    <View style={[styles.avatar, customStyle]}>
      <Text style={[styles.initials, {fontSize: size / 2.5}]}>{initials}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  avatar: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  initials: {
    color: colors.WHITE,
    fontWeight: 'bold',
  },
});

export default memo(InitialsAvatar);
