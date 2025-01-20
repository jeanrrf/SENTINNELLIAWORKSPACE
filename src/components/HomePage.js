import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import englandFlag from '../assets/england-flag.png';
import brazilFlag from '../assets/brazil-flag.png';

const translations = {
  en: {
    welcome: 'Welcome to the Home Page',
    siteName: 'SENTINNELL IA WORKSPACE - SIAW'
  },
  pt: {
    welcome: 'Bem-vindo à Página Inicial',
    siteName: 'SENTINNELL IA WORKSPACE - SIAW'
  }
};

const HomePage = () => {
  const [language, setLanguage] = useState('en');
  const [news, setNews] = useState([]);

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
  };

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch('https://newsapi.org/v2/top-headlines?country=us&apiKey=YOUR_API_KEY');
        const data = await response.json();
        setNews(data.articles);
      } catch (error) {
        console.error('Error fetching news:', error);
      }
    };

    fetchNews();
  }, []);

  return (
    <div className="homePage light">
      <header className="header">
        <img src={logo} alt="Logo" className="logo" />
        <h1 className="siteName">{translations[language].siteName}</h1>
        <div className="headerRight">
          <div className="languageSwitch">
            <img
              src={englandFlag}
              alt="English"
              className="flag"
              onClick={() => handleLanguageChange('en')}
            />
            <img
              src={brazilFlag}
              alt="Portuguese"
              className="flag"
              onClick={() => handleLanguageChange('pt')}
            />
          </div>
        </div>
      </header>
      <div>
        <h1>{translations[language].welcome}</h1>
        <div className="newsCard">
          <h2>Latest News</h2>
          {news && news.length > 0 ? (
            <ul>
              {news.map((article, index) => (
                <li key={index}>
                  <a href={article.url} target="_blank" rel="noopener noreferrer">
                    {article.title}
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p>Loading news...</p>
          )}
        </div>
        <Link to="/register">Register a new customer</Link>
      </div>
    </div>
  );
};

export default HomePage;
