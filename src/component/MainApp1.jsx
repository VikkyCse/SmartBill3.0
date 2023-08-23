import React, { useState, useEffect } from 'react';
import RandomDataCards1 from './RandomDataCards1';
import axios from 'axios';

function MainApp1() {
  const [categoryData, setCategoryData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8000/categories');
      setCategoryData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleAddCategory = async (newCategory) => {
    try {
      const response = await axios.post('http://localhost:8000/categories', newCategory, {
        headers: {
          'Content-Type': 'application/json', // Adjust the content type if needed
        },
      });
      setCategoryData([...categoryData, response.data]);
    } catch (error) {
      console.error('Error adding category:', error);
    }
  };

  return (
    <div className="App">
      <RandomDataCards1 data={categoryData} onAddCategory={handleAddCategory} />
    </div>
  );
}

export default MainApp1;
