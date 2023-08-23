import React, { useState } from 'react';
import RandomDataCards from './RandomDataCards';
// Import the product array

function MainApp() {
  const [cards, setCards] = useState();

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
