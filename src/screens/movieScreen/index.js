import React, { memo, useEffect, useState } from 'react';
import {
  SafeAreaView,
  View,
  FlatList,
} from 'react-native';
import MoviePosterItem from '../../components/movieList/moviePosterItem';
import MovieEmptyList from '../../components/movieList/movieEmptyList';
import AppHeader from '../../components/appHeader';
import debounce from 'lodash.debounce';
import styles from './styles';

const Home = ({navigation}) => {
  const [movieList, setMovieList] = useState({});
  const [searchText, setSearchText] = useState('');
  const [searchedList, setSearchedList] = useState([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    //fetch initial movie list
    fetchMovie();
  }, []);

  // call when search text and movie list changed
  React.useEffect(() => {
    setLoading(true);
    // set debounce 700ms for reduce unnecessary api call
    debouncedFetchData(searchText, res => {
      if (searchText !== '') {
        setSearchedList(res);
      } else {
        setSearchedList(movieList?.['content-items']?.['content']);
      }
      setLoading(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchText, movieList]);

  const searchMovie = (query, cb) => {
    const res = movieList?.['content-items']?.['content']?.filter(i =>
      i?.name?.toLowerCase()?.includes(query?.toLowerCase()),
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

  return (
    <SafeAreaView style={styles.container}>
      <AppHeader
        title={movieList?.title || ""}
        searchText={searchText}
        setSearchText={setSearchText}
        navigation={navigation}
      />
      <View style={{ flex: 1 }}>
        <FlatList
          style={{ flex: 1 }}
          extraData={searchedList}
          data={searchedList}
          initialNumToRender={10}
          removeClippedSubviews={20}
          ListEmptyComponent={() => <MovieEmptyList isLoading={isLoading} />}
          numColumns={3}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <MoviePosterItem item={item} />
          )}
          onEndReached={() => searchText === "" && onMoreLoad()}
          onEndReachedThreshold={0.7}
        />
      </View>
    </SafeAreaView>
  );
};
export default memo(Home);
