import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import englandFlag from '../assets/england-flag.png';
import brazilFlag from '../assets/brazil-flag.png';
import './HomePage.css';

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
        const response = await fetch('https://newsapi.org/v2/top-headlines?country=us&apiKey=5a0675693df641c68b854bd52fe10ec1');
        const data = await response.json();
        setNews(data.articles.slice(0, 4)); // Limitar a 4 notícias
      } catch (error) {
        console.error('Error fetching news:', error);
      }
    };

    fetchNews();
  }, []);

  return (
    <div className="homepage-container">
      <header className="homepage-header">
        <img src={logo} alt="Logo" className="homepage-logo" />
        <h1 className="homepage-title">{translations[language].siteName}</h1>
        <div className="language-switch">
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
      </header>
      <div className="homepage-content">
        <h1>{translations[language].welcome}</h1>
        <div className="news-section">
          <h2>Latest News</h2>
          {news && news.length > 0 ? (
            <div className="news-list">
              {news.map((article, index) => (
                <div key={index} className="news-item">
                  <a href={article.url} target="_blank" rel="noopener noreferrer">
                    <img src={article.urlToImage} alt={article.title} className="news-image" />
                    <p>{article.title}</p>
                  </a>
                </div>
              ))}
            </div>
          ) : (
            <p>Loading news...</p>
          )}
        </div>
        <Link to="/register" className="homepage-button">Register a new customer</Link>
      </div>
    </div>
  );
};

export default HomePage;
