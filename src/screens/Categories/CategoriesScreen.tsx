import React, {useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  GetCategoriesPayload,
  getCategory,
} from 'redux-manager/categories/thunk';
import {RootState} from 'redux-manager/root-reducer';

const CategoriesScreen = () => {
  const dispatch = useDispatch();
  const {category} = useSelector((state: RootState) => state.categories);

  const fetchCategories = async () => {
    const getCategoriesPayload: GetCategoriesPayload = {
      pageSize: 10,
      pageNumber: 0,
    };
    const res = await dispatch(getCategory(getCategoriesPayload));
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <View>
      <Text>CategoriesScreen</Text>
      {category?.categories?.map(item => (
        <Text key={item._id}>{item.name}</Text>
      ))}
      {/* <Button
        title="Log out"
        onPress={async () => {
          console.log(1111);
          await storage.remove(SAVED_USER_PROFILE);
        }}
      /> */}
    </View>
  );
};

export default CategoriesScreen;

const styles = StyleSheet.create({});
