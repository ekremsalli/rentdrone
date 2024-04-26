import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Assuming axios is installed
import DataTable from 'react-data-table-component';

export default function Drones({ jwt }) {
  const [products, setProducts] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
         const token = localStorage.getItem('accessToken')
         const response = await axios.get('http://127.0.0.1:8000/drone/', {
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
		name: 'brand',
		selector: row => row.brand,
	},
  {
		name: 'model',
		selector: row => row.model,
	},
	{
		name: 'weigth',
		selector: row => row.weigth,
	},
  {
		name: 'category',
		selector: row => row.category,
	},
	{
		name: 'max_altitude',
		selector: row => row.max_altitude,
	},
  {
		name: 'power_source',
		selector: row => row.power_source,
	},
	{
		name: 'speed',
		selector: row => row.speed,
	},
  {
		name: 'departure',
		selector: row => row.category,
	},
	{
		name: 'landing',
		selector: row => row.max_altitude,
	},
  {
		name: 'length',
		selector: row => row.power_source,
	},
	{
		name: 'image',
		selector: row => row.speed,
	},
  {
		name: 'price',
		selector: row => row.speed,
	},
  {
		name: 'status',
		selector: row => row.speed,
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
