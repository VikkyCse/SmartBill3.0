
import React, { useState, useEffect } from 'react';
import RandomDataCards2 from './RandomDataCards2';
import axios from 'axios';

function MainApp2() {
  const [itemData, setItemData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);

  useEffect(() => {
    fetchData();
    fetchCategories();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8000/item');
      setItemData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:8000/categories');
      setCategoryData(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleAddItem = async (newItem) => {
    try {
      const response = await axios.post('http://localhost:8000/item/create', newItem, {
        headers: {
          'Content-Type': 'multipart/form-data', // Adjust the content type for file uploads
        },
      });
      setItemData([...itemData, response.data]);
    } catch (error) {
      console.error('Error adding item:', error);
    }
  };

  return (
    <div className="App">
      <RandomDataCards2 data={itemData} categories={categoryData} onAddItem={handleAddItem} />
    </div>
  );
}

export default MainApp2;
