import React, { Fragment } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchHeroComics, fetchHeroDetail } from './redux/actions';
import { prepareImagePath } from '../../utils';
import { Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa'
import './DetailPage.css';

class DetailPage extends React.Component {
  state = {
    heroDetail: undefined,
    heroComics: undefined
  };

  constructor(props) {
    super(props);

    this.goBack = this.goBack.bind(this);
  }

  componentDidMount() {
    const { heroId } = this.props.match.params;
    this.fetchHeroDetail(heroId);
    this.fetchHeroComics(heroId);
  }

  fetchHeroDetail(heroId) {
    this.props.fetchHeroDetail(heroId);
  }

  fetchHeroComics(heroId) {
    this.props.fetchHeroComics(heroId);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { heroDetail, heroDetailError, heroComics, heroComicsError } = this.props;

    if (heroDetail !== prevProps.heroDetail) {
      this.handleHeroDetail(heroDetail);
    }

    if (heroDetailError !== prevProps.heroDetailError) {
      this.handleHeroDetailError(heroDetailError);
    }

    if (heroComics !== prevProps.heroComics) {
      this.handleHeroComics(heroComics);
    }

    if (heroComicsError !== prevProps.heroComicsError) {
      this.handleHeroComicsError(heroComicsError);
    }
  }

  handleHeroDetail(heroDetailResp) {
    console.log(heroDetailResp);
    if (!heroDetailResp || !heroDetailResp.results) return;

    const hero = heroDetailResp.results[0];
    this.setState({
      heroDetail: {
        id: hero.id,
        name: hero.name,
        image: prepareImagePath(hero.thumbnail),
        description: hero.description,
        series: hero.comics.items.map(s => {
          return {
            name: s.name,
            url: s.resourceURI
          };
        })
      }
    })
  }

  handleHeroDetailError(error) {

  }

  handleHeroComics(heroComicsResp) {
    if (!heroComicsResp || !heroComicsResp.results) return;
    const { results } = heroComicsResp;
    const heroComics = results.map(comics => {
      return {
        id: comics.id,
        image: prepareImagePath(comics.images && comics.images.length > 0 && comics.images[0]),
        title: comics.title,
        to: `/hero-detail/${comics.id}`
      }
    });


    this.setState({
      heroComics: heroComics,
    });
  }

  handleHeroComicsError(error) {

  }

  goBack() {
    this.props.history.goBack();
  }

  render() {
    const { heroDetail, heroComics } = this.state;

    return(
      <div className='hero-detail-page-container'>
        <div className='back-button'>
          <Link to='#' onClick={this.goBack}><FaArrowLeft size='4em'/></Link>
        </div>
        {
          heroDetail &&
          <div className='hero-detail-container'>
            <img className='hero-detail-image' alt={heroDetail.name} src={heroDetail.image}/>
            <div className='hero-detail-name'>{heroDetail.name}</div>
            <div className='hero-detail-description'>{heroDetail.description}</div>
          </div>
        }
        {
          heroComics && heroComics.length > 0 &&
            <Fragment>
            <div className='comics-title'>Comics</div>
              <div className='main-container comics-container'>
                {
                  heroComics.map(comics => (
                    <div className='hero-container'>
                      <img className='hero-image' alt={comics.title} src={comics.image}/>
                      <div className='hero-title'>{comics.title}</div>
                    </div>
                  ))
                }
              </div>
            </Fragment>
        }
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    heroDetail: state.DetailPageReducer.heroDetail,
    heroDetailError: state.DetailPageReducer.heroDetailError,
    heroComics: state.DetailPageReducer.heroComics,
    heroComicsError: state.DetailPageReducer.heroComicsError
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    fetchHeroDetail,
    fetchHeroComics
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailPage);