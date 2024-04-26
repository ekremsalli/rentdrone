import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Assuming axios is installed
import DataTable from 'react-data-table-component';

export default function Rented({ jwt }) {
  const [products, setProducts] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('accessToken')
        const response = await axios.get('http://127.0.0.1:8000/rented/', {
         headers: { Authorization: `Bearer ${token}` }
       });
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        // Handle errors appropriately, e.g., display an error message to the user
      }
    };

    fetchData();
  }, [jwt]); // Dependency array includes jwt for re-fetching on JWT change
  const columns = [
    {
      name: 'id',
      selector: row => row.id,
    },
    {
      name: 'start_date',
      selector: row => row.start_date,
    },
    {
      name: 'end_date',
      selector: row => row.end_date,
    },
    {
      name: 'user_id',
      selector: row => row.user_id,
    },
    {
      name: 'drone_id',
      selector: row => row.drone_id,
    },
];
  return (
    <div className="card">
      <DataTable
			columns={columns}
			data={products}
		/>
    </div>
  );
}
