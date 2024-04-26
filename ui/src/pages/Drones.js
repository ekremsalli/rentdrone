import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Assuming axios is installed
import DataTable from 'react-data-table-component';

export default function Drones({ jwt }) {
  const [products, setProducts] = useState([]);

  const [formData, setFormData] = useState({
    brand:'',
    model:'',
    weight: 0,
    category: '',
    max_altitude: 0,
    power_source: '',
    speed: 0,
    departure: '',
    landing:'',
    length:0,
    image:'',
    price:'',
    status:'',
  });
  
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
      console.log(formData)
      const response = await axios.post('http://127.0.0.1:8000/drone/', formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log('Drone created successfully:', response.data);
      setFormData({
        brand:'',
        model:'',
        weight: 0,
        category: '',
        max_altitude: 0,
        power_source: '',
        speed: 0,
        departure: '',
        landing:'',
        length:0,
        image:'',
        price:'',
        status:'',
      }); 
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
		selector: row => row.image,
	},
  {
		name: 'price',
		selector: row => row.price,
	},
  {
		name: 'status',
		selector: row => row.status,
	},
];
  return (
    <div className="card">
      <DataTable
			columns={columns}
			data={products}
		/>
      <form onSubmit={handleSubmit}>
        <div>
          <input type="text" id="brand" name="brand" value={formData.brand} onChange={handleInputChange} required />
          <input type="text" id="model" name="model" value={formData.model} onChange={handleInputChange} required />
          <input type="number" id="weight" name="weight" value={formData.weight} onChange={handleInputChange} required />
          <input type="text" id="category" name="category" value={formData.category} onChange={handleInputChange} required />
          <input type="number" id="max_altitude" name="max_altitude" value={formData.max_altitude} onChange={handleInputChange} required />
          <input type="text" id="power_source" name="power_source" value={formData.power_source} onChange={handleInputChange} required />
          <input type="number" id="speed" name="speed" value={formData.speed} onChange={handleInputChange} required />
        </div>
        <div>
          <input type="text" id="departure" name="departure" value={formData.departure} onChange={handleInputChange} required />
          <input type="text" id="landing" name="landing" value={formData.landing} onChange={handleInputChange} required />
          <input type="number" id="length" name="length" value={formData.length} onChange={handleInputChange} required />
          <input type="text" id="image" name="image" value={formData.image} onChange={handleInputChange} required />
          <input type="text" id="price" name="price" value={formData.price} onChange={handleInputChange} required />
          <input type="text" id="status" name="status" value={formData.status} onChange={handleInputChange} required />
        </div>
        <button type="submit">Add Drone</button>
      </form>
    </div> 
  );
}
