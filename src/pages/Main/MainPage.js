import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import debounce from 'lodash.debounce';
import { fetchHeroes } from './redux/actions';
import { PAGE_HERO_COUNT, prepareImagePath } from '../../utils';
import { Link } from 'react-router-dom';
import './MainPage.css';

class MainPage extends React.Component {
  state = {
    error: false,
    hasMore: true,
    isLoading: false,
    heroes: [],
  };

  componentDidMount() {
    window.onscroll = debounce(() => {
      const { error, isLoading, hasMore } = this.state;

      if (error || isLoading || !hasMore) return;

      if (window.innerHeight + document.documentElement.scrollTop
        === document.documentElement.offsetHeight) {
        // Do awesome stuff like loading more content!
        this.fetchHeroes();
      }
    }, 100);

    this.fetchHeroes();
  }

  fetchHeroes() {
    this.props.fetchHeroes(PAGE_HERO_COUNT, this.state.heroes.length);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { heroes, heroesError } = this.props;

    if (heroes !== prevProps.heroes) {
      this.handleHeroes(heroes);
    }

    if (heroesError !== prevProps.heroesError) {
      this.handleHeroesError(heroesError);
    }
  }

  handleHeroes(heroesResp) {
    if (!heroesResp || !heroesResp.results) return;
    const { results, total } = heroesResp;
    const heroesData = results.map(hero => {
      return {
        id: hero.id,
        image: prepareImagePath(hero.thumbnail),
        name: hero.name,
        to: `/hero-detail/${hero.id}`
      }
    });

    const heroes = [
      ...this.state.heroes,
      ...heroesData
    ];

    console.log(heroes);

    this.setState({
      heroes: heroes,
      hasMore: heroes.length < total,
      isLoading: false
    });
  }

  handleHeroesError(error) {
    this.setState({
      error: error
    });
  }

  render() {
    const { heroes } = this.state;
    return(
      <div className='main-container'>
        {
          heroes && heroes.map(hero => (
            <Link key={hero.id} to={hero.to} className='hero-container'>
              <img className='hero-image' src={hero.image} alt={hero.name}/>
              <div className='hero-title'>{hero.name}</div>
            </Link>
          ))
        }
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    heroes: state.MainPageReducer.heroes,
    heroesError: state.MainPageReducer.heroesError
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    fetchHeroes
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);