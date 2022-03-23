import './landing.css';

import Banner from './banner/banner';
import Card from './card/card';
import Footer from './footer/footer';
import Header from './header/header';
import Quality from './qualityDiv/quality';

function Landing() {
  return (
    <div>
      <Header />

      <Banner />

      <Card />

      <Quality />

      <Footer />
    </div>
  );
}

export default Landing;
