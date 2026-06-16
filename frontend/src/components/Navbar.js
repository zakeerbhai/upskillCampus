import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav style={styles.nav}>
      <h2 style={styles.brand}>🎓 Student Management System</h2>
      <div>
        <Link to="/" style={styles.link}>Dashboard</Link>
        <Link to="/add" style={styles.link}>+ Add Student</Link>
      </div>
    </nav>
  );
};

const styles = {
  nav: {
    backgroundColor: '#2c3e50',
    padding: '15px 30px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  brand: { color: '#fff', margin: 0 },
  link: {
    color: '#ecf0f1',
    textDecoration: 'none',
    marginLeft: '20px',
    fontSize: '16px'
  }
};

export default Navbar;
