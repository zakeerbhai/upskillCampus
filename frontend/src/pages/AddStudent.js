import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const API = 'http://localhost:5000/api/students';

const AddStudent = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '', rollNumber: '', email: '',
    department: '', year: '', attendance: '', marks: ''
  });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(API, form);
      alert('Student added successfully!');
      navigate('/');
    } catch (err) {
      alert('Error: ' + err.response?.data?.message || err.message);
    }
  };

  return (
    <div style={styles.container}>
      <h2>Add New Student</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        {['name', 'rollNumber', 'email', 'department', 'year', 'attendance', 'marks'].map(field => (
          <div key={field} style={styles.group}>
            <label style={styles.label}>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
            <input
              type={['year', 'attendance', 'marks'].includes(field) ? 'number' : 'text'}
              name={field}
              value={form[field]}
              onChange={handleChange}
              required
              style={styles.input}
            />
          </div>
        ))}
        <button type="submit" style={styles.btn}>Add Student</button>
      </form>
    </div>
  );
};

const styles = {
  container: { maxWidth: '500px', margin: '30px auto', padding: '20px' },
  form: { display: 'flex', flexDirection: 'column', gap: '15px' },
  group: { display: 'flex', flexDirection: 'column' },
  label: { fontWeight: 'bold', marginBottom: '5px', textTransform: 'capitalize' },
  input: { padding: '10px', borderRadius: '5px', border: '1px solid #ccc', fontSize: '14px' },
  btn: { padding: '12px', backgroundColor: '#2c3e50', color: '#fff', border: 'none', borderRadius: '5px', fontSize: '16px', cursor: 'pointer' }
};

export default AddStudent;
