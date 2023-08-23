import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Box from '@mui/material/Box';
import Backdrop from '@mui/material/Backdrop';
import TextField from '@mui/material/TextField';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const apiUrl = 'http://localhost:8000';

const RandomDataCards = () => {
  const [data, setData] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [modalTitle, setModalTitle] = useState('Add New Card');
  const [editingCardId, setEditingCardId] = useState(null);
  const [newCardName, setNewCardName] = useState('');
  const [newCardImage, setNewCardImage] = useState('');
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${apiUrl}/shops`);
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleAddButtonClick = () => {
    setOpenModal(true);
    setModalTitle('Add New Card');
    setEditingCardId(null);
    setNewCardName('');
    setNewCardImage('');
    setImageFile(null);
  };

  const handleEditClick = (id) => {
    const cardToEdit = data.find(item => item.id === id);
    if (cardToEdit) {
      setOpenModal(true);
      setModalTitle('Edit Card');
      setEditingCardId(id);
      setNewCardName(cardToEdit.name);
      setNewCardImage(cardToEdit.image);
      setImageFile(null);
    }
  };

  const handleImageChange = (e) => {

    setImageFile(e.target.files[0]);
    console.log(imageFile)
  };

  const handleModalSave = async () => {
    const formData = {}
    formData['name']= newCardName;
    formData['image'] = imageFile;
    console.log(formData)
    try {
      if (editingCardId !== null) {
        // Update existing card
        const res = await axios.put(`${apiUrl}/shops/${editingCardId}`, formData);
        console.log(res);
      } else {
        // Add new card
        await axios.post(`${apiUrl}/shops/create-shop`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        console.log('New card added successfully');
      }

      fetchData(); // Refresh data after successful update or addition
    } catch (error) {
      console.error('Error saving card:', error);
    }

    setOpenModal(false);
    setModalTitle('Add New Card');
    setEditingCardId(null);
    setNewCardName('');
    setNewCardImage('');
    setImageFile(null);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setModalTitle('Add New Card');
    setEditingCardId(null);
    setNewCardName('');
    setNewCardImage('');
    setImageFile(null);
  };

  const handleDeleteClick = async (id) => {
    try {
      await axios.delete(`${apiUrl}/shops/${id}`);
      console.log('Card deleted successfully');
      fetchData(); // Refresh data after successful delete
    } catch (error) {
      console.error('Error deleting card:', error);
    }
  };

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
      {data.map((item, index) => (
        <Card key={index} sx={{ maxWidth: 345 }}>
          <CardMedia
            component="img"
            height="140"
            image={`http://localhost:8000/${item.image}`}
           
            alt={`Image ${index + 1}`}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {item.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              ID: {item.id}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleEditClick(item.id)}
              style={{ marginRight: '10px' }}
            >
              Edit
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => handleDeleteClick(item.id)}
            >
              Delete
            </Button>
          </CardContent>
        </Card>
      ))}
      <Button
        variant="outlined"
        onClick={handleAddButtonClick}
        style={{ width: '100%', marginBottom: '20px' }}
      >
        Add New Card
      </Button>
      <Modal
  aria-labelledby="transition-modal-title"
  aria-describedby="transition-modal-description"
  open={openModal}
  onClose={handleCloseModal}
  closeAfterTransition
  BackdropComponent={Backdrop}
  BackdropProps={{
    timeout: 500,
  }}
>
  <Fade in={openModal}>
    <Box sx={style}>
      <Typography variant="h6" component="h2">
        {modalTitle}
      </Typography>
      <Box marginTop={3}> {/* Add some margin top */}
        <TextField
          label="Name"
          value={newCardName}
          onChange={(e) => setNewCardName(e.target.value)}
          style={{ marginBottom: '10px', width: '100%' }}
        />
      </Box>
      <Box marginTop={2}> {/* Add some margin top */}
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          style={{ marginBottom: '10px', width: '100%' }}
        />
      </Box>
      <Box marginTop={2}>
      <Button
      
        onClick={handleModalSave}
        variant="contained"
        color="primary"
        style={{ marginRight: '10px' }}
      >
        Save
      </Button>
      <Button
        onClick={handleCloseModal}
        variant="contained"
        color="secondary"
      >
        Cancel
      </Button>
      </Box>
    </Box>
  </Fade>
</Modal>

    </div>
  );
};

export default RandomDataCards;
