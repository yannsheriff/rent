import React, { Component } from 'react';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import './Ads.scss';
import ads from 'assets/img/ads/test.gif';
import views from 'assets/img/icons/icon_visites.svg';

/* ILLUSTRATIONS */

import small from 'assets/img/ads/ads_small.gif';
import medium from 'assets/img/ads/ads_medium.gif';
import big from 'assets/img/ads/ads_big.gif';

// eslint-disable-next-line react/prefer-stateless-function
class Ads extends Component {
  constructor(props) {
    super(props);
    this.state = {
      adsIllu: [
        [small, small, small],
        [medium, medium, medium],
        [big, big, big],
      ],
    };
  }

  returnIllu(size) {
    const { adsIllu } = this.state;
    const rand = Math.round(Math.random() * ((3 - 1)));
    switch (size) {
      case 'small':
        return adsIllu[0][rand];

      case 'medium':
        return adsIllu[1][rand];

      case 'big':
        return adsIllu[2][rand];

      default:
        return ads;
    }
  }

  render() {
    const PriceTag = props => (
      <svg className="ads--pricetag" viewBox="0 0 100 100" version="1.1" {...props}>
        <defs>
          <path d="M48.5068689,95.4819744 L45.1905761,99.2032817 C44.4556929,100.027915 43.1914548,100.100672 42.3668213,99.365789 C42.178741,99.1981787 42.0240207,98.9965433 41.9108004,98.771491 L39.6706527,94.3186645 C39.1742409,93.3319279 37.9719115,92.9344411 36.9851749,93.4308529 C36.9166839,93.4653097 36.8502309,93.5036764 36.7861449,93.5457629 L32.6197069,96.28195 C31.6964333,96.8882831 30.4564422,96.631352 29.8501092,95.7080785 C29.7118183,95.4975007 29.614557,95.2626912 29.5634424,95.0160038 L28.5521022,90.1351108 C28.3279915,89.0535156 27.2695077,88.3583871 26.1879125,88.5824979 C26.1128372,88.5980538 26.0387184,88.6179139 25.9659234,88.6419797 L21.2332759,90.2065799 C20.1845316,90.5532919 19.0532908,89.9841823 18.7065788,88.935438 C18.6275016,88.6962431 18.5943276,88.4442615 18.6088021,88.1927504 L18.8951906,83.2164156 C18.9586536,82.1136708 18.1161493,81.1682725 17.0134044,81.1048094 C16.9368611,81.1004043 16.8601277,81.1004043 16.7835844,81.1048094 L11.8072496,81.3911979 C10.7045048,81.4546609 9.75910645,80.6121566 9.6956434,79.5094117 C9.68116891,79.2579005 9.71434291,79.005919 9.79342007,78.7667241 L11.3580203,74.0340766 C11.7047323,72.9853324 11.1356226,71.8540915 10.0868783,71.5073796 C10.0140832,71.4833137 9.93996454,71.4634537 9.86488922,71.4478978 L4.98399617,70.4365576 C3.90240098,70.2124468 3.20727252,69.153963 3.43138329,68.0723678 C3.48249789,67.8256804 3.57975914,67.590871 3.71805,67.3802931 L6.45423705,63.2138551 C7.0605701,62.2905815 6.80363907,61.0505904 5.88036553,60.4442573 C5.81627958,60.4021708 5.74982656,60.3638041 5.68133554,60.3293473 L1.22850899,58.0891996 C0.241772402,57.5927878 -0.155714364,56.3904585 0.340697448,55.4037219 C0.453917756,55.1786696 0.608638069,54.9770341 0.796718325,54.8094239 L4.5180256,51.4931311 C5.34265912,50.7582479 5.41541612,49.4940098 4.68053291,48.6693762 C4.62952344,48.6121371 4.57526478,48.5578784 4.5180256,48.5068689 L0.796718325,45.1905761 C-0.0279151967,44.4556929 -0.100672199,43.1914548 0.634211012,42.3668213 C0.801821252,42.178741 1.00345669,42.0240207 1.22850899,41.9108004 L5.68133554,39.6706527 C6.66807212,39.1742409 7.06555889,37.9719115 6.56914708,36.9851749 C6.53469031,36.9166839 6.49632364,36.8502309 6.45423705,36.7861449 L3.71805,32.6197069 C3.11171695,31.6964333 3.36864798,30.4564422 4.29192151,29.8501092 C4.50249933,29.7118183 4.73730877,29.614557 4.98399617,29.5634424 L9.86488922,28.5521022 C10.9464844,28.3279915 11.6416129,27.2695077 11.4175021,26.1879125 C11.4019462,26.1128372 11.3820861,26.0387184 11.3580203,25.9659234 L9.79342007,21.2332759 C9.4467081,20.1845316 10.0158177,19.0532908 11.064562,18.7065788 C11.3037569,18.6275016 11.5557385,18.5943276 11.8072496,18.6088021 L16.7835844,18.8951906 C17.8863292,18.9586536 18.8317275,18.1161493 18.8951906,17.0134044 C18.8995957,16.9368611 18.8995957,16.8601277 18.8951906,16.7835844 L18.6088021,11.8072496 C18.5453391,10.7045048 19.3878434,9.75910645 20.4905883,9.6956434 C20.7420995,9.68116891 20.994081,9.71434291 21.2332759,9.79342007 L25.9659234,11.3580203 C27.0146676,11.7047323 28.1459085,11.1356226 28.4926204,10.0868783 C28.5166863,10.0140832 28.5365463,9.93996454 28.5521022,9.86488922 L29.5634424,4.98399617 C29.7875532,3.90240098 30.846037,3.20727252 31.9276322,3.43138329 C32.1743196,3.48249789 32.409129,3.57975914 32.6197069,3.71805 L36.7861449,6.45423705 C37.7094185,7.0605701 38.9494096,6.80363907 39.5557427,5.88036553 C39.5978292,5.81627958 39.6361959,5.74982656 39.6706527,5.68133554 L41.9108004,1.22850899 C42.4072122,0.241772402 43.6095415,-0.155714364 44.5962781,0.340697448 C44.8213304,0.453917756 45.0229659,0.608638069 45.1905761,0.796718325 L48.5068689,4.5180256 C49.2417521,5.34265912 50.5059902,5.41541612 51.3306238,4.68053291 C51.3878629,4.62952344 51.4421216,4.57526478 51.4931311,4.5180256 L54.8094239,0.796718325 C55.5443071,-0.0279151967 56.8085452,-0.100672199 57.6331787,0.634211012 C57.821259,0.801821252 57.9759793,1.00345669 58.0891996,1.22850899 L60.3293473,5.68133554 C60.8257591,6.66807212 62.0280885,7.06555889 63.0148251,6.56914708 C63.0833161,6.53469031 63.1497691,6.49632364 63.2138551,6.45423705 L67.3802931,3.71805 C68.3035667,3.11171695 69.5435578,3.36864798 70.1498908,4.29192151 C70.2881817,4.50249933 70.385443,4.73730877 70.4365576,4.98399617 L71.4478978,9.86488922 C71.6720085,10.9464844 72.7304923,11.6416129 73.8120875,11.4175021 C73.8871628,11.4019462 73.9612816,11.3820861 74.0340766,11.3580203 L78.7667241,9.79342007 C79.8154684,9.4467081 80.9467092,10.0158177 81.2934212,11.064562 C81.3724984,11.3037569 81.4056724,11.5557385 81.3911979,11.8072496 L81.1048094,16.7835844 C81.0413464,17.8863292 81.8838507,18.8317275 82.9865956,18.8951906 C83.0631389,18.8995957 83.1398723,18.8995957 83.2164156,18.8951906 L88.1927504,18.6088021 C89.2954952,18.5453391 90.2408935,19.3878434 90.3043566,20.4905883 C90.3188311,20.7420995 90.2856571,20.994081 90.2065799,21.2332759 L88.6419797,25.9659234 C88.2952677,27.0146676 88.8643774,28.1459085 89.9131217,28.4926204 C89.9859168,28.5166863 90.0600355,28.5365463 90.1351108,28.5521022 L95.0160038,29.5634424 C96.097599,29.7875532 96.7927275,30.846037 96.5686167,31.9276322 C96.5175021,32.1743196 96.4202409,32.409129 96.28195,32.6197069 L93.5457629,36.7861449 C92.9394299,37.7094185 93.1963609,38.9494096 94.1196345,39.5557427 C94.1837204,39.5978292 94.2501734,39.6361959 94.3186645,39.6706527 L98.771491,41.9108004 C99.7582276,42.4072122 100.155714,43.6095415 99.6593026,44.5962781 C99.5460822,44.8213304 99.3913619,45.0229659 99.2032817,45.1905761 L95.4819744,48.5068689 C94.6573409,49.2417521 94.5845839,50.5059902 95.3194671,51.3306238 C95.3704766,51.3878629 95.4247352,51.4421216 95.4819744,51.4931311 L99.2032817,54.8094239 C100.027915,55.5443071 100.100672,56.8085452 99.365789,57.6331787 C99.1981787,57.821259 98.9965433,57.9759793 98.771491,58.0891996 L94.3186645,60.3293473 C93.3319279,60.8257591 92.9344411,62.0280885 93.4308529,63.0148251 C93.4653097,63.0833161 93.5036764,63.1497691 93.5457629,63.2138551 L96.28195,67.3802931 C96.8882831,68.3035667 96.631352,69.5435578 95.7080785,70.1498908 C95.4975007,70.2881817 95.2626912,70.385443 95.0160038,70.4365576 L90.1351108,71.4478978 C89.0535156,71.6720085 88.3583871,72.7304923 88.5824979,73.8120875 C88.5980538,73.8871628 88.6179139,73.9612816 88.6419797,74.0340766 L90.2065799,78.7667241 C90.5532919,79.8154684 89.9841823,80.9467092 88.935438,81.2934212 C88.6962431,81.3724984 88.4442615,81.4056724 88.1927504,81.3911979 L83.2164156,81.1048094 C82.1136708,81.0413464 81.1682725,81.8838507 81.1048094,82.9865956 C81.1004043,83.0631389 81.1004043,83.1398723 81.1048094,83.2164156 L81.3911979,88.1927504 C81.4546609,89.2954952 80.6121566,90.2408935 79.5094117,90.3043566 C79.2579005,90.3188311 79.005919,90.2856571 78.7667241,90.2065799 L74.0340766,88.6419797 C72.9853324,88.2952677 71.8540915,88.8643774 71.5073796,89.9131217 C71.4833137,89.9859168 71.4634537,90.0600355 71.4478978,90.1351108 L70.4365576,95.0160038 C70.2124468,96.097599 69.153963,96.7927275 68.0723678,96.5686167 C67.8256804,96.5175021 67.590871,96.4202409 67.3802931,96.28195 L63.2138551,93.5457629 C62.2905815,92.9394299 61.0505904,93.1963609 60.4442573,94.1196345 C60.4021708,94.1837204 60.3638041,94.2501734 60.3293473,94.3186645 L58.0891996,98.771491 C57.5927878,99.7582276 56.3904585,100.155714 55.4037219,99.6593026 C55.1786696,99.5460822 54.9770341,99.3913619 54.8094239,99.2032817 L51.4931311,95.4819744 C50.7582479,94.6573409 49.4940098,94.5845839 48.6693762,95.3194671 C48.6121371,95.3704766 48.5578784,95.4247352 48.5068689,95.4819744 Z" id="path-1" />
        </defs>
        <g id="Symbols" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
          <g id="element/adv/price">
            <mask id="mask-2" fill="white">
              <use xlinkHref="#path-1" />
            </mask>
            <use id="element_price" fill="#000000" xlinkHref="#path-1" />
          </g>
        </g>
      </svg>
    );
    const { data } = this.props;
    return (
      <div className={`card--content card--ads ${data.ad_source === 'premium' ? 'premium' : ''}`}>
        <h2 className="card--type">Annonce</h2>

        <img className="card--illu" src={this.returnIllu(data.ad_size_type)} alt="" />

        <div className="ads--info">
          <div>
            <PriceTag />
            <div>
              <div>
                <p>
                  <span className="ads--size">
                    {data.ad_size}
                    {' '}
              m²
                  </span>
                  <span className="ads--price">
                    {data.ad_budget === 1 && '€' }
                    {data.ad_budget === 2 && '€€' }
                    {data.ad_budget === 3 && '€€€' }
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {data.ad_source === 'agency'
        && <h3 className="card--tag blue">Agence immobilière</h3>
        }
        {data.ad_source === 'individual'
        && <h3 className="card--tag blue">Particulier</h3>
        }
        {data.ad_source === 'premium'
        && <h3 className="card--tag">Premium</h3>
        }
        <h1>
          {data.ad_title}
        </h1>
        <p dangerouslySetInnerHTML={{ __html: documentToHtmlString(data.ad_description) }} />
        <div className="ads--views">
          <img src={views} alt="views-icon" />
          <p>
            {' '}
            vu par
            {' '}
            {data.ad_views}
            {' '}
            personnes
          </p>
        </div>
      </div>
    );
  }
}

export default Ads;
