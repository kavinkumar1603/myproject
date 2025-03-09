import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './Login';
import NextPage from './NextPage';
import CityDetails from './CityDetails'; // Import the CityDetails component
import BatchDetails from './BatchDetails'; // Import the BatchDetails component
import StudentDetails from './StudentDetails'; // Import the new component

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/next" element={<NextPage />} />
          <Route path="/city/:cityName" element={<CityDetails />} /> {/* Add route for CityDetails */}
          <Route path="/batch/:batchName" element={<BatchDetails />} /> {/* Add route for BatchDetails */}
          <Route path="/student/:batchName/:studentName" element={<StudentDetails />} /> {/* Add new route */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
