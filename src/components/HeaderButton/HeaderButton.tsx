import {
  Image,
  ImageSourcePropType,
  Platform,
  StatusBar,
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import React from 'react';
import {isIos, scale} from 'utils/helpers/device';
import {colors, fonts, images} from 'assets';

interface Props {
  onPressLeft?: () => void;
  onPressRight?: () => void;
  containerStyle?: StyleProp<ViewStyle>;
  leftIcon?: ImageSourcePropType;
  rightTitle?: string;
}

const HeaderButton = ({
  onPressLeft,
  onPressRight,
  containerStyle,
  leftIcon,
  rightTitle = '',
}: Props) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <TouchableOpacity
        style={styles.backBtn}
        onPress={onPressLeft}
        disabled={!leftIcon}>
        {!!leftIcon && <Image source={leftIcon} style={styles.imageBack} />}
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.backBtn}
        onPress={onPressRight}
        disabled={!rightTitle}>
        <Text style={styles.rightTxt}>{rightTitle}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HeaderButton;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: scale(14),
    position: 'absolute',
    top: isIos()
      ? scale(46)
      : StatusBar.currentHeight
      ? scale(46) - StatusBar.currentHeight
      : scale(46),
    flexDirection: 'row',
    justifyContent: 'space-between',
    zIndex: 999,
    elevation: 999,
  },
  backBtn: {
    flex: 1,
    padding: scale(10),
  },
  imageBack: {
    width: scale(8),
    height: scale(14),
  },
  rightTxt: {
    fontFamily: fonts.Lato.regular,
    fontWeight: '400',
    fontSize: scale(14),
    lineHeight: scale(22.68),
    color: colors.white,
    textAlign: 'right',
  },
});
