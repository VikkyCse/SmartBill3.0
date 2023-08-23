import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RandomDataCards from './RandomDataCards';

function MainApp() {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('YOUR_CATEGORY_API_URL'); // Replace with your actual API URL
      setCards(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleAddCard = (newCardName, newCardImage) => {
    const newCard = { id: Date.now(), name: newCardName, image: newCardImage };
    setCards([...cards, newCard]);
  };

  return (
    <div className="App">
      <RandomDataCards data={cards} onAddCard={handleAddCard} />
    </div>
  );
}

export default MainApp;
