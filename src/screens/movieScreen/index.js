import React, { memo, useEffect, useState } from 'react';
import {
  SafeAreaView,
  View,
  FlatList,
  ActivityIndicator
} from 'react-native';
import MoviePosterItem from '../../components/movieList/moviePosterItem';
import MovieEmptyList from '../../components/movieList/movieEmptyList';
import AppHeader from '../../components/appHeader';
import debounce from 'lodash.debounce';
import styles from './styles';
import colorHelper from '../../appHelper/colorHelper';

const Home = ({ navigation }) => {

  const [movieList, setMovieList] = useState({});
  const [searchText, setSearchText] = useState('');
  const [searchedList, setSearchedList] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    //fetch initial movie list
    fetchMovie();
  }, []);

  const onChangeText = (text) => {
    setSearchText(text);
    debouncedFetchData(text, res => {
      if (searchText !== '') {
        setSearchedList(res);
      } else {
        Object.values(movieList).length > 0 && setSearchedList(movieList?.['content-items']?.['content']);
      }
      setLoading(false);
    });
  }

  const searchMovie = (query, cb) => {
    const res = movieList?.['content-items']?.['content']?.filter(i =>
      i?.name?.toLowerCase()?.match(query?.toLowerCase()),
    );
    cb(res);
  };

  const debouncedFetchData = debounce((query, cb) => {
    searchMovie(query, cb);
  }, 500);

  const fetchMovie = (page = 1) => {
    setLoading(true);
    let list;
    switch (page) {
      case 1:
        list = require('../../mockFiles/CONTENTLISTINGPAGE-PAGE1.json');
        break;
      case 2:
        list = require('../../mockFiles/CONTENTLISTINGPAGE-PAGE2.json');
        break;
      case 3:
        list = require('../../mockFiles/CONTENTLISTINGPAGE-PAGE3.json');
        break;
      default:
        break;
    }
    const tList = {
      ...list?.page,
      ['content-items']: {
        ...['content-items'],
        content: [
          ...(movieList['content-items']?.content || []),
          ...list?.page['content-items']?.content,
        ],
      },
    };
    setMovieList(tList);
    setSearchedList(tList['content-items']?.content || []);
    setLoading(false);
    
  };

  const onMoreLoad = () => {
    // fetch more detail when scroll list touch bottom
    if (
      movieList['total-content-items'] >
      movieList['content-items']?.content?.length
    ) {
      fetchMovie(parseInt(movieList['page-num-requested']) + 1);
    }
  };

  const renderMovieItem = ({ item }) => (
    <MoviePosterItem item={item} />
  );

  return (
    <SafeAreaView style={styles.container}>
      <AppHeader
        title={movieList?.title || ""}
        searchText={searchText}
        setSearchText={(text)=>onChangeText(text)}
        onCancel={()=>fetchMovie(1)}
        navigation={navigation}
      />
      <View style={{ flex: 1 }}>
        <FlatList
          style={{ flex: 1 }}
          extraData={searchedList}
          data={searchedList}
          initialNumToRender={10}
          removeClippedSubviews={true}
          ListEmptyComponent={() => <MovieEmptyList searchedList={searchedList} isLoading={isLoading} />}
          ListFooterComponent={() => (isLoading && searchedList?.length > 0) && <ActivityIndicator size={'large'} color={colorHelper.gray} />}
          numColumns={3}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderMovieItem}
          onEndReached={() => searchText === "" && onMoreLoad()}
          onEndReachedThreshold={0.6}
        />
      </View>
    </SafeAreaView>
  );
};
export default memo(Home);
