import React from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';
import FastImage from 'react-native-fast-image';
import AppAssets from '../appHelper/imageAssets';
class ImageLoad extends React.Component {
  static propTypes = {
    isShowActivity: PropTypes.bool,
  };

  static defaultProps = {
    isShowActivity: true,
  };

  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      isError: false,
    };
  }

  onLoadEnd() {
    this.setState({
      isLoaded: true,
    });
  }

  onError() {
    this.setState({
      isError: true,
    });
  }

  render() {
    const {
      style,
      source,
      resizeMode,
      borderRadius,
      backgroundColor,
      children,
      loadingStyle,
      placeholderSource,
      placeholderStyle,
      customImagePlaceholderDefaultStyle,
      notShowLoader = false,
      local = false,
      isSquare,
      key = '',
      noDefault = false,
    } = this.props;
    return (
      <View key={key}>
        <FastImage
          onLoadEnd={this.onLoadEnd.bind(this)}
          onError={this.onError.bind(this)}
          style={[styles.backgroundImage, style]}
          source={
            local ? source : {uri: source, priority: FastImage.priority.normal}
          }
          resizeMode={resizeMode}
          borderRadius={borderRadius}
        />
        {this.state.isLoaded && !this.state.isError ? (
          children
        ) : (
          <View
            style={[
              styles.viewImageStyles,
              {borderRadius: placeholderSource ? 30 : 0},
              backgroundColor ? {backgroundColor: backgroundColor} : {},
            ]}>
        
            {!noDefault ? (
              <FastImage
                style={
                  placeholderStyle
                    ? placeholderStyle
                    : [
                        styles.imagePlaceholderStyles,
                        customImagePlaceholderDefaultStyle,
                        style,
                      ]
                }
                source={AppAssets.placeholder}
              />
            ) : (
              <View style={styles.imagePlaceholderStyles} />
            )}
          </View>
        )}
        {this.props.children && (
          <View style={styles.viewChildrenStyles}>{this.props.children}</View>
        )}
      </View>
    );
  }
}

const styles = {
  backgroundImage: {
    position: 'relative',
  },
  activityIndicator: {
    position: 'absolute',
    margin: 'auto',
    zIndex: 9,
  },
  viewImageStyles: {
    flex: 1,
    //backgroundColor: '#e9eef1',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
  },
  imagePlaceholderStyles: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewChildrenStyles: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    position: 'absolute',
    backgroundColor: 'transparent',
  },
};

export default ImageLoad;
