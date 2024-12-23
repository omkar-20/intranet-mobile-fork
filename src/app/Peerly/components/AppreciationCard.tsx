import React, {useMemo} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import colors from '../constants/colors';
import {AppreciationDetails} from '../services/home/types';
import {formatNumber, timeFromNow} from '../utils';
import {StarIcon} from '../constants/icons';
import InitialAvatar from './InitialAvatar';
import Typography from './typography';
import ImageWithFallback from './imageWithFallback/ImageWithFallback';

interface AppreciationCardProps {
  onPress?: (id: number) => void;
  appreciationDetails: AppreciationDetails;
}

enum CoreValue {
  TRUST = 'Trust',
  TECHNICALEXCELLENCE = 'Technical Excellence',
  INTEGRITYANDETHICS = 'Integrity & Ethics',
  CUSTFOCUS = 'Customer Focus',
  EMPFOCUS = 'Employee Focus',
  RESPECT = 'Respect',
}

const AppreciationCard = ({
  onPress,
  appreciationDetails,
}: AppreciationCardProps) => {
  const receiverName = `${appreciationDetails.receiver_first_name || ''} ${
    appreciationDetails.receiver_last_name || ''
  }`;
  const senderName = `${appreciationDetails.sender_first_name || ''} ${
    appreciationDetails.sender_last_name || ''
  }`;

  const coreValueColors = useMemo(() => {
    switch (appreciationDetails?.core_value_name) {
      case CoreValue.TRUST:
        return {backgroundColor: colors.LIGHT_PINK};
      case CoreValue.TECHNICALEXCELLENCE:
        return {backgroundColor: colors.LIGHT_LIME};
      case CoreValue.INTEGRITYANDETHICS:
        return {backgroundColor: colors.LIGHT_AQUA};
      case CoreValue.EMPFOCUS:
        return {backgroundColor: colors.LIGHT_SKYBLUE};
      case CoreValue.CUSTFOCUS:
        return {backgroundColor: colors.LIGHT_TEAL};
      case CoreValue.RESPECT:
        return {backgroundColor: colors.LIGHT_PEACH};
      default:
        return {backgroundColor: colors.WARM_CREAM};
    }
  }, [appreciationDetails.core_value_name]);

  return (
    <View style={styles.card}>
      <TouchableOpacity onPress={() => onPress(appreciationDetails.id)}>
        <View style={styles.header}>
          <View style={styles.avatarContainer}>
            {appreciationDetails.receiver_image_url !== '' ? (
              <ImageWithFallback
                imageUrl={appreciationDetails.receiver_image_url}
                initials={
                  <View style={styles.initialAvatarBig}>
                    <InitialAvatar name={receiverName} size={60} />
                  </View>
                }
                imageStyle={styles.avatar}
              />
            ) : (
              <View style={styles.initialAvatarBig}>
                <InitialAvatar name={receiverName} size={60} />
              </View>
            )}
            {appreciationDetails?.sender_image_url !== '' ? (
              <ImageWithFallback
                imageUrl={appreciationDetails.sender_image_url}
                initials={
                  <View style={styles.initialAvatarSmall}>
                    <InitialAvatar name={senderName} size={47} />
                  </View>
                }
                imageStyle={styles.smallAvatar}
              />
            ) : (
              <View style={styles.initialAvatarSmall}>
                <InitialAvatar name={senderName} size={47} />
              </View>
            )}
          </View>
          <View style={styles.totalRewardBox}>
            <StarIcon width={14} height={14} />
            <Typography type="h4" style={styles.starCount}>
              {formatNumber(appreciationDetails.total_reward_points)}
            </Typography>
          </View>
        </View>
        <View style={styles.content}>
          <Typography
            type="h3"
            style={styles.receiverName}
            numberOfLines={1}
            ellipsizeMode="tail">
            {receiverName}
          </Typography>
          <View style={styles.receiverDesignationWrapper}>
            <Typography
              numberOfLines={2}
              ellipsizeMode="tail"
              type="h5"
              style={styles.role}>
              {appreciationDetails.receiver_designation}
            </Typography>
          </View>
          <Typography type="h5" style={styles.appreciation}>
            Appreciated by
          </Typography>
          <Typography
            type="h4"
            style={styles.senderName}
            numberOfLines={1}
            ellipsizeMode="tail">
            {senderName}
          </Typography>
          <Typography type="h6" style={styles.days}>
            {timeFromNow(appreciationDetails.created_at)}
          </Typography>
        </View>
        <View style={[styles.footer, coreValueColors]}>
          <View style={styles.coreValueBox}>
            <Typography type="h6" style={styles.coreValueLabel}>
              Core Value
            </Typography>
            <Typography type="h4" style={styles.coreValue}>
              {appreciationDetails.core_value_name}
            </Typography>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.LIGHT_GREY_BACKGROUND,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    shadowRadius: 5,
    marginTop: 40,
    marginBottom: 20,
    marginLeft: 10,
    marginRight: 10,
    width: '45%',
  },
  header: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 10,
  },
  avatarContainer: {
    flexDirection: 'row',
    position: 'relative',
  },
  avatar: {
    width: 65,
    height: 65,
    borderRadius: 33,
    borderWidth: 1,
    borderColor: colors.PRIMARY,
    marginRight: -10,
    marginTop: -40,
  },
  initialAvatarBig: {
    width: 65,
    height: 65,
    borderRadius: 33,
    marginRight: -10,
    marginTop: -40,
  },
  smallAvatar: {
    width: 50,
    height: 50,
    borderRadius: 33,
    marginTop: -25,
    borderColor: colors.PRIMARY,
    borderWidth: 1,
    overflow: 'hidden',
    position: 'absolute',
    left: 45,
  },
  initialAvatarSmall: {
    width: 50,
    height: 50,
    borderRadius: 33,
    marginTop: -25,
    overflow: 'hidden',
    position: 'absolute',
    left: 45,
  },
  icon: {
    marginLeft: 'auto',
  },
  starCount: {
    marginLeft: 5,
    fontWeight: '300',
    lineHeight: 17,
  },
  content: {
    marginTop: 10,
    padding: 5,
    paddingLeft: 10,
  },
  totalRewardBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    width: 60,
    height: 20,
    bottom: 20,
    left: 10,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    backgroundColor: colors.LIGHT_GREY_BACKGROUND,
    zIndex: -1,
  },
  receiverName: {
    lineHeight: 21,
    fontWeight: 'bold',
  },
  senderName: {
    lineHeight: 15,
    fontWeight: 'bold',
  },
  role: {
    fontWeight: '300',
    lineHeight: 15,
    marginBottom: 10,
  },
  appreciation: {
    fontWeight: '300',
    lineHeight: 15,
    color: colors.GRAY_MEDIUM,
  },
  days: {
    fontWeight: '300',
    lineHeight: 12,
    color: colors.GRAY_MEDIUM,
  },
  footer: {
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    paddingTop: 5,
    backgroundColor: colors.WARM_CREAM,
  },
  coreValueBox: {
    paddingBottom: 6,
    flex: 1,
    alignItems: 'center',
  },
  coreValue: {
    fontWeight: 'bold',
    lineHeight: 15,
  },
  coreValueLabel: {
    fontWeight: '300',
    lineHeight: 9,
  },
  receiverDesignationWrapper: {
    height: 40,
  },
});

export default AppreciationCard;
