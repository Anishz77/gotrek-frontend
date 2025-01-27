import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import fewa from '../../Assets/fewa.jpg';
import manaslu2 from '../../Assets/manaslu 2.jpg';
import manaslu from '../../Assets/manaslu.jpg';
import rara from '../../Assets/rara.jpg';
import heroVideo from '../../Assets/video/Nepal.mp4'; // Add the video file
import Footer from '../../components/Footer';
import '../../CSS/Destination.css';

const Destination = () => {
  const [showPopular, setShowPopular] = useState(false);

  // Example of popular destinations based on some criteria
  const popularDestinations = [
    'Manaslu Trek',
    'Rara Lake'
  ];

  const handlePopularClick = () => {
    setShowPopular(!showPopular);
  };

  // Determine if a destination is popular
  const isPopular = (destination) => {
    return popularDestinations.includes(destination);
  };

  // Handle More Info click
  const handleMoreInfo = (destination) => {
    const query = encodeURIComponent(destination);
    window.open(`https://www.google.com/search?q=${query}`, '_blank');
  };

  return (
    <>
      <div className="destination-container">
        <div className="hero-section">
          <video className="hero-video" src={heroVideo} autoPlay loop muted></video>
          <div className="hero-text">
            <h1>Discover Nepal</h1>
          </div>
        </div>

        <div className="search-section">
          <div className="search-filters">
            <select className="filter">
              <option>Lake</option>
              <option>Hills</option>
              <option>Base Camp</option>
            </select>
            <select className="filter">
              <option>Variety of lakes</option>
            </select>
            <select className="filter">
              <option>High</option>
            </select>
          </div>
          <button className="search-button">Search</button>
        </div>

        <div className="trekking-routes">
          <div className="routes-header">
            <h2>Trekking Routes</h2>
            <button className="popular-button" onClick={handlePopularClick}>
              {showPopular ? 'Show All' : 'Popular'}
            </button>
          </div>
          <div className="routes-list">
            {!showPopular ? (
              <>
                <Link to="/route/manaslu-circuit" className="route-card">Manaslu Circuit</Link>
                <Link to="/route/everest-base-camp" className="route-card">Everest Base Camp</Link>
                <Link to="/route/mardi-trek" className="route-card">Mardi Trek</Link>
              </>
            ) : (
              <>
                {isPopular('Manaslu Circuit') && (
                  <Link to="/route/manaslu-circuit" className="route-card">Manaslu Circuit</Link>
                )}
                {isPopular('Rara Lake') && (
                  <Link to="/route/rara-lake" className="route-card">Rara Lake</Link>
                )}
              </>
            )}
          </div>
        </div>

        <div className="destinations-section">
          {(!showPopular || isPopular('Manaslu Trek')) && (
            <div className="destination-card">
              <img src={manaslu} alt="Manaslu" />
              <div className="destination-info">
                <h3>Manaslu Trek</h3>
                <p>Gorkha</p>
                <button onClick={() => handleMoreInfo('Manaslu Trek')}>More...</button>
              </div>
            </div>
          )}
          {(!showPopular || isPopular('Rara Lake')) && (
            <div className="destination-card">
              <img src={rara} alt="Rara Lake" />
              <div className="destination-info">
                <h3>Rara Lake</h3>
                <p>Mugu</p>
                <button onClick={() => handleMoreInfo('Rara Lake')}>More...</button>
              </div>
            </div>
          )}
          {(!showPopular || isPopular('Pokhara')) && (
            <div className="destination-card">
              <img src={fewa} alt="Pokhara" />
              <div className="destination-info">
                <h3>Pokhara</h3>
                <p>Nepal</p>
                <button onClick={() => handleMoreInfo('Pokhara')}>More...</button>
              </div>
            </div>
          )}
          {(!showPopular || isPopular('Mountains')) && (
            <div className="destination-card">
              <img src={manaslu2} alt="Mountains" />
              <div className="destination-info">
                <h3>Mountains</h3>
                <p>Nepal</p>
                <button onClick={() => handleMoreInfo('Mountains')}>More...</button>
              </div>
            </div>
          )}
        </div>

        <div>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default Destination;
