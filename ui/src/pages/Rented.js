import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Assuming axios is installed
import DataTable from 'react-data-table-component';

export default function Rented({ jwt }) {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    start_date: '',
    end_date: '',
    drone_id: '',
    user_id: '',
  });
  
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
  }, [formData]);
  
  const handleInputChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); 

    try {
      const token = localStorage.getItem('accessToken');
      const response = await axios.post('http://127.0.0.1:8000/rented/', formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log('Rental created successfully:', response.data);
      setFormData({ start_date: '', end_date: '',  }); 
    } catch (error) {
      console.error('Error creating rental:', error);
    }
  };
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
     <form onSubmit={handleSubmit}>
        <input type="date" id="start_date" name="start_date" value={formData.start_date} onChange={handleInputChange} required />
        <input type="date" id="end_date" name="end_date" value={formData.end_date} onChange={handleInputChange} required />
        <input type="text" id="drone_id" name="drone_id" value={formData.drone_id} onChange={handleInputChange} required />
        <input type="text" id="user_id" name="user_id" value={formData.user_id} onChange={handleInputChange} required />
        <button type="submit">Rent Drone</button>
      </form>
    
    </div>
  );
}
