import React from 'react';
import { Link } from 'react-router-dom';
import Rented from './Rented';
import Drones from './Drones';

export default function HomePage({ jwt }) {
  console.log(jwt)
  return (
    <div className="text-center">
      <h1 className="main-title home-page-title">welcome to our app</h1>
      <Link to="/">
        <button className="primary-button">Log out</button>
      </Link >
      <Link to="/rented">
        <button className="primary-button">Rented Items</button>
      </Link >
      <Link to="/drones">
        <button className="primary-button">Drones</button>
      </Link>
      {jwt && <Rented jwt={jwt} />}
      {jwt && <Drones jwt={jwt} />}
    </div>
  );
}
