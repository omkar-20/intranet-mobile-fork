import React, {useState} from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import {PanGestureHandler} from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  withTiming,
  runOnJS,
  withSpring,
} from 'react-native-reanimated';
import {useRoute} from '@react-navigation/native';
import AppreciationDetailsComponent from './AppreciationDetailsComponent';
import colors from '../../constants/colors';

const {width: SCREEN_WIDTH} = Dimensions.get('window');
const CARD_MARGIN = 0;
const CARD_WIDTH = SCREEN_WIDTH - CARD_MARGIN * 2;

const AppreciationDetailsScreen = () => {
  const route = useRoute();
  const {appriciationList, cardId}: any = route.params;

  const [currentIndex, setCurrentIndex] = useState(
    appriciationList.findIndex((item: any) => item.id === cardId),
  );

  const translationX = useSharedValue(0);

  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_event, ctx: any) => {
      ctx.startX = translationX.value;
    },
    onActive: (event, ctx) => {
      translationX.value = ctx.startX + event.translationX;
    },
    onEnd: (_event, _ctx) => {
      if (translationX.value > 50) {
        if (currentIndex > 0) {
          translationX.value = withTiming(SCREEN_WIDTH, {duration: 300}, () => {
            runOnJS(setCurrentIndex)(currentIndex - 1);
            translationX.value = -SCREEN_WIDTH;
            translationX.value = withSpring(0);
          });
        } else {
          translationX.value = withSpring(0);
        }
      } else if (translationX.value < -50) {
        if (currentIndex < appriciationList.length - 1) {
          translationX.value = withTiming(
            -SCREEN_WIDTH,
            {duration: 300},
            () => {
              runOnJS(setCurrentIndex)(currentIndex + 1);
              translationX.value = SCREEN_WIDTH;
              translationX.value = withSpring(0);
            },
          );
        } else {
          translationX.value = withSpring(0);
        }
      } else {
        translationX.value = withSpring(0);
      }
    },
  });

  const currentCardStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateX: translationX.value}],
      marginHorizontal: CARD_MARGIN,
    };
  });

  const previousCardStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: translationX.value - SCREEN_WIDTH,
        },
      ],
      marginHorizontal: CARD_MARGIN,
    };
  });

  const nextCardStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: translationX.value + SCREEN_WIDTH,
        },
      ],
      marginHorizontal: CARD_MARGIN,
    };
  });

  return (
    <View style={styles.container}>
      {currentIndex > 0 && (
        <Animated.View style={[styles.card, previousCardStyle]}>
          <AppreciationDetailsComponent
            currentIndex={currentIndex - 1}
            appriciationList={appriciationList}
          />
        </Animated.View>
      )}
      <PanGestureHandler onGestureEvent={gestureHandler}>
        <Animated.View style={[styles.card, currentCardStyle]}>
          <AppreciationDetailsComponent
            currentIndex={currentIndex}
            appriciationList={appriciationList}
          />
        </Animated.View>
      </PanGestureHandler>
      {currentIndex < appriciationList.length - 1 && (
        <Animated.View style={[styles.card, nextCardStyle]}>
          <AppreciationDetailsComponent
            currentIndex={currentIndex + 1}
            appriciationList={appriciationList}
          />
        </Animated.View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },
  card: {
    position: 'absolute',
    height: '100%',
    width: CARD_WIDTH,
    borderRadius: 10,
    overflow: 'hidden',
  },
});

export default AppreciationDetailsScreen;
