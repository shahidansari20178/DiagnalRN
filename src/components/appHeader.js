import React, { memo, useState } from 'react';
import {
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  StyleSheet
} from 'react-native';
import ImageAssets from '../appHelper/imageAssets';
import { widthPercentageToDP as wp } from '../appHelper/responsiveHelper';
import PropTypes from 'prop-types';
import colorHelper from '../appHelper/colorHelper'

const AppHeader = ({ title = '', searchText = '', onCancel = null, setSearchText = null, navigation = null }) => {
  const [showSearchTextBox, setShowSearchTextBox] = useState(false);

  const onClickCancel = () => {
    setShowSearchTextBox(false);
   searchText !== "" &&  setSearchText?.("");
  };

  return (
    <View style={styles.headerContainer}>
      <ImageBackground
        source={ImageAssets.navBar}
        style={styles.navBarContainer}>
        <TouchableOpacity
          onPress={() => navigation?.goBack?.()}
          style={{ flex: 1, flexDirection: 'row' }}
          hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}>
          <Image source={ImageAssets.backArrow} style={styles.backArrowImage} />
          {!showSearchTextBox && (
            <Text style={styles.headerTitleText}>{title}</Text>
          )}
        </TouchableOpacity>
        <View style={{ flex: 1, alignItems: 'flex-end' }}>
          {showSearchTextBox ? (
            <View style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: wp(2) }}>
              <TextInput
                value={searchText}
                testID="searchText"
                keyboardType={'web-search'}
                onChangeText={text => setSearchText(text)}
                style={styles.searchTextBox}
                placeholder={'Search...'}
              />
              <TouchableOpacity onPress={onClickCancel} style={{ backgroundColor: '#DCDCDC', paddingHorizontal: wp(2), paddingVertical: wp(1.5), borderRadius: wp(5) }}>
                <Text style={{ color: '#000', fontSize: 10 }}>X</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity onPress={() => setShowSearchTextBox(true)}>
              <Image
                source={ImageAssets.searchIcon}
                style={styles.searchIcon}
              />
            </TouchableOpacity>
          )}
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    height: wp(14),
    width: wp(100),
  },
  backArrowImage: {
    width: wp(8),
    height: wp(5),
    resizeMode: 'contain',
  },
  navBarContainer: {
    width: wp(100),
    height: wp(14),
    alignItems: 'center',
    flexDirection: 'row',
  },
  headerTitleText: {
    color: colorHelper.white,
    fontSize: 16,
    fontWeight: '500',
    marginHorizontal: wp(2),
  },
  searchIcon: {
    width: wp(10),
    height: wp(6),
    resizeMode: 'contain',
  },
  searchTextBox: {
    borderRadius: 8,
    marginHorizontal: wp(2),
    paddingHorizontal: wp(2),
    backgroundColor: colorHelper.gray,
    width: wp(80),
    height: wp(10),
  }
})

AppHeader.propTypes = {
  title: PropTypes.string,
  searchText: PropTypes.string,
  setSearchText: PropTypes.func,
  onCancel: PropTypes.func,
};

export default memo(AppHeader);
