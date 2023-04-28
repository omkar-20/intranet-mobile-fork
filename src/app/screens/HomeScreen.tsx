import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import Typography from '../components/typography';
import fonts from '../constant/fonts';

const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Typography style={styles.text}>Coming soon...</Typography>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  text: {
    fontFamily: fonts.ARIAL_BOLD,
  },
});

export default HomeScreen;
