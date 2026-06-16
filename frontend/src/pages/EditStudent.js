import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const API = 'http://localhost:5000/api/students';

const EditStudent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '', rollNumber: '', email: '',
    department: '', year: '', attendance: '', marks: ''
  });

  useEffect(() => {
    axios.get(`${API}/${id}`).then(res => setForm(res.data.data));
  }, [id]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${API}/${id}`, form);
      alert('Student updated successfully!');
      navigate('/');
    } catch (err) {
      alert('Error: ' + err.response?.data?.message || err.message);
    }
  };

  return (
    <div style={styles.container}>
      <h2>Edit Student</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        {['name', 'rollNumber', 'email', 'department', 'year', 'attendance', 'marks'].map(field => (
          <div key={field} style={styles.group}>
            <label style={styles.label}>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
            <input
              type={['year', 'attendance', 'marks'].includes(field) ? 'number' : 'text'}
              name={field}
              value={form[field] || ''}
              onChange={handleChange}
              required
              style={styles.input}
            />
          </div>
        ))}
        <button type="submit" style={styles.btn}>Update Student</button>
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
  btn: { padding: '12px', backgroundColor: '#27ae60', color: '#fff', border: 'none', borderRadius: '5px', fontSize: '16px', cursor: 'pointer' }
};

export default EditStudent;
