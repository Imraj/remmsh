import React, { useEffect, useState } from 'react';

import { Grid } from '@mui/material';

import Linkedin from '../assets/images/linkedin.png';
import Twitter from '../assets/images/twitter.png';
import Facebook from '../assets/images/facebook.png';

import './footer.css';

export default function Footer() {
  const [width, setWidth] = useState(window.innerWidth);

  const updateDimensions = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  return (
    <footer>
      <div>
        <Grid container>
          <Grid item md={3}>
            <div>
              <h2>Remmsh</h2>

              <p className="firstPara">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc consequat facilisis
                nibh vel faucibus.
              </p>
            </div>
          </Grid>

          {width <= 768 ? (
            <>
              <Grid item md={12} xs={12}>
                <div style={{ marginTop: 57, marginBottom: 60 }}>
                  <h3>Pages</h3>

                  <ul className="pages">
                    <li>
                      <p>Home</p>
                    </li>

                    <li>
                      <p>Features</p>
                    </li>

                    <li>
                      <p>Services</p>
                    </li>

                    <li>
                      <p>Price</p>
                    </li>

                    <li>
                      <p>Contact</p>
                    </li>
                  </ul>
                </div>
              </Grid>

              <Grid item md={12} xs={12}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <div>
                    <h3>Company</h3>

                    <ul className="company">
                      <li>
                        <p>Address : 123 Fifth Avenue, New York - 1060, USA.</p>
                      </li>

                      <li>
                        <p>Call Us : +(1600) 456 7890</p>
                      </li>

                      <li>
                        <p>Email : yourid@example.com</p>
                      </li>

                      <li>
                        <p>Mon Sat : 9:00 AM - 19;00 PM</p>
                      </li>
                    </ul>
                  </div>

                  <div className="icons">
                    <div className="icon">
                      <img alt="" src={Facebook} />
                    </div>

                    <div className="icon">
                      <img alt="" src={Twitter} />
                    </div>

                    <div className="icon">
                      <img alt="" src={Linkedin} />
                    </div>
                  </div>
                </div>
              </Grid>
            </>
          ) : (
            <>
              <Grid item md={3}>
                <div>
                  <h3>Company</h3>

                  <ul className="company">
                    <li>
                      <p>Address : 123 Fifth Avenue, New York - 1060, USA.</p>
                    </li>

                    <li>
                      <p>Call Us : +(1600) 456 7890</p>
                    </li>

                    <li>
                      <p>Email : yourid@example.com</p>
                    </li>

                    <li>
                      <p>Mon Sat : 9:00 AM - 19;00 PM</p>
                    </li>
                  </ul>
                </div>
              </Grid>

              <Grid item md={3}>
                <div>
                  <h3>Pages</h3>

                  <ul className="pages">
                    <li>
                      <p>Home</p>
                    </li>

                    <li>
                      <p>Features</p>
                    </li>

                    <li>
                      <p>Services</p>
                    </li>

                    <li>
                      <p>Price</p>
                    </li>

                    <li>
                      <p>Contact</p>
                    </li>
                  </ul>
                </div>
              </Grid>
            </>
          )}

          {width > 768 && (
            <Grid item md={3}>
              <div>
                <h3>Contact US</h3>

                <div className="icons">
                  <div className="icon">
                    <img alt="" src={Facebook} />
                  </div>

                  <div className="icon">
                    <img alt="" src={Twitter} />
                  </div>

                  <div className="icon">
                    <img alt="" src={Linkedin} />
                  </div>
                </div>
              </div>
            </Grid>
          )}
        </Grid>
      </div>
    </footer>
  );
}
