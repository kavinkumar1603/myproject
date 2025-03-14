import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './App.css';
import logo from './assests/logo.png'; // Correct the path to the logo image

function CityDetails() {
  const { cityName } = useParams();
  const [batches, setBatches] = useState(() => {
    const savedBatches = localStorage.getItem(`batches-${cityName}`);
    return savedBatches ? JSON.parse(savedBatches) : ['Batch 1', 'Batch 2', 'Batch 3', 'Batch 4'];
  });
  const [newBatch, setNewBatch] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem(`batches-${cityName}`, JSON.stringify(batches));
  }, [batches, cityName]);

  const handleAddNew = () => {
    if (batches.map(batch => batch.toLowerCase()).includes(newBatch.toLowerCase())) {
      setError('Batch already exists');
      return;
    }
    if (newBatch) {
      setBatches([...batches, newBatch]);
      setNewBatch('');
      setShowPopup(false);
      setError('');
    }
  };

  const handleShowPopup = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setNewBatch('');
    setError('');
  };

  const handleBatchClick = (batch) => {
    navigate(`/batch/${batch}`);
  };

  const filteredBatches = batches.filter(batch =>
    batch.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="city-details">
      <img src={logo} alt="Logo" className="logo" />
      <h1>{cityName}</h1>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search"
          className="search-bar"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
        />
        <button className="search-button">🔍</button>
      </div>
      <div className="batches">
        {filteredBatches.map((batch, index) => (
          <button key={index} onClick={() => handleBatchClick(batch)}>{batch}</button>
        ))}
      </div>
      <button className="add-new" onClick={handleShowPopup}>+ Add New</button>

      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <h3>Add a New Batch</h3>
            <input
              type="text"
              placeholder="Enter new batch"
              value={newBatch}
              onChange={(e) => setNewBatch(e.target.value)}
              className="new-city-input"
            />
            {error && <p className="error">{error}</p>}
            <button onClick={handleAddNew}>Add</button>
            <button onClick={handleClosePopup}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CityDetails;
