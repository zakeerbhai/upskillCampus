import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const API = 'http://localhost:5000/api/students';

const Dashboard = () => {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const res = await axios.get(API);
      setStudents(res.data.data);
    } catch (err) {
      console.error('Error fetching students:', err);
    }
  };

  const deleteStudent = async (id) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      await axios.delete(`${API}/${id}`);
      fetchStudents();
    }
  };

  const filtered = students.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.rollNumber.includes(search)
  );

  return (
    <div style={{ padding: '20px' }}>
      <h2>Student Records</h2>
      <input
        type="text"
        placeholder="Search by name or roll number..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={styles.search}
      />
      <table style={styles.table}>
        <thead>
          <tr style={styles.thead}>
            <th>Roll No.</th><th>Name</th><th>Department</th>
            <th>Year</th><th>Attendance %</th><th>Marks</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filtered.length === 0 ? (
            <tr><td colSpan="7" style={{ textAlign: 'center', padding: '20px' }}>No students found</td></tr>
          ) : filtered.map(s => (
            <tr key={s._id} style={styles.tr}>
              <td>{s.rollNumber}</td>
              <td>{s.name}</td>
              <td>{s.department}</td>
              <td>{s.year}</td>
              <td>{s.attendance}%</td>
              <td>{s.marks}</td>
              <td>
                <Link to={`/edit/${s._id}`} style={styles.editBtn}>Edit</Link>
                <button onClick={() => deleteStudent(s._id)} style={styles.deleteBtn}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const styles = {
  search: { padding: '10px', width: '300px', marginBottom: '15px', borderRadius: '5px', border: '1px solid #ccc' },
  table: { width: '100%', borderCollapse: 'collapse' },
  thead: { backgroundColor: '#2c3e50', color: '#fff' },
  tr: { borderBottom: '1px solid #ddd', textAlign: 'center' },
  editBtn: { backgroundColor: '#3498db', color: '#fff', padding: '5px 10px', borderRadius: '4px', textDecoration: 'none', marginRight: '5px' },
  deleteBtn: { backgroundColor: '#e74c3c', color: '#fff', padding: '5px 10px', borderRadius: '4px', border: 'none', cursor: 'pointer' }
};

export default Dashboard;
