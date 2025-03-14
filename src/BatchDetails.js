import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Replace useHistory with useNavigate
import './App.css';
import logo from './assests/logo.png'; // Correct the path to the logo image

function BatchDetails() {
  const { batchName } = useParams();
  const navigate = useNavigate(); // Initialize useNavigate
  const [students, setStudents] = useState(() => {
    const savedStudents = localStorage.getItem(`students-${batchName}`);
    return savedStudents ? JSON.parse(savedStudents) : [
      { name: 'Praveen', present: true, dateJoined: new Date('2023-01-01'), profilePicture: null, feeStatus: 'Unpaid', attendance: [] },
      { name: 'Keerthi', present: true, dateJoined: new Date('2023-02-01'), profilePicture: null, feeStatus: 'Unpaid', attendance: [] },
      { name: 'Manish Prakkash', present: true, dateJoined: new Date('2023-03-01'), profilePicture: null, feeStatus: 'Unpaid', attendance: [] },
      { name: 'Kavin prakash', present: true, dateJoined: new Date('2023-04-01'), profilePicture: null, feeStatus: 'Unpaid', attendance: [] },
      { name: 'Kavin Kumar', present: true, dateJoined: new Date('2023-05-01'), profilePicture: null, feeStatus: 'Unpaid', attendance: [] },
      { name: 'Vijay', present: true, dateJoined: new Date('2023-06-01'), profilePicture: null, feeStatus: 'Unpaid', attendance: [] },
      { name: 'Ilam', present: true, dateJoined: new Date('2023-07-01'), profilePicture: null, feeStatus: 'Unpaid', attendance: [] },
    ];
  });
  const [newStudent, setNewStudent] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [showSortOptions, setShowSortOptions] = useState(false);
  const [sortOption, setSortOption] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    localStorage.setItem(`students-${batchName}`, JSON.stringify(students));
  }, [students, batchName]);

  const markPresent = (index) => {
    const newStudents = [...students];
    if (!newStudents[index].attendance) {
      newStudents[index].attendance = [];
    }
    newStudents[index].present = true;
    const date = new Date();
    newStudents[index].attendance.push({
      date: date.toLocaleDateString(),
      time: date.toLocaleTimeString(),
      status: 'Present'
    });
    setStudents(newStudents);
  };

  const markAbsent = (index) => {
    const newStudents = [...students];
    if (!newStudents[index].attendance) {
      newStudents[index].attendance = [];
    }
    newStudents[index].present = false;
    const date = new Date();
    newStudents[index].attendance.push({
      date: date.toLocaleDateString(),
      time: date.toLocaleTimeString(),
      status: 'Absent'
    });
    setStudents(newStudents);
  };

  const removeStudent = (index) => {
    const newStudents = students.filter((_, i) => i !== index);
    setStudents(newStudents);
  };

  const handleAddNew = () => {
    if (newStudent) {
      setStudents([...students, { name: newStudent, present: true, dateJoined: new Date(), profilePicture: null, feeStatus: 'Unpaid', attendance: [] }]);
      setNewStudent('');
      setShowPopup(false);
    }
  };

  const handleShowPopup = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setNewStudent('');
  };

  const toggleSortOptions = () => {
    setShowSortOptions(!showSortOptions);
  };

  const sortStudents = (option) => {
    let sortedStudents;
    if (option === 'alphabetical') {
      sortedStudents = [...students].sort((a, b) => a.name.localeCompare(b.name));
    } else if (option === 'dateJoined') {
      sortedStudents = [...students].sort((a, b) => new Date(a.dateJoined) - new Date(b.dateJoined));
    }
    setStudents(sortedStudents);
    setSortOption(option);
    setShowSortOptions(false);
  };

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleStudentClick = (studentName) => {
    navigate(`/student/${batchName}/${studentName}`);
  };

  return (
    <div className="batch-details">
      <img src={logo} alt="Logo" className="logo" />
      <h1>ATTENDANCE</h1>
      <h2>{batchName}</h2>
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
      <div className="student-list">
        <div className="sort-container">
          <span>Students</span>
          <button className="sort-button" onClick={toggleSortOptions}>🔃</button>
          {showSortOptions && (
            <div className="sort-options">
              <button className="sort-option" onClick={() => sortStudents('alphabetical')}>Alphabetical</button>
              <button className="sort-option" onClick={() => sortStudents('dateJoined')}>Date Joined</button>
            </div>
          )}
        </div>
        {filteredStudents.length > 0 ? (
          filteredStudents.map((student, index) => (
            <div key={index} className="student-item">
              <span onClick={() => handleStudentClick(student.name)}>{student.name}</span>
              <div className="attendance-buttons">
                <button className="attendance-button present" onClick={() => markPresent(index)}>✔️</button>
                <button className="attendance-button absent" onClick={() => markAbsent(index)}>❌</button>
                <button className="remove-button small" onClick={() => removeStudent(index)}>REMOVE</button>
              </div>
            </div>
          ))
        ) : (
          <div className="no-results">No search results found</div>
        )}
      </div>
      <button className="add-new" onClick={handleShowPopup}>+ Add New</button>

      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <h3>Add a New Student</h3>
            <input
              type="text"
              placeholder="Enter new student"
              value={newStudent}
              onChange={(e) => setNewStudent(e.target.value)}
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

export default BatchDetails;
