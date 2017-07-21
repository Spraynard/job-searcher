import React, { Component } from 'react';
import SiteHeader from './SiteHeader';
import SiteBody from './SiteBody';
import SiteFooter from './SiteFooter';
import '../component-css/App.css';

class App extends Component {
  render() {
    return (
      <div className="container">
        <SiteHeader />
        <SiteBody />
        <SiteFooter />
      </div>
    );
  }
}

export default App;
