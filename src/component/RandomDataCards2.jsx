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

const RandomDataCards2 = () => {
  const [data, setData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [modalTitle, setModalTitle] = useState('Add New Item');
  const [editingItemId, setEditingItemId] = useState(null);
  const [newItemName, setNewItemName] = useState('');
  const [newItemCategory, setNewItemCategory] = useState('');
  const [newItemPrice, setNewItemPrice] = useState('');
  const [newItemQuantity, setNewItemQuantity] = useState('');
  const [newItemVeg, setNewItemVeg] = useState(false);
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    fetchData();
    fetchCategories();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${apiUrl}/item`);
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${apiUrl}/categories`);
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleAddButtonClick = () => {
    setOpenModal(true);
    setModalTitle('Add New Item');
    setEditingItemId(null);
    setNewItemName('');
    setNewItemCategory('');
    setNewItemPrice('');
    setNewItemQuantity('');
    setNewItemVeg(false);
    setImageFile(null);
  };

  const handleEditClick = (id) => {
    const itemToEdit = data.find(item => item.id === id);
    if (itemToEdit) {
      setOpenModal(true);
      setModalTitle('Edit Item');
      setEditingItemId(id);
      setNewItemName(itemToEdit.name);
      setNewItemCategory(itemToEdit.categoryId);
      setNewItemPrice(itemToEdit.price.toString());
      setNewItemQuantity(itemToEdit.quantity.toString());
      setNewItemVeg(itemToEdit.veg);
      setImageFile(null);
    }
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleModalSave = async () => {
    const formData = new FormData();
    formData.append('name', newItemName);
    formData.append('categoryId', newItemCategory);
    formData.append('price', newItemPrice);
    formData.append('quantity', newItemQuantity);
    formData.append('veg', newItemVeg);
    formData.append('image', imageFile);

    try {
      if (editingItemId !== null) {
        // Update existing item
        await axios.put(`${apiUrl}/item/${editingItemId}`, formData);
      } else {
        // Add new item
        await axios.post(`${apiUrl}/item/create`, formData);
      }

      fetchData(); // Refresh data after successful update or addition
    } catch (error) {
      console.error('Error saving item:', error);
    }

    handleCloseModal();
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setModalTitle('Add New Item');
    setEditingItemId(null);
    setNewItemName('');
    setNewItemCategory('');
    setNewItemPrice('');
    setNewItemQuantity('');
    setNewItemVeg(false);
    setImageFile(null);
  };

  const handleDeleteClick = async (id) => {
    try {
      await axios.delete(`${apiUrl}/item/${id}`);
      fetchData(); // Refresh data after successful delete
    } catch (error) {
      console.error('Error deleting item:', error);
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
              Category: {item.categoryId ? categories.find(category => category.id === item.categoryId)?.name : 'Unknown Category'}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Price: {item.price}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Quantity: {item.quantity}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Veg: {item.veg ? 'Yes' : 'No'}
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
        Add New Item
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
            <TextField
              label="Name"
              value={newItemName}
              onChange={(e) => setNewItemName(e.target.value)}
              style={{ marginBottom: '10px', width: '100%' }}
            />
            <select
              value={newItemCategory}
              onChange={(e) => setNewItemCategory(e.target.value)}
              style={{ marginBottom: '10px', width: '100%' }}
            >
              <option value="">Select a Category</option>
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            <TextField
              label="Price"
              type="number"
              value={newItemPrice}
              onChange={(e) => setNewItemPrice(e.target.value)}
              style={{ marginBottom: '10px', width: '100%' }}
            />
            <TextField
              label="Quantity"
              type="number"
              value={newItemQuantity}
              onChange={(e) => setNewItemQuantity(e.target.value)}
              style={{ marginBottom: '10px', width: '100%' }}
            />
            <div style={{ marginBottom: '10px' }}>
              <label htmlFor="vegCheckbox">Veg:</label>
              <input
                id="vegCheckbox"
                type="checkbox"
                checked={newItemVeg}
                onChange={(e) => setNewItemVeg(e.target.checked)}
                style={{ marginLeft: '5px' }}
              />
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={{ marginBottom: '10px', width: '100%' }}
            />
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
        </Fade>
      </Modal>
    </div>
  );
};

export default RandomDataCards2;
