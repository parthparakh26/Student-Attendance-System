import React, { useState, useEffect } from "react";

function StudentDetails({ student, onCheckOut }) {
  const [isCheckedOut, setIsCheckedOut] = useState(false);

  const handleCheckOut = () => {
    onCheckOut(student);
    setIsCheckedOut(true);
  };

  return (
    <li
      key={student.rollNo}
      className="flex flex-col justify-between mb-4 p-4 bg-white rounded-lg shadow-md"
    >
      <div>
        <p className="text-lg font-medium text-gray-800">{student.name}</p>
        <p className="text-sm text-gray-600">Roll No: {student.rollNo}</p>
      </div>
      <div className="text-sm flex flex-col">
        {student.isCheckedIn ? (
          <>
            <span>Checked In at {student.checkInTime.toLocaleTimeString()}</span>
            <span>Check Out time: {student.checkOutTime ? student.checkOutTime.toLocaleTimeString() : '-'}</span>
          </>
        ) : (
          <>
            <span>Checked In time: {student.checkInTime ? student.checkInTime.toLocaleTimeString() : '-'}</span>
            <span>Checked Out at {student.checkOutTime.toLocaleTimeString()}</span>
          </>
        )}
        {student.isCheckedIn && !isCheckedOut && (
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md mt-4 max-w-xs self-start"
            onClick={handleCheckOut}
          >
            Check Out
          </button>
        )}
      </div>
    </li>
  );
}


function App() {
  const [students, setStudents] = useState([]);
  const [rollNo, setRollNo] = useState("");
  const [name, setName] = useState("");
  const [numPresent, setNumPresent] = useState(0);
  const [numCheckedIn, setNumCheckedIn] = useState(0);
  const [numCheckedOut, setNumCheckedOut] = useState(0);

  useEffect(() => {
    setNumPresent(students.filter((student) => student.isCheckedIn).length);
  }, [students]);

  const handleRollNoChange = (event) => {
    setRollNo(event.target.value);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleCheckIn = () => {
    const now = new Date();
    const student = {
      rollNo,
      name,
      isCheckedIn: true,
      checkInTime: now,
      checkOutTime: null,
    };
    setStudents([...students, student]);
    setRollNo("");
    setName("");
    setNumCheckedIn(numCheckedIn + 1);
  };

  const handleCheckOut = (student) => {
    const now = new Date();
    const updatedStudent = {
      ...student,
      isCheckedIn: false,
      checkOutTime: now,
    };
    const updatedStudents = students.map((s) => {
      if (s.rollNo === student.rollNo) {
        return updatedStudent;
      }
      return s;
    });
    setStudents(updatedStudents);
    setNumCheckedOut(numCheckedOut + 1);
  };

  return (
    <div className="p-4 min-h-screen bg-gradient-to-r from-blue-700 via-blue-800 to-gray-900">
      <h1 className="text-3xl font-bold mb-20 text-center text-teal-300 font-mono">Student Attendance System</h1>
      <div className="mb-4">
        <label className="mr-4 text-white font-medium font-sans">Name:</label>
        <input type="text"
          value={name}
          onChange={handleNameChange}
          placeholder="Enter student name"
          className="border rounded-md py-2 px-4 mr-4 font-sans"
        />
        <label className="text-white font-medium font-sans">Roll No:</label>
        <input
          type="text"
          value={rollNo}
          onChange={handleRollNoChange}
          placeholder="Enter student roll number"
          className="border rounded-md py-2 px-4 ml-4 font-sans"
        />
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-4 font-sans"
          onClick={handleCheckIn}
        >
          Check In
        </button>
      </div>
      <div className="mb-4">
        <span className="bg-blue-500 font-sans shadow-md p-1 text-white font-medium rounded">Present: {numPresent}</span>
        <span className="bg-green-500 font-sans shadow-md p-1 ml-4 text-white font-medium rounded">Checked In: {numCheckedIn}</span>
        <span className="bg-red-500 font-sans shadow-md p-1 ml-4 text-white font-medium rounded">Checked Out: {numCheckedOut}</span>
      </div>
      <ul>
        {students.map((student) => (
          <StudentDetails key={student.rollNo} student={student} onCheckOut={handleCheckOut} />
        ))}
      </ul>
    </div>
  );
}

export default App;
