import React, { useEffect, useState } from 'react';

import { ReactComponent as Filter } from '../assets/images/filter.svg';
import './banner.css';

export default function Banner() {
  const [width, setWidth] = useState(window.innerWidth);

  const updateDimensions = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  return (
    <section className="banner">
      <div
        style={{
          display: width <= 767 && 'flex',
          alignItems: width <= 767 && 'center'
        }}
      >
        <div className="inputDiv">
          <input placeholder="Enter your email" />

          <button type="button" className="searchBtn">
            Search
          </button>
        </div>

        {width <= 767 && (
          <button type="button" className="filter">
            <Filter />
          </button>
        )}
      </div>

      <div className="grid">
        <div>
          <button type="button" className="buttons active">
            All
          </button>
        </div>

        <div>
          <button type="button" className="buttons">
            Ramadan
          </button>
        </div>

        <div>
          <button type="button" className="buttons">
            Restaurant
          </button>
        </div>

        <div>
          <button type="button" className="buttons">
            Coffee
          </button>
        </div>

        <div>
          <button type="button" className="buttons">
            Lounge
          </button>
        </div>
      </div>
    </section>
  );
}
