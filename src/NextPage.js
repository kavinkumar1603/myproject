import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';
import logo from './assests/logo.png';
function NextPage() {
  const [cities, setCities] = useState(() => {
    const savedCities = localStorage.getItem('cities');
    return savedCities ? JSON.parse(savedCities) : ['Coimbatore', 'Erode', 'Salem', 'Tiruppur'];
  });
  const [newCity, setNewCity] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem('cities', JSON.stringify(cities));
  }, [cities]);

  const handleAddNew = () => {
    if (newCity) {
      setCities([...cities, newCity]);
      setNewCity('');
      setShowPopup(false);
    }
  };

  const handleShowPopup = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setNewCity('');
  };

  const handleCityClick = (city) => {
    navigate(`/city/${city}`);
  };

  const filteredCities = cities.filter(city =>
    city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="next-page">
      <img src={logo} alt="Logo" className="logo" />
      <p>A Traditional Spiritual Experience</p>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search"
          className="search-bar"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="search-button">🔍</button>
      </div>
      <div className="locations">
        {filteredCities.map((city, index) => (
          <button key={index} onClick={() => handleCityClick(city)}>{city}</button>
        ))}
      </div>
      <button className="add-new" onClick={handleShowPopup}>+ Add New</button>

      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <h3>Add a New City</h3>
            <input
              type="text"
              placeholder="Enter new city"
              value={newCity}
              onChange={(e) => setNewCity(e.target.value)}
              className="new-city-input"
            />
            <button onClick={handleAddNew}>Add</button>
            <button onClick={handleClosePopup}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default NextPage;
