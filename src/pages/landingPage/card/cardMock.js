import React from 'react';
import PropTypes from 'prop-types';

import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';

import DiscountRoundedIcon from '@mui/icons-material/DiscountRounded';

import './card.css';

function Card(item) {
  const images = [
    {
      original: item.card_first,
      thumbnail: item.card_first
    },
    {
      original: item.card_second,
      thumbnail: item.card_second
    },
    {
      original: item.card_third,
      thumbnail: item.card_third
    },
    {
      original: item.card_fourth,
      thumbnail: item.card_fourth
    }
  ];

  return (
    <div className="cardBack">
      <div>
        <ImageGallery
          items={images}
          showNav={false}
          showFullscreenButton={false}
          useBrowserFullscreen={false}
          showPlayButton={false}
          showBullets
        />
      </div>

      <div className="mainDiv">
        <div className="flexDivs">
          <h2>{item.name}</h2>

          <div className={item.active ? 'dark' : 'light'} />
        </div>

        <div className="flexDivs">
          <h3>{item.drink}</h3>

          <h3 className="rest">{item.restaurant}</h3>
        </div>

        <div className="flexDivs">
          <h3>Ends {item.time}</h3>

          <h3>{item.notNum}</h3>
        </div>
      </div>

      <div className="btnDiv">
        <div style={{ textAlign: 'end' }}>
          <DiscountRoundedIcon style={{ color: '#3db196' }} />
        </div>
        <button type="button" style={{ backgroundColor: item.disable ? '#969696' : '#BA0143' }}>
          Get Code
        </button>
      </div>
    </div>
  );
}

Card.propTypes = {
  // eslint-disable-next-line react/no-unused-prop-types
  item: PropTypes.object
};

export default Card;
