import {colors, fonts} from 'assets';
import {find} from 'lodash';
import React, {memo, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useSelector} from 'react-redux';
import {RootState} from 'redux-manager/root-reducer';
import {scale} from 'utils/helpers/device';

interface Props {
  itemId: string;
  onPressItem: (id: string) => void;
}

const CategoryListItem = ({itemId, onPressItem}: Props) => {
  const categoryItem = useSelector((state: RootState) =>
    find(state.category.categories, item => item._id === itemId),
  );
  const [isSelected, setIsSelected] = useState(false);

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        setIsSelected(!isSelected);
        onPressItem(itemId);
      }}>
      {isSelected ? (
        <LinearGradient
          colors={[
            colors.category_item_gradient.first,
            colors.category_item_gradient.second,
          ]}
          angle={29.48}
          style={styles.linearGradient}>
          <Text style={styles.nameTxt}>{categoryItem?.name}</Text>
        </LinearGradient>
      ) : (
        <Text style={styles.nameTxt}>{categoryItem?.name}</Text>
      )}
    </TouchableOpacity>
  );
};

export default memo(CategoryListItem);

const styles = StyleSheet.create({
  container: {
    width: scale(109),
    height: scale(71),
    borderWidth: scale(1),
    borderColor: colors.white_50_percent,
    borderRadius: scale(8),
    justifyContent: 'center',
  },
  nameTxt: {
    fontFamily: fonts.Lato.regular,
    fontWeight: '400',
    fontSize: scale(14),
    lineHeight: scale(22.68),
    textAlign: 'center',
    color: colors.white_82_percent,
    marginHorizontal: scale(12),
  },
  linearGradient: {
    width: scale(109),
    height: scale(71),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: scale(8),
  },
});
