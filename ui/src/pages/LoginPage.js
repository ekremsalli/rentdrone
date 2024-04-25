import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'; // Assuming you're using Axios for API calls
import HomePage from './HomePage';

import '../App.css';

export default function SignInPage() {
  const navigate = useNavigate();

  const [jwt, setJwt] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    const username = event.target.first_name.value;
    const password = event.target.password.value;
    
    try {
      const response = await axios.post('http://127.0.0.1:8000/token/', {
        username,
        password,
      });
      setJwtToken(response.data.acces)
      if (response.data.access) {
        // Login successful, redirect to desired page
        navigate('/home'); // Assuming '/home' is the protected page
      } else {
        // Handle login failure (e.g., display an error message)
        console.error('Login failed:', response.data.message);
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <div className="text-center m-5-auto">
      <h2>Sign in to us</h2>
      <form onSubmit={handleSubmit}>
        <p>
          <label>Username or email address</label><br />
          <input type="text" name="first_name" required />
        </p>
        <p>
          <label>Password</label>
          <Link to="/forget-password">
            <label className="right-label">Forget password?</label>
          </Link>
          <br />
          <input type="password" name="password" required />
        </p>
        <p>
          <button id="sub_btn" type="submit">Login</button>
        </p>
      </form>
      <footer>
        <p>
          First time? <Link to="/register">Create an account</Link>.
        </p>
        <p>
          <Link to="/">Back to Homepage</Link>.
        </p>
      </footer>
      {jwt && <HomePage jwt={jwt} />} 
    </div>
  );
}
