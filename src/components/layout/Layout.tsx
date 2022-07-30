import React, { memo } from 'react';
import { StatusBar, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { colors } from 'assets';

type Props = {
  children: React.ReactNode;
  bgColor?: string;
  scrollEnabled?: boolean;
  viewStyle?: StyleProp<ViewStyle>;
};

const Layout = ({ children, bgColor, scrollEnabled = false, viewStyle }: Props) => {
  return (
    <View
      style={[
        {backgroundColor: bgColor || colors.statusBar},
        styles.layout,
        viewStyle,
      ]}>
      <StatusBar
        animated
        backgroundColor={bgColor || colors.statusBar}
        barStyle="default"
      />
      {!!scrollEnabled ? (
        <KeyboardAwareScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          style={{flex: 1, height: '100%'}}>
          {children}
        </KeyboardAwareScrollView>
      ) : (
        <>{children}</>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  layout: {
    flex: 1,
  },
});

export default memo(Layout);

{
  /* <FlatList
  keyboardShouldPersistTaps="handled"
  showsVerticalScrollIndicator={false}
  style={{ flex: 1 }}
  data={[]}
  keyExtractor={item => item}
  renderItem={() => null}
  ListHeaderComponent={() => <>{children}</>}
/>; */
}
