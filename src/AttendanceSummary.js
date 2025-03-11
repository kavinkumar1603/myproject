import React from 'react';
import { useParams } from 'react-router-dom';

function AttendanceSummary() {
  const { batchName, studentName } = useParams();
  const students = JSON.parse(localStorage.getItem(`students-${batchName}`));
  const student = students ? students.find(s => s.name === studentName) : null;

  if (!student) {
    return <div>Student not found</div>;
  }

  return (
    <div>
      <h1>Attendance Summary for {studentName}</h1>
      <ul>
        {student.attendanceSummary.map((record, index) => (
          <li key={index}>
            {record.date} - {record.time}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AttendanceSummary;
