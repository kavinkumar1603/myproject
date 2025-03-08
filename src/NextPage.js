import React from 'react';
import './App.css';

function NextPage() {
  return (
    <div className="next-page">
      <img src="path/to/logo.png" alt="Logo" className="logo" />
      <h1>MAHAYOGAM</h1>
      <p>A Traditional Spiritual Experience</p>
      <input type="text" placeholder="Search" className="search-bar" />
      <div className="locations">
        <button>Coimbatore</button>
        <button>Erode</button>
        <button>Salem</button>
        <button>Tiruppur</button>
      </div>
      <button className="add-new">+ Add New</button>
    </div>
  );
}

export default NextPage;
