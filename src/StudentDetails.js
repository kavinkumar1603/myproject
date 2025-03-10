import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './App.css';
import logo from './assests/logo.png'; // Correct the path to the logo image

function StudentDetails() {
  const { batchName, studentName } = useParams();
  const navigate = useNavigate();
  const students = JSON.parse(localStorage.getItem(`students-${batchName}`));
  const student = students ? students.find(s => s.name === studentName) : null;
  const [profilePicture, setProfilePicture] = useState(student ? student.profilePicture : null);

  useEffect(() => {
    if (student) {
      setProfilePicture(student.profilePicture);
    }
  }, [student]);

  if (!student) {
    return <div>Student not found</div>;
  }

  const handleAttendanceSummary = () => {
    navigate(`/attendance-summary/${batchName}/${studentName}`);
  };

  const handleProfilePictureChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfilePicture(reader.result);
        const updatedStudents = students.map(s => 
          s.name === studentName ? { ...s, profilePicture: reader.result } : s
        );
        localStorage.setItem(`students-${batchName}`, JSON.stringify(updatedStudents));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveProfilePicture = () => {
    setProfilePicture(null);
    const updatedStudents = students.map(s => 
      s.name === studentName ? { ...s, profilePicture: null } : s
    );
    localStorage.setItem(`students-${batchName}`, JSON.stringify(updatedStudents));
  };

  const markFeePaid = (month) => {
    const updatedStudents = students.map(s => 
      s.name === studentName ? { ...s, feeStatus: { ...s.feeStatus, [month]: 'Paid' } } : s
    );
    localStorage.setItem(`students-${batchName}`, JSON.stringify(updatedStudents));
  };

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  return (
    <div className="student-details">
      <img src={logo} alt="Logo" className="logo" /> {/* Add logo at the top of the page */}
      <h1>{studentName}'s Details</h1>
      <div className="profile-picture">
        <img src={profilePicture || 'default-profile.png'} alt={`${studentName}'s profile`} />
        {profilePicture ? (
          <button className="remove-photo-button" onClick={handleRemoveProfilePicture}>Remove Profile</button>
        ) : (
          <>
            <label htmlFor="profile-picture-input" className="choose-photo-label">
              <span>Choose Photo</span> <span className="plus-icon">+</span>
            </label>
            <input 
              type="file" 
              accept="image/*" 
              id="profile-picture-input" 
              onChange={handleProfilePictureChange} 
              style={{ display: 'none' }} 
            />
          </>
        )}
      </div>
      <h2>Fee Status</h2>
      <div className="fee-status">
        {months.map(month => (
          <div key={month} className={`month-status ${student.feeStatus[month] === 'Unpaid' ? 'unpaid' : ''}`}>
            <span>{month}</span>
            <button className="mark-fee-paid-button" onClick={() => markFeePaid(month)}>Mark Fee as Paid</button>
          </div>
        ))}
      </div>
      <button className="attendance-summary-button" onClick={handleAttendanceSummary}>Attendance Summary</button>
    </div>
  );
}

export default StudentDetails;
