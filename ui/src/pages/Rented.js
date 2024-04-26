import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Assuming axios is installed
import DataTable from 'react-data-table-component';

export default function Rented({ jwt }) {
  const [products, setProducts] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/rented/', {
          headers: { Authorization: `Bearer ${jwt}` }, // Include JWT for authorization
        });
        console.log(jwt)
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
		name: 'Title',
		selector: row => row.title,
	},
	{
		name: 'Year',
		selector: row => row.year,
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
