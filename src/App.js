import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import Login from './Login';
import NextPage from './NextPage';
import CityDetails from './CityDetails';
import BatchDetails from './BatchDetails';
import StudentDetails from './StudentDetails';
import AttendanceSummary from './AttendanceSummary'; // Import the AttendanceSummary component

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/next" element={<NextPage />} />
          <Route path="/city/:cityName" element={<CityDetails />} />
          <Route path="/batch/:batchName" element={<BatchDetails />} />
          <Route path="/student/:batchName/:studentName" element={<StudentDetails />} />
          <Route path="/attendance-summary/:batchName/:studentName" element={<AttendanceSummary />} /> {/* Add this route */}
          <Route path="*" element={<Navigate to="/login" />} /> {/* Redirect unmatched routes to login */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
