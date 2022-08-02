import {isFulfilled} from '@reduxjs/toolkit';
import {colors, fonts, images} from 'assets';
import HeaderButton from 'components/HeaderButton/HeaderButton';
import {includes, remove} from 'lodash';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  FlatList,
  Image,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import {Category} from 'redux-manager/categories/slice';
import {
  getCategories,
  GetCategoriesPayload,
} from 'redux-manager/categories/thunk';
import {RootState} from 'redux-manager/root-reducer';
import {AppDispatch} from 'redux-manager/root-store';
import {SAVED_SELECTED_ITEM_IDS} from 'utils/helpers/constants';
import {scale} from 'utils/helpers/device';
import storage from 'utils/helpers/storage';
import CategoryListItem from './components/CategoryListItem';

const CategoriesScreen = () => {
  const dispatch: AppDispatch = useDispatch();
  const insets = useSafeAreaInsets();
  const {categories, isRequesting} = useSelector(
    (state: RootState) => state.category,
  );
  const [selectedItemIds, setSelectedItemIds] = useState<string[]>([]);
  const initGetCategoriesPayload: GetCategoriesPayload = {
    pageSize: 30,
    pageNumber: 0,
  };
  const getCategoriesPayload = useRef<GetCategoriesPayload>({
    ...initGetCategoriesPayload,
  });
  const canLoadMore = useRef(true);

  const fetchCategories = async (isLoadMore: boolean) => {
    const res = await dispatch(
      getCategories({
        ...getCategoriesPayload.current,
        isLoadMore,
      }),
    );
    const categoryTemp = res.payload as Category;
    if (
      isFulfilled(res) &&
      isLoadMore &&
      categoryTemp?.categories?.length === 0
    ) {
      canLoadMore.current = false;
    }
  };

  useEffect(() => {
    fetchCategories(false);

    return () => {
      getCategoriesPayload.current = {...initGetCategoriesPayload};
      canLoadMore.current = false;
    };
  }, []);

  const onRefresh = async () => {
    if (!isRequesting) {
      canLoadMore.current = true;
      getCategoriesPayload.current.pageNumber = 0;
      await fetchCategories(false);
    }
  };

  const loadMore = async () => {
    if (canLoadMore.current) {
      getCategoriesPayload.current.pageNumber += 1;
      await fetchCategories(true);
    }
  };

  const onPressItem = useCallback((id: string) => {
    setSelectedItemIds(selectedItemIds => {
      const selectedItemIdsTemp = [...selectedItemIds];
      if (includes(selectedItemIdsTemp, id)) {
        remove(
          selectedItemIdsTemp,
          tempId => tempId === id,
        );
      } else {
        selectedItemIdsTemp.push(id);
      }
      return selectedItemIdsTemp;
    })
  }, []);

  const onPressDoneBtn = async () => {
    await storage.save(SAVED_SELECTED_ITEM_IDS, selectedItemIds);
  };

  const renderHeaderTxt = () => (
    <View>
      <Text style={styles.headerTxt}>Wellcome to Nexle Entrance Test</Text>
      <Text style={styles.subHeaderTxt}>
        Please select categories what you would like to see on your feed. You
        can set this later on Filter.
      </Text>
    </View>
  );

  return (
    <View style={{flex: 1}}>
      <HeaderButton
        rightTitle={selectedItemIds?.length > 0 ? 'Done' : ''}
        onPressRight={onPressDoneBtn}
        leftIcon={images.arrow_back}
      />
      <Image source={images.category_bg} style={styles.imageBg} />
      <LinearGradient
        colors={[
          colors.category_gradient.first,
          colors.category_gradient.second,
        ]}
        locations={[0.0343, 0.345]}
        angle={180.17}
        style={styles.linearGradient}></LinearGradient>
      {renderHeaderTxt()}
      <FlatList
        showsVerticalScrollIndicator={false}
        data={categories}
        numColumns={3}
        keyExtractor={item => item._id}
        renderItem={({item}) => (
          <CategoryListItem
            key={item._id}
            itemId={item._id}
            onPressItem={onPressItem}
          />
        )}
        contentContainerStyle={{
          paddingBottom: scale(15) + insets.bottom / 2,
        }}
        columnWrapperStyle={styles.columnWrapper}
        refreshControl={
          <RefreshControl
            refreshing={!!isRequesting}
            onRefresh={onRefresh}
            colors={[colors.error.good]}
          />
        }
        onEndReached={loadMore}
      />
    </View>
  );
};

export default CategoriesScreen;

const styles = StyleSheet.create({
  linearGradient: {
    width: '100%',
    paddingBottom: scale(24),
    ...StyleSheet.absoluteFillObject,
  },
  imageBg: {
    width: '100%',
    height: scale(650),
    resizeMode: 'contain',
    ...StyleSheet.absoluteFillObject,
  },
  headerTxt: {
    marginTop: scale(192),
    fontFamily: fonts.Lato.semiBold,
    fontWeight: '400',
    fontSize: scale(22),
    lineHeight: scale(26.4),
    color: colors.white,
    paddingHorizontal: scale(16),
  },
  subHeaderTxt: {
    marginTop: scale(11),
    fontFamily: fonts.Lato.regular,
    fontWeight: '400',
    fontSize: scale(14),
    lineHeight: scale(22.68),
    color: colors.white_82_percent,
    marginLeft: scale(16),
    marginRight: scale(64),
    paddingBottom: scale(15),
  },
  columnWrapper: {
    marginTop: scale(8),
    paddingHorizontal: scale(12),
    justifyContent: 'flex-start',
  },
});
