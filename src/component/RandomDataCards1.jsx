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

const RandomDataCards1 = () => {
  const [data, setData] = useState([]);
  const [shops, setShops] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [modalTitle, setModalTitle] = useState('Add New Category');
  const [editingCategoryId, setEditingCategoryId] = useState(null);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newCategoryShopId, setNewCategoryShopId] = useState('');
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    fetchData();
    fetchShops();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${apiUrl}/categories`);
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const fetchShops = async () => {
    try {
      const response = await axios.get(`${apiUrl}/shops`);
      setShops(response.data);
    } catch (error) {
      console.error('Error fetching shops:', error);
    }
  };

  const handleAddButtonClick = () => {
    setOpenModal(true);
    setModalTitle('Add New Category');
    setEditingCategoryId(null);
    setNewCategoryName('');
    setNewCategoryShopId('');
    setImageFile(null);
  };

  const handleEditClick = (id) => {
    const categoryToEdit = data.find(item => item.id === id);
    if (categoryToEdit) {
      setOpenModal(true);
      setModalTitle('Edit Category');
      setEditingCategoryId(id);
      setNewCategoryName(categoryToEdit.name);
      setNewCategoryShopId(categoryToEdit.shopId);
      setImageFile(null);
    }
  };

  const handleImageChange = (e) => {

    const selectedFile = e.target.files[0];
  console.log("Selected image file:", selectedFile);
  setImageFile(selectedFile);
  };

  const handleModalSave = async () => {
    const formData = new FormData();
  formData.append('name', newCategoryName);
  formData.append('shopId', newCategoryShopId);
  formData.append('image', imageFile);
    try {
      if (editingCategoryId !== null) {
        console.log(Object.fromEntries(formData),"formData");
        const res = await axios.put(`${apiUrl}/categories/${editingCategoryId}`, Object.fromEntries(formData))
        console.log("resssss",res);
        console.log(' category updated  successfully');
      } else {
        // Add new category
        console.log(formData);
        const res = await axios.post(`${apiUrl}/categories`, formData);
        console.log("resssss",res);
        console.log('New category added successfully');
      }

      fetchData(); // Refresh data after successful update or addition
    } catch (error) {
      console.error('Error saving category:', error);
    }

    handleCloseModal();
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setModalTitle('Add New Category');
    setEditingCategoryId(null);
    setNewCategoryName('');
    setNewCategoryShopId('');
    setImageFile(null);
  };

  const handleDeleteClick = async (id) => {
    try {
      await axios.delete(`${apiUrl}/categories/${id}`);
      console.log('Category deleted successfully');
      fetchData(); // Refresh data after successful delete
    } catch (error) {
      console.error('Error deleting category:', error);
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
              Shop: {item.shopId ? shops.find(shop => shop.id === item.shopId)?.name : 'Unknown Shop'}
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
        Add New Category
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
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              style={{ marginBottom: '10px', width: '100%' }}
            />
            <select
              value={newCategoryShopId}
              onChange={(e) => setNewCategoryShopId(e.target.value)}
              style={{ marginBottom: '10px', width: '100%' }}
            >
              <option value="">Select a Shop</option>
              {shops.map(shop => (
                <option key={shop.id} value={shop.id}>
                  {shop.name}
                </option>
              ))}
            </select>
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

export default RandomDataCards1;
