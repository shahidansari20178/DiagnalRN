import React from 'react';
import MovieEmptyList from "../src/components/movieList/movieEmptyList";
import MoviePosterItem from "../src/components/movieList/moviePosterItem";
import AppHeader from "../src/components/appHeader";
import ImageComponent from "../src/components/imageComponent";
import MarqueeText from "../src/components/marqueeText";
import renderer from 'react-test-renderer';



describe('Test Case for component', () => {
  describe('Test App Header', () => {
    test('Mock Test for App headee', () => {
      const tree = renderer.create(<AppHeader />).toJSON();
      expect(tree).toMatchSnapshot();
    });
  })
  describe('Test movie list', () => {
    test('Mock Test for empty movie list', () => {
      const tree = renderer.create(<MovieEmptyList isLoading={true} />).toJSON();
      expect(tree).toMatchSnapshot();
    });

    // test('Test props for empty movie list', () => {
    //   const props = {
    //     isLoading:true
    //   }
    //   const mackEmptyMovieList = shallow(<MovieEmptyList {...props} />);
    //   expect(mackEmptyMovieList).toHaveBeenCalledWith(props);

    //   //expect(mackEmptyMovieList.toHaveBeenCalledWith({isLoading:true},{isLoading:true}))
    // });

    test('Mock Test for movie list item', () => {
      const tree = renderer.create(<MoviePosterItem />).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });

  describe('Test image component', () => {
    test('Mock Test for image component', () => {
      const tree = renderer.create(<ImageComponent />).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });

  describe('Test marquee text component', () => {
    test('Mock Test for marquee text component', () => {
      const tree = renderer.create(<MarqueeText />).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });

})