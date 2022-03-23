import React from 'react';

import { Grid } from '@mui/material';

import CardMock from './cardMock';
import { mockData } from '../assets/mock';

import './card.css';

export default function Card() {
  return (
    <section className="sectionCard">
      <div className="cardDiv">
        <div className="heading">
          <h4>All</h4>

          <div className="underlineDiv">
            <div className="span" />
            <div className="div" />
            <div className="span" />
          </div>
        </div>

        <Grid container spacing={3}>
          {mockData.map((item, index) => (
            <Grid key={index} item md={4}>
              <CardMock {...item} />
            </Grid>
          ))}
        </Grid>
      </div>
    </section>
  );
}
