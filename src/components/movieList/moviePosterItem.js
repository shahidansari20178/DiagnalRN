
import React, { memo } from 'react';
import { Image, View, StyleSheet, Text } from 'react-native';
import ImageAssets from '../../appHelper/imageAssets';
import { widthPercentageToDP as wp ,heightPercentageToDP as hp} from '../../appHelper/responsiveHelper';
import MarqueeText from "../marqueeText"
import ImageComponent from "../imageComponent";
import PropTypes from 'prop-types';


const MoviePosterItem = ({ item }) => {
  const getMoveImage = name => {
    return name.split('.')[0];
  };
  return (
    <View style={styles.itemContainer}>
      <ImageComponent
        local={true}
        source={ImageAssets[getMoveImage(item['poster-image'])]}
        style={styles.moviePosterImage}
      />
      <View style={{width: wp(30)}}>
      <MarqueeText duration={3000}
        loop
        bounce
        marqueeOnMount
        repeatSpacer={100}
        marqueeDelay={1000}
        style={styles.movieNameText}>
        {item?.name}
      </MarqueeText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    marginLeft: wp(2.5),
    marginBottom: wp(3.5),
    marginTop: wp(2.5),
  },
  moviePosterImage: {
    width: wp(30),
    height:wp(45),
  },
  movieNameText: {
    fontSize: 14,
    fontWeight: '300',
    color: '#fff',
    marginHorizontal:wp(.3),
    marginVertical:wp(1.5),
    fontFamily:'TitilliumWeb-Light'
  },
});

MoviePosterItem.propTypes = {
  item: PropTypes.object
};

export default memo(MoviePosterItem);
