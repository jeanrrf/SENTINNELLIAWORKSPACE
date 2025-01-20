import React from 'react';
import logo from '../assets/logo.png';
import englandFlag from '../assets/england-flag.png';
import brazilFlag from '../assets/brazil-flag.png';

const HomePage = () => {
  return (
    <div className="homePage light">
      <header className="header">
        <img src={logo} alt="Logo" className="logo" />
        <h1 className="siteName">SENTINNELL IA WORKSPACE - SIAW</h1>
        <div className="headerRight">
          <div className="languageSwitch">
            <img src={englandFlag} alt="English" className="flag" />
            <img src={brazilFlag} alt="Portuguese" className="flag" />
          </div>
        </div>
      </header>
      <div>
        <h1>Welcome to the Home Page</h1>
      </div>
    </div>
  );
};

export default HomePage;
