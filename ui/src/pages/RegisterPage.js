import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function SignUpPage() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
        console.log(formData)
      const response = await axios.post('http://127.0.0.1:8000/register/', formData, {
        headers: { 'Content-Type': 'application/json' }, 
      });

      if (response.status === 201) {
        console.log('Registration successful!');
      } else {
        console.error('Registration failed:', response.data);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  return (
    <div className="text-center m-5-auto">
      <h2>Join us</h2>
      <h5>Create your personal account</h5>
      <form onSubmit={handleSubmit}>
        <p>
          <label>Username</label><br />
          <input
            type="text"
            name="username"
            required
            value={formData.username}
            onChange={handleChange}
          />
        </p>
        <p>
          <label>Email address</label><br />
          <input
            type="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
          />
        </p>
        <p>
          <label>Password</label><br />
          <input
            type="password"
            name="password"
            required
            value={formData.password}
            onChange={handleChange}
          />
        </p>
        <p>
          <input
            type="checkbox"
            name="checkbox"
            id="checkbox"
            required
          />{' '}
          <span>
            I agree all statements in{' '}
            <a href="https://google.com" target="_blank" rel="noopener noreferrer">
              terms of service
            </a>
          </span>
        </p>
        <p>
          <button id="sub_btn" onClick={handleSubmit} type="submit">
            Register
          </button>
        </p>
      </form>
      <footer>
        <p>
          <Link to="/">Back to Homepage</Link>.
        </p>
      </footer>
    </div>
  );
}
