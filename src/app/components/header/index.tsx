import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {Arrow, JoshLogo, Profile} from '../../constant/icons';
import colors from '../../constant/colors';
import {MainScreenNavigationProp} from '../../navigation/types';
import {USER_PROFILE_SCREEN} from '../../constant/screenNames';

interface Props {
  type: 'primary' | 'secondary' | 'ternary';
  title?: string;
}

const Header = ({type, title}: Props) => {
  const navigation = useNavigation<MainScreenNavigationProp>();

  const navigateToProfile = () => {
    navigation.navigate(USER_PROFILE_SCREEN);
  };

  const goBack = () => {
    navigation.goBack();
  };

  if (type === 'primary') {
    return (
      <View style={styles.container}>
        <JoshLogo height={18} width={85} fill={colors.WHITE} />
        <TouchableOpacity activeOpacity={0.5} onPress={navigateToProfile}>
          <Profile height={18} width={18} fill={colors.WHITE} />
        </TouchableOpacity>
      </View>
    );
  } else if (type === 'secondary') {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          activeOpacity={0.5}
          style={styles.backButton}
          onPress={goBack}>
          <Arrow
            height={20}
            width={20}
            style={styles.arrow}
            fill={colors.WHITE}
          />
          <Text style={styles.backText}>{title}</Text>
        </TouchableOpacity>

        <Profile height={18} width={18} fill={colors.WHITE} />
      </View>
    );
  } else if (type === 'ternary') {
    return (
      <View style={styles.container}>
        <View style={styles.backButton}>
          <TouchableOpacity activeOpacity={0.5} onPress={goBack}>
            <Arrow
              height={20}
              width={20}
              style={styles.arrow}
              fill={colors.WHITE}
            />
          </TouchableOpacity>

          <Text style={styles.backText}>{title}</Text>
        </View>

        <TouchableOpacity activeOpacity={0.5} onPress={navigateToProfile}>
          <Profile height={18} width={18} fill={colors.WHITE} />
        </TouchableOpacity>
      </View>
    );
  }

  return <></>;
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 20,
    paddingBottom: 13,
    paddingLeft: 16,
    paddingRight: 23,
    backgroundColor: colors.PRIMARY,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backText: {
    color: colors.WHITE,
    fontSize: 15,
    marginStart: 20,
    paddingBottom: 5,
  },
  arrow: {
    transform: [{rotate: '180 deg'}],
  },
});

export default Header;
